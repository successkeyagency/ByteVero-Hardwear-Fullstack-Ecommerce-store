'use client'; 

import React from 'react';
import { groq } from 'next-sanity';
import { backendClient } from '@/sanity/lib/backendClient';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  image: { asset: { _ref: string } };
  price: number;
}

const query = groq`
  *[_type == "product" && title match $searchTerm]{
    _id,
    title,
    slug,
    "image": images[0],
    price
  }
`;

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const searchTerm = `*${queryParam}*`;

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!queryParam) {
      setProducts([]);
      return;
    }
    setLoading(true);

    backendClient
      .fetch(query, { searchTerm })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Search fetch error:', error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [queryParam, searchTerm]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Search results for &quot;{queryParam}&quot;
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && queryParam && (
        <p>No products found matching your search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product.slug.current}`}
            className="border rounded-md p-4 hover:shadow-lg transition"
          >
            {product.image && (
              <Image
                src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.image.asset._ref.replace(
                  'image-',
                  ''
                ).replace('-webp', '.webp')}`}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-48 rounded"
              />
            )}
            <h2 className="mt-2 font-medium">{product.title}</h2>
            <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
