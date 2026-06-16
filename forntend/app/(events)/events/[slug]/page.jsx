import EventDetail from "@/components/events/EventDetail";
import {
  findFallbackEvent,
  getEventFromApi,
  localEvents,
} from "@/lib/contentApi";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const event =
    (await getEventFromApi(resolvedParams?.slug)) ||
    findFallbackEvent(resolvedParams?.slug);

  if (!event) {
    return {
      title: "Event Not Found | SkyDecor Dubai",
    };
  }

  return {
    title: `${event.title} | SkyDecor Dubai Events`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }) {
  const resolvedParams = await params;
  const event =
    (await getEventFromApi(resolvedParams?.slug)) ||
    findFallbackEvent(resolvedParams?.slug);

  if (!event) notFound();

  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">{event.title}</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>
                  <Link className="link" href="/events">
                    Events
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>{event.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <EventDetail event={event} />
    </>
  );
}
