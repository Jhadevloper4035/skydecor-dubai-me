"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogs, selectBlogs } from "@/store/contentSlice";

export default function Blogs({
  parentClass = "flat-spacing ",
}) {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center">
          <h3 className=" wow fadeInUp">Design Journal</h3>
          <p className="subheading text-secondary wow fadeInUp">
            Practical guidance for surfaces, specifications, and interior projects.
          </p>
        </div>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
              pagination: { clickable: true },
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
              pagination: { clickable: true },
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              pagination: { clickable: true },
            },
          }}
          dir="ltr"
          className="swiper tf-sw-recent"
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {blogs.slice(0, 6).map((post, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div
                className="wg-blog style-1 hover-image wow fadeInUp"
                data-wow-delay={post.delay || "0s"}
              >
                <div className="image">
                  <Image
                    className="aspect-ratio-1 ls-is-cached lazyload"
                    data-src={post.imgSrc}
                    alt={post.alt || post.title || "SkyDecor article"}
                    src={post.imgSrc}
                    width={615}
                    height={461}
                  />
                </div>
                <div className="content">
                  <p className="text-btn-uppercase text-secondary-2">
                    {post.date}
                  </p>
                  <div>
                    <h6 className=" title fw-5">
                      <Link className="link" href={post.href}>
                        {post.title}
                      </Link>
                    </h6>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </section>
  );
}
