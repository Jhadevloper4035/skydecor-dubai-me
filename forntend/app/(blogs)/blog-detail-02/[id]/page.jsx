import BlogDetail2 from "@/components/blogs/BlogDetail2";

import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import { findFallbackBlog, getBlogFromApi } from "@/lib/contentApi";
import React from "react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = (await getBlogFromApi(id)) || findFallbackBlog(id);

  if (!blog) {
    return {
      title: "Blog Not Found | SkyDecor Dubai",
    };
  }

  return {
    title: `${blog.title} | SkyDecor Dubai Blog`,
    description: blog.excerpt || blog.description,
  };
}

export default async function BlogDetailsPage2({ params }) {
  const { id } = await params;
  const blog = (await getBlogFromApi(id)) || findFallbackBlog(id);

  if (!blog) notFound();

  return (
    <>
      <BlogDetail2 blog={blog} />
      <RelatedBlogs />
    </>
  );
}
