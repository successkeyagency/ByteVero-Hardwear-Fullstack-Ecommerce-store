'use client';

import React, { useEffect, useRef } from 'react';
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react';

const extraData = [
  {
    title: 'Fast & Free Delivery',
    description: 'Get free shipping on orders over $100',
    icon: <Truck size={30} />,
  },
  {
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
    icon: <GitCompareArrows size={30} />,
  },
  {
    title: '24/7 Support',
    description: 'Talk to real humans anytime',
    icon: <Headset size={30} />,
  },
  {
    title: 'Money-back Guarantee',
    description: 'Quality-checked and satisfaction backed',
    icon: <ShieldCheck size={30} />,
  },
];

const Guarantee = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 220,
          behavior: 'smooth',
        });

        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-20">
      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-hide bg-white rounded-xl p-4 sm:p-6 shadow-md"
      >
        {extraData.map((item, index) => (
          <div
            key={index}
            className="min-w-[220px] sm:min-w-0 flex-shrink-0 flex flex-col items-center text-center gap-3 p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="text-green-600 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">{item.title}</p>
              <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Guarantee;
