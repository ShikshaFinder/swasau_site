# AI Cybersecurity Scanner

A secure Next.js application for uploading security data files and triggering AI-powered security analysis using Azure Container Instances and Cloudflare R2 storage.

## Features

- 🔐 **Secure Authentication**: Session-based authentication with origin validation
- 📁 **File Upload**: Secure multipart form data upload to Cloudflare R2
- 🔍 **AI Analysis**: Azure Container Instance-based security scanning
- 🛡️ **Security**: Rate limiting, CORS protection, and access control
- 📊 **Real-time Status**: Job status tracking and result retrieval
- 🌐 **Browser Extension Support**: Special handling for browser extension clients

## Architecture

```
Frontend (Next.js) → API Routes → Azure Container Instance
                ↓
            Cloudflare R2 (Storage)
                ↓
            Scan Results (Protected)
```

## Prerequisites

- Node.js 18+ and npm
- Cloudflare R2 account and bucket
- Azure subscription with Container Instances enabled
- Azure Container Registry (optional, for custom scanner images)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your settings:

```bash
cp env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Authentication
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Cloudflare R2 (S3-compatible)
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_REGION=auto
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=ai-cybersecurity-scans
R2_PUBLIC_URL=https://your-bucket.your-subdomain.com

# Azure Container Instance
AZURE_SUBSCRIPTION_ID=your-azure-subscription-id
AZURE_RESOURCE_GROUP=your-resource-group
AZURE_CONTAINER_GROUP_NAME=ai-security-scanner
AZURE_CONTAINER_NAME=security-scanner
AZURE_CONTAINER_IMAGE=your-registry.azurecr.io/security-scanner:latest
AZURE_CPU=1
AZURE_MEMORY=1.5
AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
AZURE_TENANT_ID=your-azure-tenant-id

# Security
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
EXTENSION_SECRET=your-extension-secret-key

# Application
NODE_ENV=development
```

### 3. Azure Setup

1. **Create a Service Principal**:
   ```bash
   az ad sp create-for-rbac --name "ai-security-scanner" --role contributor
   ```

2. **Enable Container Instances**:
   ```bash
   az provider register --namespace Microsoft.ContainerInstance
   ```

3. **Create Resource Group**:
   ```bash
   az group create --name your-resource-group --location eastus
   ```

### 4. Cloudflare R2 Setup

1. Create an R2 bucket in your Cloudflare dashboard
2. Generate API tokens with appropriate permissions
3. Configure CORS if needed for direct browser access

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## API Endpoints

### Authentication

#### POST `/api/auth/login`
Simple login endpoint for testing.

**Request:**
```json
{
  "email": "test@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "1",
    "email": "test@example.com",
    "name": "Test User",
    "role": "user"
  }
}
```

### File Upload

#### POST `/api/upload`
Upload security data files for analysis.

**Headers:**
- `Authorization: Bearer <token>` or session cookie
- `X-Client: Extension` (for browser extension)

**Request:** Multipart form data
- `captured_data.txt` (required)
- `network_log.json` (required)

**Response:**
```json
{
  "success": true,
  "fileUrls": {
    "capturedData": "https://...",
    "networkLog": "https://..."
  },
  "userId": "1"
}
```

### Security Analysis

#### POST `/api/start-analyze`
Trigger security analysis using Azure Container Instance.

**Headers:**
- `Authorization: Bearer <token>` or session cookie
- `X-Client: Extension` (for browser extension)

**Response:**
```json
{
  "status": "queued",
  "jobId": "scan-uuid-123",
  "estimatedTime": "30s"
}
```

#### GET `/api/scan-status/:jobId`
Get the current status of a scan job.

**Response:**
```json
{
  "jobId": "scan-uuid-123",
  "status": "processing",
  "estimatedTime": "30s"
}
```

#### GET `/api/scan-result/:userId`
Retrieve scan results (user or Azure container only).

**Headers:**
- `Authorization: Bearer <token>` (user)
- `Authorization: Bearer <extension-secret>` (Azure container)

**Response:**
```json
{
  "success": true,
  "result": {
    "scanId": "scan-uuid-123",
    "timestamp": "2024-01-01T00:00:00Z",
    "threats": [...],
    "summary": {
      "totalThreats": 1,
      "riskScore": 65,
      "recommendations": [...]
    }
  },
  "userId": "1",
  "accessedAt": "2024-01-01T00:00:00Z"
}
```

### Callback

#### POST `/api/scan-callback`
Azure container callback endpoint.

**Headers:**
- `Authorization: Bearer <extension-secret>`

**Request:**
```json
{
  "jobId": "scan-uuid-123",
  "userId": "1",
  "status": "completed",
  "result": {...}
}
```

## Security Features

### Authentication
- Session-based authentication with secure cookies
- Bearer token support for API clients
- User-specific access control

### Origin Validation
- CORS protection with allowed origins
- Special handling for browser extensions (`X-Client: Extension`)
- Rate limiting per user/IP

### File Security
- Signed URLs with 1-hour expiration for Azure containers
- User-specific file storage paths
- File size and type validation

### Access Control
- Users can only access their own scan results
- Azure containers use shared secret authentication
- All API endpoints require authentication

## Azure Container Scanner

The Azure Container Instance runs a security scanner that:

1. Downloads input files using signed URLs
2. Performs security analysis
3. Uploads results using signed PUT URL
4. Calls back to notify completion

### Environment Variables (Container)
- `CAPTURED_DATA_URL`: Signed URL for captured data
- `NETWORK_LOG_URL`: Signed URL for network logs
- `OUTPUT_URL`: Signed URL for scan results
- `USER_ID`: User identifier
- `JOB_ID`: Job identifier
- `CALLBACK_URL`: Callback endpoint URL
- `CALLBACK_SECRET`: Shared secret for authentication

## Development

### Testing
1. Start the development server
2. Login with test credentials
3. Generate test files using the UI
4. Upload files and trigger analysis
5. Monitor scan status and results

### Customization
- Modify Azure container image for custom security analysis
- Add additional file types and validation
- Implement database storage for scan results
- Add webhook notifications for scan completion

## Production Deployment

### Security Considerations
- Use strong, unique secrets for all environment variables
- Enable HTTPS in production
- Implement proper database storage
- Add comprehensive logging and monitoring
- Use Azure Key Vault for secret management

### Scaling
- Implement Redis for rate limiting and caching
- Use Azure Container Apps for better scaling
- Add load balancing for high availability
- Implement proper error handling and retries

## License

MIT License - see LICENSE file for details.
