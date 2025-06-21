import { Order } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormat from "./PriceFormat";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDD: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order.invoice?.number ?? "N/A"}
          </p>
          {order.invoice?.hosted_invoice_url && (
            <Button className="bg-transparent border text-darkColor/80 mt-2 hover:text-darkColor hover:border-darkColor hover:bg-darkColor/10 hoverEffect ">
              <Link href={order.invoice.hosted_invoice_url} target="_blank">
                Download Invoice
              </Link>
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((productItem, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {(productItem.product as any)?.images?.length > 0 && (
                    <Image
                      src={urlFor((productItem.product as any).images[0]).url()}
                      alt={(productItem.product as any).name ?? "productImage"}
                      width={50}
                      height={50}
                      className="border rounded-sm"
                    />
                  )}

                  {(productItem.product as any)?.name}
                </TableCell>
                <TableCell>{productItem.quantity}</TableCell>
                <TableCell>
                  <PriceFormat
                    amount={(productItem.product as any)?.price ?? 0}
                    className="text-black font-medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            {order.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Discount: </strong>
                <PriceFormat
                  amount={order.amountDiscount}
                  className="text-black font-bold"
                />
              </div>
            )}
            {order.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal: </strong>
                <PriceFormat
                  amount={(order.totalPrice ?? 0) + (order.amountDiscount ?? 0)}
                  className="text-black font-bold"
                />
              </div>
            )}
            <div className="w-full flex items-center justify-between">
              <strong>Total: </strong>
              <PriceFormat
                amount={order.totalPrice}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDD;
