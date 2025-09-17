"use client";

import { useState } from "react";
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
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { validatePhoneNumber } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  resumeLink: string;
  portfolio: string;
  github: string;
  linkedin: string;
  skills: string;
  experience: string;
  project: string;
  whyJoin: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export function InternshipForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    resumeLink: "",
    portfolio: "",
    github: "",
    linkedin: "",
    skills: "",
    experience: "",
    project: "",
    whyJoin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field when user starts typing
    setValidationErrors((prev) =>
      prev.filter((error) => error.field !== field)
    );

    // Clear phone error when user starts typing
    if (field === "phone") {
      setPhoneError("");
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    const error = validationErrors.find((error) => error.field === fieldName);
    return error?.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number if provided
    if (formData.phone) {
      const phoneValidation = validatePhoneNumber(formData.phone);
      if (!phoneValidation.isValid) {
        setPhoneError(phoneValidation.error || "Invalid phone number");
        return;
      }
    }

    setPhoneError("");
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setValidationErrors([]);

    try {
      const response = await fetch("/api/interns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          qualification: "",
          resumeLink: "",
          portfolio: "",
          github: "",
          linkedin: "",
          skills: "",
          experience: "",
          project: "",
          whyJoin: "",
        });
      } else {
        setSubmitStatus("error");

        // Handle validation errors from API
        if (data.details && Array.isArray(data.details)) {
          const errors: ValidationError[] = data.details.map((error: any) => ({
            field: error.path[0],
            message: error.message,
          }));
          setValidationErrors(errors);
          setErrorMessage("Please fix the validation errors below");
        } else {
          setErrorMessage(data.error || "Failed to submit application");
        }
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Internship Application
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Join our team and work on cutting-edge embedded systems and IoT
            projects
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitStatus === "success" && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Application submitted successfully! We'll review your
                application and get back to you soon.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className={
                    getFieldError("name")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("name") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("name")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className={
                    getFieldError("email")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("email") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("email")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="9876543210"
                  className={
                    getFieldError("phone") || phoneError
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {(getFieldError("phone") || phoneError) && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("phone") || phoneError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) =>
                    handleInputChange("qualification", e.target.value)
                  }
                  placeholder="e.g., B.Tech Electronics, M.Tech VLSI"
                  required
                  className={
                    getFieldError("qualification")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("qualification") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("qualification")}
                  </p>
                )}
              </div>
            </div>

            {/* Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Professional Links
              </h3>

              <div className="space-y-2">
                <Label htmlFor="resumeLink">
                  Resume Link (Google Drive/Dropbox) *
                </Label>
                <Input
                  id="resumeLink"
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) =>
                    handleInputChange("resumeLink", e.target.value)
                  }
                  placeholder="https://drive.google.com/file/d/..."
                  required
                  className={
                    getFieldError("resumeLink")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("resumeLink") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("resumeLink")}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Upload your resume to Google Drive, Dropbox, or similar and
                  share the link
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Link</Label>
                  <Input
                    id="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) =>
                      handleInputChange("portfolio", e.target.value)
                    }
                    placeholder="https://your-portfolio.com"
                    className={
                      getFieldError("portfolio")
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                  />
                  {getFieldError("portfolio") && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("portfolio")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    type="url"
                    value={formData.github}
                    onChange={(e) =>
                      handleInputChange("github", e.target.value)
                    }
                    placeholder="https://github.com/username"
                    className={
                      getFieldError("github")
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                  />
                  {getFieldError("github") && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("github")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/username"
                    className={
                      getFieldError("linkedin")
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                  />
                  {getFieldError("linkedin") && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError("linkedin")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills and Experience */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Technical Skills *</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="e.g., C/C++, Python, Arduino, STM32, PCB Design, IoT, Embedded Systems..."
                  rows={3}
                  required
                  className={
                    getFieldError("skills")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("skills") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("skills")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="Describe any relevant projects, internships, or work experience..."
                  rows={3}
                  className={
                    getFieldError("experience")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("experience") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("experience")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project You'd Like to Work On</Label>
                <Textarea
                  id="project"
                  value={formData.project}
                  onChange={(e) => handleInputChange("project", e.target.value)}
                  placeholder="Describe a project idea you'd like to work on during the internship..."
                  rows={3}
                  className={
                    getFieldError("project")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {getFieldError("project") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("project")}
                  </p>
                )}
              </div>
            </div>

            {/* Why Join */}
            <div className="space-y-2">
              <Label htmlFor="whyJoin">
                Why Do You Want to Join Swasau Technologies? *
              </Label>
              <Textarea
                id="whyJoin"
                value={formData.whyJoin}
                onChange={(e) => handleInputChange("whyJoin", e.target.value)}
                placeholder="Tell us about your motivation, what you hope to learn, and how this internship aligns with your career goals..."
                rows={4}
                required
                className={
                  getFieldError("whyJoin")
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
              />
              {getFieldError("whyJoin") && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError("whyJoin")}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Please provide at least 10 characters explaining your
                motivation.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-lg font-semibold"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
