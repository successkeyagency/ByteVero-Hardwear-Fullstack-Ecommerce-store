"use client";

import React, { useEffect, useState } from "react";
import logo from '../assets/successkeyagency-logo.png'
import Image from "next/image";


const ClientLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
        <Image
                src={logo}
                alt="SuccessKeyAgency Logo"
                width={150}
                height={60}
                className="rounded"
              />
        <p className="text-green-500 text-lg font-semibold">
          <span className="text-white">Created by </span> SuccessKeyAgency LLC
        </p>
        <div
          className="mt-6 w-12 h-12 rounded-full border-8 border-gray-300 border-t-green-500 animate-spin shadow-lg"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ClientLoader;
