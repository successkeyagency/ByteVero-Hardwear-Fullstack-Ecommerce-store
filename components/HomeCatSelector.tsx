import { productType } from '@/constants/data'
import Link from 'next/link'
import React from 'react'

interface Props {
  selectedTab: string
  onTabSelect: (tab: string) => void
}

const HomeCatSelector = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-20 bg-white rounded-xl shadow-sm flex flex-col ">
  <h2 className="text-emerald-600 text-lg font-semibold mb-4  flex items-center justify-center gap-2 text-center w-full">
  Select Category
  <svg
    className="w-4 h-4 text-orange-500 animate-bounce"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</h2>

  <div className="flex sm:flex-wrap gap-3 sm:gap-4 mb-6 overflow-x-auto scrollbar-hide px-1 sm:justify-center">
    {productType?.map((item) => (
      <button
        key={item?.title}
        onClick={() => onTabSelect(item?.title)}
        className={`whitespace-nowrap px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold border transition-all duration-300 ease-in-out shadow-sm
          ${
            selectedTab === item?.title
              ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-105'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-400'
          }
        `}
      >
        {item?.title}
      </button>
    ))}
  </div>
  <Link
    href="/shop"
    className="inline-block text-sm sm:text-base font-medium text-orange-500 hover:underline transition duration-200"
  >
    View All Products →
  </Link>
</section>

  )
}

export default HomeCatSelector
