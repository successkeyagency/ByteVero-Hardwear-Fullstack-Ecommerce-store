"use client";

import { BRANDS_QUERYResult, Category, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import ProductCD from './ProductCD';
import Title from './Title';
import { Loader2, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import CatList from './shop/CatList';
import BrandL from './shop/BrandL';
import PriceL from './shop/PriceL';
import NoProductAvailable from './NoProductAvailable';
import Container from './Container';
import { Button } from './ui/button';

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
        *[_type == 'product' 
          && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
          && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
          && price >= $minPrice && price <= $maxPrice
        ] 
        | order(name asc) {
          ...,"categories": categories[]->title
        }
      `;
      const data = await client.fetch(query, {
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
      }, { next: { revalidate: 0 } });
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, selectedPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="py-6">
      <Container>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <Title className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-gray-900">
            🛒<span className='text-amber-500'>Discover </span> Top Picks for You
          </Title>
          {(selectedCategory || selectedBrand || selectedPrice) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
                setSelectedPrice(null);
              }}
              className="text-sm text-red-600 underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <SlidersHorizontal size={16} />
            Filters
            {showFilters ? <ChevronUp className='text-emerald-500' size={16} /> : <ChevronDown className='text-amber-500' size={16} />}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className={`flex flex-col gap-4 ${showFilters ? "block" : "hidden"} md:block`}>
            <CatList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandL
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
            <PriceL
              setSelectedPrice={setSelectedPrice}
              selectedPrice={selectedPrice}
            />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center gap-2 py-10">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Product is loading . . .</p>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCD key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <NoProductAvailable className="py-10" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
