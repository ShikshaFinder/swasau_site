"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/animations/GradientText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Shield, Zap, Cpu, Lock } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16 md:pt-20">
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

        <ScrollReveal delay={0.4}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground ">
            Your Smart Cybersecurity Helper
            <GradientText className="block">
              Easy, Fast, and Powerful
            </GradientText>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Our tool is like having a super-smart assistant that checks your
            websites and apps for problems and keeps them safe. You don’t need
            to be a tech expert—just let it do the hard work for you, quickly
            and easily.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="xl"
              className="group relative overflow-hidden shadow-lg hover:shadow-xl"
            >
              <Link href="/waitlist">
                <span className="relative z-10">Join The Waitlist Now 🚀</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-2 hover:bg-muted"
            >
              Watch Demo
            </Button>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={1.0}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center mb-2">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">Easy to Use</div>
              <div className="text-sm text-muted-foreground">
                No tech skills needed
              </div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center mb-2">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">
                Super Fast
              </div>
              <div className="text-sm text-muted-foreground">
                Checks everything quickly
              </div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center mb-2">
                <Cpu className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">
                Powered by Best LLMs
              </div>
              <div className="text-sm text-muted-foreground">
                and Kali Linux
              </div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center mb-2">
                <Lock className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">
                Smart & Helpful
              </div>
              <div className="text-sm text-muted-foreground">
                Keeps your sites safe
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
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
