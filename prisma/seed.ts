import {
  PrismaClient,
  UserRole,
  ProjectCategory,
  ProjectStatus,
} from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create Admin User
  const hashedAdminPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@swasau.com" },
    update: {},
    create: {
      name: "Swasau Admin",
      email: "admin@swasau.com",
      password: hashedAdminPassword,
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  // Create Client Users
  const hashedClientPassword = await bcrypt.hash("client123", 12);

  const clientUser1 = await prisma.user.upsert({
    where: { email: "john@techcorp.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@techcorp.com",
      password: hashedClientPassword,
      role: UserRole.CLIENT,
      emailVerified: true,
    },
  });

  const clientUser2 = await prisma.user.upsert({
    where: { email: "sarah@startup.io" },
    update: {},
    create: {
      name: "Sarah Johnson",
      email: "sarah@startup.io",
      password: hashedClientPassword,
      role: UserRole.CLIENT,
      emailVerified: true,
    },
  });

  // Create Client profiles
  const client1 = await prisma.client.upsert({
    where: { userId: clientUser1.id },
    update: {},
    create: {
      userId: clientUser1.id,
      company: "TechCorp Inc.",
      phone: "+1-555-0123",
    },
  });

  const client2 = await prisma.client.upsert({
    where: { userId: clientUser2.id },
    update: {},
    create: {
      userId: clientUser2.id,
      company: "Startup.io",
      phone: "+1-555-0456",
    },
  });

  // Create Intern Users
  const hashedInternPassword = await bcrypt.hash("intern123", 12);

  const internUser1 = await prisma.user.upsert({
    where: { email: "alice@email.com" },
    update: {},
    create: {
      name: "Alice Smith",
      email: "alice@email.com",
      password: hashedInternPassword,
      role: UserRole.FREELANCER,
      emailVerified: true,
    },
  });

  const internUser2 = await prisma.user.upsert({
    where: { email: "bob@email.com" },
    update: {},
    create: {
      name: "Bob Wilson",
      email: "bob@email.com",
      password: hashedInternPassword,
      role: UserRole.FREELANCER,
      emailVerified: true,
    },
  });

  const internUser3 = await prisma.user.upsert({
    where: { email: "carol@email.com" },
    update: {},
    create: {
      name: "Carol Brown",
      email: "carol@email.com",
      password: hashedInternPassword,
      role: UserRole.FREELANCER,
      emailVerified: true,
    },
  });

  // Create Freelancer profiles
  const freelancer1 = await prisma.freelancer.upsert({
    where: { userId: internUser1.id },
    update: {},
    create: {
      userId: internUser1.id,
      phone: "+1-555-1001",
      bio: "Experienced full-stack developer with expertise in React, Node.js, and AI/ML technologies.",
      title: "Senior Full-Stack Developer",
      hourlyRate: 45,
      availability: "Available",
      timezone: "EST",
      languages: ["English", "Spanish"],
      experience: "5+ years",
      education: "Computer Science - B.Tech",
      certifications: ["AWS Certified", "React Professional"],
      portfolio: "https://alice-portfolio.com",
      github: "https://github.com/alice",
      linkedin: "https://linkedin.com/in/alice-smith",
      isEmailVerified: true,
      isPhoneVerified: true,
      isIdentityVerified: true,
      isBankVerified: true,
      profileCompletion: 95,
      status: "active",
      isAvailable: true,
      totalEarnings: 25000,
      totalProjects: 15,
      completedProjects: 12,
      averageRating: 4.8,
    },
  });

  const freelancer2 = await prisma.freelancer.upsert({
    where: { userId: internUser2.id },
    update: {},
    create: {
      userId: internUser2.id,
      phone: "+1-555-1002",
      bio: "Full-stack developer with expertise in Vue.js, PHP, Laravel, and IoT technologies.",
      title: "Full-Stack Developer",
      hourlyRate: 30,
      availability: "Available",
      timezone: "PST",
      languages: ["English"],
      experience: "2+ years",
      education: "Information Technology - B.Tech",
      certifications: ["Laravel Certified", "Vue.js Professional"],
      portfolio: "https://bob-dev.com",
      github: "https://github.com/bob",
      linkedin: "https://linkedin.com/in/bob-wilson",
      isEmailVerified: true,
      isPhoneVerified: true,
      isIdentityVerified: true,
      isBankVerified: true,
      profileCompletion: 90,
      status: "active",
      isAvailable: true,
      totalEarnings: 18000,
      totalProjects: 10,
      completedProjects: 8,
      averageRating: 4.7,
    },
  });

  const freelancer3 = await prisma.freelancer.upsert({
    where: { userId: internUser3.id },
    update: {},
    create: {
      userId: internUser3.id,
      phone: "+1-555-1003",
      bio: "UI/UX designer and frontend developer with expertise in React, Angular, and modern design tools.",
      title: "UI/UX Designer & Frontend Developer",
      hourlyRate: 40,
      availability: "Available",
      timezone: "CST",
      languages: ["English", "French"],
      experience: "3+ years",
      education: "Computer Engineering - B.Tech",
      certifications: ["Figma Professional", "React Certified"],
      portfolio: "https://carol-designs.com",
      github: "https://github.com/carol",
      linkedin: "https://linkedin.com/in/carol-brown",
      isEmailVerified: true,
      isPhoneVerified: true,
      isIdentityVerified: true,
      isBankVerified: true,
      profileCompletion: 85,
      status: "active",
      isAvailable: true,
      totalEarnings: 22000,
      totalProjects: 12,
      completedProjects: 10,
      averageRating: 4.9,
    },
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      title: "E-commerce Mobile App",
      description:
        "A comprehensive mobile application for online shopping with features including product catalog, shopping cart, payment integration, and user profiles.",
      category: ProjectCategory.MOBILE_APP,
      budget: 25000,
      deadline: new Date("2025-12-31"),
      status: ProjectStatus.IN_PROGRESS,
      clientId: client1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "IoT Smart Home System",
      description:
        "An intelligent home automation system that controls lighting, temperature, security cameras, and appliances through a web dashboard and mobile app.",
      category: ProjectCategory.IOT,
      budget: 35000,
      deadline: new Date("2026-03-15"),
      status: ProjectStatus.PENDING,
      clientId: client1.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: "AI-Powered Analytics Dashboard",
      description:
        "A machine learning platform that analyzes customer behavior data and provides predictive insights for business decision making.",
      category: ProjectCategory.AI,
      budget: 50000,
      deadline: new Date("2026-06-30"),
      status: ProjectStatus.IN_PROGRESS,
      clientId: client2.id,
    },
  });

  const project4 = await prisma.project.create({
    data: {
      title: "Corporate Website Redesign",
      description:
        "Complete redesign and development of company website with modern UI/UX, responsive design, and CMS integration.",
      category: ProjectCategory.WEBSITE,
      budget: 15000,
      deadline: new Date("2025-10-15"),
      status: ProjectStatus.COMPLETED,
      clientId: client2.id,
    },
  });

  // Create some sample bids
  await prisma.bid.create({
    data: {
      projectId: project1.id,
      freelancerId: freelancer1.id,
      amount: 5000,
      timeline: "6 weeks",
      coverLetter: "I have extensive experience in React Native and can deliver a high-quality mobile app within your timeline.",
      status: "accepted",
    },
  });

  await prisma.bid.create({
    data: {
      projectId: project2.id,
      freelancerId: freelancer2.id,
      amount: 3000,
      timeline: "4 weeks",
      coverLetter: "I specialize in IoT development and can help you build a comprehensive smart home system.",
      status: "pending",
    },
  });

  await prisma.bid.create({
    data: {
      projectId: project3.id,
      freelancerId: freelancer3.id,
      amount: 4000,
      timeline: "5 weeks",
      coverLetter: "I have strong experience in AI/ML projects and can deliver excellent results for your machine learning project.",
      status: "pending",
    },
  });


  console.log("✅ Seed completed successfully!");
  console.log("\n📋 Created accounts:");
  console.log("👤 Admin: admin@swasau.com / admin123");
  console.log("🏢 Client 1: john@techcorp.com / client123");
  console.log("🏢 Client 2: sarah@startup.io / client123");
  console.log("👨‍💻 Freelancer 1: alice@email.com / intern123");
  console.log("👨‍💻 Freelancer 2: bob@email.com / intern123");
  console.log("👨‍💻 Freelancer 3: carol@email.com / intern123");
  console.log("\n📊 Created 4 projects with sample bids");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
