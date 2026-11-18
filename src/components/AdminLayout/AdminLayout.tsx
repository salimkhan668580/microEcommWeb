"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

function isLoggedInAdmin(): boolean {
  if (typeof window === "undefined") return false;

  const adminToken = localStorage.getItem("admin_token");
  const token = localStorage.getItem("token");
  const adminRaw = localStorage.getItem("admin");

  if (!adminRaw || (!adminToken && !token)) return false;

  try {
    const admin = JSON.parse(adminRaw) as { role?: string };
    return String(admin?.role || "").toLowerCase() === "admin";
  } catch {
    return false;
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoggedInAdmin()) {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        Checking access...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
