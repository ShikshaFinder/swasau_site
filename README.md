# Swasau Technologies - Custom Embedded Solutions

A comprehensive Next.js application for custom embedded systems development, IoT solutions, and product engineering services.

## 🚀 Features

- 🔧 **Custom Embedded Design**: Microcontroller firmware and PCB design
- 🌐 **IoT Development**: End-to-end IoT product development
- 🧠 **AI & ML Integration**: Intelligent solutions for automation
- 📱 **Web Development**: Modern web applications and digital solutions
- 🏭 **Industrial Automation**: Custom solutions for factory and process automation
- 🛡️ **Security**: Rate limiting, CORS protection, and access control

## 🏗️ Architecture

- **Frontend**: Next.js 14 with React 18
- **Backend**: Next.js API routes with Prisma ORM
- **Database**: PostgreSQL with Prisma
- **Storage**: Cloudflare R2 (S3-compatible)
- **Authentication**: NextAuth.js with email verification
- **Styling**: Tailwind CSS with Framer Motion animations
- **UI Components**: Radix UI primitives with custom styling

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Cloudflare R2 account (or AWS S3)
- Resend account for email services

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swasau-technologies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the following variables:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/swasau_technologies
   
   # Authentication
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   
   # Email (Resend)
   RESEND_API_KEY=your-resend-api-key
   
   # Storage (Cloudflare R2)
   R2_ACCOUNT_ID=your-r2-account-id
   R2_ACCESS_KEY_ID=your-r2-access-key
   R2_SECRET_ACCESS_KEY=your-r2-secret-key
   R2_BUCKET_NAME=swasau-technologies-files
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   ├── services/          # Services page
│   └── about/             # About page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── animations/       # Animation components
├── lib/                  # Utility functions
└── prisma/               # Database schema
```

## 🔧 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/forgot-password` - Password reset
- `POST /api/verify-email` - Email verification

### File Management
- `POST /api/upload` - File upload to R2 storage
- `GET /api/files` - List uploaded files

### Project Development
- `POST /api/projects` - Create new project
- `GET /api/projects` - List projects
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🛡️ Security Features

### Authentication & Authorization
- Email verification required for new accounts
- Password reset functionality
- Session management with NextAuth.js
- Protected API routes

### File Security
- Secure file upload with validation
- Cloudflare R2 storage with access control
- File type and size restrictions

### API Security
- Rate limiting on all endpoints
- CORS protection
- Input validation with Zod schemas
- SQL injection prevention with Prisma

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
```bash
# Build the image
docker build -t swasau-technologies .

# Run the container
docker run -p 3000:3000 swasau-technologies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: info@swasau.com
- **Phone**: +91-9876543210
- **Website**: https://swasau.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first styling
- Framer Motion for smooth animations
