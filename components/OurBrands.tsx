
import React from 'react'
import Title from './Title'
import Link from 'next/link'
import { getAllBrands } from '@/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const TrustedBrands = async () => {
  const brands = await getAllBrands()

  return (
    <section className="w-full py-16  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-3 sm:gap-0">
          <Title className="text-2xl sm:text-4xl font-bold text-black">
            🤝 Trusted by Top <span className='text-emerald-500'>Brands</span> 
          </Title>
          <Link
            href="/shop"
            className="text-orange-500 text-sm font-medium hover:underline transition"
          >
            View All
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 sm:gap-10 animate-scroll whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <Link
                key={`${brand._id}-${index}`}
                href={{ pathname: '/shop', query: { brand: brand?.slug?.current } }}
                className="flex-shrink-0"
              >
                {brand?.image && (
                  <Image
                    src={urlFor(brand.image).url()}
                    alt={brand?.slug?.current || 'Brand'}
                    width={120}
                    height={60}
                    className="object-contain w-28 h-16 sm:w-36 sm:h-20  hover:grayscale-0 transition duration-300 ease-in-out"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands
