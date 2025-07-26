"use client";

import Height from "@/components/height";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingCard } from "@/components/animations/FloatingCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Chrome,
  Server,
  Cpu,
  Shield,
  Lightbulb,
  Code,
  Network,
  TestTube,
  Rocket,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Lightbulb,
      title: "Concept & Planning",
      description:
        "We start by understanding your requirements, analyzing feasibility, and creating a detailed project roadmap with timelines and milestones.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Cpu,
      title: "Hardware Design",
      description:
        "Our engineers design custom PCBs, select optimal components, and create schematics that meet your specific technical requirements.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Code,
      title: "Firmware Development",
      description:
        "We develop efficient, reliable firmware for microcontrollers, ensuring optimal performance and seamless integration with hardware.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Network,
      title: "IoT Integration",
      description:
        "Connect your device to the cloud with secure protocols, real-time data transmission, and comprehensive monitoring capabilities.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: TestTube,
      title: "Testing & Validation",
      description:
        "Rigorous testing ensures your solution meets all specifications, performs reliably, and is ready for production deployment.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Rocket,
      title: "Deployment & Support",
      description:
        "We handle production deployment, provide comprehensive documentation, and offer ongoing support to ensure long-term success.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <>
      <Height />
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Background Elements - Subtle */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-40 h-40 bg-primary/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-60 h-60 bg-secondary/3 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                How We{" "}
                <span className="gradient-text">Build Your Solution</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive approach to embedded systems and IoT
                development ensures your project is delivered on time, within
                budget, and exceeds expectations.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <FloatingCard
                key={index}
                delay={index * 0.1}
                className="transform hover:rotate-1"
              >
                <ScrollReveal delay={index * 0.1}>
                  <Card className="h-full border border-border shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border border-current/10`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <step.icon className={`w-8 h-8 ${step.color}`} />
                      </motion.div>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </FloatingCard>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="hidden lg:block relative mt-16">
            <div className="absolute top-1/2 left-1/8 w-3/4 h-0.5 bg-gradient-to-r from-primary/20  via-primary/20 to-secondary/20 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-secondary rounded-full transform -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-secondary rounded-full transform -translate-x-1 -translate-y-1"></div>
          </div>
        </div>
      </section>
    </>
  );
}
