"use client";

import Image from "next/image";
import Link from "next/link";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchEventBySlug,
  selectSelectedEvent,
  setSelectedEvent,
} from "@/store/contentSlice";

export default function EventDetail({ event: initialEvent }) {
  const dispatch = useAppDispatch();
  const lightboxRef = useRef(null);
  const selectedEvent = useAppSelector(selectSelectedEvent);
  const event =
    selectedEvent?.slug === initialEvent?.slug ? selectedEvent : initialEvent;

  useEffect(() => {
    if (initialEvent) dispatch(setSelectedEvent(initialEvent));
  }, [dispatch, initialEvent]);

  useEffect(() => {
    if (initialEvent?.slug) dispatch(fetchEventBySlug(initialEvent.slug));
  }, [dispatch, initialEvent?.slug]);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".sd-event-gallery__grid",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [event.gallery]);

  return (
    <section className="flat-spacing sd-event-detail-page">
      <div className="container">
        <div className="sd-event-detail">
          <div className="sd-event-detail__hero">
            <Image
              src={event.coverImage}
              alt={event.title}
              width={1290}
              height={720}
              priority
            />
          </div>

          <div className="sd-event-detail__content">
            <aside className="sd-event-detail__aside">
              <div className="sd-event-detail__panel">
                <div className="sd-event-detail__info">
                  <span>Date</span>
                  <strong>{event.date}</strong>
                </div>
                <div className="sd-event-detail__info">
                  <span>Location</span>
                  <strong>{event.location}</strong>
                </div>
                <Link href="/events" className="btn-line">
                  Back to Events
                </Link>
              </div>
            </aside>

            <article className="sd-event-detail__article">
              <span className="sd-events-kicker">Event Details</span>
              <h2 className="heading">{event.title}</h2>
              {event.description.map((paragraph) => (
                <p className="body-text-1" key={paragraph}>
                  {paragraph}
                </p>
              ))}

              {event.highlights.length ? (
                <div className="sd-event-highlights">
                  <h4>Event Highlights</h4>
                  <ul>
                    {event.highlights.map((highlight) => (
                      <li key={highlight}>
                        <i className="fas fa-check" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </div>

          <div className="sd-event-gallery">
            <div className="sd-event-gallery__heading">
              <span className="sd-events-kicker">Gallery</span>
              <h3 className="heading">Event Gallery</h3>
              <p>Photos and moments from the event.</p>
            </div>
            <div className="sd-event-gallery__grid">
              {event.gallery.map((image, index) => (
                <a
                  className="sd-event-gallery__item"
                  href={image}
                  key={image}
                  data-pswp-width="1290"
                  data-pswp-height="860"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${event.title} gallery image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${event.title} gallery image ${index + 1}`}
                    width={640}
                    height={480}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
