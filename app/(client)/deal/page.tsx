import Container from "@/components/Container";
import ProductCD from "@/components/ProductCD";
import Title from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";
import React from "react";
import type { Product } from "@/sanity.types";

const SalesPage = async () => {
  const products = await getDealProducts();


  
  const fixedProducts: Product[] = products.map((p) => ({
    ...p,
    categories: Array.isArray(p.categories)
      ? 
        p.categories.filter(
          (c): c is Exclude<typeof c, null | string> => !!c && typeof c !== "string"
        )
      : [],
  }));

  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <Container>
        <Title className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">
          On Sale Now
        </Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {fixedProducts.map((product) => (
            <ProductCD key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SalesPage;
