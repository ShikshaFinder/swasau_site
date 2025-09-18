"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "CLIENT" | "FREELANCER" | "ADMIN";
}

interface DashboardRedirectProps {
  user?: User | null;
  loading?: boolean;
}

export function DashboardRedirect({
  user,
  loading = false,
}: DashboardRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      switch (user.role) {
        case "CLIENT":
          router.push("/dashboard/client");
          break;
        case "FREELANCER":
          router.push("/dashboard/freelancer");
          break;
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        default:
          router.push("/login");
      }
    } else if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
