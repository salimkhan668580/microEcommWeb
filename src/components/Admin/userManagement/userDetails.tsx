"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { userService } from "@/src/service/admin/user.service";
import type { AdminUser } from "@/src/types/user";

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function UserDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const userId = params?.id;

  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const res = await userService.getUserById(userId);
      setUser(res?.user ?? null);
      if (!res?.user) {
        setError("User not found");
      }
    } catch (err: any) {
      console.error("Failed to fetch user details:", err);
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to load user details";
      setError(errMsg);
      toast.error(errMsg);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="mt-1 p-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
            title="Back to users"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <p className="text-xs text-gray-400 mb-1">
              <Link href="/admin/users" className="hover:text-primary transition">
                User Management
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-gray-600">Details</span>
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              User Details
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Profile overview for this member. More sections can be added later.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-sm text-gray-400">
          Loading user details...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-sm text-rose-500 mb-4">{error}</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={fetchUser}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold cursor-pointer"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/users")}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 cursor-pointer"
            >
              Back to list
            </button>
          </div>
        </div>
      ) : user ? (
        <>
          {/* Profile summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 truncate">{user.name}</h2>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      user.isActive
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        user.isActive ? "bg-green-600" : "bg-rose-600"
                      }`}
                    />
                    {user.isActive ? "Active" : "Blocked"}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-50 text-gray-600 border border-gray-200 capitalize">
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate">{user.email}</p>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">ID: {user.id}</p>
              </div>
            </div>
          </div>

          {/* Account information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Account Information</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Core profile fields returned by the admin users API
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              <DetailField label="Full Name" value={user.name} />
              <DetailField label="Email" value={user.email} />
              <DetailField label="Phone" value={user.phone || "—"} />
              <DetailField label="Role" value={user.role} capitalize />
              <DetailField
                label="Status"
                value={user.isActive ? "Active" : "Blocked"}
              />
              <DetailField label="Joined" value={formatDateTime(user.createdAt)} />
              <DetailField label="Last Updated" value={formatDateTime(user.updatedAt)} />
              <DetailField label="User ID" value={user.id} mono />
            </div>
          </div>

          {/* Placeholder for future modules */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 sm:p-8">
            <h3 className="text-sm font-bold text-gray-900">More details coming soon</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Order history, spending summary, addresses, and activity logs can be added here
              when those admin APIs are ready.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

function DetailField({
  label,
  value,
  capitalize,
  mono,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="px-6 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-medium text-gray-900 break-all ${
          capitalize ? "capitalize" : ""
        } ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
