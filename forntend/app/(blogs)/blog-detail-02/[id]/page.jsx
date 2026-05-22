import BlogDetail2 from "@/components/blogs/BlogDetail2";

import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import { allBlogs } from "@/data/blogs";
import React from "react";

export default async function BlogDetailsPage2({ params }) {
  const { id } = await params;

  const blog = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];
  return (
    <>
      <BlogDetail2 blog={blog} />
      <RelatedBlogs />
    </>
  );
}
