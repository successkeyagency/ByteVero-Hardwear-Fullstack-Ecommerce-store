"use client";

import { useEffect, useRef, useState } from "react";
import HomeCatSelector from "./HomeCatSelector";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCD from "./ProductCD";
import { Product } from "@/sanity.types";

const query = `*[_type == "product" && variant == $variant] | order(name desc) {
  ...,
  "categories": categories[]->title
}`;

const HomeProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = { variant: selectedTab.toLowerCase() };
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]); 

  return (
    <section className="w-full px-4 py-12">
      <HomeCatSelector selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-2 text-white">
          <Loader2 className="animate-spin h-6 w-6 text-orange-400 mb-2" />
          <p className="text-sm">Loading products...</p>
        </div>
      ) : products?.length ? (
        <div className="mt-10 relative">
          <div className="flex justify-between items-center md:hidden mb-4">
            <button
              onClick={() => scroll("left")}
              className="bg-orange-400 text-white rounded-full p-2"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-orange-400 text-white rounded-full p-2"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto md:hidden scroll-smooth no-scrollbar pb-2"
          >
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product?._id}
                  layout
                  initial={{ opacity: 0.2, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[150px]"
                >
                  <ProductCD product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product?._id}
                  layout
                  initial={{ opacity: 0.2, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCD product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="mt-12">
          <NoProductAvailable selectedTab={selectedTab} />
        </div>
      )}
    </section>
  );
};

export default HomeProducts;
