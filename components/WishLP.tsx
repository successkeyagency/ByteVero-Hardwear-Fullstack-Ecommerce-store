"use client";

import React, { useState } from "react";
import useStore from "@/store";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import PriceFormat from "./PriceFormat";
import AddToCartB from "./AddToCartB";
import { Button } from "./ui/button";
import { Heart, X } from "lucide-react";

const WishLP = () => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 3, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm("Reset your wishlist?");
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist cleared!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h1>

      {favoriteProduct?.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProduct.slice(0, visibleProducts).map((product: Product) => (
              <div
                key={product._id}
                className="border rounded-2xl shadow-sm overflow-hidden bg-white relative flex flex-col"
              >
                <button
                  onClick={() => {
                    removeFromFavorite(product._id);
                    toast.success("Removed from wishlist");
                  }}
                  className="absolute top-2 right-2 bg-red-100 p-1 rounded-full hover:bg-red-200 transition"
                >
                  <X size={18} className="text-red-500" />
                </button>

                <Link href={`/product/${product?.slug?.current}`}>
                  <Image
                    src={urlFor(product?.images?.[0]).url()}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </Link>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>

                  {product?.categories?.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {product.categories.join(", ")}
                    </p>
                  )}

                  <p className="text-sm text-gray-600">Variant: {product.variant}</p>

                  <p
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-base font-semibold">
                      <PriceFormat amount={product.price} />
                    </div>
                    <AddToCartB product={product} className="w-full sm:w-auto text-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {visibleProducts < favoriteProduct.length && (
              <Button onClick={loadMore} variant="outline">
                Load More
              </Button>
            )}
            {visibleProducts > 6 && (
              <Button onClick={() => setVisibleProducts(6)} variant="outline">
                Show Less
              </Button>
            )}
            <Button onClick={handleResetWishlist} variant="destructive">
              Reset Wishlist
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Heart className="w-10 h-10 mb-4 text-gray-400" strokeWidth={1.5} />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mb-4">
            Items added to your wishlist will appear here.
          </p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishLP;
