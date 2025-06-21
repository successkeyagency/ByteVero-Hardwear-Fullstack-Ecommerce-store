"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const FavoriteB = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const favoriteProduct = useStore((state) => state.favoriteProduct);
  const addToFavorite = useStore((state) => state.addToFavorite);

  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct ? "Removed from favorites" : "Added to favorites"
        );
      });
    }
  };

  return !showProduct ? (
    <Link href="/wishlist" className="group relative flex items-center gap-1">
      <Heart className="h-5 w-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
      <span className="text-sm font-medium text-gray-800">
        {favoriteProduct?.length ?? 0}
      </span>
    </Link>
  ) : (
    <motion.button
      onClick={handleFavorite}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="rounded-full p-2 hover:bg-orange-100 active:scale-95 transition-colors"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          existingProduct ? "text-orange-500 fill-orange-500" : "text-gray-600"
        }`}
      />
    </motion.button>
  );
};

export default FavoriteB;
