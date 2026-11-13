"use client";

import React, { useState } from "react";
import Link from "next/link";

type SettingsTab = "profile" | "security" | "notifications" | "privacy";

export default function Setting() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Profile Form State
  const [profile, setProfile] = useState({
    name: "Salim Khan",
    email: "salim@example1.com",
    phone: "+1 (555) 234-5678",
    gender: "Male",
    dob: "1995-08-15",
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    priceAlerts: true,
    smsUpdates: true,
  });

  // Two Factor Auth State
  const [twoFactor, setTwoFactor] = useState(false);

  // Status feedback
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Profile details updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    showSuccess("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
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
          <span className="text-gray-900 font-medium">Settings</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal profile, security preferences, and notification channels
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Layout Grid (Tabs + Content) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sidebar Tabs */}
          <aside className="md:col-span-4 lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-2 shadow-sm space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                activeTab === "profile"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Info
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                activeTab === "security"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security & Password
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                activeTab === "notifications"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                activeTab === "privacy"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Privacy & Account
            </button>
          </aside>

          {/* Tab Content Panes */}
          <main className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            {/* 1. Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Personal Information
                </h2>

                <form onSubmit={handleProfileSubmit} className="mt-6 space-y-5">
                  {/* Avatar section */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-md">
                      SK
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">Profile Photo</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                      <button
                        type="button"
                        onClick={() => alert("Upload photo dialog")}
                        className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                      >
                        Change photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profile.dob}
                        onChange={(e) =>
                          setProfile({ ...profile, dob: e.target.value })
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. Security Tab */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Password & Security
                </h2>

                <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </form>

                <hr className="my-8 border-gray-100" />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Two-Factor Authentication (2FA)
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add an extra layer of security to your account with SMS or Authenticator codes.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      twoFactor ? "bg-primary" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        twoFactor ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* 3. Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Notification Preferences
                </h2>

                <div className="mt-6 space-y-6 divide-y divide-gray-100">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Order Status Updates</h4>
                      <p className="text-[11px] text-gray-500">
                        Receive email alerts regarding order confirmations and shipping updates.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.orderUpdates}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          orderUpdates: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded text-primary accent-[#111827] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Promotions & Discounts</h4>
                      <p className="text-[11px] text-gray-500">
                        Get notified about seasonal flash sales, weekly deals, and coupon codes.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.promotions}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          promotions: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded text-primary accent-[#111827] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Wishlist Price Drops</h4>
                      <p className="text-[11px] text-gray-500">
                        Receive instant alerts when saved products go on sale.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.priceAlerts}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          priceAlerts: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded text-primary accent-[#111827] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">SMS Notifications</h4>
                      <p className="text-[11px] text-gray-500">
                        Receive delivery day SMS messages on your verified phone number.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.smsUpdates}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          smsUpdates: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded text-primary accent-[#111827] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => showSuccess("Notification preferences saved!")}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* 4. Privacy & Account Tab */}
            {activeTab === "privacy" && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Privacy & Account Actions
                </h2>

                <div className="mt-6 space-y-6">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Download Account Data</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Download an archive of your profile, orders, and review history.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Downloading account archive...")}
                      className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Export Data
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-red-700">Delete Account</h4>
                      <p className="text-[11px] text-red-500 mt-0.5">
                        Permanently delete your account and all associated order records.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Are you sure you want to permanently delete your account?")) {
                          alert("Account deletion request submitted.");
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition cursor-pointer"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

