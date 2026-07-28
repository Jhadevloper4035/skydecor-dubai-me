import React from "react";
import { contactDetails } from "@/data/contactDetails";

export default function StoreLocations3() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-us-map">
              <div className="wrap-map">
                <div
                  id="map-contact"
                  className="map-contact"
                  data-map-zoom={16}
                  data-map-scroll="true"
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(contactDetails.address)}&output=embed`}
                    width={600}
                    height={450}
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="right">
                <h4>Information</h4>
                <div className="mb_20">
                  <div className="text-title mb_8">Phone:</div>
                  <p className="text-secondary">04-5751322, 058-8939560</p>
                </div>
                <div className="mb_20">
                  <div className="text-title mb_8">Email:</div>
                  <p className="text-secondary">sales.mgr@skydecor.me</p>
                </div>
                <div className="mb_20">
                  <div className="text-title mb_8">Address:</div>
                  <p className="text-secondary">
                    {contactDetails.address}
                  </p>
                </div>
                <div>
                  <div className="text-title mb_8">Open Time:</div>
                  <p className="mb_4 open-time">
                    <span className="text-secondary">Mon - Sat:</span> 7:30am -
                    8:00pm GST
                  </p>
                  <p className="open-time">
                    <span className="text-secondary">Sunday:</span> 9:00am -
                    5:00pm GST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
