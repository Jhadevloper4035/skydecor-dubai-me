"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBlogBySlug,
  selectSelectedBlog,
  setSelectedBlog,
} from "@/store/contentSlice";

export default function BlogDetail1({ blog: initialBlog }) {
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector(selectSelectedBlog);
  const blog =
    selectedBlog?.slug === initialBlog?.slug ? selectedBlog : initialBlog;
  const categories = blog.categories?.length ? blog.categories : ["SkyDecor"];
  const tags = blog.tags?.length ? blog.tags : categories;
  const paragraphs = blog.content?.length ? blog.content : [blog.description];

  useEffect(() => {
    if (initialBlog) dispatch(setSelectedBlog(initialBlog));
  }, [dispatch, initialBlog]);

  useEffect(() => {
    if (initialBlog?.slug) dispatch(fetchBlogBySlug(initialBlog.slug));
  }, [dispatch, initialBlog?.slug]);

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

        <div className="bot d-flex justify-content-between gap-10 flex-wrap">
          <ul className="list-tags has-bg">
            <li>Tag:</li>
            {tags.slice(0, 5).map((tag) => (
              <li key={tag}>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
