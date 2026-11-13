"use client";

import React, { useState } from "react";
import OrderDetailsModal, { AdminOrder } from "./OrderDetailsModal";

export default function OrderManagement() {
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: "ord-1",
      orderNumber: "ORD-8492",
      customer: {
        name: "Salim Khan",
        email: "salim.khan@example.com",
        phone: "+91 98765 43210",
        address: "42 MG Road, Indiranagar",
        city: "Bengaluru",
        postalCode: "560038",
      },
      items: [
        {
          id: "item-1",
          name: "Apple iPhone 15 128GB - Black",
          image:
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=300&q=80",
          price: 62999,
          quantity: 1,
          sku: "APP-IP15-128",
        },
        {
          id: "item-2",
          name: "Wireless Noise-Canceling Earbuds",
          image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
          price: 2499,
          quantity: 1,
          sku: "AUD-EAR-01",
        },
      ],
      date: "Nov 14, 2026 • 10:45 AM",
      subtotal: 65498,
      shipping: 0,
      tax: 2500,
      discount: 1000,
      total: 66998,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      orderStatus: "Processing",
      trackingNumber: "TRK-99482910",
    },
    {
      id: "ord-2",
      orderNumber: "ORD-8491",
      customer: {
        name: "Priya Patel",
        email: "priya.patel@example.com",
        phone: "+91 91234 56789",
        address: "15 Park View Avenue",
        city: "Mumbai",
        postalCode: "400050",
      },
      items: [
        {
          id: "item-3",
          name: "Premium Ergonomic Office Chair",
          image:
            "https://images.unsplash.com/photo-1580481077195-c3a8b006c04f?auto=format&fit=crop&w=300&q=80",
          price: 14499,
          quantity: 1,
          sku: "FUR-CHR-09",
        },
      ],
      date: "Nov 14, 2026 • 09:12 AM",
      subtotal: 14499,
      shipping: 350,
      tax: 1200,
      discount: 500,
      total: 15549,
      paymentMethod: "Card",
      paymentStatus: "Paid",
      orderStatus: "Shipped",
      trackingNumber: "BLUEDART-882103",
    },
    {
      id: "ord-3",
      orderNumber: "ORD-8490",
      customer: {
        name: "Rahul Verma",
        email: "rahul.v@example.com",
        phone: "+91 98111 22334",
        address: "7th Cross, HSR Layout Sector 2",
        city: "Bengaluru",
        postalCode: "560102",
      },
      items: [
        {
          id: "item-4",
          name: "Ultra-thin Mechanical Keyboard",
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80",
          price: 4999,
          quantity: 2,
          sku: "KEY-MEC-RGB",
        },
      ],
      date: "Nov 13, 2026 • 04:30 PM",
      subtotal: 9998,
      shipping: 100,
      tax: 800,
      discount: 0,
      total: 10898,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    },
    {
      id: "ord-4",
      orderNumber: "ORD-8489",
      customer: {
        name: "Ananya Sharma",
        email: "ananya.s@example.com",
        phone: "+91 94444 55555",
        address: "Flat 402, Lotus Towers, Anna Nagar",
        city: "Chennai",
        postalCode: "600040",
      },
      items: [
        {
          id: "item-5",
          name: "Smart Fitness Tracker Band 5",
          image:
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=300&q=80",
          price: 3499,
          quantity: 1,
          sku: "WRB-FIT-05",
        },
      ],
      date: "Nov 12, 2026 • 02:15 PM",
      subtotal: 3499,
      shipping: 0,
      tax: 280,
      discount: 300,
      total: 3479,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      trackingNumber: "DELHIVERY-771920",
    },
    {
      id: "ord-5",
      orderNumber: "ORD-8488",
      customer: {
        name: "Vikram Malhotra",
        email: "vikram.m@example.com",
        phone: "+91 97777 88888",
        address: "Plot 88, Banjara Hills Road No. 12",
        city: "Hyderabad",
        postalCode: "500034",
      },
      items: [
        {
          id: "item-6",
          name: "Aviator Classic Polarized Sunglasses",
          image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80",
          price: 2199,
          quantity: 1,
          sku: "ACC-SUN-AV1",
        },
      ],
      date: "Nov 11, 2026 • 11:20 AM",
      subtotal: 2199,
      shipping: 100,
      tax: 180,
      discount: 0,
      total: 2479,
      paymentMethod: "Card",
      paymentStatus: "Refunded",
      orderStatus: "Returned",
    },
    {
      id: "ord-6",
      orderNumber: "ORD-8487",
      customer: {
        name: "Deepak Mehta",
        email: "deepak.m@example.com",
        phone: "+91 93333 22211",
        address: "24 Civil Lines",
        city: "Jaipur",
        postalCode: "302006",
      },
      items: [
        {
          id: "item-7",
          name: "Leather Minimalist Laptop Backpack",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80",
          price: 3999,
          quantity: 1,
          sku: "BAG-LTH-01",
        },
      ],
      date: "Nov 10, 2026 • 06:40 PM",
      subtotal: 3999,
      shipping: 0,
      tax: 320,
      discount: 400,
      total: 3919,
      paymentMethod: "UPI",
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Stats calculation
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "Pending" || o.orderStatus === "Processing"
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;
  const returnedOrders = orders.filter(
    (o) => o.orderStatus === "Returned" || o.orderStatus === "Cancelled"
  ).length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.total, 0);

  const handleOpenDetails = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: AdminOrder["orderStatus"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
  };

  const handleUpdatePaymentStatus = (
    orderId: string,
    newStatus: AdminOrder["paymentStatus"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, paymentStatus: newStatus } : null
      );
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to remove this order record?")) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.orderStatus === statusFilter;

    const matchesPayment =
      paymentFilter === "All" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: AdminOrder["orderStatus"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "Returned":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPaymentBadge = (status: AdminOrder["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Refunded":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Order Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Track customer orders, manage shipments, update fulfillment and handle payment statuses
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const csvData = orders.map((o) => ({
                OrderNumber: o.orderNumber,
                Customer: o.customer.name,
                Email: o.customer.email,
                Date: o.date,
                Total: o.total,
                PaymentStatus: o.paymentStatus,
                OrderStatus: o.orderStatus,
              }));
              const blob = new Blob([JSON.stringify(csvData, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `orders-export-${Date.now()}.json`;
              a.click();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-xs transition cursor-pointer"
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
            Export Records
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total Orders
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {totalOrders}
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Pending / In-Progress
            </span>
            <span className="text-2xl font-black text-amber-600 tracking-tight mt-1 block">
              {pendingOrders}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Delivered
            </span>
            <span className="text-2xl font-black text-emerald-600 tracking-tight mt-1 block">
              {deliveredOrders}
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

        {/* Returned / Cancelled */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Returned / Cancelled
            </span>
            <span className="text-2xl font-black text-rose-600 tracking-tight mt-1 block">
              {returnedOrders}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
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
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </div>
        </div>

        {/* Paid Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total Revenue
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              ${totalRevenue.toLocaleString()}
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
            placeholder="Search by order ID, customer name or email..."
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
        <div className="flex flex-wrap items-center gap-3">
          {/* Order Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6 text-center">Payment</th>
                <th className="py-3.5 px-6 text-center">Fulfillment</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition cursor-pointer"
                    onClick={() => handleOpenDetails(order)}
                  >
                    {/* Order ID */}
                    <td className="py-4 px-6 font-bold text-gray-900 font-mono">
                      #{order.orderNumber}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {order.customer.email}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {order.date}
                    </td>

                    {/* Items */}
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-700">
                        {order.items.reduce((acc, it) => acc + it.quantity, 0)}{" "}
                        units
                      </span>
                      <span className="block text-[11px] text-gray-400 truncate max-w-[140px]">
                        {order.items.map((i) => i.name).join(", ")}
                      </span>
                    </td>

                    {/* Total Amount & Method */}
                    <td className="py-4 px-6">
                      <div className="font-black text-gray-900">
                        ${order.total.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        via {order.paymentMethod}
                      </div>
                    </td>

                    {/* Payment Status */}
                    <td
                      className="py-4 px-6 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          handleUpdatePaymentStatus(
                            order.id,
                            e.target.value as AdminOrder["paymentStatus"]
                          )
                        }
                        className={`text-[11px] px-2.5 py-1 rounded-full font-bold border cursor-pointer focus:outline-none ${getPaymentBadge(
                          order.paymentStatus
                        )}`}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>

                    {/* Order Status */}
                    <td
                      className="py-4 px-6 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleUpdateOrderStatus(
                            order.id,
                            e.target.value as AdminOrder["orderStatus"]
                          )
                        }
                        className={`text-[11px] px-2.5 py-1 rounded-full font-bold border cursor-pointer focus:outline-none ${getStatusBadge(
                          order.orderStatus
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-4 px-6 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(order)}
                          className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary hover:bg-gray-50 transition cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition cursor-pointer"
                          title="Delete Order Record"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        onStatusChange={handleUpdateOrderStatus}
        onPaymentStatusChange={handleUpdatePaymentStatus}
      />
    </div>
  );
}

