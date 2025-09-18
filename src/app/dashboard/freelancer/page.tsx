"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Star,
  Award,
  Settings,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Upload,
  Shield,
  Banknote,
  FileText,
  Briefcase,
  Target,
  MessageSquare,
} from "lucide-react";

// Mock user data - in real app, get from auth context
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "FREELANCER" as const,
};

interface FreelancerProfile {
  id: number;
  userId: number;
  phone?: string;
  bio?: string;
  title?: string;
  hourlyRate?: number;
  availability?: string;
  timezone?: string;
  languages: string[];
  experience?: string;
  education?: string;
  certifications: string[];
  portfolio?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  photoUrl?: string;
  resumeUrl?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdentityVerified: boolean;
  isBankVerified: boolean;
  profileCompletion: number;
  status: string;
  isAvailable: boolean;
  totalEarnings: number;
  totalProjects: number;
  completedProjects: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  budget?: number;
  budgetType?: string;
  deadline?: string;
  status: string;
  clientId: number;
  freelancerId?: number;
  isPublic: boolean;
  isUrgent: boolean;
  skillsRequired: string[];
  experienceLevel?: string;
  timeline?: string;
  location?: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  client: {
    company?: string;
    user: {
      name: string;
      email: string;
    };
  };
}

interface Bid {
  id: number;
  projectId: number;
  freelancerId: number;
  amount: number;
  timeline?: string;
  coverLetter?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  project: Project;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FreelancerDashboard() {
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "projects" | "bids" | "earnings"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // In real app, fetch from API
      setProfile({
        id: 1,
        userId: 1,
        phone: "+91 9876543210",
        bio: "Experienced embedded systems engineer with 5+ years of experience in IoT, ASIC design, and R&D projects.",
        title: "Senior Embedded Systems Engineer",
        hourlyRate: 50,
        availability: "Available",
        timezone: "IST",
        languages: ["English", "Hindi"],
        experience: "5+ years",
        education: "B.Tech in Electronics Engineering",
        certifications: ["AWS IoT", "ARM Cortex", "FPGA Design"],
        portfolio: "https://johnportfolio.com",
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        photoUrl: "/api/placeholder/150/150",
        isEmailVerified: true,
        isPhoneVerified: true,
        isIdentityVerified: false,
        isBankVerified: false,
        profileCompletion: 75,
        status: "active",
        isAvailable: true,
        totalEarnings: 15000,
        totalProjects: 12,
        completedProjects: 10,
        averageRating: 4.8,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
      });

      setProjects([
        {
          id: 1,
          title: "IoT Smart Home System",
          description: "Design and develop a complete IoT smart home system with sensors and mobile app",
          category: "EMBEDDED",
          subcategory: "IoT",
          budget: 5000,
          budgetType: "fixed",
          deadline: "2024-02-15T00:00:00Z",
          status: "IN_PROGRESS",
          clientId: 1,
          freelancerId: 1,
          isPublic: true,
          isUrgent: false,
          skillsRequired: ["Arduino", "ESP32", "React Native", "Node.js"],
          experienceLevel: "intermediate",
          timeline: "6 weeks",
          location: "remote",
          attachments: [],
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-15T00:00:00Z",
          client: {
            company: "TechCorp",
            user: {
              name: "Jane Smith",
              email: "jane@techcorp.com",
            },
          },
        },
      ]);

      setBids([
        {
          id: 1,
          projectId: 2,
          freelancerId: 1,
          amount: 3000,
          timeline: "4 weeks",
          coverLetter: "I have extensive experience in embedded systems and can deliver this project within the timeline.",
          status: "pending",
          createdAt: "2024-01-10T00:00:00Z",
          updatedAt: "2024-01-10T00:00:00Z",
          project: {
            id: 2,
            title: "ASIC Design for IoT Device",
            description: "Design an ASIC for low-power IoT device",
            category: "ASIC",
            clientId: 2,
            isPublic: true,
            isUrgent: false,
            skillsRequired: ["ASIC", "Verilog", "Cadence"],
            attachments: [],
            createdAt: "2024-01-05T00:00:00Z",
            updatedAt: "2024-01-05T00:00:00Z",
            status: "PENDING",
            client: {
              user: {
                name: "Bob Johnson",
                email: "bob@company.com",
              },
            },
          },
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.name}!
            </h1>
            <p className="text-xl text-gray-600">
              Freelancer Dashboard - Find your next project
            </p>
          </motion.div>

          {/* Profile Completion Alert */}
          {profile && profile.profileCompletion < 100 && (
            <motion.div variants={itemVariants}>
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-900">
                          Complete Your Profile
                        </h3>
                        <p className="text-orange-700">
                          {profile.profileCompletion}% complete - Complete your profile to get more projects
                        </p>
                        <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${profile.profileCompletion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowProfileSetup(true)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants}>
            <div className="flex space-x-1 rounded-xl bg-white/50 p-1 backdrop-blur-sm">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "profile", label: "Profile", icon: Settings },
                { id: "projects", label: "Projects", icon: Briefcase },
                { id: "bids", label: "My Bids", icon: Target },
                { id: "earnings", label: "Earnings", icon: DollarSign },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white shadow-md text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Earnings
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${profile?.totalEarnings?.toLocaleString() || 0}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Completed Projects
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {profile?.completedProjects || 0}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Average Rating
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {profile?.averageRating || 0}
                        </p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Active Bids
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {bids.filter(bid => bid.status === "pending").length}
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>
                    Your latest project assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {project.description.substring(0, 100)}...
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline">{project.category}</Badge>
                            <span className="text-sm text-gray-500">
                              Client: {project.client.user.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              Budget: ${project.budget?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              project.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800"
                                : project.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {project.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div variants={itemVariants} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your professional profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Title
                      </label>
                      <Input
                        value={profile?.title || ""}
                        placeholder="e.g., Senior Embedded Systems Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hourly Rate ($)
                      </label>
                      <Input
                        type="number"
                        value={profile?.hourlyRate || ""}
                        placeholder="50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      value={profile?.bio || ""}
                      placeholder="Tell clients about yourself and your expertise..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {profile?.certifications?.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Languages
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {profile?.languages?.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>
                    Complete verification to build trust with clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          profile?.isEmailVerified ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {profile?.isEmailVerified ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Email Verification</h3>
                          <p className="text-sm text-gray-600">
                            {profile?.isEmailVerified ? "Verified" : "Pending"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {profile?.isEmailVerified ? "Verified" : "Verify"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          profile?.isPhoneVerified ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {profile?.isPhoneVerified ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Phone Verification</h3>
                          <p className="text-sm text-gray-600">
                            {profile?.isPhoneVerified ? "Verified" : "Pending"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {profile?.isPhoneVerified ? "Verified" : "Verify"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          profile?.isIdentityVerified ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {profile?.isIdentityVerified ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Identity Verification</h3>
                          <p className="text-sm text-gray-600">
                            {profile?.isIdentityVerified ? "Verified" : "Pending"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {profile?.isIdentityVerified ? "Verified" : "Verify"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          profile?.isBankVerified ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {profile?.isBankVerified ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Bank Verification</h3>
                          <p className="text-sm text-gray-600">
                            {profile?.isBankVerified ? "Verified" : "Pending"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {profile?.isBankVerified ? "Verified" : "Verify"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div variants={itemVariants} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>My Projects</CardTitle>
                  <CardDescription>
                    Projects you're currently working on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline">{project.category}</Badge>
                            <span className="text-sm text-gray-500">
                              Client: {project.client.user.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              Budget: ${project.budget?.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">
                              Timeline: {project.timeline}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              project.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800"
                                : project.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {project.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Bids Tab */}
          {activeTab === "bids" && (
            <motion.div variants={itemVariants} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>My Bids</CardTitle>
                  <CardDescription>
                    Proposals you've submitted for projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {bid.project.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {bid.coverLetter}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline">{bid.project.category}</Badge>
                            <span className="text-sm text-gray-500">
                              Your Bid: ${bid.amount.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">
                              Timeline: {bid.timeline}
                            </span>
                            <span className="text-sm text-gray-500">
                              Submitted: {new Date(bid.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              bid.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : bid.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {bid.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Earnings
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${profile?.totalEarnings?.toLocaleString() || 0}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          This Month
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          $2,500
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Pending
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          $800
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings History</CardTitle>
                  <CardDescription>
                    Your payment history and transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">IoT Smart Home System</h3>
                        <p className="text-sm text-gray-600">Client: TechCorp</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+$2,500</p>
                        <p className="text-sm text-gray-600">Jan 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Embedded Controller</h3>
                        <p className="text-sm text-gray-600">Client: InnovateLabs</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+$1,800</p>
                        <p className="text-sm text-gray-600">Jan 10, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


