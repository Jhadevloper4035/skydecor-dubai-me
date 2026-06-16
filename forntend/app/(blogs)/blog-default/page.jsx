import BlogDefault from "@/components/blogs/BlogDefault";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Design Journal | SkyDecor Dubai",
  description:
    "SkyDecor articles about decorative surfaces, material selection, care, and interior project planning.",
};

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
      <BlogDefault />
    </>
  );
}
