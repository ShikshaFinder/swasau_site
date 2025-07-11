import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "./config";
import { SignedUrlConfig } from "./types";

// In-memory job store (replace with database in production)
const jobStore = new Map<
  string,
  {
    status: "pending" | "processing" | "completed" | "failed";
    createdAt: Date;
    completedAt?: Date;
    result?: any;
    error?: string;
  }
>();

export class AzureContainerService {
  private client: ContainerInstanceManagementClient;
  private subscriptionId: string;
  private resourceGroup: string;

  constructor() {
    this.subscriptionId = config.azure.subscriptionId;
    this.resourceGroup = config.azure.resourceGroup;

    // Use DefaultAzureCredential for authentication
    // In production, you might want to use ClientSecretCredential
    const credential = new DefaultAzureCredential();

    this.client = new ContainerInstanceManagementClient(
      credential,
      this.subscriptionId
    );
  }

  async startSecurityScan(
    userId: string,
    jobId: string,
    signedUrls: SignedUrlConfig
  ): Promise<string> {
    try {
      const containerGroupName = `${config.azure.containerGroupName}-${jobId}`;

      // Set job status to pending
      jobStore.set(jobId, {
        status: "pending",
        createdAt: new Date(),
      });

      // Environment variables for the container
      const environmentVariables = [
        {
          name: "CAPTURED_DATA_URL",
          value: signedUrls.capturedDataUrl,
        },
        {
          name: "NETWORK_LOG_URL",
          value: signedUrls.networkLogUrl,
        },
        {
          name: "OUTPUT_URL",
          value: signedUrls.outputUrl,
        },
        {
          name: "USER_ID",
          value: userId,
        },
        {
          name: "JOB_ID",
          value: jobId,
        },
        {
          name: "CALLBACK_URL",
          value: `${config.auth.url}/api/scan-callback`,
        },
        {
          name: "CALLBACK_SECRET",
          value: config.security.extensionSecret,
        },
      ];

      const containerGroup = {
        location: "eastus", // Change to your preferred region
        containers: [
          {
            name: config.azure.containerName,
            image: config.azure.image,
            resources: {
              requests: {
                memoryInGB: config.azure.memory,
                cpu: config.azure.cpu,
              },
            },
            environmentVariables,
            ports: [
              {
                port: 80,
              },
            ],
            volumeMounts: [],
          },
        ],
        osType: "Linux",
        restartPolicy: "Never",
        ipAddress: {
          type: "Public",
          ports: [
            {
              port: 80,
              protocol: "TCP",
            },
          ],
        },
      };

      // Create the container group
      const result = await this.client.containerGroups.beginCreateOrUpdate(
        this.resourceGroup,
        containerGroupName,
        containerGroup
      );

      // Update job status to processing
      jobStore.set(jobId, {
        status: "processing",
        createdAt: new Date(),
      });

      console.log(`Started security scan for job ${jobId}`);

      // In a real implementation, you'd wait for the result
      // For now, we'll simulate completion after a delay
      setTimeout(() => {
        this.simulateScanCompletion(jobId);
      }, 30000); // 30 seconds

      return containerGroupName;
    } catch (error) {
      console.error("Error starting Azure container:", error);

      // Update job status to failed
      jobStore.set(jobId, {
        status: "failed",
        createdAt: new Date(),
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw new Error("Failed to start security scan");
    }
  }

  async getJobStatus(jobId: string): Promise<{
    status: "pending" | "processing" | "completed" | "failed";
    createdAt: Date;
    completedAt?: Date;
    result?: any;
    error?: string;
  } | null> {
    return jobStore.get(jobId) || null;
  }

  async updateJobStatus(
    jobId: string,
    status: "pending" | "processing" | "completed" | "failed",
    result?: any,
    error?: string
  ): Promise<void> {
    const job = jobStore.get(jobId);
    if (job) {
      jobStore.set(jobId, {
        ...job,
        status,
        completedAt:
          status === "completed" || status === "failed"
            ? new Date()
            : job.completedAt,
        result,
        error,
      });
    }
  }

  private async simulateScanCompletion(jobId: string): Promise<void> {
    // Simulate scan completion with mock results
    const mockResult = {
      scanId: jobId,
      timestamp: new Date().toISOString(),
      threats: [
        {
          type: "suspicious_activity",
          severity: "medium",
          description: "Detected unusual network patterns",
          confidence: 0.85,
        },
      ],
      summary: {
        totalThreats: 1,
        riskScore: 65,
        recommendations: [
          "Review network logs for suspicious activity",
          "Consider implementing additional monitoring",
        ],
      },
    };

    await this.updateJobStatus(jobId, "completed", mockResult);
    console.log(`Scan completed for job ${jobId}`);
  }

  async cleanupContainer(jobId: string): Promise<void> {
    try {
      const containerGroupName = `${config.azure.containerGroupName}-${jobId}`;

      await this.client.containerGroups.beginDelete(
        this.resourceGroup,
        containerGroupName
      );

      console.log(`Cleaned up container group: ${containerGroupName}`);
    } catch (error) {
      console.error("Error cleaning up container:", error);
    }
  }
}

export const azureService = new AzureContainerService();
