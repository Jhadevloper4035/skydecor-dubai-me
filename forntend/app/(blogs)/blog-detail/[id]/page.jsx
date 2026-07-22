import BlogDetail1 from "@/components/blogs/BlogDetail1";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import SeoJsonLd from "@/components/common/SeoJsonLd";

import { findFallbackBlog, getBlogFromApi } from "@/lib/contentApi";
import { articleSchema, pageMetadata, pageSeoMetadata } from "@/lib/seoMetadata";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = (await getBlogFromApi(id)) || findFallbackBlog(id);

  if (!blog) {
    return pageSeoMetadata("blogNotFound", {
      path: `/blog-detail/${id}`,
    });
  }

  return pageMetadata({
    title: `${blog.title} | Skydecor Dubai Blog`,
    path: `/blog-detail/${blog.slug || id}`,
    image: blog.coverImage || blog.imgSrc,
    description: blog.excerpt || blog.description,
    type: "article",
  });
}

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;
  const blog = (await getBlogFromApi(id)) || findFallbackBlog(id);

  if (!blog) notFound();

  return (
    <>
      <SeoJsonLd data={articleSchema(blog, `/blog-detail/${blog.slug || id}`)} />
      <BlogDetail1 blog={blog} />
      <RelatedBlogs />
    </>
  );
}
