"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Shield, Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Browser Extension", href: "#" },
      { name: "AI Security Agent", href: "#" },
      { name: "Kubernetes Backend", href: "#" },
      { name: "API Documentation", href: "#" },
      { name: "Security Features", href: "#" },
    ],
    solutions: [
      { name: "Bug Bounty Programs", href: "#" },
      { name: "Penetration Testing", href: "#" },
      { name: "Vulnerability Assessment", href: "#" },
      { name: "Red Team Operations", href: "#" },
      { name: "DevSecOps Integration", href: "#" },
    ],
    resources: [
      { name: "Security Blog", href: "#" },
      { name: "Vulnerability Database", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Security Guides", href: "#" },
      { name: "Community Forum", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Security Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact Sales", href: "#" },
      { name: "Support", href: "#" },
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
        <div className="py-16">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {/* Brand Section */}
              <div className="col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                      aicybershield.tech
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    AI-powered cybersecurity automation platform that
                    streamlines bug bounty and pentesting workflows with
                    lightning-fast vulnerability assessment.
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border hover:border-primary transition-colors duration-300 group"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
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
            className="py-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 aicybershield.tech. All rights reserved.</span>
              <span>•</span>
              <span>Made with ❤️ for the security community</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Security
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Compliance
              </a>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
