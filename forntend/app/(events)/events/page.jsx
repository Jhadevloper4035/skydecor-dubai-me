import EventsList from "@/components/events/EventsList";
import Link from "next/link";
import { pageSeoMetadata } from "@/lib/seoMetadata";

export const metadata = pageSeoMetadata("events");

export default function EventsPage() {
  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Events</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <EventsList />
    </>
  );
}
