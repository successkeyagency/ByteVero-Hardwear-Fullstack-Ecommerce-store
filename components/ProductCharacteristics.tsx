import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrand(product?.slug?.current as string);
  console.log(brand);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
        <AccordionContent>
          <p className="">
            Brand:{" "}
            {brand && (
              <span className="">
                {brand[0]?.brandName}
              </span>
            )}
          </p>
          <p className="">
            Collection:{" "}
            <span className="">2025</span>
          </p>
          <p className="">
            Type:{" "}
            <span className="">
              {product?.variant}
            </span>
          </p>
          <p className="">
            Stock:{" "}
            <span className="">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;