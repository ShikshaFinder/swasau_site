"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FileUpload() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [analyzeResult, setAnalyzeResult] = useState<any>(null);
  const [scanStatus, setScanStatus] = useState<any>(null);
  const [scanResult, setScanResult] = useState<any>(null);

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
        alert("Login successful!");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
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
          <CardTitle>AI Cybersecurity Scanner</CardTitle>
          <CardDescription>
            Upload security data files and trigger AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoggedIn ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please log in to use the security scanner
              </p>
              <Button onClick={handleLogin}>
                Login (test@example.com / password)
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
                    : "Start Security Analysis"}
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
