"use client";

import { DashboardRedirect } from "@/components/dashboard/DashboardRedirect";

// Mock user data - in real app, get from auth context or API
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "CLIENT" as const,
};

export default function DashboardPage() {
  // In a real app, you would:
  // 1. Check authentication status
  // 2. Get user data from context/API
  // 3. Show loading state while fetching

  return <DashboardRedirect user={mockUser} loading={false} />;
}
