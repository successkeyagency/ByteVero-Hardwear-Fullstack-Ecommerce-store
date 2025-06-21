import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { FlameIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ViewPrice from "./ViewPrice";
import Link from "next/link";
import AddToCartB from "./AddToCartB";
import ProductSM from "./ProductSM";

const ProductCD = ({ product }: { product: Product }) => {
  return (
    
  <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between h-full transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-md hover:ring-2 hover:ring-orange-400">
    <div className="w-full aspect-[4/3] relative overflow-hidden rounded-md group">

      <Link href={`/product/${product?.slug?.current}`}>
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
          />
        )}
      </Link>

      <div className="absolute top-2 left-2 z-10 space-y-1">
        {product?.status === "sale" && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">On Sale!</span>
        )}
        {product?.status === "new" && (
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">New Arrival!</span>
        )}
        {product?.status === "hot" && (
          <FlameIcon size={18} className="text-orange-500" />
        )}
      </div>

      <div className="absolute top-2 right-2 z-10">
        <ProductSM product={product} />
      </div>
    </div>


      <div className="mt-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          {product?.categories && (
            <p className="text-xs text-gray-500">
              {product.categories.join(", ")}
            </p>
          )}

          <Link href={`/product/${product?.slug?.current}`}>
            <h3 className="text-base font-semibold line-clamp-2 hover:underline">
              {product?.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className={index < 4 ? "fill-current" : ""}
              />
            ))}
            <p className="text-xs text-gray-400 ml-1">(5 Reviews)</p>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-xs text-gray-600">Availability</p>
          <p
            className={`text-sm font-medium ${
              product?.stock === 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            {product?.stock ? `${product?.stock} available` : "Unavailable"}
          </p>

          <ViewPrice
            price={product?.price}
            discount={product?.discount}
            className="mt-1"
          />
          <AddToCartB product={product} className="mt-2 w-full sm:w-auto" />
        </div>
      </div>
    </div>
  );
};
export default ProductCD;
