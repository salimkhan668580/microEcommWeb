"use client";

import React, { useState, useEffect } from "react";
import AddCouponModal, { CouponFormData } from "./AddCouponModal";

export interface CouponItem {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  expiryDate: string;
  isActive: boolean;
}

export default function CouponManagement() {
  const [coupons, setCoupons] = useState<CouponItem[]>([
    {
      id: "coup-1",
      code: "WELCOME20",
      description: "First purchase introductory discount for new users",
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 499,
      maxDiscountAmount: 500,
      usageLimit: 500,
      usedCount: 284,
      startDate: "2026-01-01",
      expiryDate: "2026-12-31",
      isActive: true,
    },
    {
      id: "coup-2",
      code: "FLAT500",
      description: "Flat $500 discount on flagship smartphones & laptops",
      discountType: "fixed",
      discountValue: 500,
      minOrderAmount: 25000,
      usageLimit: 100,
      usedCount: 68,
      startDate: "2026-10-01",
      expiryDate: "2026-11-30",
      isActive: true,
    },
    {
      id: "coup-3",
      code: "FESTIVE15",
      description: "Festive electronics and gadgets promotional offer",
      discountType: "percentage",
      discountValue: 15,
      minOrderAmount: 1500,
      maxDiscountAmount: 750,
      usageLimit: 1000,
      usedCount: 890,
      startDate: "2026-11-01",
      expiryDate: "2026-11-20",
      isActive: true,
    },
    {
      id: "coup-4",
      code: "FREESHIP",
      description: "Free delivery voucher for orders above $299",
      discountType: "fixed",
      discountValue: 50,
      minOrderAmount: 299,
      usageLimit: 200,
      usedCount: 200,
      startDate: "2026-09-01",
      expiryDate: "2026-10-31",
      isActive: false,
    },
    {
      id: "coup-5",
      code: "FLASH30",
      description: "Weekend flash clearance sale discount",
      discountType: "percentage",
      discountValue: 30,
      minOrderAmount: 999,
      maxDiscountAmount: 600,
      usageLimit: 150,
      usedCount: 45,
      startDate: "2026-11-10",
      expiryDate: "2026-11-18",
      isActive: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Stats
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  const inactiveCoupons = coupons.filter((c) => !c.isActive).length;
  const totalRedemptions = coupons.reduce((acc, c) => acc + c.usedCount, 0);

  const handleOpenAddModal = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (coupon: CouponItem) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleToggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setCoupons((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSaveCoupon = (data: CouponFormData) => {
    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((item) =>
          item.id === editingCoupon.id
            ? {
                ...item,
                ...data,
              }
            : item
        )
      );
    } else {
      const newItem: CouponItem = {
        ...data,
        id: `coup-${Date.now()}`,
        usedCount: 0,
      };
      setCoupons((prev) => [newItem, ...prev]);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
  }, []);

  const isExpired = (expiryDate: string) => {
    if (!currentDate) return false;
    return expiryDate < currentDate;
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "All" || coupon.discountType === typeFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" ? coupon.isActive : !coupon.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Coupons & Promotions
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create promotional discount vouchers, manage redemption limits, and track savings
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer self-start sm:self-auto"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Coupon
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Coupons */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total Coupons
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {totalCoupons}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
        </div>

        {/* Active Coupons */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Active Coupons
            </span>
            <span className="text-2xl font-black text-emerald-600 tracking-tight mt-1 block">
              {activeCoupons}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Inactive / Expired */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Inactive / Expired
            </span>
            <span className="text-2xl font-black text-gray-400 tracking-tight mt-1 block">
              {inactiveCoupons}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
        </div>

        {/* Total Redemptions */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Times Redeemed
            </span>
            <span className="text-2xl font-black text-blue-600 tracking-tight mt-1 block">
              {totalRedemptions}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coupon code or description..."
            className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary shadow-xs"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">Coupon Code</th>
                <th className="py-3.5 px-6">Discount</th>
                <th className="py-3.5 px-6">Min Order</th>
                <th className="py-3.5 px-6">Usage Limit</th>
                <th className="py-3.5 px-6">Validity Window</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No coupons found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => {
                  const expired = isExpired(coupon.expiryDate);
                  const usagePercent = Math.min(
                    100,
                    Math.round((coupon.usedCount / coupon.usageLimit) * 100)
                  );

                  return (
                    <tr
                      key={coupon.id}
                      className="hover:bg-gray-50/50 transition"
                    >
                      {/* Code & Description */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 tracking-wider">
                            {coupon.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(coupon.code)}
                            className="text-gray-400 hover:text-primary transition p-1"
                            title="Copy Code"
                          >
                            {copiedCode === coupon.code ? (
                              <span className="text-[10px] text-emerald-600 font-bold">
                                Copied!
                              </span>
                            ) : (
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                        {coupon.description && (
                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 max-w-xs">
                            {coupon.description}
                          </p>
                        )}
                      </td>

                      {/* Discount Value */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900">
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}% OFF`
                            : `$${coupon.discountValue} FLAT`}
                        </span>
                        {coupon.maxDiscountAmount && (
                          <span className="block text-[10px] text-gray-400">
                            Up to ${coupon.maxDiscountAmount}
                          </span>
                        )}
                      </td>

                      {/* Min Order */}
                      <td className="py-4 px-6 font-semibold text-gray-700">
                        ${coupon.minOrderAmount}
                      </td>

                      {/* Usage */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700 mb-1">
                          <span>
                            {coupon.usedCount} / {coupon.usageLimit}
                          </span>
                          <span className="text-gray-400">
                            {usagePercent}%
                          </span>
                        </div>
                        <div className="w-28 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              usagePercent >= 100
                                ? "bg-red-500"
                                : usagePercent >= 75
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </td>

                      {/* Validity Window */}
                      <td className="py-4 px-6">
                        <div className="text-[11px] text-gray-600 font-medium">
                          {coupon.startDate} &rarr; {coupon.expiryDate}
                        </div>
                        {expired ? (
                          <span className="inline-block mt-0.5 text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                            Expired
                          </span>
                        ) : (
                          <span className="inline-block mt-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Valid
                          </span>
                        )}
                      </td>

                      {/* Active Status Toggle */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(coupon.id)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              coupon.isActive ? "bg-emerald-600" : "bg-gray-300"
                            }`}
                            title={
                              coupon.isActive
                                ? "Active (Click to disable)"
                                : "Inactive (Click to activate)"
                            }
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                coupon.isActive
                                  ? "translate-x-4"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span
                            className={`text-[10px] font-bold ${
                              coupon.isActive
                                ? "text-emerald-700"
                                : "text-gray-400"
                            }`}
                          >
                            {coupon.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(coupon)}
                            className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary hover:bg-gray-50 transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(coupon.id)}
                            className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition cursor-pointer"
                            title="Delete Coupon"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
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
      </div>

      {/* Add / Edit Coupon Modal */}
      <AddCouponModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCoupon}
        initialData={editingCoupon}
      />
    </div>
  );
}

