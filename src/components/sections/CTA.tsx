"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Shield, Zap, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(11, 79, 130, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 180, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(11, 79, 130, 0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
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
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1.2, 1, 1.2],
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
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-foreground rounded-full text-sm font-medium border border-white/30">
                🚀 Ready to Transform Your Security Operations?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground"
            >
              Start Your{" "}
              <span className="gradient-text">Easy & Smart Protection</span>{" "}
              Journey Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Try our simple tool to keep your websites and apps safe. No tech
              skills needed—just easy, smart protection for everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                size="xl"
                className="group relative overflow-hidden shadow-lg hover:shadow-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join The Waitlist Now 🚀
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-2 border-border hover:bg-muted text-foreground"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <motion.div
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Zero Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Get started in under 5 minutes
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Lightning Fast
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Results in 1-2 days
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Enterprise Ready
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scale to any team size
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-12 pt-8 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by security teams at:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-lg font-semibold text-foreground">
                  GWSF Ventures Pvt. Ltd.
                </div>
                {/* <div className="text-lg font-semibold text-foreground">CyberDefense Inc</div>
                <div className="text-lg font-semibold text-foreground"></div>
                <div className="text-lg font-semibold text-foreground"></div> */}
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
