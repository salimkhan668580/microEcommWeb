"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface AdminNotificationItem {
  id: string | number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "stock" | "user" | "payment" | "return";
  link?: string;
}

export default function AdminNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<AdminNotificationItem[]>([
    {
      id: "notif-1",
      title: "New Order #ORD-8492",
      message: "Order placed by Salim Khan for $129.99 (2 items).",
      time: "2m ago",
      read: false,
      type: "order",
      link: "/admin/dashboard",
    },
    {
      id: "notif-2",
      title: "Low Stock Alert ⚠️",
      message: "Apple iPhone 15 128GB has only 2 units left in inventory.",
      time: "15m ago",
      read: false,
      type: "stock",
      link: "/admin/products",
    },
    {
      id: "notif-3",
      title: "New User Registered",
      message: "Priya Patel (priya.patel@example.com) created an account.",
      time: "1h ago",
      read: false,
      type: "user",
      link: "/admin/users",
    },
    {
      id: "notif-4",
      title: "Payment Received",
      message: "$520.00 confirmed via Stripe for order #ORD-8488.",
      time: "3h ago",
      read: true,
      type: "payment",
      link: "/admin/dashboard",
    },
    {
      id: "notif-5",
      title: "Return Requested",
      message: "Return initiated for Order #ORD-8451 (Reason: Size issue).",
      time: "1d ago",
      read: true,
      type: "return",
      link: "/admin/dashboard",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "alert">(
    "all"
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleReadStatus = (id: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "alert") return n.type === "stock" || n.type === "return";
    return true;
  });

  const getIcon = (type: AdminNotificationItem["type"]) => {
    switch (type) {
      case "order":
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        );
      case "stock":
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        );
      case "user":
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        );
      case "payment":
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case "return":
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
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
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative group py-2"
      onMouseEnter={() => setIsOpen(true)}
    >
      {/* Notification Bell Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 flex items-center justify-center transition border border-gray-200 cursor-pointer focus:outline-none"
        aria-label="Admin Notifications"
        aria-expanded={isOpen}
      >
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="w-88 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 bg-white text-[11px] font-semibold text-gray-500">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-primary text-white font-bold"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("unread")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === "unread"
                    ? "bg-primary text-white font-bold"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("alert")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === "alert"
                    ? "bg-primary text-white font-bold"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                Alerts
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  No notifications found
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 hover:bg-gray-50/80 transition flex items-start gap-3 relative group/item ${
                      !item.read ? "bg-blue-50/20" : ""
                    }`}
                  >
                    {/* Icon */}
                    {getIcon(item.type)}

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center justify-between gap-1">
                        <Link
                          href={item.link || "#"}
                          onClick={() => setIsOpen(false)}
                          className="text-xs font-bold text-gray-900 hover:text-primary transition truncate block"
                        >
                          {item.title}
                        </Link>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                    </div>

                    {/* Unread indicator / mark read button */}
                    <div className="shrink-0 flex items-center pt-1">
                      <button
                        type="button"
                        onClick={(e) => toggleReadStatus(item.id, e)}
                        className="text-gray-300 hover:text-primary transition cursor-pointer p-1"
                        title={item.read ? "Mark as unread" : "Mark as read"}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            !item.read ? "bg-blue-600" : "bg-transparent border border-gray-300"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 border-t border-gray-100 bg-gray-50 text-center">
              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-gray-700 hover:text-primary transition block py-1"
              >
                View Activity Dashboard &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

