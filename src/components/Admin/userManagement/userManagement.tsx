"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { userService } from "@/src/service/admin/user.service";
import type {
  AdminUser,
  AdminUserStats,
  CreateAdminUserPayload,
  UsersPagination,
} from "@/src/types/user";
import AddUserModal from "./AddUserModal";

const PAGE_LIMIT = 10;

const EMPTY_STATS: AdminUserStats = {
  totalUsers: 0,
  totalUsersChangePercent: 0,
  blockedUsers: 0,
  todayRegistered: 0,
  todayRegisteredChangePercent: 0,
};

function formatChangePercent(value: number): string {
  const abs = Math.abs(value);
  const prefix = value > 0 ? "↑ +" : value < 0 ? "↓ " : "";
  return `${prefix}${abs}%`;
}

function formatJoinedDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

export default function UserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<UsersPagination>({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AdminUserStats>(EMPTY_STATS);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await userService.getUserStats();
      if (res?.stats) {
        setStats(res.stats);
      }
    } catch (err: any) {
      console.error("Failed to fetch user stats:", err);
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to load user stats";
      toast.error(errMsg);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const fetchUsers = useCallback(async (opts?: { silent?: boolean }) => {
    const silent = opts?.silent === true;
    try {
      if (!silent) {
        setIsLoading(true);
        setError(null);
      }

      const params: {
        search?: string;
        isActive?: boolean;
        page: number;
        limit: number;
      } = {
        page,
        limit: PAGE_LIMIT,
      };

      if (debouncedSearch) {
        params.search = debouncedSearch;
      }
      if (statusFilter === "Active") {
        params.isActive = true;
      } else if (statusFilter === "Blocked") {
        params.isActive = false;
      }

      const res = await userService.getUsers(params);
      setUsers(Array.isArray(res.users) ? res.users : []);
      setPagination(
        res.pagination ?? { page, limit: PAGE_LIMIT, total: 0 }
      );
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to load users";
      if (!silent) {
        setError(errMsg);
        setUsers([]);
      }
      toast.error(errMsg);
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, [debouncedSearch, statusFilter, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleToggleBlock = async (id: string) => {
    if (togglingId) return;

    try {
      setTogglingId(id);
      const res = await userService.toggleUserStatus(id);
      const nextActive = res?.user?.isActive;
      toast.success(
        typeof nextActive === "boolean"
          ? `User ${nextActive ? "activated" : "blocked"} successfully`
          : "User status updated"
      );
      await Promise.all([fetchUsers({ silent: true }), fetchStats()]);
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to update user status";
      toast.error(errMsg);
      console.error("Status toggle error:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    if (deletingId) return;

    try {
      setDeletingId(id);
      const res = await userService.deleteUser(id);
      toast.success(res?.message || "User deleted successfully");
      await Promise.all([fetchUsers({ silent: true }), fetchStats()]);
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to delete user";
      toast.error(errMsg);
      console.error("Delete user error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateUser = async (data: CreateAdminUserPayload) => {
    try {
      const res = await userService.createUser(data);
      toast.success(
        res?.user?.name
          ? `${res.user.name} created successfully`
          : "User created successfully"
      );
      await fetchStats();
      if (page !== 1) {
        setPage(1);
      } else {
        await fetchUsers({ silent: true });
      }
    } catch (err: any) {
      const fieldErrors = err?.response?.data?.errors;
      const firstFieldError =
        Array.isArray(fieldErrors) && fieldErrors[0]?.message
          ? fieldErrors[0].message
          : null;
      const errMsg =
        firstFieldError ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create user";
      toast.error(errMsg);
      console.error("Create user error:", err);
      throw err;
    }
  };

  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.limit));
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            User Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Monitor registered members, account statuses, and customer activities
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New User
        </button>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreateUser}
      />

      {/* SECTION 1: User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total Users
            </span>
            <span className="text-3xl font-black text-gray-900 tracking-tight mt-1 block">
              {stats.totalUsers.toLocaleString()}
            </span>
            <span
              className={`text-xs font-semibold mt-1 inline-flex items-center gap-1 ${
                stats.totalUsersChangePercent >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {formatChangePercent(stats.totalUsersChangePercent)}{" "}
              <span className="text-gray-400 font-normal">from last month</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Blocked Users
            </span>
            <span className="text-3xl font-black text-gray-900 tracking-tight mt-1 block">
              {stats.blockedUsers.toLocaleString()}
            </span>
            <span className="text-xs text-rose-600 font-semibold mt-1 inline-flex items-center gap-1">
              • Access Restricted{" "}
              <span className="text-gray-400 font-normal">flagged accounts</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Today Registered
            </span>
            <span className="text-3xl font-black text-gray-900 tracking-tight mt-1 block">
              +{stats.todayRegistered.toLocaleString()}
            </span>
            <span
              className={`text-xs font-semibold mt-1 inline-flex items-center gap-1 ${
                stats.todayRegisteredChangePercent >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {formatChangePercent(stats.todayRegisteredChangePercent)}{" "}
              <span className="text-gray-400 font-normal">growth velocity</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
      </div>

      {/* SECTION 2: Table Section with Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search & Filter Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name, email, or phone..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            <div className="flex rounded-xl bg-gray-100 p-1 text-xs">
              {["All", "Active", "Blocked"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusFilterChange(status)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    statusFilter === status
                      ? "bg-white text-primary shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">User</th>
                <th className="py-3.5 px-6">Contact Phone</th>
                <th className="py-3.5 px-6">Joined Date</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Loading users...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-rose-500 mb-3">{error}</p>
                    <button
                      type="button"
                      onClick={fetchUsers}
                      className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold cursor-pointer"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isActive = user.isActive;
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-[11px] text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {user.phone || "—"}
                      </td>

                      <td className="py-4 px-6 text-gray-500">
                        {formatJoinedDate(user.createdAt)}
                      </td>

                      <td className="py-4 px-6 font-semibold text-gray-900 capitalize">
                        {user.role}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isActive
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-green-600" : "bg-rose-600"
                            }`}
                          />
                          {isActive ? "Active" : "Blocked"}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(user.id)}
                            disabled={togglingId === user.id}
                            className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isActive ? "bg-emerald-600" : "bg-gray-300"
                            } ${
                              togglingId === user.id
                                ? "opacity-60 cursor-wait"
                                : "cursor-pointer"
                            }`}
                            title={
                              isActive
                                ? "Active (Click to block)"
                                : "Blocked (Click to activate)"
                            }
                            aria-pressed={isActive}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                isActive ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => router.push(`/admin/users/${user.id}`)}
                            className="p-1 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-100 transition cursor-pointer"
                            title="View User"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                            className="p-1 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-gray-100 transition cursor-pointer"
                            title="Edit User"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={deletingId === user.id}
                            className={`p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition ${
                              deletingId === user.id
                                ? "opacity-60 cursor-wait"
                                : "cursor-pointer"
                            }`}
                            title="Delete User"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <strong className="text-gray-900">{users.length}</strong> of{" "}
            <strong className="text-gray-900">{pagination.total}</strong> members
            {totalPages > 1 && (
              <>
                {" "}
                · Page <strong className="text-gray-900">{page}</strong> of{" "}
                <strong className="text-gray-900">{totalPages}</strong>
              </>
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canGoPrev || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1 rounded-lg border border-gray-200 bg-white text-xs ${
                canGoPrev && !isLoading
                  ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!canGoNext || isLoading}
              onClick={() => setPage((p) => p + 1)}
              className={`px-3 py-1 rounded-lg border border-gray-200 bg-white text-xs ${
                canGoNext && !isLoading
                  ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
