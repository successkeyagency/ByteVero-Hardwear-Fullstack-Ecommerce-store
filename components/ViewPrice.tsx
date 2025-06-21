import React from "react";
import PriceFormat from "./PriceFormat";
import { twMerge } from "tailwind-merge";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const ViewPrice = ({ price, discount, className }: Props) => {
  if (!price) return null;

  const discountAmount = discount ? (price * discount) / 100 : 0;
  const finalPrice = price - discountAmount;

  return (
    <div className={twMerge("w-full", className)}>
      <div className="flex flex-wrap items-center gap-2 overflow-hidden">
        {discount ? (
          <>
            <PriceFormat
              amount={price}
              className="line-through text-gray-400 text-sm max-w-full truncate"
            />
            <PriceFormat
              amount={finalPrice}
              className="text-primary font-semibold text-base max-w-full truncate"
            />
          </>
        ) : (
          <PriceFormat
            amount={price}
            className="text-darkColor font-medium text-base max-w-full truncate"
          />
        )}
      </div>
    </div>
  );
};

export default ViewPrice;
