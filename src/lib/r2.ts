import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "./config";

const s3Client = new S3Client({
  region: config.r2.region,
  endpoint: config.r2.endpoint,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
});

export class R2Service {
  private bucketName: string;

  constructor() {
    this.bucketName = config.r2.bucketName;
  }

  async uploadFile(
    userId: string,
    fileName: string,
    fileBuffer: Buffer,
    contentType: string
  ): Promise<string> {
    const key = `${userId}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
      Metadata: {
        userId,
        uploadedAt: new Date().toISOString(),
      },
    });

    try {
      await s3Client.send(command);
      console.log(`File uploaded successfully: ${key}`);
      return key;
    } catch (error) {
      console.error("Error uploading file to R2:", error);
      throw new Error("Failed to upload file");
    }
  }

  async generateSignedUrl(
    userId: string,
    fileName: string,
    operation: "GET" | "PUT" = "GET",
    expiresIn: number = config.security.signedUrlExpiry
  ): Promise<string> {
    const key = `${userId}/${fileName}`;

    const command =
      operation === "GET"
        ? new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
          })
        : new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
          });

    try {
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn,
      });

      console.log(`Generated ${operation} signed URL for: ${key}`);
      return signedUrl;
    } catch (error) {
      console.error("Error generating signed URL:", error);
      throw new Error("Failed to generate signed URL");
    }
  }

  async generateSignedUrlsForScan(
    userId: string,
    jobId: string
  ): Promise<{
    capturedDataUrl: string;
    networkLogUrl: string;
    outputUrl: string;
  }> {
    const [capturedDataUrl, networkLogUrl, outputUrl] = await Promise.all([
      this.generateSignedUrl(userId, "captured_data.txt", "GET"),
      this.generateSignedUrl(userId, "network_log.json", "GET"),
      this.generateSignedUrl(userId, `scan_report_${jobId}.json`, "PUT"),
    ]);

    return {
      capturedDataUrl,
      networkLogUrl,
      outputUrl,
    };
  }

  async fileExists(userId: string, fileName: string): Promise<boolean> {
    try {
      const key = `${userId}/${fileName}`;
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getFileContent(
    userId: string,
    fileName: string
  ): Promise<Buffer | null> {
    try {
      const key = `${userId}/${fileName}`;
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await s3Client.send(command);
      if (response.Body) {
        const chunks: Uint8Array[] = [];
        for await (const chunk of response.Body as any) {
          chunks.push(chunk);
        }
        return Buffer.concat(chunks);
      }
      return null;
    } catch (error) {
      console.error("Error reading file from R2:", error);
      return null;
    }
  }
}

export const r2Service = new R2Service();
