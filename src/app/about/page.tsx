"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Users,
  Award,
  Lightbulb,
  ArrowRight,
  Cpu,
  Zap,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Innovation Hub",
      description:
        "Swasau Technologies is not just a service provider; we're an innovation hub. Our team of skilled professionals thrives on pushing the boundaries of what's possible, delivering solutions that stand out in today's fast-evolving digital landscape.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      title: "Collaborative Approach",
      description:
        "We don't just work for our clients; we work with them. Our collaborative approach ensures that we understand your unique needs, allowing us to tailor solutions that align perfectly with your goals.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Award,
      title: "Technology Expertise",
      description:
        "From web and mobile development to IoT, AI, and beyond, we boast a diverse range of technological expertise. Our team stays ahead of the curve, adopting the latest tools and frameworks to deliver solutions that are not just current but future-ready.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Lightbulb,
      title: "Passion for Innovation",
      description:
        "Our values are anchored in a passion for innovation, integrity in all our endeavors, a commitment to excellence, and a customer-centric approach. We believe in fostering a collaborative and inclusive work environment that encourages creativity, continuous learning, and sustainable practices.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const team = [
    {
      name: "Kiran Shah",
      role: "CEO & Co-Founder",
      description:
        "Completed Diploma Commercial Practice from Government Girls Polytechnic, Ahmedabad in 1990 and B.Com from Gujarat University in 1992. Brings a unique blend of creativity, strategic thinking, and deep understanding of market dynamics.",
      expertise: [
        "Strategic Planning",
        "Business Development",
        "Market Analysis",
      ],
      avatar: "KS",
    },
    {
      name: "Dr. Mihir Shah",
      role: "CTO & Founder",
      description:
        "An accomplished academician with BE (Electronics), ME (Electronics and Communication with VLSI specialization), and Ph.D. (Electrical Engineering). Over 26 years of teaching experience and 3.5 years in R&D.",
      expertise: ["VLSI Design", "Electronics", "R&D", "Academic Leadership"],
      avatar: "MS",
    },
    {
      name: "Neel Raval",
      role: "Intern",
      description:
        "Dedicated intern contributing to our innovative projects and learning from our experienced team.",
      expertise: ["Embedded Systems", "Learning"],
      avatar: "NR",
    },

    {
      name: "Manav Shah",
      role: "Intern",
      description:
        "Passionate intern working on embedded systems and IoT projects.",
      expertise: ["IoT", "Embedded Systems"],
      avatar: "MS",
    },
    {
      name: "Niraj Patel",
      role: "Electronic Hardware Engineer",
      description:
        "Specialized in electronic hardware design and PCB development for our innovative solutions.",
      expertise: ["Hardware Design", "PCB Design", "Electronics"],
      avatar: "NP",
    },
    {
      name: "Ayan Vaidya",
      role: "Senior Embedded Firmware Engineer",
      description:
        "Experienced in embedded systems development and firmware engineering for our cutting-edge projects.",
      expertise: ["Embedded Systems", "Firmware Engineering", "C/C++"],
      avatar: "AV",
    },
    {
      name: "Harsh Balsaraf",
      role: "Design Engineer",
      description:
        "Focused on product design and engineering solutions for our innovative projects.",
      expertise: ["Product Design", "Engineering", "CAD"],
      avatar: "HB",
    },
    {
      name: "Darsh Patel",
      role: "Embedded Engineer",
      description:
        "Specialized in embedded systems development and microcontroller programming.",
      expertise: ["Embedded Systems", "Microcontrollers", "Programming"],
      avatar: "DP",
    },
    {
      name: "Chirag Patel",
      role: "Intern",
      description:
        "Passionate intern learning and contributing to our engineering projects.",
      expertise: ["Learning", "Engineering"],
      avatar: "CP",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "6", label: "Industries Served" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
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
                  About Us
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              >
                <span className="font-black">About Us</span>
                <span className="gradient-text">
                  {" "}
                  - Creating Dream Solutions Since Day One
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                We are passionate about turning innovative ideas into reality
                through custom embedded solutions, IoT development, and
                cutting-edge technology.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <ScrollReveal>
              <Card className="border border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    At Swasau Technology, our mission is to become a global
                    leader in electronic Research and Development (R&D),
                    dedicated to providing dream and innovative technological
                    solutions. We are committed to pushing the boundaries of
                    electronic design to create transformative solutions for
                    diverse industries.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Our vision at Swasau Technology is to accelerate the Make in
                    India initiative by offering cutting-edge electronic design
                    solutions to both domestic and global industries. We aspire
                    to be at the forefront of technological advancements,
                    contributing to the growth and competitiveness of the
                    electronics sector.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Values */}
          <ScrollReveal delay={0.6}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-12 h-12 ${value.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                    >
                      <value.icon className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Team */}
          <ScrollReveal delay={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                <span className="font-black">Meet The Founders</span>
              </h2>
              <div className="relative bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 mb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl opacity-50"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {team.slice(0, 2).map((member, index) => (
                    <Card
                      key={index}
                      className="border border-border bg-white/80 backdrop-blur-sm"
                    >
                      <CardHeader className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                          {member.avatar}
                        </div>
                        <CardTitle className="text-xl font-semibold text-foreground">
                          {member.name}
                        </CardTitle>
                        <p className="text-primary font-medium">
                          {member.role}
                        </p>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-muted-foreground mb-4">
                          {member.description}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {member.expertise.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                <span className="font-black">Our Team</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
                At Swasau Technologies, we are proud to be fueled by a team of
                dedicated and skilled professionals. Together, we form a
                collaborative force committed to turning innovative ideas into
                reality.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {team.slice(2).map((member, index) => (
                  <Card key={index} className="border border-border">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {member.avatar}
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {member.name}
                      </CardTitle>
                      <p className="text-primary font-medium text-sm">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground text-sm mb-4">
                        {member.description}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal delay={1.0}>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-border shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Ready to Work with Us?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  Let's discuss your project and see how our expertise can help
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
                        Get Started
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
                    <Link href="/projects">View Our Work</Link>
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
