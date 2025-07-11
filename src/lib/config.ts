export const config = {
  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },

  // Cloudflare R2 (S3-compatible)
  r2: {
    endpoint: process.env.R2_ENDPOINT || '',
    region: process.env.R2_REGION || 'auto',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || 'ai-cybersecurity-scans',
  },

  // Azure Container Instance
  azure: {
    subscriptionId: process.env.AZURE_SUBSCRIPTION_ID || '',
    resourceGroup: process.env.AZURE_RESOURCE_GROUP || '',
    containerGroupName: process.env.AZURE_CONTAINER_GROUP_NAME || 'ai-security-scanner',
    containerName: process.env.AZURE_CONTAINER_NAME || 'security-scanner',
    image: process.env.AZURE_CONTAINER_IMAGE || 'your-registry.azurecr.io/security-scanner:latest',
    cpu: parseInt(process.env.AZURE_CPU || '1'),
    memory: parseFloat(process.env.AZURE_MEMORY || '1.5'),
    clientId: process.env.AZURE_CLIENT_ID || '',
    clientSecret: process.env.AZURE_CLIENT_SECRET || '',
    tenantId: process.env.AZURE_TENANT_ID || '',
  },

  // Security
  security: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    extensionSecret: process.env.EXTENSION_SECRET || 'your-extension-secret',
    signedUrlExpiry: 3600, // 1 hour in seconds
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
  },

  // Application
  app: {
    name: 'AI Cybersecurity Scanner',
    version: '1.0.0',
  },
} as const;

export type Config = typeof config; 