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
  Building,
  Loader2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Settings,
  Eye,
} from "lucide-react";

// Mock user data - in real app, get from auth context
const mockUser = {
  id: 1,
  name: "Admin User",
  email: "admin@swasau.com",
  role: "ADMIN" as const,
};

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  budget?: number;
  deadline?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
  createdAt: string;
  _count: { assignments: number };
  client: {
    user: { name: string; email: string };
  };
}

interface Intern {
  id: number;
  name: string;
  email: string;
  skills: string[];
  availability?: number;
  linkedin?: string;
  status: string;
}

interface Stats {
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  totalInterns: number;
  activeInterns: number;
  totalClients: number;
  pendingProjects: number;
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    totalInterns: 0,
    activeInterns: 0,
    totalClients: 0,
    pendingProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "interns" | "assignments"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch projects
      const projectsResponse = await fetch(
        `/api/projects?userId=${mockUser.id}&role=${mockUser.role}`
      );
      const projectsData = await projectsResponse.json();

      // Fetch interns
      const internsResponse = await fetch("/api/interns");
      const internsData = await internsResponse.json();

      // Fetch stats
      const statsResponse = await fetch(
        `/api/admin/stats?role=${mockUser.role}`
      );
      const statsData = await statsResponse.json();

      if (projectsResponse.ok) {
        setProjects(projectsData.projects || []);
      }

      if (internsResponse.ok) {
        setInterns(internsData.interns || []);
      }

      if (statsResponse.ok) {
        setStats(statsData.stats || stats);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignIntern = async (
    projectId: number,
    internId: number,
    notes?: string
  ) => {
    try {
      const response = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          internId,
          notes,
          role: mockUser.role,
        }),
      });

      if (response.ok) {
        fetchData(); // Refresh data
        setShowAssignModal(false);
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error assigning intern:", error);
    }
  };

  const updateProjectStatus = async (projectId: number, status: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          userId: mockUser.id,
          role: mockUser.role,
        }),
      });

      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInterns = interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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
              Swasau Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage projects, interns, and assignments
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants}>
            <div className="flex space-x-1 rounded-xl bg-white/50 p-1 backdrop-blur-sm">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "projects", label: "Projects", icon: Calendar },
                { id: "interns", label: "Interns", icon: Users },
                { id: "assignments", label: "Assignments", icon: UserPlus },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white shadow-md text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Projects
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {projects.length}
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Active Projects
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {
                            projects.filter((p) => p.status === "IN_PROGRESS")
                              .length
                          }
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Interns
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {interns.length}
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Completed
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {
                            projects.filter((p) => p.status === "COMPLETED")
                              .length
                          }
                        </p>
                      </div>
                      <div className="p-3 bg-pink-100 rounded-full">
                        <CheckCircle className="h-6 w-6 text-pink-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Latest project submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            by {project.client.user.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            className={`${
                              statusColors[project.status]
                            } text-xs`}
                          >
                            {project.status.replace("_", " ")}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {project._count.assignments} interns
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Projects
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">
                              {project.title}
                            </CardTitle>
                            <Badge
                              className={`${
                                statusColors[project.status]
                              } text-xs font-medium mb-2`}
                            >
                              {project.status.replace("_", " ")}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building className="h-4 w-4" />
                              <span>{project.client.user.name}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {project._count.assignments} interns assigned
                          </span>
                          <span className="text-gray-600">
                            {project.category.replace("_", " ")}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowAssignModal(true);
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            Assign
                          </Button>

                          <select
                            value={project.status}
                            onChange={(e) =>
                              updateProjectStatus(project.id, e.target.value)
                            }
                            className="text-xs px-2 py-1 border rounded"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="ON_HOLD">On Hold</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Interns Tab */}
          {activeTab === "interns" && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Interns
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search interns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInterns.map((intern, index) => (
                  <motion.div
                    key={intern.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">
                              {intern.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mb-2">
                              {intern.email}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {intern.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Skills:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {intern.skills?.slice(0, 3).map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {intern.skills?.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{intern.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {intern.availability && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>{intern.availability} hrs/week</span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {intern.linkedin && (
                            <Button size="sm" variant="outline">
                              LinkedIn
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Assignment Modal */}
          {showAssignModal && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Assign Intern to "{selectedProject.title}"
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Intern
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Choose an intern...</option>
                      {interns.map((intern) => (
                        <option key={intern.id} value={intern.id}>
                          {intern.name} - {intern.skills?.join(", ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      placeholder="Any special instructions or notes..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => {
                      // Handle assignment logic here
                      setShowAssignModal(false);
                      setSelectedProject(null);
                    }}
                    className="flex-1"
                  >
                    Assign
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedProject(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
