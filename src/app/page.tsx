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
      {/* Navigation links for auth pages */}
      <nav className="w-full flex justify-end gap-4 p-4">
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
        <Link href="/auth/login" className="text-primary hover:underline">
          Login
        </Link>
        <Link
          href="/verify-email?token=demo"
          className="text-primary hover:underline"
        >
          Verify Email (Demo)
        </Link>
        <Link href="/waitlist" className="text-primary hover:underline">
          Join Waitlist
        </Link>
      </nav>
      <Hero />
      {/* CSAI Agent Purpose and Workflow Summary */}
      <section className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Meet CSAI: Your Smart Security Assistant
        </h2>
      </section>
      {/* CSAI User Flow Diagram */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-center flex-wrap gap-4 md:gap-8">
            {/* 1. Login */}
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-in"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                  <path d="M21 21v2a2 2 0 0 1-2 2h-4" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Login to Extension
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 2. Visit Site */}
            <div className="flex flex-col items-center">
              <span className="bg-secondary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-globe"
                >
                  <circle cx="16" cy="16" r="14" />
                  <line x1="2" x2="30" y1="16" y2="16" />
                  <path d="M16 2a16 16 0 0 1 0 28" />
                  <path d="M16 2a16 16 0 0 0 0 28" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Visit Target Site
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 3. Interact */}
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mouse-pointer"
                >
                  <path d="M3 3l7 17 4-4 7 7 4-4-7-7-4 4-7-17z" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Interact (Sign in, Add to Cart)
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 4. Review */}
            <div className="flex flex-col items-center">
              <span className="bg-secondary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye"
                >
                  <circle cx="16" cy="16" r="14" />
                  <circle cx="16" cy="16" r="4" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Review Details
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 5. Approve & Scan */}
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle"
                >
                  <circle cx="16" cy="16" r="14" />
                  <polyline points="9 16 13 20 23 10" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Approve & Start Scan
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 6. Scanning */}
            <div className="flex flex-col items-center">
              <span className="bg-secondary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zap"
                >
                  <polygon points="13 2 2 20 12 20 11 30 22 12 12 12 13 2" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Scanning
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 7. Vulnerability Found */}
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect x="2" y="6" width="28" height="20" rx="4" />
                  <polyline points="2 6 16 18 30 6" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                Notified (Email/Site)
              </span>
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            {/* 8. View Details */}
            <div className="flex flex-col items-center">
              <span className="bg-secondary/10 rounded-full p-3 mb-2">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list"
                >
                  <rect x="4" y="6" width="24" height="20" rx="4" />
                  <line x1="8" y1="10" x2="24" y2="10" />
                  <line x1="8" y1="16" x2="24" y2="16" />
                  <line x1="8" y1="22" x2="16" y2="22" />
                </svg>
              </span>
              <span className="text-xs md:text-sm text-foreground">
                View Details & Logs
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* <FileUpload /> */}
      <HowItWorks />
      <Features />
      <Testimonials />
      {/* <Pricing /> section removed as requested */}
      <CTA />
      <Footer />
    </main>
  );
}
