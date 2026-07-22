import CategorySection from "@/components/homes/Banner";
import Blogs from "@/components/common/Blogs";
import Hero from "@/components/homes/Hero";
import Products from "@/components/common/Products3";
import OurServices from "@/components/OurServices";
import CtaBox from "@/components/CtaBox";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import VideoSection from "@/components/VideoSection";
import SeoJsonLd from "@/components/common/SeoJsonLd";
import { organizationSchema, pageSeoMetadata, websiteSchema } from "@/lib/seoMetadata";


export const metadata = pageSeoMetadata("home");


export default function Home() {
  return (
    <>
      <SeoJsonLd data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <CategorySection />
      <Products />
      <VideoSection />
      <AboutUs />
      <OurServices />
      <CtaBox />
      <WhyChooseUs />
      <Blogs />
    </>
  );
}
