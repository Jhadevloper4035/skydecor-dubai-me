import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/animate.css";
import "./styles/bootstrap.min.css";
import "./styles/custom.css";
import "./styles/magnific-popup.css";
import "./styles/mousecursor.css";
import "./styles/slicknav.min.css";
import "./styles/swiper-bundle.min.css";
import "../public/scss/main.scss";
import "photoswipe/style.css";
import "react-range-slider-input/dist/style.css";
import "../public/css/image-compare-viewer.min.css";

import AppShell from "./AppShell";
import { pageSeoMetadata } from "@/lib/seoMetadata";

export const metadata = {
  ...pageSeoMetadata("home"),
  icons: {
    icon: [
      {
        url: "https://rantechnology.in/skydecor/favicon/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "https://rantechnology.in/skydecor/favicon/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "https://rantechnology.in/skydecor/favicon/favicon.ico",
    apple: [
      {
        url: "https://rantechnology.in/skydecor/favicon/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "https://rantechnology.in/skydecor/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="popup-loader" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
