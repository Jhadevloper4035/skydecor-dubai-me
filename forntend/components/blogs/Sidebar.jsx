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
      <div className="sidebar-item sidebar-search">
        <form className="form-search" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="text">
            <input
              type="email"
              placeholder="Your email address"
              className=""
              name="email"
              tabIndex={0}
              defaultValue=""
              aria-required="true"
              required
            />
          </fieldset>
          <button className="" type="submit">
            <svg
              className="icon"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#181818"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.35 21.0004L17 16.6504"
                stroke="#181818"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="sidebar-item sidebar-relatest-post">
        <h5 className="sidebar-heading">Relatest Post</h5>
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
                      by{" "}
                      <a className="link" href="#">
                        {post.author}
                      </a>
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
          {(categories.length ? categories : ["Laminates", "Interiors", "Design"]).map((category) => (
            <li key={category}>
              <a className="text-button link" href="#">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-item sidebar-tag">
        <h5 className="sidebar-heading">Popular Tag</h5>
        <ul className="list-tags">
          {(tags.length ? tags : ["surfaces", "decor", "design", "dubai"]).map((tag) => (
            <li key={tag}>
              <a href="#" className="text-caption-1 link">
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
