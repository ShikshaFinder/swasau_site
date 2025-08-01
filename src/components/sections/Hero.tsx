"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/animations/GradientText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Shield, Zap, Cpu, Lock } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-white to-accent/10 pt-8 md:pt-12">
      {/* Decorative SVG or Abstract Shape */}
      <div className="absolute right-0 top-0 w-96 h-96 opacity-20 pointer-events-none select-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="180" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="translate(200 200) scale(180)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFD600" stop-opacity="0.15" />
              <stop offset="1" stop-color="#0057B8" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Aurora Background */}
      <div className="absolute inset-0 aurora opacity-30"></div>

      {/* Floating Elements - Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/5 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-primary/3 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* <ScrollReveal delay={0.2}>
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            {/* <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium mb-4 border border-secondary/20">
              🛡️ AI-Powered Cybersecurity Automation
            </span> */}
        {/* </motion.div> */}
        {/* </ScrollReveal>  */}

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Creating Dream <span className="gradient-text">Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Custom embedded solutions for IoT, automation, and product
            development. From concept to production, we bring your ideas to life
            with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              50+
            </div>
            <div className="text-muted-foreground">Custom Design</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              6
            </div>
            <div className="text-muted-foreground">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              100%
            </div>
            <div className="text-muted-foreground">Fast Prototyping</div>
          </div>
          {/* <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              24/7
            </div>
            <div className="text-muted-foreground">Production Ready</div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
