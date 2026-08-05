import Image from "next/image";
import React from "react";
import Link from "next/link";
import { pageSeoMetadata } from "@/lib/seoMetadata";

export const metadata = pageSeoMetadata("notFound");

export default function PageNotFoundPage() {
  return (
    <section className="flat-spacing page-404">
      <div className="container">
        <div className="page-404-inner">
          <div className="image">
            <Image
              className="lazyload"
              data-src="/images/section/404.png"
              alt="Page not found"
              src="/images/section/404.png"
              width={679}
              height={701}
            />
          </div>
          <div className="content">
            <div className="heading">Oops!</div>
            <div>
              <h2 className="title mb_4">Page not found</h2>
              <div className="text body-text-1 text-secondary">
                The page may have moved or no longer exists. Return home or use
                the main navigation to continue.
              </div>
            </div>
            <Link href={`/`} className="tf-btn btn-fill">
              <span className="text text-button">Back to home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
