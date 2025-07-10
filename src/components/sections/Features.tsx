"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Chrome, Zap, Shield, Cpu, Lock, Database, Network, Bot } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Chrome,
      title: "Smart Browser Extension",
      description: "Manifest V3 extension with chrome.webRequest API for intelligent network capture and token extraction.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Zero-Day Detection",
      description: "AI-powered analysis identifies unknown vulnerabilities and zero-day exploits in real-time.",
      color: "text-primary",
    },
    {
      icon: Cpu,
      title: "Kubernetes Auto-Scaling",
      description: "Horizontal pod autoscaling ensures enterprise-grade performance for large-scale security assessments.",
      color: "text-secondary",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Military-grade encryption for all data transmission with CORS protection and replay prevention.",
      color: "text-primary",
    },
    {
      icon: Bot,
      title: "AI Security Agent",
      description: "Containerized AI agents analyze headers, tokens, endpoints, and payloads for comprehensive security insights.",
      color: "text-secondary",
    },
    {
      icon: Database,
      title: "Vulnerability Database",
      description: "Comprehensive database of known vulnerabilities with real-time updates and threat intelligence.",
      color: "text-primary",
    },
    {
      icon: Network,
      title: "Multi-Node Deployment",
      description: "Support for SSH forwarding and hybrid edge-Kali setups for distributed security operations.",
      color: "text-secondary",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Analysis",
      description: "Sub-5 second response times for vulnerability assessment and security recommendations.",
      color: "text-primary",
    },
  ]

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
              Enterprise-Grade{" "}
              <span className="gradient-text">Security Automation</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Our platform combines cutting-edge AI technology with scalable infrastructure 
              to provide comprehensive security assessment and vulnerability discovery.
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
                  className={`w-12 h-12 ${feature.color.replace('text-', 'bg-')}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-current/10`}
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
                Join hundreds of security teams who have already transformed their 
                bug bounty and pentesting operations with AI-powered automation.
              </p>
              <motion.button
                className="px-8 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
