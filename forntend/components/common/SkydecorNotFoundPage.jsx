"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SkydecorNotFoundPage() {
  const requestedPath = usePathname() || "/";

  return (
    <main className="sd-not-found">
      <div className="container">
        <div className="sd-not-found__layout">
          <p className="sd-not-found__code" aria-hidden="true">
            404
          </p>
          <div className="sd-not-found__content">
            <p className="sd-not-found__eyebrow">Need a better route?</p>
            <h1>Page not found</h1>
            <p className="sd-not-found__description">
              The page you are looking for may have moved, been renamed, or is
              no longer available.
            </p>
            <p className="sd-not-found__path">
              Requested path: <span>{requestedPath}</span>
            </p>
            <div className="sd-not-found__actions">
              <Link href="/" className="sd-not-found__primary-action">
                Go to Home
              </Link>
              <Link href="/products" className="sd-not-found__secondary-action">
                Browse Products
              </Link>
            </div>
            <nav className="sd-not-found__quick-links" aria-label="Helpful pages">
              <Link href="/catalog">E-Catalogue</Link>
              <Link href="/certificates">Certificates</Link>
              <Link href="/contact">Contact Support</Link>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
