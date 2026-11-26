import CategorySection from "@/components/homes/Banner";
import Blogs from "@/components/common/Blogs";
import Hero from "@/components/homes/Hero";
import Products from "@/components/common/Products3";
import OurServices from "@/components/OurServices";
import CtaBox from "@/components/CtaBox";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import VideoSection from "@/components/VideoSection";
import { contactDetails } from "@/data/contactDetails";


export const metadata = {
  metadataBase: new URL("https://skydecor.me"),
  alternates: { canonical: "/" },
  title: "Premium Decorative Surfaces | skydecor Dubai",
  description:
    "Explore skydecor decorative HPL, panels, boards, and interior surface solutions for residential and commercial projects across the UAE.",
  openGraph: {
    title: "Premium Decorative Surfaces | skydecor Dubai",
    description:
      "Explore skydecor decorative HPL, panels, boards, and interior surface solutions for residential and commercial projects across the UAE.",
    type: "website",
    siteName: "skydecor Dubai",
    url: "/",
    images: [{ url: "/images/banners/hero-banner.jpeg", alt: "Skydecor decorative interior surfaces" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/banners/hero-banner.jpeg"],
    title: "Premium Decorative Surfaces | skydecor Dubai",
    description:
      "Explore skydecor decorative HPL, panels, boards, and interior surface solutions for residential and commercial projects across the UAE.",
  },
};


export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Skydecor International General Trading LLC",
    url: "https://skydecor.me",
    telephone: contactDetails.phones[0].label,
    email: contactDetails.emails[0].label,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.addresses[0].value,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: contactDetails.socialLinks.filter((link) => link.className !== "social-whatsapp").map((link) => link.href),
  };
  return (
    <main>
      <link rel="preload" as="image" href="/images/banners/hero-banner-mobile-optimized.webp" media="(max-width: 767px)" />
      <link rel="preload" as="image" href="/images/banners/hero-banner-tablet-optimized.webp" media="(min-width: 768px) and (max-width: 1024px)" />
      <link rel="preload" as="image" href="/images/banners/hero-banner-optimized.webp" media="(min-width: 1025px)" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
      <h1 className="visually-hidden">Decorative HPL and Interior Surfaces in Dubai</h1>
      <Hero />
      <CategorySection />
      <Products parentClass="flat-spacing sd-home-products" />
      <VideoSection />
      <AboutUs />
      <OurServices />
      <CtaBox />
      <WhyChooseUs />
      <Blogs parentClass="flat-spacing sd-home-journal" />
    </main>
  );
}
