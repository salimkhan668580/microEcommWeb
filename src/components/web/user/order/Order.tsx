"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface OrderItem {
  id: string | number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  estimatedDelivery?: string;
  trackingNumber?: string;
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
}

export default function Order() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const sampleOrders: Order[] = [
    {
      id: "SH-984210",
      date: "Nov 14, 2026",
      total: 329.49,
      status: "Shipped",
      estimatedDelivery: "Nov 17, 2026",
      trackingNumber: "TRK-98234710US",
      shippingAddress: "123 Tech Park Ave, California, USA",
      paymentMethod: "Credit Card (•••• 4242)",
      items: [
        {
          id: 1,
          title: "Wireless Noise-Canceling Headphones",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
          price: 199.99,
          quantity: 1,
          color: "Dark Navy",
        },
        {
          id: 2,
          title: "Minimalist Smart Watch Pro",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
          price: 129.5,
          quantity: 1,
          color: "Silver Grey",
        },
      ],
    },
    {
      id: "SH-842195",
      date: "Nov 02, 2026",
      total: 84.0,
      status: "Delivered",
      estimatedDelivery: "Nov 06, 2026",
      trackingNumber: "TRK-48190234US",
      shippingAddress: "123 Tech Park Ave, California, USA",
      paymentMethod: "PayPal (salim@example1.com)",
      items: [
        {
          id: 5,
          title: "Urban Travel Backpack",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
          price: 84.0,
          quantity: 1,
          color: "Black",
        },
      ],
    },
    {
      id: "SH-719302",
      date: "Oct 24, 2026",
      total: 175.0,
      status: "Delivered",
      estimatedDelivery: "Oct 28, 2026",
      trackingNumber: "TRK-39182741US",
      shippingAddress: "123 Tech Park Ave, California, USA",
      paymentMethod: "Apple Pay",
      items: [
        {
          id: 3,
          title: "Classic Chronograph Wristwatch",
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
          price: 175.0,
          quantity: 1,
          color: "Brown Leather",
        },
      ],
    },
  ];

  const filterTabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesFilter =
      selectedFilter === "All" || order.status === selectedFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) =>
        i.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
            Delivered
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Shipped / In Transit
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            Processing
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50/50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/account/profile" className="hover:text-primary transition">
            Account
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Orders</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track recent orders, view invoices, and manage returns
            </p>
          </div>

          {/* Search Order */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID or item..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedFilter === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Listing */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              We couldn&apos;t find any orders matching your selected criteria.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50/80 px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-gray-400 block text-[11px]">ORDER PLACED</span>
                      <span className="font-semibold text-gray-900">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">TOTAL</span>
                      <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">SHIP TO</span>
                      <span className="font-semibold text-gray-900 truncate max-w-[140px] block">
                        Salim Khan
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-gray-400 block text-[11px]">ORDER #</span>
                      <span className="font-mono font-bold text-gray-800">{order.id}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading invoice for ${order.id}`)}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer border border-gray-200 bg-white px-3 py-1.5 rounded-lg shadow-2xs hover:bg-gray-50 transition"
                    >
                      Invoice
                    </button>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="px-5 sm:px-6 py-3.5 bg-gray-50/30 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    {order.estimatedDelivery && (
                      <span className="text-xs text-gray-600">
                        Estimated Delivery: <strong className="text-gray-900">{order.estimatedDelivery}</strong>
                      </span>
                    )}
                  </div>

                  {order.trackingNumber && (
                    <span className="text-xs text-gray-500 font-mono">
                      Tracking: <strong className="text-gray-800">{order.trackingNumber}</strong>
                    </span>
                  )}
                </div>

                {/* Items List */}
                <div className="p-5 sm:p-6 divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Link
                          href={`/products/${item.id}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.id}`}
                            className="text-sm font-semibold text-gray-900 hover:text-primary transition line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          {item.color && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              Variant: <span className="text-gray-700">{item.color}</span>
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-0.5">
                            Qty: <span className="font-semibold text-gray-800">{item.quantity}</span> • ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                        <Link
                          href={`/products/${item.id}`}
                          className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-2xs transition"
                        >
                          Buy Again
                        </Link>
                        <button
                          type="button"
                          onClick={() => alert(`Review dialog for ${item.title}`)}
                          className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
                        >
                          Write Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div className="px-5 sm:px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Ship to: {order.shippingAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Paid via: {order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

