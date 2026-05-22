import CategorySection from "@/components/homes/home-baby/Banner";
import Blogs from "@/components/common/Blogs";
import Hero from "@/components/homes/home-1/Hero";
import Products from "@/components/common/Products3";
import TiktokTestimonials from "@/components/homes/jewelry-01/Tiktok";
import OurServices from "@/components/OurServices";
import CtaBox from "@/components/CtaBox";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import VideoSection from "@/components/VideoSection";


export const metadata = {
  title: "SkyDecor - Premium Laminates Supplier in Middle East",
  description: "SkyDecor provides high-quality decorative laminates, wall panels, and interior surface solutions across the Middle East. Durable, stylish, and perfect for modern interiors.",
};


export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <Products />
      <VideoSection />
      <AboutUs />
      <OurServices />
      <CtaBox />
      <WhyChooseUs />
      <TiktokTestimonials />
      <Blogs />
    </>
  );
}
