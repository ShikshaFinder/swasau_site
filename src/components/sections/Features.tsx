"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Chrome,
  Zap,
  Shield,
  Cpu,
  Lock,
  Database,
  Network,
  Bot,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Bot,
      title: "Easy for Everyone",
      description: "You don’t need to be a tech expert. Anyone can use it!",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Fast Checks",
      description: "Finds problems quickly so you can fix them sooner.",
      color: "text-secondary",
    },
    {
      icon: Cpu,
      title: "Smart Helper",
      description: "Understands what you need and does the hard work for you.",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Keeps You Safe",
      description: "Watches out for dangers and helps protect your stuff.",
      color: "text-secondary",
    },
    {
      icon: Lock,
      title: "Always On",
      description: "Works in the background to keep you safe all the time.",
      color: "text-primary",
    },
    {
      icon: Database,
      title: "Learns and Improves",
      description:
        "Gets better every time you use it, so you’re always protected.",
      color: "text-secondary",
    },
    {
      icon: Network,
      title: "Works for Everyone",
      description: "Great for individuals, families, or teams.",
      color: "text-primary",
    },
    {
      icon: Chrome,
      title: "No Extra Steps",
      description: "Just start and let it handle everything for you.",
      color: "text-secondary",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Meta Balls Background - Subtle */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary/3 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-40 h-40 bg-secondary/3 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-28 h-28 bg-primary/2 rounded-full blur-2xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium border border-secondary/20">
                Advanced Security Features
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
            >
              Simple, Powerful Protection
              <span className="gradient-text"> For Everyone</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Our tool is made for everyone. It’s easy, fast, and keeps you
              safe—no tech skills needed.
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="group p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-12 h-12 ${feature.color.replace(
                    "text-",
                    "bg-"
                  )}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-current/10`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 text-foreground">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.8}>
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-border shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Automate Your Security Workflow?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Join hundreds of security teams who have already transformed
                their bug bounty and pentesting operations with AI-powered
                automation.
              </p>
              <motion.button
                className="px-8 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join The Waitlist Now 🚀
              </motion.button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
