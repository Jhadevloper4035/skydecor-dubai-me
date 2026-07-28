"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useContentStore from "@/store/contentStore";

export default function BlogDetail1({ blog: initialBlog }) {
  const blogs = useContentStore((state) => state.blogs);
  const selectedBlog = useContentStore((state) => state.selectedBlog);
  const setSelectedBlog = useContentStore((state) => state.setSelectedBlog);
  const fetchBlogs = useContentStore((state) => state.fetchBlogs);
  const fetchBlogBySlug = useContentStore((state) => state.fetchBlogBySlug);
  const initialBlogHref =
    initialBlog?.href ||
    (initialBlog?.slug ? `/blog-detail/${initialBlog.slug}` : "/blog-default");
  const [shareUrl, setShareUrl] = useState(
    () => `https://skydecor.me${initialBlogHref}`
  );
  const blog =
    selectedBlog?.slug === initialBlog?.slug ? selectedBlog : initialBlog;
  const categories = blog.categories?.length ? blog.categories : ["Skydecor"];
  const tags = blog.tags?.length ? blog.tags : categories;
  const paragraphs = blog.content?.length ? blog.content : [blog.description];
  const currentBlogIndex = blogs.findIndex(
    (item) => item.slug === blog.slug || item.id === blog.id
  );
  const previousBlog = currentBlogIndex > 0 ? blogs[currentBlogIndex - 1] : null;
  const nextBlog =
    currentBlogIndex >= 0 && currentBlogIndex < blogs.length - 1
      ? blogs[currentBlogIndex + 1]
      : null;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title || "");
  const shareLinks = [
    {
      label: "Facebook",
      icon: "fab fa-facebook-f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X",
      icon: "fab fa-x-twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Pinterest",
      icon: "fab fa-pinterest-p",
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },
    {
      label: "Instagram",
      icon: "fab fa-instagram",
      href: "https://www.instagram.com/skydecor.me/",
    },
  ];

  useEffect(() => {
    if (initialBlog) setSelectedBlog(initialBlog);
  }, [initialBlog, setSelectedBlog]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    if (initialBlog?.slug) fetchBlogBySlug(initialBlog.slug);
  }, [fetchBlogBySlug, initialBlog?.slug]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, [blog.slug]);

  return (
    <div className="blog-detail-wrap">
      <div
        className="image"
        style={{ backgroundImage: `url(${blog.coverImage || blog.imgSrc})` }}
      />
      <div className="inner">
        <div className="heading">
          <ul className="list-tags has-bg justify-content-center">
            {categories.slice(0, 3).map((category) => (
              <li key={category}>
                <span>{category}</span>
              </li>
            ))}
          </ul>
          <h3 className="fw-5">{blog.title}</h3>
          <div className="meta justify-content-center">
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-calendar" />
              </div>
              <p className="body-text-1">{blog.date}</p>
            </div>
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-user" />
              </div>
              <p className="body-text-1">
                by <span>{blog.author}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="content">
          {paragraphs.map((paragraph) => (
            <p className="body-text-1 mb_16" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="sd-blog-detail-footer">
          <div className="sd-blog-detail-share-row">
            <ul className="sd-blog-detail-tags">
              <li>Tag:</li>
              {tags.slice(0, 5).map((tag) => (
                <li key={tag}>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
            <div className="sd-blog-detail-share">
              <span>Share this post:</span>
              <div className="sd-blog-detail-share__icons">
                {shareLinks.map((item) => (
                  <a
                    aria-label={`Share on ${item.label}`}
                    href={item.href}
                    key={item.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className={item.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="sd-blog-detail-nav">
            <div className="sd-blog-detail-nav__item">
              {previousBlog && (
                <Link href={previousBlog.href}>
                  <span className="sd-blog-detail-nav__label">Previous</span>
                  <span>{previousBlog.title}</span>
                </Link>
              )}
            </div>
            <span className="sd-blog-detail-nav__divider" />
            <div className="sd-blog-detail-nav__item sd-blog-detail-nav__item--next">
              {nextBlog && (
                <Link href={nextBlog.href}>
                  <span className="sd-blog-detail-nav__label">Next</span>
                  <span>{nextBlog.title}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
