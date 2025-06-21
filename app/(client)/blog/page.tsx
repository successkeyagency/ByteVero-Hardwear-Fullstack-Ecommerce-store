import Container from '@/components/Container';
import Title from '@/components/Title';
import { urlFor } from '@/sanity/lib/image';
import { getAllBlogs } from '@/sanity/queries';

import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogP = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <section className="py-10 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <Title className="text-3xl sm:text-4xl font-bold text-gray-800">
            📝 Explore Our Latest News
          </Title>
          <p className="mt-2 text-sm text-gray-500">
            Stay up to date with the latest insights, trends, and tips in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <div
              key={blog?._id}
              className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt={blog?.title}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              )}

              <div className="p-5 space-y-4">
                <div className="text-xs flex items-center justify-between text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {blog?.blogcategories?.map((item, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold"
                      >
                        {item?.title}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar size={14} />
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </div>
                </div>

                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="block text-lg font-bold text-gray-900 hover:text-shop_dark_green line-clamp-2 transition-colors"
                >
                  {blog?.title}
                </Link>

                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="inline-block text-sm font-medium text-shop_dark_green hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogP;
