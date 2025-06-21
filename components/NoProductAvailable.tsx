"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Box, RefreshCw } from "lucide-react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 min-h-72 bg-white border border-gray-200 rounded-xl shadow-sm w-full mt-10 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center bg-gray-100 p-4 rounded-full mb-4"
      >
        <Box className="w-6 h-6 text-gray-500" />
      </motion.div>

      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-lg sm:text-xl font-semibold text-gray-800"
      >
        Nothing Found Here
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-sm text-gray-600 mt-2 max-w-md"
      >
        It seems there are currently no items available for{" "}
        <span className="text-amber-600 font-medium">{selectedTab || "this selection"}</span>.  
        Try adjusting your filters or check back later.
      </motion.p>

      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
        className="mt-6 text-gray-400"
      >
        <RefreshCw className="w-5 h-5 mx-auto" />
      </motion.div>

      <p className="mt-4 text-xs text-gray-400">
        Inventory is updated regularly — new arrivals coming soon.
      </p>
    </div>
  );
};

export default NoProductAvailable;
