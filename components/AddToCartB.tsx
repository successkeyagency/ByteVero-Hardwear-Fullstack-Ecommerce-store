"use client";

import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormat from "./PriceFormat";
import QuantityB from "./QuantityB";
import { Product } from '@/sanity.types';

interface Props {
  product: Product;
  className?: string;
}


const AddToCartB = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = (product?.stock ?? 0) === 0;

  const handleAddToCart = () => {
    if ((product?.stock ?? 0) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.split(" ").slice(0, 2).join(" ")} added!`
      );
    } else {
      toast.error("Cannot add more than available stock");
    }
  };

  return (
    <div className="w-full">
      {itemCount > 0 ? (
        <div className="text-sm w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityB product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormat
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            isOutOfStock
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-amber-500 text-white hover:bg-amber-600 active:scale-95",
            className
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </Button>
      )}
    </div>
  );
};

export default AddToCartB;
