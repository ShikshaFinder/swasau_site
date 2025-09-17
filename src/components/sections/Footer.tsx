"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Shield, Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Embedded Hardware Design", href: "/services" },
      { name: "Firmware Development", href: "/services" },
      { name: "IoT Product Development", href: "/services" },
      { name: "Prototyping", href: "/services" },
      { name: "Industrial Automation", href: "/services" },
    ],
    solutions: [
      { name: "Wireless/Bluetooth/NB-IoT Integration", href: "/services" },
      { name: "End-to-End Product Engineering", href: "/services" },
      { name: "Custom Solutions", href: "/services" },
      { name: "Consulting", href: "/contact" },
      { name: "Support", href: "/contact" },
    ],
    resources: [
      { name: "Blog / Insights", href: "/blog" },
      { name: "Careers", href: "/internship" },
      { name: "Newsletter", href: "/blog" },
      { name: "Downloads", href: "/contact" },
      { name: "FAQ", href: "/contact" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
      { name: "Team", href: "/about" },
      { name: "Internships", href: "/internship" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden bg-muted/30 border-t border-border">
      {/* Fluid Glass Container Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 10% 20%, rgba(11, 79, 130, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(255, 180, 0, 0.05) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">ST</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    Swasau Technologies
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Custom embedded solutions for IoT, automation, and product
                  development. Contact us: info@swasau.com | +91-9876543210
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h3 className="font-semibold text-foreground mb-4">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Solutions Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="font-semibold text-foreground mb-4">
                  Solutions
                </h3>
                <ul className="space-y-3">
                  {footerLinks.solutions.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="font-semibold text-foreground mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border-t border-border pt-8 mt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <span>© 2024 Swasau Technologies. All rights reserved.</span>
              <div className="flex items-center mt-4 md:mt-0">
                <span>Made with ❤️ for the technology community</span>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
