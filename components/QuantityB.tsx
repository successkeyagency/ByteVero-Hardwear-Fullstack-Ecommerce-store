"use client";

import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import useStore from "@/store";
import { Product } from "@/sanity.types";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  className?: string;
}

const QuantityB = ({ product, className }: Props) => {
  const addItem = useStore((state) => state.addItem);
  const removeItem = useStore((state) => state.removeItem);

  const itemCount = useStore((state) =>
    state.items.find((item) => item.product._id === product._id)?.quantity || 0
  );

  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    if (itemCount > 0) {
      removeItem(product._id);
      if (itemCount > 1) {
        toast.success("Quantity decreased!");
      } else {
        toast.success(`${product?.name?.substring(0, 12)} removed!`);
      }
    }
  };

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success("Quantity increased!");
    } else {
      toast.error("No more stock available");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "flex items-center justify-between w-fit rounded-full border border-gray-300 bg-white px-3 py-1 shadow-sm transition-all sm:px-4 sm:py-1.5",
        className
      )}
    >
      <Button
        onClick={handleRemoveProduct}
        variant="ghost"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="w-8 h-8 text-gray-600 hover:text-red-500 disabled:opacity-40"
      >
        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      <span className="min-w-[24px] text-center text-sm font-semibold text-gray-800 sm:text-base px-2">
        {itemCount}
      </span>

      <Button
        onClick={handleAddToCart}
        variant="ghost"
        size="icon"
        disabled={isOutOfStock}
        className="w-8 h-8 text-gray-600 hover:text-green-600 disabled:opacity-40"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </motion.div>
  );
};

export default QuantityB;
