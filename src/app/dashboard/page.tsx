"use client";
import Height from "@/components/height";
import { motion } from "framer-motion";
import { Shield, Zap, Target, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
    window.location.href = "/";
  };

  const stats = [
    {
      title: "Total Scans",
      value: "24",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Vulnerabilities Found",
      value: "7",
      icon: Target,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Active Projects",
      value: "3",
      icon: FileText,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Scans This Week",
      value: "12",
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <>
    <Height/>
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                AICyberShield Dashboard
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your security scans.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors duration-200">
              <Shield className="w-5 h-5 mr-2" />
              Start New Scan
            </Button>
            <Button
              variant="outline"
              className="h-16 border-2 border-border hover:bg-muted font-semibold rounded-xl transition-colors duration-200"
            >
              <FileText className="w-5 h-5 mr-2" />
              View Reports
            </Button>
            <Button
              variant="outline"
              className="h-16 border-2 border-border hover:bg-muted font-semibold rounded-xl transition-colors duration-200"
            >
              <Target className="w-5 h-5 mr-2" />
              Manage Targets
            </Button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  Scan completed for example.com
                </p>
                <p className="text-sm text-muted-foreground">
                  2 vulnerabilities found • 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  Scan in progress for test-app.com
                </p>
                <p className="text-sm text-muted-foreground">
                  Currently running • 45% complete
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  New project created
                </p>
                <p className="text-sm text-muted-foreground">
                  Project "E-commerce Security" • 1 day ago
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
    </>
  );
}
