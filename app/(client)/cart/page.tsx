"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";

import Container from "@/components/Container";
import Title from "@/components/Title";
import CartEmpty from "@/components/CartEmpty";
import AccessDenied from "@/components/AccessDenied";
import PriceFormat from "@/components/PriceFormat";
import ProductSM from "@/components/ProductSM";
import QuantityB from "@/components/QuantityB";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { createCheckoutSession } from "@/actions/CreateCheckoutSession";

const CartP = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();

  const groupedItems = useStore((state) => state.getGroupedItems());
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const query = `*[_type=="address"] | order(publishedAt desc)`;
        const data = await client.fetch(query);
        setAddresses(data);
        const defaultAddr = data.find((a: Address) => a.default) || data[0];
        setSelectedAddress(defaultAddr);
      } catch (error) {
        console.error("Fetch address error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleReset = () => {
    if (confirm("Clear your cart?")) {
      resetCart();
      toast.success("Cart cleared.");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress || "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) return <AccessDenied />;
  if (!groupedItems?.length) return <CartEmpty />;

  return (
    <Container className="py-10 space-y-10">
      <div className="flex items-center gap-3">
        <ShoppingBag className="text-primary" />
        <Title>My Cart</Title>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {groupedItems.map(({ product }) => (
            <div key={product._id} className="flex items-start gap-6 border rounded-lg p-4 shadow-sm">
             <Link href={`/product/${product.slug?.current ?? ""}`} className="shrink-0">
  {product.images?.[0] ? (
    <Image
      src={urlFor(product.images[0]).url()}
      alt={product.name ?? "Product"}
      width={100}
      height={100}
      className="rounded-md object-cover"
    />
  ) : (
    <div className="w-[100px] h-[100px] bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
      No Image
    </div>
  )}
</Link>

              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">Variant: {product.variant}</p>
                <p className="text-sm text-muted-foreground">Status: {product.status}</p>
                <QuantityB product={product} />
                <PriceFormat
                  amount={(product.price ?? 0) * getItemCount(product._id)}
                  className="font-semibold mt-2"
                />
              </div>
              <TooltipProvider>
                <div className="flex flex-col items-end gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <ProductSM product={product} className="text-blue-500 hover:text-blue-700" />
                    </TooltipTrigger>
                    <TooltipContent>Add to favorites</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash
                        onClick={() => {
                          deleteCartProduct(product._id);
                          toast.success("Removed from cart");
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Remove</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          ))}

          <Button onClick={handleReset} variant="destructive" className="w-full">
            Clear Cart
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <PriceFormat amount={getSubTotalPrice()} />
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <PriceFormat amount={getSubTotalPrice() - getTotalPrice()} />
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <PriceFormat amount={getTotalPrice()} />
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full mt-4"
                size="lg"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Checkout"}
              </Button>
            </CardContent>
          </Card>

          {addresses && (
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Select Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  defaultValue={addresses.find((a) => a.default)?._id.toString()}
                >
                  {addresses.map((addr) => (
                    <div key={addr._id} onClick={() => setSelectedAddress(addr)} className="space-y-1">
                      <RadioGroupItem value={addr._id.toString()} />
                      <Label className="cursor-pointer">
                        <p className="font-medium">{addr.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.address}, {addr.city}, {addr.state} {addr.zip}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button variant="outline">Add New Address</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CartP;
