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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Edit3,
  Trash2,
} from "lucide-react";

// Mock user data - in real app, get from auth context
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "CLIENT" as const,
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

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
}

const categories = [
  "EMBEDDED",
  "ASIC",
  "RND",
  "IOT",
  "AI",
  "WEBSITE",
  "SOFTWARE",
  "MOBILE_APP",
  "BLOCKCHAIN",
  "CYBERSECURITY",
  "DATA_ANALYTICS",
  "HARDWARE",
  "FIRMWARE",
  "OTHER",
];

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function ClientDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "WEBSITE",
    budget: "",
    deadline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `/api/projects?userId=${mockUser.id}&role=${mockUser.role}`
      );
      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects || []);
      } else {
        setError(data.error || "Failed to fetch projects");
      }
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const projectData = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        deadline: formData.deadline || undefined,
        userId: mockUser.id,
        role: mockUser.role,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (response.ok) {
        setProjects((prev) => [data.project, ...prev]);
        setShowCreateForm(false);
        setFormData({
          title: "",
          description: "",
          category: "WEBSITE",
          budget: "",
          deadline: "",
        });
      } else {
        setError(data.error || "Failed to create project");
      }
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              Welcome back, {mockUser.name}
            </h1>
            <p className="text-xl text-gray-600">
              Manage your projects and track progress
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        In Progress
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          projects.filter((p) => p.status === "IN_PROGRESS")
                            .length
                        }
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-600" />
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
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
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
                        {projects.reduce(
                          (acc, p) => acc + p._count.assignments,
                          0
                        )}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Create Project Button */}
          <motion.div variants={itemVariants} className="flex justify-end">
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </motion.div>

          {/* Create Project Form */}
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              variants={itemVariants}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Create New Project</CardTitle>
                  <CardDescription>
                    Tell us about your project requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Enter project title"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (Optional)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budget: e.target.value,
                            }))
                          }
                          placeholder="Enter budget"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline (Optional)</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              deadline: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe your project requirements in detail"
                        rows={4}
                        required
                      />
                    </div>

                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Project"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Projects List */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Projects
            </h2>

            {projects.length === 0 ? (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No projects yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first project to get started
                  </p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">
                              {project.title}
                            </CardTitle>
                            <Badge
                              className={`${
                                statusColors[project.status]
                              } text-xs font-medium`}
                            >
                              {project.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {project.description}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-700">
                              Category:
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {project.category.replace("_", " ")}
                            </Badge>
                          </div>

                          {project.budget && (
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-gray-700">
                                ${project.budget.toLocaleString()}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-700">
                              {project._count.assignments} intern
                              {project._count.assignments !== 1 ? "s" : ""}{" "}
                              assigned
                            </span>
                          </div>

                          {project.deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-orange-600" />
                              <span className="text-gray-700">
                                Due:{" "}
                                {new Date(
                                  project.deadline
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
