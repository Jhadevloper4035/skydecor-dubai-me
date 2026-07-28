import React from "react";
import { contactDetails } from "@/data/contactDetails";

export default function StoreLocations1() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-12">
            <div className="tf-store-list">
              <div className="tf-store-item">
                <h6 className="tf-store-title">Skydecor International General Trading</h6>
                <div className="tf-store-contact">
                  <div className="tf-store-info">
                    <p className="text-button">Phone:</p>
                    <p className="text-secondary">04-5751322, 058-8939560</p>
                  </div>
                  <div className="tf-store-info">
                    <p className="text-button">Email:</p>
                    <p className="text-secondary">sales.mgr@skydecor.me</p>
                  </div>
                </div>
                <div className="tf-store-address tf-store-info">
                  <p className="text-button">Address:</p>
                  <p className="text-secondary">
                    B23, Phase-1, Dubai Industrial City, Dubai, UAE
                  </p>
                </div>
              </div>
              <div className="tf-store-item">
                <h6 className="tf-store-title">Skydecor International General Trading</h6>
                <div className="tf-store-contact">
                  <div className="tf-store-info">
                    <p className="text-button">Phone:</p>
                    <p className="text-secondary">04-5751322, 058-8939560</p>
                  </div>
                  <div className="tf-store-info">
                    <p className="text-button">Email:</p>
                    <p className="text-secondary">sales.mgr@skydecor.me</p>
                  </div>
                </div>
                <div className="tf-store-address tf-store-info">
                  <p className="text-button">Address:</p>
                  <p className="text-secondary">
                    B23, Phase-1, Dubai Industrial City, Dubai, UAE
                  </p>
                </div>
              </div>
              <div className="tf-store-item">
                <h6 className="tf-store-title">Skydecor International General Trading</h6>
                <div className="tf-store-contact">
                  <div className="tf-store-info">
                    <p className="text-button">Phone:</p>
                    <p className="text-secondary">04-5751322, 058-8939560</p>
                  </div>
                  <div className="tf-store-info">
                    <p className="text-button">Email:</p>
                    <p className="text-secondary">sales.mgr@skydecor.me</p>
                  </div>
                </div>
                <div className="tf-store-address tf-store-info">
                  <p className="text-button">Address:</p>
                  <p className="text-secondary">
                    B23, Phase-1, Dubai Industrial City, Dubai, UAE
                  </p>
                </div>
              </div>
              <div className="tf-store-item">
                <h6 className="tf-store-title">Skydecor International General Trading</h6>
                <div className="tf-store-contact">
                  <div className="tf-store-info">
                    <p className="text-button">Phone:</p>
                    <p className="text-secondary">04-5751322, 058-8939560</p>
                  </div>
                  <div className="tf-store-info">
                    <p className="text-button">Email:</p>
                    <p className="text-secondary">sales.mgr@skydecor.me</p>
                  </div>
                </div>
                <div className="tf-store-address tf-store-info">
                  <p className="text-button">Address:</p>
                  <p className="text-secondary">
                    B23, Phase-1, Dubai Industrial City, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-12">
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
          </div>
        </div>
      </div>
    </section>
  );
}
