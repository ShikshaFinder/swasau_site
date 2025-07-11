export interface User {
  id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  createdAt: Date;
}

export interface Session {
  user: User;
  expires: string;
}

export interface UploadResponse {
  success: boolean;
  fileUrls: {
    capturedData: string;
    networkLog: string;
  };
  userId: string;
}

export interface AnalyzeResponse {
  status: "queued";
  jobId: string;
  estimatedTime: string;
}

export interface ScanResult {
  id: string;
  userId: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
  completedAt?: Date;
  report?: any;
  error?: string;
}

export interface ScanStatusResponse {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  estimatedTime?: string;
  result?: any;
}

export interface AzureContainerConfig {
  subscriptionId: string;
  resourceGroup: string;
  containerGroupName: string;
  containerName: string;
  image: string;
  cpu: number;
  memory: number;
}

export interface SignedUrlConfig {
  capturedDataUrl: string;
  networkLogUrl: string;
  outputUrl: string;
  userId: string;
  jobId: string;
}
