"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingCard } from "@/components/animations/FloatingCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Chrome, Server, Cpu, Shield } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Chrome,
      title: "Browser Extension Capture",
      description:
        "Intelligently captures network requests and authentication tokens when triggered, filtering out unnecessary data like images or fonts.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      delay: 0.2,
    },
    {
      icon: Server,
      title: "Secure API Transmission",
      description:
        "Communicates with central API using encrypted channels, implementing CORS protection and replay prevention for secure data transfer.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      delay: 0.4,
    },
    {
      icon: Cpu,
      title: "AI Agent Analysis",
      description:
        "Kubernetes spins up isolated pods running containerized AI security agents that analyze network data for vulnerabilities and misconfigurations.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      delay: 0.6,
    },
    {
      icon: Shield,
      title: "Instant Results",
      description:
        "AI agent responds with detailed vulnerability reports, security insights, and actionable recommendations in under 5 seconds.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      delay: 0.8,
    },
  ];

  return (
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                How It Works
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
            >
              From Browser to{" "}
              <span className="gradient-text">AI Analysis in Seconds</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Our AI-powered platform automates the entire security assessment
              workflow, from initial reconnaissance to vulnerability discovery,
              in a matter of seconds.
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <FloatingCard
              key={index}
              delay={step.delay}
              className="transform hover:rotate-1"
            >
              <ScrollReveal delay={step.delay}>
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
  );
}
