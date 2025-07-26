"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Amit Sharma",
      role: "CTO, TechNova Solutions",
      location: "India",
      content:
        "SWASAU delivered our industrial IoT project on time and exceeded our expectations. Their expertise in embedded systems is unmatched.",
      rating: 5,
      avatar: "AS",
      company: "TechNova Solutions",
    },
    {
      name: "Priya Desai",
      role: "Product Manager, MedDetect",
      location: "India",
      content:
        "The custom medical device they built helped us launch faster and with confidence. Highly recommended for complex product development!",
      rating: 5,
      avatar: "PD",
      company: "MedDetect",
    },
    {
      name: "Rohit Verma",
      role: "Founder, PetTrackr",
      location: "India",
      content:
        "Their team turned our pet tracking idea into a real, working product. Great communication and technical skills!",
      rating: 5,
      avatar: "RV",
      company: "PetTrackr",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/2 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-secondary/2 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Technology Team Success Stories
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              What Our{" "}
              <span className="gradient-text">Technology Teams Say</span>
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Real stories from technology professionals who have transformed
              their projects with our custom embedded solutions and IoT
              expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Card className="p-8 md:p-12 bg-white border border-border shadow-xl">
              <CardContent className="p-0">
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {testimonials[currentIndex].avatar}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-secondary text-secondary" />
                          </motion.div>
                        )
                      )}
                    </div>

                    <motion.blockquote
                      className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      "{testimonials[currentIndex].content}"
                    </motion.blockquote>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg text-foreground">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-muted-foreground">
                          {testimonials[currentIndex].role} •{" "}
                          {testimonials[currentIndex].location}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">
                Technology Teams
              </div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-secondary mb-2">
                4.9/5
              </div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-secondary mb-2">
                &lt;2 days
              </div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
