"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import {
  Lock,
  Loader2,
  Upload,
  Link as LinkIcon,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// Google Drive URL validation
const validateGoogleDriveUrl = (url: string): boolean => {
  const patterns = [
    /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/,
    /^https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/,
    /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
    /^https:\/\/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9-_]+)/,
  ];

  return patterns.some((pattern) => pattern.test(url));
};

// Extract file ID from Google Drive URL
const extractFileId = (url: string): string | null => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// Convert to shareable Google Drive URL
const convertToShareableUrl = (url: string): string => {
  const fileId = extractFileId(url);
  if (!fileId) return url;

  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
};

interface FileUploadProps {
  onFileSubmit?: (fileData: {
    url: string;
    type: string;
    name: string;
  }) => void;
  accept?: string;
  title?: string;
  description?: string;
}

export default function FileUpload({
  onFileSubmit,
  accept = "application/pdf,image/*,.doc,.docx",
  title = "File Upload",
  description = "Upload your file or provide a Google Drive link",
}: FileUploadProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [driveUrl, setDriveUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("document");
  const [uploadMethod, setUploadMethod] = useState<"drive" | "upload">("drive");
  const [submitResult, setSubmitResult] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password",
        }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        toast.success("Login successful!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed!");
    }
  };

  const handleGoogleDriveSubmit = async () => {
    if (!driveUrl.trim()) {
      toast.error("Please provide a Google Drive URL");
      return;
    }

    if (!validateGoogleDriveUrl(driveUrl)) {
      toast.error("Please provide a valid Google Drive URL");
      return;
    }

    if (!fileName.trim()) {
      toast.error("Please provide a file name");
      return;
    }

    setIsSubmitting(true);

    try {
      const shareableUrl = convertToShareableUrl(driveUrl);
      const fileData = {
        url: shareableUrl,
        type: fileType,
        name: fileName,
        source: "google_drive",
      };

      // Submit to backend or call callback
      if (onFileSubmit) {
        onFileSubmit(fileData);
      } else {
        // Default submission to API
        const response = await fetch("/api/files/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fileData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitResult(result);
          toast.success("File submitted successfully!");
          // Reset form
          setDriveUrl("");
          setFileName("");
          setFileType("document");
        } else {
          toast.error(result.error || "Submission failed");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit file");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", fileType);
      formData.append("name", fileName || file.name);

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult(result);
        toast.success("File uploaded successfully!");

        if (onFileSubmit) {
          onFileSubmit({
            url: result.url,
            type: fileType,
            name: fileName || file.name,
          });
        }
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Please log in to access the file upload feature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleLogin} className="w-full">
            Login with Demo Account
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Method Selection */}
          <div className="flex gap-4">
            <Button
              variant={uploadMethod === "drive" ? "default" : "outline"}
              onClick={() => setUploadMethod("drive")}
              className="flex-1"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Google Drive Link
            </Button>
            <Button
              variant={uploadMethod === "upload" ? "default" : "outline"}
              onClick={() => setUploadMethod("upload")}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>

          {/* Google Drive Link Method */}
          {uploadMethod === "drive" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="drive-url">Google Drive URL</Label>
                <Input
                  id="drive-url"
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Paste your Google Drive sharing link here. Make sure the file
                  is set to "Anyone with the link can view".
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-name">File Name</Label>
                <Input
                  id="file-name"
                  type="text"
                  placeholder="Enter a descriptive name for your file"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-type">File Type</Label>
                <select
                  id="file-type"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="document">Document</option>
                  <option value="image">Image</option>
                  <option value="resume">Resume</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Button
                onClick={handleGoogleDriveSubmit}
                disabled={isSubmitting || !driveUrl || !fileName}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Google Drive Link
                  </>
                )}
              </Button>
            </div>
          )}

          {/* File Upload Method */}
          {uploadMethod === "upload" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-name-upload">File Name (Optional)</Label>
                <Input
                  id="file-name-upload"
                  type="text"
                  placeholder="Enter a custom name or leave blank to use filename"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-type-upload">File Type</Label>
                <select
                  id="file-type-upload"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="document">Document</option>
                  <option value="image">Image</option>
                  <option value="resume">Resume</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload">Choose File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept={accept}
                  onChange={handleFileUpload}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX, Images
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {submitResult && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Success!</h4>
                <p className="text-sm">
                  Your file has been submitted successfully.
                </p>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
