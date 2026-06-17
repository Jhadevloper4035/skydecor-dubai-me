import CategorySection from "@/components/homes/Banner";
import Blogs from "@/components/common/Blogs";
import Hero from "@/components/homes/Hero";
import Products from "@/components/common/Products3";
import OurServices from "@/components/OurServices";
import CtaBox from "@/components/CtaBox";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import VideoSection from "@/components/VideoSection";


export const metadata = {
  title: "Premium Decorative Surfaces | skydecor Dubai",
  description:
    "Explore skydecor decorative HPL, panels, boards, and interior surface solutions for residential and commercial projects across the UAE.",
};


export default function Home() {
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
      <Blogs />
    </>
  );
}
