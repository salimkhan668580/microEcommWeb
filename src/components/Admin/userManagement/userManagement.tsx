"use client";

import React, { useState } from "react";

export interface User {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  status: "Active" | "Blocked";
  role: "Customer" | "Admin";
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR-001",
      name: "Salim Khan",
      email: "salim@example1.com",
      phone: "+1 (555) 234-5678",
      joinedDate: "Today, 09:15 AM",
      ordersCount: 4,
      totalSpent: 588.99,
      status: "Active",
      role: "Customer",
    },
    {
      id: "USR-002",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      phone: "+1 (555) 345-6789",
      joinedDate: "Today, 08:30 AM",
      ordersCount: 1,
      totalSpent: 129.5,
      status: "Active",
      role: "Customer",
    },
    {
      id: "USR-003",
      name: "Alex Vance",
      email: "alex.vance@example.com",
      phone: "+1 (555) 876-5432",
      joinedDate: "Yesterday",
      ordersCount: 0,
      totalSpent: 0,
      status: "Blocked",
      role: "Customer",
    },
    {
      id: "USR-004",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+1 (555) 987-1234",
      joinedDate: "Nov 12, 2026",
      ordersCount: 8,
      totalSpent: 1420.0,
      status: "Active",
      role: "Customer",
    },
    {
      id: "USR-005",
      name: "Robert Black",
      email: "r.black@example.com",
      phone: "+1 (555) 654-9870",
      joinedDate: "Nov 10, 2026",
      ordersCount: 2,
      totalSpent: 210.0,
      status: "Blocked",
      role: "Customer",
    },
    {
      id: "USR-006",
      name: "Emily Watson",
      email: "emily.w@example.com",
      phone: "+1 (555) 432-8765",
      joinedDate: "Nov 08, 2026",
      ordersCount: 6,
      totalSpent: 890.5,
      status: "Active",
      role: "Customer",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Toggle user blocked / active status
  const handleToggleBlock = (id: string | number) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const newStatus = user.status === "Active" ? "Blocked" : "Active";
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  const handleDeleteUser = (id: string | number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Stats calculation
  const totalUsers = 14820; // global user base or users.length
  const blockedUsersCount = users.filter((u) => u.status === "Blocked").length + 84;
  const todayRegisterCount = 124;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
          onClick={() => alert("Add new user dialog")}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New User
        </button>
      </div>

      {/* SECTION 1: User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total Users
            </span>
            <span className="text-3xl font-black text-gray-900 tracking-tight mt-1 block">
              {totalUsers.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1">
              ↑ +12.5% <span className="text-gray-400 font-normal">from last month</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Blocked Users
            </span>
            <span className="text-3xl font-black text-gray-900 tracking-tight mt-1 block">
              {blockedUsersCount}
            </span>
            <span className="text-xs text-rose-600 font-semibold mt-1 inline-flex items-center gap-1">
              • Access Restricted <span className="text-gray-400 font-normal">flagged accounts</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>

        {/* Today Register */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Today Registered
            </span>
            <span className="text-3xl font-black text-gray-900 tracking-tight mt-1 block">
              +{todayRegisterCount}
            </span>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1">
              ↑ +18.2% <span className="text-gray-400 font-normal">growth velocity</span>
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
          {/* Search Input */}
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

          {/* Filter Pills / Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            <div className="flex rounded-xl bg-gray-100 p-1 text-xs">
              {["All", "Active", "Blocked"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
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
                <th className="py-3.5 px-6">Orders</th>
                <th className="py-3.5 px-6">Total Spent</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition">
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-[11px] text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {user.phone}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-gray-500">
                      {user.joinedDate}
                    </td>

                    {/* Orders count */}
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      {user.ordersCount} orders
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-6 font-bold text-gray-900">
                      ${user.totalSpent.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "Active" ? "bg-green-600" : "bg-rose-600"
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Block / Unblock Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleBlock(user.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                            user.status === "Active"
                              ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          }`}
                        >
                          {user.status === "Active" ? "Block" : "Unblock"}
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition cursor-pointer"
                          title="Delete User"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <strong className="text-gray-900">{filteredUsers.length}</strong> of{" "}
            <strong className="text-gray-900">{users.length}</strong> loaded members
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-gray-300 text-xs cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-gray-300 text-xs cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

