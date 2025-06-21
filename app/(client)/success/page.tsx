"use client";

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPageContent = () => {
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }
  }, [orderNumber, resetCart]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-gradient-to-br from-[#f9f9f9] to-[#eaeaea] rounded-2xl p-6 shadow-xl text-center"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-700 text-sm mb-4">
          Thank you for your order. A confirmation email has been sent. We'll
          ship your items soon!
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Order Number:{" "}
            <span className="font-medium text-black">{orderNumber}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/orders"
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 border border-black text-black rounded-lg hover:bg-gray-100 transition"
          >
            <Package className="w-4 h-4" />
            My Orders
          </Link>
          
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
