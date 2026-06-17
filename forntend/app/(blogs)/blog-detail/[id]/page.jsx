import BlogDetail1 from "@/components/blogs/BlogDetail1";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import { findFallbackBlog, getBlogFromApi } from "@/lib/contentApi";
import React from "react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = (await getBlogFromApi(id)) || findFallbackBlog(id);

  if (!blog) {
    return {
      title: "Blog Not Found | skydecor Dubai",
    };
  }

  return {
    title: `${blog.title} | skydecor Dubai Blog`,
    description: blog.excerpt || blog.description,
  };
}

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;
  const blog = (await getBlogFromApi(id)) || findFallbackBlog(id);

  if (!blog) notFound();

  return (
    <>
      <BlogDetail1 blog={blog} />
      <RelatedBlogs />
    </>
  );
}
