"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Cpu,
  Zap,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const blogPosts = [
    {
      title: "Getting Started with STM32 Development",
      excerpt:
        "A comprehensive guide to setting up your STM32 development environment and creating your first embedded project.",
      category: "Tutorial",
      author: "Harsh Jani",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://via.placeholder.com/400x250",
      tags: ["STM32", "Embedded", "Tutorial"],
      featured: true,
    },
    {
      title: "IoT Trends in 2024: What's Next?",
      excerpt:
        "Explore the latest trends in IoT technology and how they're shaping the future of connected devices.",
      category: "Industry News",
      author: "Mihir Sir",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "https://via.placeholder.com/400x250",
      tags: ["IoT", "Trends", "Technology"],
    },
    {
      title: "Behind the Scenes: Building Our Pet Tracking Device",
      excerpt:
        "An inside look at the development process of our pet health and location tracking device, from concept to prototype.",
      category: "Case Study",
      author: "Harsh Jani",
      date: "2024-01-05",
      readTime: "12 min read",
      image: "https://via.placeholder.com/400x250",
      tags: ["Case Study", "IoT", "GPS"],
    },
    {
      title: "Wireless Communication Protocols: BLE vs LoRa",
      excerpt:
        "A detailed comparison of Bluetooth Low Energy and LoRa protocols for IoT applications.",
      category: "Technical",
      author: "Mihir Sir",
      date: "2023-12-28",
      readTime: "10 min read",
      image: "https://via.placeholder.com/400x250",
      tags: ["BLE", "LoRa", "Wireless"],
    },
    {
      title: "PCB Design Best Practices for Manufacturing",
      excerpt:
        "Essential tips and guidelines for designing PCBs that are optimized for manufacturing and assembly.",
      category: "Tutorial",
      author: "Harsh Jani",
      date: "2023-12-20",
      readTime: "15 min read",
      image: "https://via.placeholder.com/400x250",
      tags: ["PCB", "Design", "Manufacturing"],
    },
    {
      title: "The Future of Industrial Automation",
      excerpt:
        "How embedded systems and IoT are revolutionizing industrial automation and Industry 4.0.",
      category: "Industry News",
      author: "Mihir Sir",
      date: "2023-12-15",
      readTime: "7 min read",
      image: "https://via.placeholder.com/400x250",
      tags: ["Automation", "Industry 4.0", "IoT"],
    },
  ];

  const categories = [
    { name: "All", count: blogPosts.length },
    {
      name: "Tutorial",
      count: blogPosts.filter((post) => post.category === "Tutorial").length,
    },
    {
      name: "Industry News",
      count: blogPosts.filter((post) => post.category === "Industry News")
        .length,
    },
    {
      name: "Case Study",
      count: blogPosts.filter((post) => post.category === "Case Study").length,
    },
    {
      name: "Technical",
      count: blogPosts.filter((post) => post.category === "Technical").length,
    },
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail("");
    }
  };

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
                  Blog & Insights
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              >
                Latest Insights & Updates
                <span className="gradient-text"> From Our Team</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Stay updated with the latest trends in embedded systems, IoT
                technology, and behind-the-scenes looks at our development
                process.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Categories Filter */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </ScrollReveal>

          {/* Featured Post */}
          <ScrollReveal delay={0.4}>
            <div className="mb-16">
              {blogPosts
                .filter((post) => post.featured)
                .map((post, index) => (
                  <Card
                    key={index}
                    className="border border-border overflow-hidden"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="p-8 flex flex-col justify-center">
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                        <CardTitle className="text-2xl font-bold text-foreground mb-4">
                          {post.title}
                        </CardTitle>
                        <p className="text-muted-foreground mb-6">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button className="group" asChild>
                          <Link
                            href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <span className="flex items-center gap-2">
                              Read More
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                      <div className="bg-muted flex items-center justify-center">
                        <div className="text-center p-8">
                          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            Featured Post Image
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollReveal>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border border-border h-full">
                    <CardHeader>
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <p className="text-muted-foreground mb-6 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group/btn mt-auto"
                        asChild
                      >
                        <Link
                          href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <span className="flex items-center gap-2">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
          </div>

          {/* Newsletter Signup */}
          <ScrollReveal delay={0.8}>
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-border shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  Subscribe to our newsletter for the latest insights,
                  tutorials, and industry updates delivered to your inbox.
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </form>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
