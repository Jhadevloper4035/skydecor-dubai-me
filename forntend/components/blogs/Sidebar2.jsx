"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogs, selectBlogs } from "@/store/contentSlice";
export default function Sidebar2() {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="sidebar maxw-360">
      <div className="sidebar-item sidebar-writer">
        <div className="writer-avatar">
          <div className="image">
            <Image
              alt=""
              src="/images/avatar/user-3.jpg"
              width={91}
              height={113}
            />
          </div>
          <div>
            <div className="name">
              <h6>
                <a className="link" href="#">
                  Skydecor Dubai
                </a>
              </h6>
              <p className="text-caption-1">Surface Design Team</p>
            </div>
            <a href="#" className="button-follow text-btn-uppercase link">
              Follow
            </a>
          </div>
        </div>
        <div className="writer-content">
          <p>
            Insights from the Skydecor Dubai team on HPL, surfaces,
            interiors, product launches, and design events.
          </p>
          <ul className="tf-social-icon">
            <li>
              <a
                href="https://www.facebook.com/Skydecormiddleeast"
                className="social-facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon icon-fb" />
              </a>
            </li>
            <li>
              <a href="#" className="social-twiter">
                <i className="icon icon-x" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/skydecor.me/?hl=en"
                className="social-instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon icon-instagram" />
              </a>
            </li>
            <li>
              <a href="#" className="social-tiktok">
                <i className="icon icon-tiktok" />
              </a>
            </li>
            <li>
              <a href="#" className="social-amazon">
                <i className="icon icon-amazon" />
              </a>
            </li>
            <li>
              <a href="#" className="social-pinterest">
                <i className="icon icon-pinterest" />
              </a>
            </li>
          </ul>
        </div>
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
    </div>
  );
}
