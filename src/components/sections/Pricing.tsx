"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Crown } from "lucide-react";
import { useState, useEffect } from "react";

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
      price: counts.starter,
      period: "$0",
      description: "Perfect for individual researchers and bug bounty hunters",
      features: [
        "Browser extension access",
        "Basic vulnerability scanning",
        "5 AI agent runs per month",
        "Community support",
        "Standard response time",
      ],
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: false,
      delay: 0.2,
    },
    {
      name: "Professional",
      price: counts.pro,
      period: "$299",
      description: "Advanced features for security teams and red teams",
      features: [
        "Everything in Starter",
        "Unlimited AI agent runs",
        "Advanced vulnerability detection",
        "Priority support",
        "Custom scan configurations",
        "Team collaboration tools",
        "API access",
      ],
      icon: Zap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      popular: true,
      delay: 0.4,
    },
    {
      name: "Enterprise",
      price: counts.enterprise,
      period: "$999",
      description: "Complete solution for large organizations and CISOs",
      features: [
        "Everything in Professional",
        "Custom AI model training",
        "Dedicated infrastructure",
        "24/7 dedicated support",
        "White-label solutions",
        "Advanced analytics dashboard",
        "Multi-node deployment",
        "Compliance reporting",
      ],
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: false,
      delay: 0.6,
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium border border-secondary/20">
                Choose Your Plan
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
            >
              Secure Pricing for{" "}
              <span className="gradient-text">Every Security Team</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              From individual researchers to enterprise security teams, 
              we have the perfect plan to scale your security operations with AI automation.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={plan.delay}>
              <motion.div
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
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
                
                <Card className={`h-full border border-border shadow-lg bg-white hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-secondary' : ''
                }`}>
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
                          {plan.period}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-muted-foreground">/month</span>
                        )}
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
                          transition={{ delay: plan.delay + featureIndex * 0.1 }}
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Button
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' 
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                      size="lg"
                    >
                      {plan.price === 0 ? 'Get Started Free' : 'Choose Plan'}
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
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-border shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Need Custom Enterprise Solutions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our team is here to help you design the perfect security automation solution for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-2 hover:bg-muted">
                  Contact Sales
                </Button>
                <Button size="lg">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
