// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Systech IT Services | Home",
  description:
    "Reliable IT support services including OS installation, upgrades, maintenance, and CCTV setup.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
