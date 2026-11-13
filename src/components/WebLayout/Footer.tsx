"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-primary text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Get the latest product updates, exclusive weekly deals, and special discounts delivered straight to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-3 rounded-xl text-sm font-medium text-center">
                  Thank you for subscribing! Check your email for your 15% discount.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                  />
                  <button
                    type="submit"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
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
              <span className="text-xl font-black tracking-tight text-white">
                SHOP<span className="text-gray-400 font-light">HUB</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your one-stop destination for premium electronics, modern fashion, and lifestyle goods. Fast delivery, trusted quality, and effortless returns.
            </p>
            <div className="pt-2 text-sm text-gray-400 space-y-1.5">
              <p>Email: <span className="text-gray-300">support@shophub.com</span></p>
              <p>Phone: <span className="text-gray-300">+1 (800) 123-4567</span></p>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="hover:text-white transition">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link href="/category/home" className="hover:text-white transition">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-white transition">
                  Weekly Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/track-order" className="hover:text-white transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQs & Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-gray-500 hover:text-white transition">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ShopHub Inc. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-gray-400">
            <span className="text-xs text-gray-500">Secure Payments:</span>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">VISA</span>
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">MC</span>
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">AMEX</span>
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">PAYPAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
