import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getOthersBlog,
  getSingleBlog,
} from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SBP = async ({ params }: any) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);
  if (!blog) return notFound();

  return (
    <div className="bg-[#f5f5f5] py-10">
      <Container className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog.mainImage).url()}
              alt={blog.title || "Blog Image"}
              width={800}
              height={800}
              className="rounded-2xl shadow-lg mb-6"
            />
          )}

          <div className="mb-4">
            <div className="flex gap-4 items-center text-sm text-gray-600">
              {blog.blogcategories?.map((item: any, index: number) => (
                <span
                  key={index}
                  className="bg-[#1e293b] text-white px-3 py-1 rounded-full"
                >
                  {item?.title}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-2 flex items-center gap-2 text-sm">
              <Pencil size={15} /> {blog.author?.name}
            </p>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <Calendar size={15} /> {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
            </p>
          </div>

          <h2 className="text-3xl font-bold text-[#1e293b] mb-4">{blog.title}</h2>

          <div className="prose max-w-none prose-img:rounded-xl prose-headings:text-[#1e293b] prose-p:text-gray-700">
            {blog.body && (
              <PortableText
                value={blog.body}
                components={{
                  block: {
                    normal: ({ children }) => <p>{children}</p>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                  },
                  types: {
                    image: ({ value }: any) => (
                      <Image
                        alt={value.alt || ""}
                        src={urlFor(value).width(2000).url()}
                        width={1400}
                        height={1000}
                        className="rounded-xl"
                      />
                    ),
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                    number: ({ children }) => <li>{children}</li>,
                  },
                  marks: {
                    strong: ({ children }) => <strong>{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">{children}</code>
                    ),
                    link: ({ value, children }) => <Link href={value.href}>{children}</Link>,
                  },
                }}
              />
            )}
            <div className="mt-10">
              <Link href="/blog" className="flex items-center gap-1 text-blue-600 hover:underline">
                <ChevronLeftIcon size={20} /> Back to blog
              </Link>
            </div>
          </div>
        </div>
        <BlogLeft slug={slug} />
      </Container>
    </div>
  );
};

const BlogLeft = async ({ slug }: any) => {
  const categories = await getBlogCategories();
  const blogs = await getOthersBlog(slug, 5);

  return (
    <aside className="w-full lg:w-1/3">
      <div className="mb-10">
        <Title className="text-xl font-bold mb-4 text-[#1e293b]">Blog Categories</Title>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category: any, index: number) => (
            <div
              key={index}
              className="bg-[#cbd5e1] text-[#1e293b] px-3 py-1 rounded-full text-sm"
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>

      <div>
        <Title className="text-xl font-bold mb-4 text-[#1e293b]">Latest Blogs</Title>
        <div className="space-y-4">
          {blogs?.map((blog: any, index: number) => (
            <Link
              href={`/blog/${blog.slug?.current}`}
              key={index}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              {blog.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt="blogImage"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              )}
              <p className="text-sm text-[#1e293b] font-medium">{blog.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SBP;
