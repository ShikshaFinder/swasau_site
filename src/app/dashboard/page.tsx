"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Request {
  id: number;
  url: string;
  method: string;
  headers: any;
  body: string | null;
  timestamp: string;
  status: string;
  analysis?: {
    id: number;
    result: any;
    status: string;
    createdAt: string;
    completedAt: string | null;
  };
}

interface ApiToken {
  id: number;
  token: string;
  name: string;
  createdAt: string;
  lastUsed: string | null;
}

export default function Dashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [apiToken, setApiToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);

  // Mock authentication - in real app, get from session/cookies
  const [user, setUser] = useState({
    email: "demo@example.com",
    name: "Demo User",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      // In real app, get token from session
      const token = localStorage.getItem("apiToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function generateToken() {
    setTokenLoading(true);
    try {
      // In real app, use actual user credentials from session
      const response = await fetch("/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: "demo-password", // In real app, get from secure session
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setApiToken(data.token);
        localStorage.setItem("apiToken", data.token);
        setShowToken(true);
      }
    } catch (error) {
      console.error("Error generating token:", error);
    } finally {
      setTokenLoading(false);
    }
  }

  function copyToken() {
    navigator.clipboard.writeText(apiToken);
    alert("Token copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* API Token Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Browser Extension Setup
          </h2>
          <p className="text-gray-600 mb-4">
            Generate an API token to connect your browser extension and start
            capturing requests.
          </p>

          {!showToken ? (
            <Button
              onClick={generateToken}
              disabled={tokenLoading}
              className="bg-primary hover:bg-primary/80"
            >
              {tokenLoading ? "Generating..." : "Generate API Token"}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Your API Token:</p>
                <code className="text-sm bg-white p-2 rounded border break-all">
                  {apiToken}
                </code>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToken} variant="outline">
                  Copy Token
                </Button>
                <Button onClick={() => setShowToken(false)} variant="outline">
                  Generate New Token
                </Button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Extension Setup Instructions:</strong>
                </p>
                <ol className="text-sm text-blue-700 mt-2 list-decimal list-inside space-y-1">
                  <li>Copy the API token above</li>
                  <li>Open your browser extension settings</li>
                  <li>Paste the token in the authentication field</li>
                  <li>Start capturing requests on your target website</li>
                  <li>View captured requests below</li>
                </ol>
              </div>
            </div>
          )}
        </Card>

        {/* Requests Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Captured Requests</h2>
            <Button onClick={fetchRequests} variant="outline">
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No requests captured yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                Set up your browser extension and start browsing to capture
                requests.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          request.method === "GET"
                            ? "bg-green-100 text-green-800"
                            : request.method === "POST"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request.method}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(request.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : request.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-900 mb-2 truncate">
                    {request.url}
                  </p>

                  {request.analysis && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Analysis Status: {request.analysis.status}
                      </p>
                      {request.analysis.status === "completed" && (
                        <pre className="text-xs text-gray-600 overflow-auto">
                          {JSON.stringify(request.analysis.result, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
