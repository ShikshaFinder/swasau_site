import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { SelectedInterns } from "@/components/sections/SelectedInterns";
import Link from "next/link";
// import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <SelectedInterns />
      <Testimonials />
      {/* <Pricing /> section removed as requested */}
      <CTA />
      <Footer />
    </main>
  );
}
