import React from 'react'
import Title from './Title'
import { getLatestBlogs } from '@/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import dayjs from 'dayjs'

const LatestOnConstruction = async () => {
  const blogs = await getLatestBlogs()

  return (
    <section className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
          🏗️ Latest On Construction
        </Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <div
              key={blog?._id}
              className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 border border-gray-100"
            >
              {blog?.mainImage && (
                <Link href={`/blog/${blog?.slug?.current}`}>
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt={blog?.title || 'Blog Image'}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover hover:scale-[1.02] transition duration-300"
                  />
                </Link>
              )}

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {blog?.blogcategories?.map((item, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full"
                    >
                      {item?.title}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                  <Calendar size={14} className="text-gray-400" />
                  {dayjs(blog.publishedAt).format('MMMM D, YYYY')}
                </p>

                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition line-clamp-2"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {blogs?.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-12">
            No blogs available at the moment. Check back soon!
          </p>
        )}
      </div>
    </section>
  )
}

export default LatestOnConstruction
