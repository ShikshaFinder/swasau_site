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
      role: UserRole.INTERN,
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
      role: UserRole.INTERN,
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
      role: UserRole.INTERN,
      emailVerified: true,
    },
  });

  // Create Intern profiles
  const intern1 = await prisma.intern.upsert({
    where: { email: "alice@email.com" },
    update: {},
    create: {
      userId: internUser1.id,
      name: "Alice Smith",
      email: "alice@email.com",
      phone: "+1-555-1001",
      qualification: "Computer Science - B.Tech",
      resumeLink: "https://example.com/alice-resume.pdf",
      portfolio: "https://alice-portfolio.com",
      github: "https://github.com/alice",
      linkedin: "https://linkedin.com/in/alice-smith",
      skills: JSON.stringify([
        "React",
        "Node.js",
        "TypeScript",
        "Python",
        "AI/ML",
      ]),
      experience: "2 years of full-stack development",
      availability: 40,
      status: "selected",
      isSelected: true,
      whyJoin:
        "I want to work on cutting-edge projects and expand my AI/ML skills",
    },
  });

  const intern2 = await prisma.intern.upsert({
    where: { email: "bob@email.com" },
    update: {},
    create: {
      userId: internUser2.id,
      name: "Bob Wilson",
      email: "bob@email.com",
      phone: "+1-555-1002",
      qualification: "Information Technology - B.Tech",
      resumeLink: "https://example.com/bob-resume.pdf",
      portfolio: "https://bob-dev.com",
      github: "https://github.com/bob",
      linkedin: "https://linkedin.com/in/bob-wilson",
      skills: JSON.stringify(["Vue.js", "PHP", "Laravel", "MySQL", "IoT"]),
      experience: "1 year of web development",
      availability: 35,
      status: "selected",
      isSelected: true,
      whyJoin:
        "I'm passionate about IoT development and want to contribute to innovative projects",
    },
  });

  const intern3 = await prisma.intern.upsert({
    where: { email: "carol@email.com" },
    update: {},
    create: {
      userId: internUser3.id,
      name: "Carol Brown",
      email: "carol@email.com",
      phone: "+1-555-1003",
      qualification: "Computer Engineering - B.Tech",
      resumeLink: "https://example.com/carol-resume.pdf",
      portfolio: "https://carol-designs.com",
      github: "https://github.com/carol",
      linkedin: "https://linkedin.com/in/carol-brown",
      skills: JSON.stringify([
        "UI/UX Design",
        "React",
        "Angular",
        "Figma",
        "Blockchain",
      ]),
      experience: "1.5 years of frontend development and design",
      availability: 30,
      status: "selected",
      isSelected: true,
      whyJoin:
        "I love creating beautiful user experiences and want to work on innovative design projects",
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

  // Create Assignments
  await prisma.assignment.create({
    data: {
      projectId: project1.id,
      internId: intern1.id,
      notes: "Lead developer for mobile app frontend",
    },
  });

  await prisma.assignment.create({
    data: {
      projectId: project1.id,
      internId: intern2.id,
      notes: "Backend API development and database design",
    },
  });

  await prisma.assignment.create({
    data: {
      projectId: project3.id,
      internId: intern1.id,
      notes: "Machine learning model development and training",
    },
  });

  await prisma.assignment.create({
    data: {
      projectId: project4.id,
      internId: intern3.id,
      notes: "UI/UX design and frontend implementation",
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("\n📋 Created accounts:");
  console.log("👤 Admin: admin@swasau.com / admin123");
  console.log("🏢 Client 1: john@techcorp.com / client123");
  console.log("🏢 Client 2: sarah@startup.io / client123");
  console.log("👨‍💻 Intern 1: alice@email.com / intern123");
  console.log("👨‍💻 Intern 2: bob@email.com / intern123");
  console.log("👨‍💻 Intern 3: carol@email.com / intern123");
  console.log("\n📊 Created 4 projects with assignments");
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
