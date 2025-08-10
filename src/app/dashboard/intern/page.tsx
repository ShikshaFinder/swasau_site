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
import {
  Calendar,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  Building,
  Loader2,
  ExternalLink,
  Mail,
  Globe,
} from "lucide-react";

// Mock user data - in real app, get from auth context
const mockUser = {
  id: 1,
  name: "Jane Smith",
  email: "jane@example.com",
  role: "INTERN" as const,
};

interface Assignment {
  id: number;
  notes?: string;
  assignedAt: string;
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    budget?: number;
    deadline?: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
    client: {
      user: { name: string; email: string };
    };
  };
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function InternDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        `/api/projects?userId=${mockUser.id}&role=${mockUser.role}`
      );
      const data = await response.json();

      if (response.ok) {
        // Transform projects to assignments format
        const projectsData = data.projects || [];
        const assignmentsData = projectsData.map((project: any) => ({
          id: project.assignments[0]?.id || project.id,
          notes: project.assignments[0]?.notes,
          assignedAt: project.assignments[0]?.assignedAt || project.createdAt,
          project: project,
        }));
        setAssignments(assignmentsData);
      } else {
        setError(data.error || "Failed to fetch assignments");
      }
    } catch (err) {
      setError("Failed to fetch assignments");
    } finally {
      setLoading(false);
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const activeProjects = assignments.filter(
    (a) => a.project.status === "IN_PROGRESS"
  );
  const completedProjects = assignments.filter(
    (a) => a.project.status === "COMPLETED"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50">
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
              Your assigned projects and progress
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
                        {assignments.length}
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <Calendar className="h-6 w-6 text-indigo-600" />
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
                        {activeProjects.length}
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
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {completedProjects.length}
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
                        Clients
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          new Set(
                            assignments.map((a) => a.project.client.user.email)
                          ).size
                        }
                      </p>
                    </div>
                    <div className="p-3 bg-cyan-100 rounded-full">
                      <Building className="h-6 w-6 text-cyan-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Projects List */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Assigned Projects
            </h2>

            {assignments.length === 0 ? (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No projects assigned yet
                  </h3>
                  <p className="text-gray-600">
                    You'll see your assigned projects here once an admin assigns
                    you to one.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {assignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">
                              {assignment.project.title}
                            </CardTitle>
                            <Badge
                              className={`${
                                statusColors[assignment.project.status]
                              } text-xs font-medium mb-2`}
                            >
                              {assignment.project.status.replace("_", " ")}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building className="h-4 w-4" />
                              <span>
                                Client: {assignment.project.client.user.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {assignment.project.description}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-700">
                              Category:
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {assignment.project.category.replace("_", " ")}
                            </Badge>
                          </div>

                          {assignment.project.budget && (
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-gray-700">
                                Budget: $
                                {assignment.project.budget.toLocaleString()}
                              </span>
                            </div>
                          )}

                          {assignment.project.deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-orange-600" />
                              <span className="text-gray-700">
                                Deadline:{" "}
                                {new Date(
                                  assignment.project.deadline
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-700">
                              Assigned:{" "}
                              {new Date(
                                assignment.assignedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {assignment.notes && (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Notes: </span>
                                {assignment.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>
                                {assignment.project.client.user.email}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest project updates</CardDescription>
              </CardHeader>
              <CardContent>
                {assignments.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No recent activity
                  </p>
                ) : (
                  <div className="space-y-4">
                    {assignments.slice(0, 3).map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="p-2 bg-indigo-100 rounded-full">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Assigned to {assignment.project.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {new Date(
                              assignment.assignedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            statusColors[assignment.project.status]
                          } text-xs`}
                        >
                          {assignment.project.status.replace("_", " ")}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
