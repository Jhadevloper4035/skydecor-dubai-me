"use client";

import React, { useEffect } from "react";
import Pagination from "../common/Pagination";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogs, selectBlogs } from "@/store/contentSlice";
export default function BlogGrid() {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="main-content-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tf-grid-layout md-col-3">
              {blogs.map((blog, index) => (
                <div className="wg-blog style-1 hover-image" key={index}>
                  <div className="image">
                    <Image
                      className="lazyload"
                      data-src={blog.imgSrc}
                      alt={blog.alt}
                      src={blog.imgSrc}
                      width={615}
                      height={461}
                    />
                  </div>
                  <div className="content">
                    <div className="meta">
                      <div className="meta-item gap-8">
                        <div className="icon">
                          <i className="icon-calendar" />
                        </div>
                        <p className="text-caption-1">{blog.date}</p>
                      </div>
                      <div className="meta-item gap-8">
                        <div className="icon">
                          <i className="icon-user" />
                        </div>
                        <p className="text-caption-1">
                          by{" "}
                          <a className="link" href="#">
                            {blog.author}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h6 className="title fw-5">
                      <Link className="link" href={blog.href}>
                          {blog.title}
                        </Link>
                      </h6>
                      <div className="body-text">{blog.description}</div>
                    </div>
                  </div>
                </div>
              ))}
              <ul className="wg-pagination justify-content-center">
                <Pagination />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
