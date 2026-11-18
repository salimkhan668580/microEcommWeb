"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { userService } from "@/src/service/admin/user.service";
import type { UpdateAdminUserPayload } from "@/src/types/user";

const EMPTY_FORM: UpdateAdminUserPayload = {
  name: "",
  email: "",
  phone: "",
};

export default function UserEdit() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const userId = params?.id;

  const [form, setForm] = useState<UpdateAdminUserPayload>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const res = await userService.getUserById(userId);
      if (!res?.user) {
        setError("User not found");
        setForm(EMPTY_FORM);
        return;
      }
      setForm({
        name: res.user.name || "",
        email: res.user.email || "",
        phone: res.user.phone || "",
      });
    } catch (err: any) {
      console.error("Failed to fetch user for edit:", err);
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to load user";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange =
    (field: keyof UpdateAdminUserPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || isSaving) return;

    const payload: UpdateAdminUserPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (!payload.name || !payload.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setIsSaving(true);
      await userService.updateUser(userId, payload);
      toast.success("User updated successfully");
      router.push(`/admin/users/${userId}`);
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to update user";
      toast.error(errMsg);
      console.error("Update user error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => router.push(userId ? `/admin/users/${userId}` : "/admin/users")}
            className="mt-1 p-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
            title="Back"
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
              {userId && (
                <>
                  <Link
                    href={`/admin/users/${userId}`}
                    className="hover:text-primary transition"
                  >
                    Details
                  </Link>
                  <span className="mx-1.5">/</span>
                </>
              )}
              <span className="text-gray-600">Edit</span>
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit User</h1>
            <p className="text-xs text-gray-500 mt-1">
              Update name, email, and phone for this member
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-sm text-gray-400">
          Loading user...
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
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-2xl"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Profile fields</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Update the member&apos;s contact details
            </p>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() =>
                router.push(userId ? `/admin/users/${userId}` : "/admin/users")
              }
              disabled={isSaving}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition ${
                isSaving ? "opacity-60 cursor-wait" : "cursor-pointer"
              }`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
