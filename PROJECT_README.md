# Swasau IT Project Aggregation Platform

A comprehensive full-stack web application built with Next.js for managing IT projects, interns, and client relationships. The platform provides role-based dashboards for clients, interns, and administrators.

## 🚀 Features

### 👥 Role-Based Access Control
- **Clients**: Submit projects, track progress, view assigned intern counts
- **Interns**: View assigned projects, track work progress
- **Admins**: Manage projects, assign interns, monitor platform metrics

### 📊 Client Dashboard
- Submit new project requests with detailed requirements
- View all submitted projects with real-time status updates
- Track project progress (Pending → In Progress → Completed)
- Monitor assigned intern counts per project
- Budget and deadline management

### 💼 Intern Dashboard
- View assigned projects only (privacy-focused)
- Access project details and client information
- Track project deadlines and requirements
- View assignment history and notes

### 🔧 Admin Dashboard
- Complete project management and oversight
- Intern assignment and management
- Project status updates and monitoring
- Platform analytics and metrics
- Client and intern relationship management

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS, Framer Motion animations
- **Backend**: Next.js API Routes, Server Actions
- **Database**: SQLite (development), PostgreSQL (production) with Prisma ORM
- **Authentication**: Role-based middleware
- **UI Components**: Custom shadcn/ui inspired components

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── projects/           # Project CRUD operations
│   │   ├── assignments/        # Intern assignment management
│   │   ├── clients/            # Client management
│   │   └── admin/              # Admin-only endpoints
│   ├── dashboard/              # Role-based dashboards
│   │   ├── client/             # Client dashboard
│   │   ├── intern/             # Intern dashboard
│   │   ├── admin/              # Admin dashboard
│   │   └── page.tsx            # Dashboard router
│   └── unauthorized/           # Access denied page
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── forms/                  # Form components
│   ├── dashboard/              # Dashboard-specific components
│   └── animations/             # Framer Motion components
├── lib/
│   └── utils.ts                # Utility functions
└── middleware.ts               # Route protection and role-based access
```

## 🗃 Database Schema

### Core Models

**User**
- Basic authentication and role information
- Linked to Client or Intern profiles

**Client**
- Company information and contact details
- One-to-many relationship with Projects

**Intern**
- Skills, availability, and portfolio information
- Many-to-many relationship with Projects via Assignments

**Project**
- Project details, requirements, and status
- Budget and deadline tracking
- Belongs to Client, assigned to multiple Interns

**Assignment**
- Junction table linking Interns to Projects
- Assignment notes and timestamps

### Enums
- **UserRole**: CLIENT, INTERN, ADMIN
- **ProjectCategory**: IOT, AI, WEBSITE, SOFTWARE, MOBILE_APP, BLOCKCHAIN, CYBERSECURITY, DATA_ANALYTICS, OTHER
- **ProjectStatus**: PENDING, IN_PROGRESS, COMPLETED, ON_HOLD, CANCELLED

## 🔐 Security & Access Control

### Middleware Protection
- Route-level protection based on user roles
- API endpoint security with role validation
- Automatic redirects for unauthorized access

### Data Privacy
- Clients cannot see intern personal details
- Interns can only view assigned projects
- Role-based data filtering in API responses

## 🎨 UI/UX Features

### Animations
- Framer Motion page transitions
- Staggered card animations
- Loading states and micro-interactions

### Responsive Design
- Mobile-first approach with TailwindCSS
- Adaptive layouts for all device sizes
- Touch-friendly interface elements

### Visual Design
- Glass morphism effects with backdrop blur
- Gradient backgrounds and modern color schemes
- Consistent component design system

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swasau_site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database URL and other configuration.

4. **Set up the database**
   ```bash
   # Run migrations
   npm run db:migrate
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Use the seeded accounts to test different roles

## 👤 Test Accounts

After running the seed script, you can use these accounts:

### Admin
- **Email**: admin@swasau.com
- **Password**: admin123
- **Access**: Full platform management

### Clients
- **Email**: john@techcorp.com / sarah@startup.io
- **Password**: client123
- **Access**: Project submission and tracking

### Interns
- **Email**: alice@email.com / bob@email.com / carol@email.com
- **Password**: intern123
- **Access**: Assigned project viewing

## 🔧 API Endpoints

### Projects
- `GET /api/projects` - Get projects (role-filtered)
- `POST /api/projects` - Create project (clients only)
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Assignments
- `GET /api/assignments` - Get assignments (admin only)
- `POST /api/assignments` - Create assignment (admin only)
- `DELETE /api/assignments` - Remove assignment (admin only)

### Admin
- `GET /api/admin/stats` - Platform statistics (admin only)
- `GET /api/clients` - Client management (admin only)

## 📊 Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npm run db:migrate

# Reset database (caution: deletes all data)
npm run db:reset

# Seed database with sample data
npm run db:seed

# View database in Prisma Studio
npx prisma studio
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your Git repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Run migrations: `npx prisma migrate deploy`
4. Start production server: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 Development Notes

### Code Organization
- **Components**: Reusable UI components in `/components`
- **Pages**: Route-based pages in `/app`
- **API**: Backend logic in `/app/api`
- **Types**: TypeScript interfaces from Prisma schema

### Best Practices
- Role-based access control at multiple levels
- Type safety with TypeScript and Prisma
- Error handling and validation with Zod
- Responsive design with mobile-first approach
- Performance optimization with Next.js features

### Future Enhancements
- Real-time notifications with WebSockets
- File upload for project documents
- Advanced filtering and search
- Project collaboration tools
- Time tracking for interns
- Payment integration for project budgets

## 📞 Support

For questions or support regarding this platform:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for Swasau Technologies**
