"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductSM = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (product?._id) {
      await addToFavorite(product);
      toast.success(
        existingProduct
          ? "Product removed successfully!"
          : "Product added successfully!"
      );
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <div
        onClick={handleFavorite}
        className={cn(
          "p-2.5 rounded-full transition-colors duration-200 hover:bg-orange-200 hover:text-white cursor-pointer",
          existingProduct ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
        )}
      >
        <Heart
          size={16}
          className={cn(
            "transition-colors duration-200",
            existingProduct ? "fill-current text-white" : "text-gray-600"
          )}
        />
      </div>
    </div>
  );
};

export default ProductSM;
