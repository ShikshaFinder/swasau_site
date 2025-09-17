"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Chrome,
  Zap,
  Shield,
  Cpu,
  Lock,
  Database,
  Network,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Features() {
  const features = [
    {
      icon: Cpu,
      title: "Embedded Hardware Design",
      description:
        "Custom embedded hardware solutions with PCB design and component selection for specialized applications.",
      color: "text-primary",
    },
    {
      icon: Database,
      title: "Firmware Development",
      description:
        "Low-level firmware development for microcontrollers and embedded systems with optimized performance.",
      color: "text-secondary",
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description:
        "Quick development and testing of concepts with fast turnaround times for proof of concepts.",
      color: "text-primary",
    },
    {
      icon: Network,
      title: "IoT Product Development",
      description:
        "End-to-end IoT solutions with sensor integration, cloud connectivity, and data analytics.",
      color: "text-secondary",
    },
    {
      icon: Bot,
      title: "Wireless/Bluetooth/NB-IoT Integration",
      description:
        "Seamless integration of wireless communication protocols for connected devices and applications.",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "End-to-End Product Engineering",
      description:
        "Complete product development from concept to manufacturing-ready solutions with full lifecycle support.",
      color: "text-secondary",
    },
    {
      icon: Chrome,
      title: "Web Development",
      description:
        "Modern web applications and digital solutions for online presence and user interfaces.",
      color: "text-primary",
    },
    {
      icon: Lock,
      title: "AI & ML",
      description:
        "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
      color: "text-secondary",
    },
  ];

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
                Our Expertise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
            >
              <span className="font-black">Our Expertise</span>
              <span className="gradient-text">
                {" "}
                - Custom Embedded Solutions For Every Industry
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              We specialize in creating custom embedded hardware, firmware, and
              IoT solutions tailored to your specific industry and requirements.
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                  className={`w-12 h-12 ${feature.color.replace(
                    "text-",
                    "bg-"
                  )}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-current/10`}
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

        {/* Our Projects Preview */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
              Our Recent Work
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  🌦️ Weather Monitoring System
                </h3>
                <div className="text-muted-foreground mb-1">
                  Industrial Applications
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Advanced system collecting diverse weather parameters via
                  RS485 serial communication with real-time dashboard and LED
                  panel integration.
                </p>
                <div className="text-xs text-primary font-medium">
                  Tech Used: RS485, Sensors, Real-time Dashboard
                </div>
              </div>
              {/* Project 2 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  🏥 Medical Device for Disease Testing
                </h3>
                <div className="text-muted-foreground mb-1">Healthcare</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Cutting-edge solution for disease testing with seamless
                  controller and Android app integration for efficient
                  diagnostics.
                </p>
                <div className="text-xs text-primary font-medium">
                  Tech Used: Controller, Android App, Medical Sensors
                </div>
              </div>
              {/* Project 3 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  🕷️ Spider Robot Controller
                </h3>
                <div className="text-muted-foreground mb-1">Robotics</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Advanced controls and precision maneuvering system for spider
                  robots with innovative robotics solutions.
                </p>
                <div className="text-xs text-primary font-medium">
                  Tech Used: Robotics Control, Precision Systems
                </div>
              </div>
              {/* Project 4 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  💡 LED Display Controller
                </h3>
                <div className="text-muted-foreground mb-1">
                  Display Systems
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Real-time data management system for LED panels with dynamic
                  content control and seamless updates.
                </p>
                <div className="text-xs text-primary font-medium">
                  Tech Used: LED Control, Real-time Data Management
                </div>
              </div>
              {/* Project 5 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  🔧 System On Chip (SoC)
                </h3>
                <div className="text-muted-foreground mb-1">
                  Semiconductor Design
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Integrated hardware components including processors, memory,
                  and peripherals in a single semiconductor chip.
                </p>
                <div className="text-xs text-primary font-medium">
                  Tech Used: VLSI Design, Semiconductor Integration
                </div>
              </div>
              {/* Project 6 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  🏭 3-Axis Gantry System For Pharmaceutical
                </h3>
                <div className="text-muted-foreground mb-1">Industrial/IoT</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Precision 3-axis motion control using CoreYZ mechanism.
                  Automated testing of pharmaceutical solutions via electrodes.
                  Integrated ultrasonic cleaning for probe maintenance.
                  User-friendly custom GUI for complete system operation.
                  Centralized control of motion and cleaning sequences.
                  Real-time data logging and monitoring of test results.
                </p>
                <div className="text-xs text-primary font-medium">
                  Tech Used: CoreYZ kinematics, NEMA 17 stepper motors, GT2
                  belts & pulleys, Custom electrode interface, analog signal
                  processing, Ultrasonic transducer module, MOSFET switching
                  circuit, Arduino Mega, A4988/TMC stepper drivers, limit
                  switches
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Proven Track Record
                </h3>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 shadow-sm text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  Fast Turnaround
                </h3>
              </div>
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Expert Mentorship
                </h3>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 shadow-sm text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  Custom-Built Solutions
                </h3>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Technology Stack */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">MCUs</h3>
                <p className="text-muted-foreground">
                  STM32, ESP32, PIC, Nordic, Arduino, WCH
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">Design Tools</h3>
                <p className="text-muted-foreground">
                  Altium, KiCAD, Fusion360
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">Protocols</h3>
                <p className="text-muted-foreground">
                  BLE, LoRa, NB-IoT, MQTT, CAN
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">Cloud</h3>
                <p className="text-muted-foreground">
                  AWS IoT, Azure, Blynk, Firebase
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Our Clients */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
              Our Clients
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              At Swasau Technologies, we take pride in the strong relationships
              we've built with our clients. From startups to established
              enterprises, our engineering services have left a lasting impact.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Client 1 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Aarti Industries Limited
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Leading Indian manufacturer of speciality chemicals with a
                  global footprint. We combine process chemistry competence with
                  scale-up engineering competence for creating a sustainable
                  future.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href="https://www.aartigroup.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit them
                  </a>
                </Button>
              </div>
              {/* Client 2 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Oizom
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Offers Environmental IoT and Environmental AI solutions for a
                  sustainable future. Our Air Monitoring System is known for
                  accurate environmental data using patented e-Breathing
                  Technology.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href="https://oizom.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit them
                  </a>
                </Button>
              </div>
              {/* Client 3 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Scanpoint Geomatics Ltd
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pioneering force in India's Geomatics Industry, introducing
                  IGiS—an indigenous technology uniting GIS, Image Processing,
                  Photogrammetry, and CAD.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href="https://www.scanpointgeomatics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit them
                  </a>
                </Button>
              </div>
              {/* Client 4 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Vaibhav Equipment Service
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Provides complete air monitoring instrument's solution with
                  its range of air pollution monitoring instruments. Vast
                  experience in environmental monitoring.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href="https://vaibhavequipment.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit them
                  </a>
                </Button>
              </div>
              {/* Client 5 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Silver Oak University
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Premier private university carrying forward the legacy of
                  Silver Oak Group of Institutes. Delivers engaging learning
                  experience through futuristic curriculum and advanced
                  technological interface.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href="https://silveroakuni.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit them
                  </a>
                </Button>
              </div>
              {/* Client 6 */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Atal Innovation Centre
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hosted by L. M. College of Pharmacy, supported by Atal
                  Innovation Mission (AIM), NITI Aayog, Govt. of India. AIC-LMCP
                  Foundation is a non-profit incubator.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href="https://aim.gov.in/atal-innovation-mission/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit them
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
