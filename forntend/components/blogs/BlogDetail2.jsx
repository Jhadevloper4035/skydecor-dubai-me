"use client";

import React, { useEffect } from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Sidebar2 from "./Sidebar2";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBlogBySlug,
  selectSelectedBlog,
  setSelectedBlog,
} from "@/store/contentSlice";

export default function BlogDetail2({ blog: initialBlog }) {
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector(selectSelectedBlog);
  const blog =
    selectedBlog?.slug === initialBlog?.slug ? selectedBlog : initialBlog;
  const categories = blog.categories?.length ? blog.categories : ["skydecor"];
  const paragraphs = blog.content?.length ? blog.content : [blog.description];

  useEffect(() => {
    if (initialBlog) dispatch(setSelectedBlog(initialBlog));
  }, [dispatch, initialBlog]);

  useEffect(() => {
    if (initialBlog?.slug) dispatch(fetchBlogBySlug(initialBlog.slug));
  }, [dispatch, initialBlog?.slug]);

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-lg-30">
            <div className="blog-detail-wrap page-single-2">
              <div className="inner">
                <div className="heading">
                  <ul className="list-tags has-bg">
                    {categories.slice(0, 3).map((category) => (
                      <li key={category}>
                        <a href="#" className="link">
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <h3 className="fw-5">{blog.title}</h3>
                  <div className="meta">
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
                        by{" "}
                        <a className="link" href="#">
                          {blog.author}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <Image
                    alt={blog.title}
                    src={blog.coverImage || blog.imgSrc}
                    width={1275}
                    height={717}
                  />
                </div>
                <div className="content">
                  {paragraphs.map((paragraph) => (
                    <p className="body-text-1 mb_16" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Comments />
                <CommentForm />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar2 />
          </div>
        </div>
      </div>
    </section>
  );
}
