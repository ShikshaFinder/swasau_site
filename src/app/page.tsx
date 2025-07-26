import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
// import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="w-full flex justify-end gap-4 p-4">
        <Link href="/services" className="text-primary hover:underline">
          Services
        </Link>
        <Link href="/projects" className="text-primary hover:underline">
          Projects
        </Link>
        <Link href="/about" className="text-primary hover:underline">
          About
        </Link>
        <Link href="/blog" className="text-primary hover:underline">
          Blog
        </Link>
        <Link href="/contact" className="text-primary hover:underline">
          Contact
        </Link>
      </nav>
      {/* Navigation links for IT firm pages */}
      <Hero />
      <Features />
      <Testimonials />
      {/* <Pricing /> section removed as requested */}
      <CTA />
      <Footer />
    </main>
  );
}
