"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogs, selectBlogs } from "@/store/contentSlice";
export default function Sidebar() {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);
  const categories = [...new Set(blogs.flatMap((post) => post.categories || []))].slice(0, 5);
  const tags = [...new Set(blogs.flatMap((post) => post.tags || []))].slice(0, 8);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="sidebar maxw-360">
      <div className="sidebar-item sidebar-relatest-post">
        <h5 className="sidebar-heading">Latest Posts</h5>
        <div>
          {blogs.slice(0, 5).map((post, i) => (
            <div
              key={i}
              className={`relatest-post-item ${
                i != 0 ? "style-row" : ""
              } hover-image `}
            >
              <div className="image">
                <Image
                  className="lazyload"
                  alt=""
                  src={post.imgSrc}
                  width={540}
                  height={360}
                />
              </div>
              <div className="content">
                <div className="meta">
                  <div className="meta-item gap-8">
                    <div className="icon">
                      <i className="icon-calendar" />
                    </div>
                    <p className="text-caption-1">{post.date}</p>
                  </div>
                  <div className="meta-item gap-8">
                    <div className="icon">
                      <i className="icon-user" />
                    </div>
                    <p className="text-caption-1">
                      by <span>{post.author}</span>
                    </p>
                  </div>
                </div>
                <h6 className="title fw-5">
                  <Link className="link" href={post.href}>
                    {post.title}
                  </Link>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-item sidebar-categories">
        <h5 className="sidebar-heading">Categories</h5>
        <ul>
          {(categories.length ? categories : ["HPL", "Interiors", "Design"]).map((category) => (
            <li key={category}>
              <span className="text-button">{category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-item sidebar-tag">
        <h5 className="sidebar-heading">Popular Tag</h5>
        <ul className="list-tags">
          {(tags.length ? tags : ["surfaces", "decor", "design", "dubai"]).map((tag) => (
            <li key={tag}>
              <span className="text-caption-1">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
