import BlogDetail1 from "@/components/blogs/BlogDetail1";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import { allBlogs } from "@/data/blogs";
import React from "react";

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;

  const blog = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];
  return (
    <>
      <BlogDetail1 blog={blog} />
      <RelatedBlogs />
    </>
  );
}
