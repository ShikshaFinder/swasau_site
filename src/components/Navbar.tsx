"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Internship", href: "/internship" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                SWASAU Technology
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  // Authenticated user menu
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      Welcome, {user.name}
                    </div>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  // Guest user buttons
                  <>
                    <Link href="/contact">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Contact Us
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="group relative overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          Get a Quote
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
            >
              <div className="py-4 space-y-4 px-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="pt-4 space-y-3 border-t border-border">
                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-primary"
                    >
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full group relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">
                        Get a Quote
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
