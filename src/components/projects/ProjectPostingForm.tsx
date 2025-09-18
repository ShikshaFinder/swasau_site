"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Upload,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Target,
  FileText,
  AlertCircle,
} from "lucide-react";

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  budget: string;
  budgetType: string;
  deadline: string;
  timeline: string;
  location: string;
  experienceLevel: string;
  skillsRequired: string[];
  attachments: string[];
  isUrgent: boolean;
  isPublic: boolean;
}

interface ProjectPostingFormProps {
  onSubmit: (data: ProjectFormData) => void;
  loading?: boolean;
  initialData?: Partial<ProjectFormData>;
}

const categories = [
  { value: "EMBEDDED", label: "Embedded Systems", subcategories: ["IoT", "Microcontrollers", "Firmware", "Hardware Design"] },
  { value: "ASIC", label: "ASIC Design", subcategories: ["Digital Design", "Analog Design", "Verification", "Physical Design"] },
  { value: "RND", label: "R&D Projects", subcategories: ["Research", "Prototyping", "Testing", "Innovation"] },
  { value: "IOT", label: "IoT", subcategories: ["Sensors", "Connectivity", "Data Analytics", "Cloud Integration"] },
  { value: "AI", label: "Artificial Intelligence", subcategories: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP"] },
  { value: "WEBSITE", label: "Website Development", subcategories: ["Frontend", "Backend", "Full Stack", "E-commerce"] },
  { value: "SOFTWARE", label: "Software Development", subcategories: ["Desktop", "Mobile", "API", "Database"] },
  { value: "MOBILE_APP", label: "Mobile App", subcategories: ["iOS", "Android", "React Native", "Flutter"] },
  { value: "BLOCKCHAIN", label: "Blockchain", subcategories: ["Smart Contracts", "DeFi", "NFT", "Web3"] },
  { value: "CYBERSECURITY", label: "Cybersecurity", subcategories: ["Penetration Testing", "Security Audit", "Compliance", "Incident Response"] },
  { value: "DATA_ANALYTICS", label: "Data Analytics", subcategories: ["Data Science", "Business Intelligence", "Visualization", "Big Data"] },
  { value: "HARDWARE", label: "Hardware", subcategories: ["PCB Design", "Circuit Design", "Prototyping", "Manufacturing"] },
  { value: "FIRMWARE", label: "Firmware", subcategories: ["Device Drivers", "RTOS", "Bootloader", "Low-level Programming"] },
  { value: "OTHER", label: "Other", subcategories: [] },
];

const budgetTypes = [
  { value: "fixed", label: "Fixed Price" },
  { value: "hourly", label: "Hourly Rate" },
  { value: "negotiable", label: "Negotiable" },
];

const experienceLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
];

const locations = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const commonSkills = [
  "Arduino", "ESP32", "Raspberry Pi", "C/C++", "Python", "JavaScript", "React", "Node.js",
  "Verilog", "VHDL", "Cadence", "Synopsys", "FPGA", "ARM Cortex", "STM32", "PIC",
  "IoT", "Bluetooth", "WiFi", "LoRa", "Zigbee", "MQTT", "REST API", "GraphQL",
  "Machine Learning", "TensorFlow", "PyTorch", "OpenCV", "Computer Vision",
  "PCB Design", "Altium", "KiCad", "Eagle", "Circuit Design", "Power Management",
  "Embedded Linux", "FreeRTOS", "Zephyr", "Bare Metal", "Device Drivers",
  "Testing", "Debugging", "Validation", "Certification", "Compliance"
];

export function ProjectPostingForm({ onSubmit, loading = false, initialData }: ProjectPostingFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "EMBEDDED",
    subcategory: "",
    budget: "",
    budgetType: "fixed",
    deadline: "",
    timeline: "",
    location: "remote",
    experienceLevel: "intermediate",
    skillsRequired: [],
    attachments: [],
    isUrgent: false,
    isPublic: true,
    ...initialData,
  });

  const [newSkill, setNewSkill] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skillsRequired.includes(skill)) {
      handleInputChange("skillsRequired", [...formData.skillsRequired, skill]);
    }
    setNewSkill("");
    setShowSkillInput(false);
  };

  const handleRemoveSkill = (skill: string) => {
    handleInputChange("skillsRequired", formData.skillsRequired.filter(s => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Post a New Project
          </CardTitle>
          <CardDescription>
            Describe your project requirements to find the right freelancer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., IoT Smart Home System with Mobile App"
                required
                className="mt-1"
              />
            </div>

            {/* Project Description */}
            <div>
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Provide detailed description of your project, including requirements, deliverables, and any specific technical details..."
                rows={6}
                required
                className="mt-1"
              />
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => {
                    handleInputChange("category", e.target.value);
                    handleInputChange("subcategory", "");
                  }}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange("subcategory", e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select subcategory</option>
                  {selectedCategory?.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="budgetType">Budget Type *</Label>
                <select
                  id="budgetType"
                  value={formData.budgetType}
                  onChange={(e) => handleInputChange("budgetType", e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {budgetTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="budget">Budget ($) *</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="5000"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="timeline">Project Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange("timeline", e.target.value)}
                  placeholder="e.g., 6 weeks, 2 months"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Experience Level and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experienceLevel">Experience Level Required</Label>
                <select
                  id="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="location">Work Location</Label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills Required */}
            <div>
              <Label>Skills Required</Label>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {!showSkillInput ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSkillInput(true)}
                    className="mb-3"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Skill
                  </Button>
                ) : (
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Enter skill name"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddSkill(newSkill)}
                      size="sm"
                    >
                      Add
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowSkillInput(false)}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                <div className="text-sm text-gray-600 mb-2">Common skills:</div>
                <div className="flex flex-wrap gap-2">
                  {commonSkills.slice(0, 10).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleAddSkill(skill)}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <Label htmlFor="deadline">Project Deadline</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Project Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isUrgent"
                  checked={formData.isUrgent}
                  onChange={(e) => handleInputChange("isUrgent", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="isUrgent" className="text-sm font-medium">
                  This is an urgent project
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => handleInputChange("isPublic", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="isPublic" className="text-sm font-medium">
                  Make this project public (visible to all freelancers)
                </Label>
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <Label>Project Attachments</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, DOCX, XLS, XLSX, PNG, JPG up to 10MB
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Posting Project..." : "Post Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}


