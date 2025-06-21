import React from "react";
import { getProductBySlug } from "@/sanity/queries";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import ViewPrice from "@/components/ViewPrice";
import AddToCartB from "@/components/AddToCartB";
import FavoriteB from "@/components/FavoriteB";
import ProductCharacteristics from "@/components/ProductCharacteristics";

import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { notFound } from "next/navigation";

const SingleProductP = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
if(!product){
  return
  notFound();
}
  return (
    <Container className="py-12 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col gap-8">
        {product?.images && (
          <div className="w-full rounded-lg overflow-hidden">
            <ImageView images={product.images} isStock={product.stock} />
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold text-darkBlue mb-2">
            {product?.name}
          </h1>
          <p className="text-lightText text-base">{product?.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size={16}
              className="text-yellow-400"
              fill="#FACC15"
            />
          ))}
          <span className="text-sm text-lightText font-semibold">(120)</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-y py-6">
        <ViewPrice
          price={product?.price}
          discount={product?.discount}
          className="text-2xl font-bold"
        />
        <p
          className={`text-sm font-medium px-3 py-1.5 rounded-md ${
            product?.stock === 0
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <AddToCartB product={product} />
          <FavoriteB showProduct={true} product={product} />
        </div>
      </div>

      <div className="mt-10">
        <ProductCharacteristics product={product} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 text-center text-darkBlue">
        <div className="flex flex-col items-center gap-1">
          <RxBorderSplit size={24} />
          <p className="text-sm font-medium">Compare</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaRegQuestionCircle size={22} />
          <p className="text-sm font-medium">Ask</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <TbTruckDelivery size={22} />
          <p className="text-sm font-medium">Delivery</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FiShare2 size={22} />
          <p className="text-sm font-medium">Share</p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 border-t pt-8">
        <div className="flex gap-4">
          <Truck size={28} className="text-darkBlue" />
          <div>
            <p className="font-semibold text-darkBlue">Free Delivery</p>
            <p className="text-sm text-lightText">
              Enter your postal code to check delivery options.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <CornerDownLeft size={28} className="text-darkBlue" />
          <div>
            <p className="font-semibold text-darkBlue">30-Day Returns</p>
            <p className="text-sm text-lightText">
              Easy returns with full refund.{" "}
              <span className="underline cursor-pointer">Details</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductP;
