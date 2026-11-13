"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface NotificationItem {
    id: string | number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: "order" | "promo" | "alert" | "system";
}

export default function Notification() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([
        {
            id: 1,
            title: "Order Dispatched 🚚",
            message: "Your order #SH-9284 has been shipped and is on its way.",
            time: "10m ago",
            read: false,
            type: "order",
        },
        {
            id: 2,
            title: "Weekend Flash Sale 🔥",
            message: "Enjoy up to 40% discount on all premium electronics today.",
            time: "2h ago",
            read: false,
            type: "promo",
        },
        {
            id: 3,
            title: "Price Drop Alert 📉",
            message: "An item in your wishlist 'Minimalist Smart Watch' is now $129.50.",
            time: "1d ago",
            read: false,
            type: "alert",
        },
        {
            id: 4,
            title: "Welcome to ShopHub!",
            message: "Your account has been successfully verified. Enjoy shopping!",
            time: "3d ago",
            read: true,
            type: "system",
        },
    ]);

    const unreadCount = notifications.filter((n) => !n.read).length;
    const readCount = notifications.filter((n) => n.read).length;

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

    const getIcon = (type: NotificationItem["type"]) => {
        switch (type) {
            case "order":
                return (
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                );
            case "promo":
                return (
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                );
            case "alert":
                return (
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className="relative group py-1.5">
            {/* Bell Icon Trigger */}
            <button
                type="button"
                className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary transition cursor-pointer"
                aria-label="Notifications"
            >
                <svg
                    className="w-6 h-6"
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

                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Hover Dropdown (Shifted right and centered directly under the bell) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                <div className="w-80 sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                            {unreadCount > 0 ? (
                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {unreadCount} New
                                </span>
                            ) : null}
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

                    {/* Counts Bar (Total / Unread / Read) */}
                    <div className="px-5 py-2 bg-gray-50/30 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span>
                            <strong className="text-gray-800">{notifications.length}</strong> Total
                        </span>
                        <span>•</span>
                        <span className="text-red-600 font-medium">
                            <strong>{unreadCount}</strong> Unread
                        </span>
                        <span>•</span>
                        <span className="text-gray-600">
                            <strong>{readCount}</strong> Read
                        </span>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center text-xs text-gray-400">
                                No notifications right now
                            </div>
                        ) : (
                            notifications.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={(e) => toggleReadStatus(item.id, e)}
                                    className={`p-4 flex items-start gap-3 transition cursor-pointer hover:bg-gray-50 ${!item.read ? "bg-blue-50/30" : "bg-white"
                                        }`}
                                >
                                    {getIcon(item.type)}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1">
                                            <p
                                                className={`text-xs font-semibold truncate ${!item.read ? "text-gray-900" : "text-gray-600"
                                                    }`}
                                            >
                                                {item.title}
                                            </p>
                                            <span className="text-[10px] text-gray-400 shrink-0">
                                                {item.time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                            {item.message}
                                        </p>
                                    </div>

                                    {/* Read/Unread Dot Indicator */}
                                    {!item.read && (
                                        <span
                                            title="Unread"
                                            className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                        <Link
                            href="/account/notifications"
                            className="text-xs font-semibold text-primary hover:underline"
                        >
                            View all notifications
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

