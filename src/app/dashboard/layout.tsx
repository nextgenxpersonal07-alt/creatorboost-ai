"use client";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F8FF]">
        <div className="w-64 border-r bg-white p-6 space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="space-y-2 pt-10">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
        <div className="flex-1 p-8">
          <Skeleton className="h-20 w-1/3 mb-10 rounded-lg" />
          <div className="grid grid-cols-3 gap-6">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          <Skeleton className="h-[400px] w-full mt-10 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F8FF]">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto h-screen p-8">
        {children}
      </main>
    </div>
  );
}
