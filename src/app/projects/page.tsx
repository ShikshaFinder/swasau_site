"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wifi,
  CloudRain,
  Building,
  Hash,
  Heart,
  ArrowRight,
  MapPin,
  Cpu,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      icon: Wifi,
      title: "Wireless Data Transmission System for RS232 to USB",
      industry: "Retail / Industrial Automation",
      description:
        "A plug-and-play module that converts RS232 serial data to USB with real-time wireless transmission capabilities.",
      highlights: [
        "Converts RS232 serial data to USB",
        "Real-time wireless data transmission",
        "Plug-and-play module",
      ],
      techUsed: ["ESP32", "UART", "USB Host Shield"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: CloudRain,
      title: "Industrial Weather Monitoring System",
      industry: "Agriculture / Environment",
      description:
        "A rugged outdoor weather monitoring system with multi-sensor input for comprehensive environmental data collection.",
      highlights: [
        "Multi-sensor input: Temp, Humidity, Wind, Rain",
        "Rugged outdoor enclosure",
        "Real-time data collection",
      ],
      techUsed: ["STM32", "RP2040", "RS485"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Building,
      title: "Lift Dot Matrix Display",
      industry: "Building Automation",
      description:
        "Custom dot-matrix display system for elevator floor and status indicators with advanced display driver technology.",
      highlights: [
        "Floor and status indicators",
        "Custom dot-matrix display driver",
        "Real-time updates",
      ],
      techUsed: ["Custom Display Driver", "Microcontroller"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Hash,
      title: "Wireless Token Display System",
      industry: "Hospitals / Service Centers",
      description:
        "Multi-point display system with central control for queue management in healthcare and service environments.",
      highlights: [
        "Multi-point display with central control",
        "Wireless updates using RF/Bluetooth",
        "Audio prompt integration",
      ],
      techUsed: ["NRF24L01", "STM8", "7-Segment"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Heart,
      title: "Medical Device for Disease Detection",
      industry: "Healthcare",
      description:
        "Custom embedded medical device for accurate and fast disease detection with advanced diagnostic capabilities.",
      highlights: [
        "Custom embedded medical device",
        "Accurate and fast disease detection",
        "Medical-grade components",
      ],
      techUsed: ["Medical Sensors", "Embedded System"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: MapPin,
      title: "Pet Health & Location Tracking Device",
      industry: "Consumer / IoT",
      description:
        "Comprehensive pet tracking solution with health monitoring and GPS location tracking capabilities.",
      highlights: [
        "Tracks pet location with GPS",
        "Monitors activity & temperature",
        "Companion mobile app for insights",
      ],
      techUsed: ["GPS Module", "NB-IoT", "Accelerometer", "ESP32-C6"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                  Our Projects
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              >
                <span className="font-black">Our Projects</span>
                <span className="gradient-text">
                  {" "}
                  - Showcasing Innovation Across Industries
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Explore our portfolio of custom embedded solutions across
                various industries, from industrial automation to healthcare and
                consumer IoT.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card
                  className="group hover:shadow-xl transition-all duration-300 border border-border h-full cursor-pointer"
                  onClick={() =>
                    window.open(
                      `/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`,
                      "_blank"
                    )
                  }
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 ${project.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <project.icon className={`w-6 h-6 ${project.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Cpu className="w-4 h-4" />
                      <span className="font-medium">{project.industry}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-muted-foreground mb-6 flex-grow text-base leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-foreground mb-3 text-lg">
                        Highlights:
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <li
                            key={highlightIndex}
                            className="flex items-start text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-foreground mb-3 text-lg">
                        Tech Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techUsed.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group/btn mt-auto"
                      asChild
                    >
                      <Link href="/contact">
                        <span className="flex items-center gap-2">
                          Discuss Similar Project
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Section */}
          <ScrollReveal delay={0.8}>
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-border shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Inspired by Our Work?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  Let's create something amazing together. Whether it's similar
                  to these projects or something completely new, we're here to
                  bring your ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden"
                    asChild
                  >
                    <Link href="/contact">
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/services">View Our Services</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
