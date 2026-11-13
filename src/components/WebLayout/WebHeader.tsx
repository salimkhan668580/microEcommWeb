"use client";

import React, { useState } from "react";
import Link from "next/link";
import Notification from "./Notification";

export default function WebHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All Products", href: "/products" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "Home & Living", href: "/category/home" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Deals", href: "/deals", highlight: true },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-gray-300 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="hidden sm:block">
            Free shipping on orders over <span className="text-white font-semibold">$50</span>!
          </p>
          <p className="sm:hidden text-center w-full">Free shipping over $50!</p>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/help" className="hover:text-white transition">
              Help Center
            </Link>
            <Link href="/track-order" className="hover:text-white transition">
              Track Order
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/account/profile" className="hover:text-white font-medium transition">
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-primary">
              SHOP<span className="text-gray-400 font-medium">HUB</span>
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Account with Logged-in Hover Dropdown */}
            <div className="relative group py-1.5">
              <Link
                href="/account/profile"
                className="flex items-center gap-2 p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary transition cursor-pointer"
                title="Account"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  SK
                </div>
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <span className="text-gray-400 block text-[11px]">Hello, Salim</span>
                  <span className="font-semibold text-primary flex items-center gap-0.5">
                    Account
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>

              {/* Hover Dropdown Menu */}
              <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                <div className="w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                  {/* User greeting header inside dropdown */}
                  <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-xs font-semibold text-gray-900">Salim Khan</p>
                    <p className="text-[11px] text-gray-400 truncate">salim@example1.com</p>
                  </div>

                  {/* Dropdown Options */}
                  <div className="py-1 text-sm">
                    {/* Orders */}
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                      <span>My Orders</span>
                    </Link>

                    {/* Wishlist */}
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>Wishlist</span>
                    </Link>

                    {/* Addresses */}
                    <Link
                      href="/account/address"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Saved Addresses</span>
                    </Link>

                    {/* Profile */}
                    <Link
                      href="/account/profile"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Profile Information</span>
                    </Link>

                    {/* Payment Methods */}
                    <Link
                      href="/account/payments"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span>Payment Methods</span>
                    </Link>

                    {/* Settings */}
                    <Link
                      href="/account/settings"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Account Settings</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 pt-1 mt-1">
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Component */}
            <Notification />

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary transition"
              title="Wishlist"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary transition"
              title="Cart"
            >
              <div className="relative">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <span className="text-gray-400 block">Total</span>
                <span className="font-semibold text-primary">$129.00</span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary"
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
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-gray-50/80 border-t border-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-8 py-2.5 text-sm font-medium">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`transition hover:text-primary ${
                category.highlight
                  ? "text-red-600 font-semibold flex items-center gap-1"
                  : "text-gray-600"
              }`}
            >
              {category.name}
              {category.highlight && (
                <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">
                  HOT
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 text-sm">
            <Link
              href="/track-order"
              className="text-gray-500 hover:text-primary py-1"
            >
              Track Order
            </Link>
            <Link
              href="/help"
              className="text-gray-500 hover:text-primary py-1"
            >
              Help Center
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
