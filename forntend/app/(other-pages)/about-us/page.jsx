import Link from "next/link";
import About from "@/components/otherPages/About";
import React from "react";

export const metadata = {
  title: "About SkyDecor | Decorative Surface Solutions",
  description:
    "Learn about SkyDecor and our decorative laminates, panels, and interior surface solutions for residential and commercial projects.",
};

export default function AboutUsPage() {
  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">About SkyDecor</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>About SkyDecor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}
