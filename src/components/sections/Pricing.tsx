"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Pricing() {
  const [counts, setCounts] = useState({ starter: 0, pro: 0, enterprise: 0 });

  useEffect(() => {
    const targetCounts = { starter: 0, pro: 299, enterprise: 999 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        starter: Math.floor(targetCounts.starter * progress),
        pro: Math.floor(targetCounts.pro * progress),
        enterprise: Math.floor(targetCounts.enterprise * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "$999",
      period: "/project",
      description:
        "Perfect for individual researchers and technology enthusiasts",
      features: [
        "Basic embedded system design",
        "PCB prototyping support",
        "Firmware development",
        "Basic IoT integration",
        "Email support",
        "1 month warranty",
      ],
      popular: false,
      cta: "Start Project",
      href: "/contact",
      delay: 0.2,
      icon: Shield,
      bgColor: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      name: "Professional",
      price: "$2,999",
      period: "/project",
      description:
        "Advanced features for technology teams and engineering firms",
      features: [
        "Custom embedded solutions",
        "Advanced PCB design",
        "Complex firmware development",
        "Full IoT integration",
        "Cloud connectivity",
        "Priority support",
        "3 months warranty",
        "Technical documentation",
      ],
      popular: true,
      cta: "Get Started",
      href: "/contact",
      delay: 0.4,
      icon: Zap,
      bgColor: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description:
        "Custom solutions for large organizations and complex projects",
      features: [
        "End-to-end product development",
        "Custom VLSI design",
        "Advanced AI/ML integration",
        "Industrial automation",
        "24/7 dedicated support",
        "1 year warranty",
        "Training & documentation",
        "Ongoing maintenance",
      ],
      popular: false,
      cta: "Contact Sales",
      href: "/contact",
      delay: 0.6,
      icon: Crown,
      bgColor: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-primary/2 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/2 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Choose Your{" "}
              <span className="gradient-text">Technology Solution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From individual researchers to enterprise technology teams, we
              have the perfect plan to scale your embedded solutions and IoT
              development needs.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={plan.delay}>
              <motion.div
                className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: plan.delay + 0.2 }}
                  >
                    <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <Card
                  className={`h-full border border-border shadow-lg bg-white hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <CardHeader className="text-center pb-6">
                    <motion.div
                      className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border border-current/10`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <plan.icon className={`w-8 h-8 ${plan.color}`} />
                    </motion.div>

                    <CardTitle className="text-2xl font-bold mb-2 text-foreground">
                      {plan.name}
                    </CardTitle>

                    <p className="text-muted-foreground mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-primary">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: plan.delay + featureIndex * 0.1,
                          }}
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                      size="lg"
                    >
                      {plan.price === "Custom"
                        ? "Contact Sales"
                        : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
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
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our team is here to help you design the perfect technology
              solution for your organization.
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
