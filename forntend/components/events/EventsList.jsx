"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useContentStore from "@/store/contentStore";

export default function EventsList() {
  const events = useContentStore((state) => state.events);
  const fetchEvents = useContentStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <section className="flat-spacing sd-events-page">
      <div className="container">
        <div className="sd-events-heading">
          <span className="sd-events-kicker">Skydecor Events</span>
          <h3 className="heading">Event Updates & News</h3>
          <p>
            Follow Skydecor Dubai events, product showcases, exhibitions, and
            design community sessions.
          </p>
        </div>

        <div className="sd-events-grid">
          {events.map((event) => (
            <article className="sd-event-card" key={event.slug}>
              <Link
                href={`/events/${event.slug}`}
                className="sd-event-card__image"
              >
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  width={720}
                  height={480}
                />
              </Link>
              <div className="sd-event-card__body">
                <div className="sd-event-card__meta">
                  <span>
                    <i className="far fa-calendar" />
                    {event.date}
                  </span>
                  <span>
                    <i className="fas fa-location-dot" />
                    {event.location}
                  </span>
                </div>
                <h4>
                  <Link href={`/events/${event.slug}`} className="link">
                    {event.title}
                  </Link>
                </h4>
                <p>{event.excerpt}</p>
                <Link href={`/events/${event.slug}`} className="btn-line">
                  Know More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
