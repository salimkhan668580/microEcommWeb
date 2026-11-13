"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("This Month");

  // 1. Orders Section Stats
  const orderStats = [
    {
      title: "Total Orders",
      value: "3,480",
      change: "+8.4%",
      isPositive: true,
      subtext: "vs last month",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      bg: "bg-blue-50",
    },
    {
      title: "Pending Orders",
      value: "42",
      change: "4 Urgent",
      isPositive: false,
      subtext: "awaiting dispatch",
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-amber-50",
    },
    {
      title: "Completed Orders",
      value: "3,290",
      change: "94.5%",
      isPositive: true,
      subtext: "fulfillment rate",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      bg: "bg-emerald-50",
    },
    {
      title: "Return Orders",
      value: "148",
      change: "4.2%",
      isPositive: false,
      subtext: "of total orders",
      icon: (
        <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      bg: "bg-rose-50",
    },
  ];

  // 2. Product Section Stats
  const productStats = [
    {
      title: "Total Products",
      value: "842",
      change: "+28 new",
      isPositive: true,
      subtext: "active items",
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bg: "bg-purple-50",
    },
    {
      title: "In Stock Products",
      value: "818",
      change: "97.1%",
      isPositive: true,
      subtext: "healthy inventory",
      icon: (
        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-teal-50",
    },
    {
      title: "Low / Out of Stock",
      value: "24",
      change: "6 out of stock",
      isPositive: false,
      subtext: "requires restock",
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bg: "bg-orange-50",
    },
    {
      title: "Active Categories",
      value: "14",
      change: "Electronics top",
      isPositive: true,
      subtext: "catalog groups",
      icon: (
        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      bg: "bg-cyan-50",
    },
  ];

  // 3. Payment & Revenue Section Stats
  const paymentStats = [
    {
      title: "Total Revenue",
      value: "$142,850",
      change: "+15.3%",
      isPositive: true,
      subtext: "gross income",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-emerald-50",
    },
    {
      title: "Returned Amount",
      value: "$3,240",
      change: "2.2%",
      isPositive: false,
      subtext: "refunded to customers",
      icon: (
        <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-rose-50",
    },
    {
      title: "Net Revenue",
      value: "$139,610",
      change: "+14.8%",
      isPositive: true,
      subtext: "after refunds",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bg: "bg-gray-100",
    },
    {
      title: "Average Order Value",
      value: "$96.50",
      change: "+$4.20",
      isPositive: true,
      subtext: "per transaction",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      bg: "bg-blue-50",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-9842",
      customer: "Salim Khan",
      email: "salim@example1.com",
      items: 2,
      total: "$329.49",
      status: "Processing",
      payment: "Paid",
      date: "Today, 14:32",
    },
    {
      id: "#ORD-9841",
      customer: "Ayesha Verma",
      email: "ayesha.v@example.com",
      items: 1,
      total: "$84.00",
      status: "Shipped",
      payment: "Paid",
      date: "Today, 11:15",
    },
    {
      id: "#ORD-9840",
      customer: "Marcus Vance",
      email: "marcus.v@example.com",
      items: 3,
      total: "$259.97",
      status: "Delivered",
      payment: "Paid",
      date: "Yesterday",
    },
    {
      id: "#ORD-9839",
      customer: "Elena Rostova",
      email: "elena.r@example.com",
      items: 1,
      total: "$129.50",
      status: "Pending",
      payment: "Pending",
      date: "Yesterday",
    },
    {
      id: "#ORD-9838",
      customer: "David Chen",
      email: "david.c@example.com",
      items: 4,
      total: "$412.00",
      status: "Delivered",
      payment: "Paid",
      date: "Nov 12, 2026",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Noise-Canceling Headphones",
      sales: "1,240 sold",
      revenue: "$247,987",
      progress: "85%",
    },
    {
      name: "Minimalist Smart Watch Pro",
      sales: "980 sold",
      revenue: "$126,910",
      progress: "65%",
    },
    {
      name: "Urban Travel Backpack",
      sales: "820 sold",
      revenue: "$68,880",
      progress: "54%",
    },
    {
      name: "Classic Chronograph Wristwatch",
      sales: "640 sold",
      revenue: "$112,000",
      progress: "42%",
    },
  ];

  const renderStatGroup = (
    sectionTitle: string,
    sectionSubtitle: string,
    items: typeof orderStats
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">{sectionTitle}</h2>
          <p className="text-xs text-gray-500">{sectionSubtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {stat.title}
              </span>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}
              >
                {stat.icon}
              </div>
            </div>

            <div className="mt-3">
              <span className="text-2xl font-black text-gray-900 tracking-tight block">
                {stat.value}
              </span>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span
                  className={`font-bold flex items-center gap-0.5 ${
                    stat.isPositive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-400">{stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Section-wise breakdown of orders, products, and financial metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-2xs focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>

          <button
            type="button"
            onClick={() => alert("Exporting report...")}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* SECTION 1: Order Section Cards */}
      {renderStatGroup(
        "Orders Overview",
        "Order statuses, processing velocity, and returns",
        orderStats
      )}

      {/* SECTION 2: Product Section Cards */}
      {renderStatGroup(
        "Products & Inventory",
        "Catalog size, stock availability, and catalog categories",
        productStats
      )}

      {/* SECTION 3: Payment & Revenue Section Cards */}
      {renderStatGroup(
        "Revenue & Payments",
        "Gross sales, customer refunds, and average transaction size",
        paymentStats
      )}

      {/* Tables Grid: Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Recent Orders Table (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time purchase activity
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Total</th>
                  <th className="py-3.5 px-6">Payment</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-mono font-bold text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {order.email}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {order.total}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.payment === "Paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : order.status === "Processing"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-400">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (4 Columns) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Top Products</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Highest grossing inventory
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Manage →
            </Link>
          </div>

          <div className="space-y-5">
            {topProducts.map((prod) => (
              <div key={prod.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="font-semibold text-gray-900 truncate max-w-[200px]"
                    title={prod.name}
                  >
                    {prod.name}
                  </span>
                  <span className="font-bold text-primary">{prod.revenue}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>{prod.sales}</span>
                  <span>{prod.progress}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: prod.progress }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/admin/products"
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              + Add New Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
