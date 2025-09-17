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
import { Lock, Loader2, Upload, Link as LinkIcon, CheckCircle } from "lucide-react";
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
  
  return patterns.some(pattern => pattern.test(url));
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
  onFileSubmit?: (fileData: { url: string; type: string; name: string }) => void;
  accept?: string;
  title?: string;
  description?: string;
}

export default function FileUpload({ 
  onFileSubmit, 
  accept = "application/pdf,image/*,.doc,.docx", 
  title = "File Upload",
  description = "Upload your file or provide a Google Drive link"
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
      const response = await fetch("/api/auth/login", {
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
        source: "google_drive"
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
  ) => {
    const files = event.target.files;
    if (!files || files.length !== 2) {
      alert("Please select both captured_data.txt and network_log.json files");
      return;
    }

    const capturedDataFile = files[0];
    const networkLogFile = files[1];

    // Validate file names
    if (
      !capturedDataFile.name.includes("captured_data") ||
      !networkLogFile.name.includes("network_log")
    ) {
      alert(
        "Please select files with correct names: captured_data.txt and network_log.json"
      );
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("captured_data.txt", capturedDataFile);
      formData.append("network_log.json", networkLogFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadResult(result);
        alert("Files uploaded successfully!");
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/start-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAnalyzeResult(result);
        alert("Analysis started successfully!");

        // Start polling for status
        pollScanStatus(result.jobId);
      } else {
        const error = await response.json();
        alert(`Analysis failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis failed!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const pollScanStatus = async (jobId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/scan-status/${jobId}`);
        if (response.ok) {
          const status = await response.json();
          setScanStatus(status);

          if (status.status === "completed" || status.status === "failed") {
            clearInterval(pollInterval);

            if (status.status === "completed") {
              // Get the scan result
              const resultResponse = await fetch(`/api/scan-result/1`);
              if (resultResponse.ok) {
                const result = await resultResponse.json();
                setScanResult(result);
              }
            }
          }
        }
      } catch (error) {
        console.error("Status polling error:", error);
        clearInterval(pollInterval);
      }
    }, 5000); // Poll every 5 seconds
  };

  const createTestFiles = () => {
    // Create test files for demonstration
    const capturedData = `Sample captured data
Timestamp: ${new Date().toISOString()}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
IP: 192.168.1.100
Session: test-session-123`;

    const networkLog = JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        requests: [
          {
            url: "https://example.com/api/data",
            method: "GET",
            status: 200,
            duration: 150,
          },
          {
            url: "https://api.example.com/auth",
            method: "POST",
            status: 401,
            duration: 300,
          },
        ],
        summary: {
          totalRequests: 2,
          averageDuration: 225,
          errorRate: 0.5,
        },
      },
      null,
      2
    );

    // Create and download test files
    const capturedDataBlob = new Blob([capturedData], { type: "text/plain" });
    const networkLogBlob = new Blob([networkLog], { type: "application/json" });

    const capturedDataUrl = URL.createObjectURL(capturedDataBlob);
    const networkLogUrl = URL.createObjectURL(networkLogBlob);

    const capturedDataLink = document.createElement("a");
    capturedDataLink.href = capturedDataUrl;
    capturedDataLink.download = "captured_data.txt";
    capturedDataLink.click();

    const networkLogLink = document.createElement("a");
    networkLogLink.href = networkLogUrl;
    networkLogLink.download = "network_log.json";
    networkLogLink.click();

    URL.revokeObjectURL(capturedDataUrl);
    URL.revokeObjectURL(networkLogUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Embedded Systems Development</CardTitle>
          <CardDescription>
            Upload your project requirements and get started with custom
            embedded solutions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoggedIn ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Authentication Required
              </h3>
              <p className="text-muted-foreground mb-4">
                Please log in to access our embedded systems development
                platform
              </p>
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Step 1: Create Test Files
                </h3>
                <Button onClick={createTestFiles} variant="outline">
                  Generate Test Files
                </Button>
                <p className="text-sm text-gray-600">
                  This will create sample captured_data.txt and network_log.json
                  files for testing.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 2: Upload Files</h3>
                <input
                  type="file"
                  multiple
                  accept=".txt,.json"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {isUploading && (
                  <p className="text-sm text-blue-600">Uploading...</p>
                )}
                {uploadResult && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <h4 className="font-semibold text-green-800">
                      Upload Successful
                    </h4>
                    <pre className="text-sm text-green-700 mt-2">
                      {JSON.stringify(uploadResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Step 3: Start Analysis
                </h3>
                <Button
                  onClick={handleStartAnalyze}
                  disabled={isAnalyzing || !uploadResult}
                >
                  {isAnalyzing
                    ? "Starting Analysis..."
                    : "Start Project Development"}
                </Button>
                {analyzeResult && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <h4 className="font-semibold text-blue-800">
                      Analysis Started
                    </h4>
                    <pre className="text-sm text-blue-700 mt-2">
                      {JSON.stringify(analyzeResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {scanStatus && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Scan Status</h3>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-semibold text-yellow-800">
                      Status: {scanStatus.status}
                    </h4>
                    <pre className="text-sm text-yellow-700 mt-2">
                      {JSON.stringify(scanStatus, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {scanResult && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Scan Results</h3>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                    <h4 className="font-semibold text-purple-800">
                      Analysis Complete
                    </h4>
                    <pre className="text-sm text-purple-700 mt-2">
                      {JSON.stringify(scanResult, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
