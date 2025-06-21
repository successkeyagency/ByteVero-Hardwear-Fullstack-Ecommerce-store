"use client"
import useStore from '@/store';
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Cartlogo = () => {
  const {items}= useStore();
  return (
    <Link href="/cart" className="relative group hover:scale-110 transition-transform duration-300">

      <ShoppingCart className="w-7 h-7 text-white group-hover:text-orange-400 transition-colors duration-200" />

      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-bounce-slow group-hover:scale-110 transition-transform">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  )
}

export default Cartlogo

