import BlogGrid from "@/components/blogs/BlogGrid";
import Link from "next/link";
import React from "react";
import { pageSeoMetadata } from "@/lib/seoMetadata";

export const metadata = pageSeoMetadata("blogDefault");

export default function BlogDefaultPage() {
  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Design Journal</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>
                  Design Journal
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BlogGrid />
    </>
  );
}
