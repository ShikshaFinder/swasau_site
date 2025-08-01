"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  LogOut,
  Users,
  UserPlus,
} from "lucide-react";

interface Intern {
  id: number;
  name: string;
  email: string;
  phone?: string;
  qualification: string;
  resumeLink: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  skills: string;
  experience?: string;
  project?: string;
  whyJoin: string;
  photoUrl?: string;
  isSelected: boolean;
  selectedAt?: string;
  status: "pending" | "selected" | "rejected";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Intern>>({});
  const [filter, setFilter] = useState<
    "all" | "pending" | "selected" | "rejected"
  >("all");

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await fetch("/api/interns");
      const data = await response.json();

      if (response.ok) {
        setInterns(data.interns);
      } else {
        setError("Failed to fetch interns");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (intern: Intern) => {
    setSelectedIntern(intern);
    setEditForm(intern);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!selectedIntern) return;

    try {
      const response = await fetch(`/api/interns/${selectedIntern.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchInterns();
        setIsEditing(false);
        setSelectedIntern(null);
        setEditForm({});
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update intern");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this intern?")) return;

    try {
      const response = await fetch(`/api/interns/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchInterns();
      } else {
        setError("Failed to delete intern");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      onLogout();
    } catch (error) {
      onLogout();
    }
  };

  const filteredInterns = interns.filter((intern) => {
    if (filter === "all") return true;
    return intern.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selected":
        return <Badge className="bg-green-100 text-green-800">Selected</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Internship Management
            </h1>
            <p className="text-muted-foreground">
              Manage intern applications and selections
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold">{interns.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Applications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">
                    {interns.filter((i) => i.status === "selected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Selected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">
                    {interns.filter((i) => i.status === "rejected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <UserPlus className="w-8 h-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">
                    {interns.filter((i) => i.status === "pending").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "selected", "rejected"] as const).map(
            (status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            )
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Intern List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Applications ({filteredInterns.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInterns.map((intern) => (
                    <div
                      key={intern.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedIntern?.id === intern.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedIntern(intern)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {intern.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {intern.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {intern.qualification}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {getStatusBadge(intern.status)}
                            {intern.isSelected && (
                              <Badge className="bg-blue-100 text-blue-800">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(intern);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(intern.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Intern Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Intern Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedIntern ? (
                  <div className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={editForm.name || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={editForm.email || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label>Status</Label>
                          <select
                            value={editForm.status || "pending"}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                status: e.target.value as any,
                              }))
                            }
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <Label>Selected</Label>
                          <input
                            type="checkbox"
                            checked={editForm.isSelected || false}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                isSelected: e.target.checked,
                              }))
                            }
                            className="ml-2"
                          />
                        </div>
                        <div>
                          <Label>Photo URL</Label>
                          <Input
                            value={editForm.photoUrl || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                photoUrl: e.target.value,
                              }))
                            }
                            placeholder="https://example.com/photo.jpg"
                          />
                        </div>
                        <div>
                          <Label>Admin Notes</Label>
                          <Textarea
                            value={editForm.adminNotes || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                adminNotes: e.target.value,
                              }))
                            }
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleUpdate} className="flex-1">
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false);
                              setEditForm({});
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <strong>Name:</strong> {selectedIntern.name}
                        </div>
                        <div>
                          <strong>Email:</strong> {selectedIntern.email}
                        </div>
                        <div>
                          <strong>Phone:</strong>{" "}
                          {selectedIntern.phone || "Not provided"}
                        </div>
                        <div>
                          <strong>Qualification:</strong>{" "}
                          {selectedIntern.qualification}
                        </div>
                        <div>
                          <strong>Skills:</strong> {selectedIntern.skills}
                        </div>
                        <div>
                          <strong>Status:</strong>{" "}
                          {getStatusBadge(selectedIntern.status)}
                        </div>
                        {selectedIntern.isSelected && (
                          <div>
                            <strong>Selected:</strong> Yes
                          </div>
                        )}
                        {selectedIntern.photoUrl && (
                          <div>
                            <strong>Photo:</strong>
                            <img
                              src={selectedIntern.photoUrl}
                              alt={selectedIntern.name}
                              className="w-20 h-20 object-cover rounded-md mt-2"
                            />
                          </div>
                        )}
                        {selectedIntern.adminNotes && (
                          <div>
                            <strong>Notes:</strong> {selectedIntern.adminNotes}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(selectedIntern)}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Select an intern to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
