"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import useContentStore from "@/store/contentStore";

export default function BlogDefault() {
  const blogs = useContentStore((state) => state.blogs);
  const fetchBlogs = useContentStore((state) => state.fetchBlogs);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="main-content-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-lg-30">
            {blogs.slice(0, 3).map((post, i) => (
              <React.Fragment key={i}>
                {i != 0 ? <div className="line-bt mb_40" /> : ""}
                <div className="wg-blog hover-image mb_40">
                  <div className="image">
                    <Image
                      className="lazyload"
                      alt=""
                      src={post.imgSrc}
                      width={1275}
                      height={717}
                    />
                  </div>
                  <div className="content">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-10">
                      <div className="meta">
                      <div className="meta-item gap-8">
                          <div className="icon">
                            <i className="icon-calendar" />
                          </div>
                          <p>{post.date}</p>
                        </div>
                        <div className="meta-item gap-8">
                          <div className="icon">
                            <i className="icon-user" />
                          </div>
                          <p>
                            by <span>{post.author}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <h4 className="title fw-5">
                      <Link className="link" href={post.href}>
                        {post.title}
                      </Link>
                    </h4>
                    <div className="body-text-1">{post.description}</div>
                  </div>
                </div>{" "}
              </React.Fragment>
            ))}
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
