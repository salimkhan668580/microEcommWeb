"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface AddressItem {
  id: string | number;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: "Home" | "Work" | "Other";
  isDefault: boolean;
}

export default function Address() {
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 1,
      fullName: "Salim Khan",
      phone: "+1 (555) 234-5678",
      street: "123 Tech Park Avenue, Suite 400",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      country: "United States",
      type: "Home",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "Salim Khan",
      phone: "+1 (555) 987-6543",
      street: "500 Silicon Way, Floor 3",
      city: "San Jose",
      state: "CA",
      zipCode: "95113",
      country: "United States",
      type: "Work",
      isDefault: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  const [formData, setFormData] = useState<Omit<AddressItem, "id">>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    type: "Home",
    isDefault: false,
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      fullName: "Salim Khan",
      phone: "+1 (555) 234-5678",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      type: "Home",
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: AddressItem) => {
    setEditingId(item.id);
    setFormData({
      fullName: item.fullName,
      phone: item.phone,
      street: item.street,
      city: item.city,
      state: item.state,
      zipCode: item.zipCode,
      country: item.country,
      type: item.type,
      isDefault: item.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((item) => {
          if (item.id === editingId) {
            return { ...formData, id: item.id };
          }
          if (formData.isDefault) {
            return { ...item, isDefault: false };
          }
          return item;
        })
      );
    } else {
      // Add new address
      const newAddress: AddressItem = {
        ...formData,
        id: Date.now(),
      };

      setAddresses((prev) => {
        if (newAddress.isDefault) {
          return [...prev.map((a) => ({ ...a, isDefault: false })), newAddress];
        }
        return [...prev, newAddress];
      });
    }

    handleCloseModal();
  };

  const handleDeleteAddress = (id: string | number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string | number) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
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
          <span className="text-gray-900 font-medium">Addresses</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Saved Addresses
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your delivery and billing addresses for fast and easy checkout
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Address
          </button>
        </div>

        {/* Addresses Grid */}
        {addresses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No addresses saved</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Add your delivery address to enjoy seamless, one-click checkout on your next orders.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition cursor-pointer"
              >
                Add Your First Address
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`relative bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-sm transition-all duration-200 ${
                  address.isDefault
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        Default Address
                      </span>
                    )}
                  </div>

                  {/* Recipient Details */}
                  <h3 className="font-bold text-gray-900 text-base">
                    {address.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{address.phone}</p>

                  {/* Full Address */}
                  <div className="mt-4 text-xs text-gray-600 space-y-1 leading-relaxed">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(address)}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>

                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address.id)}
                      className="text-[11px] font-semibold text-gray-500 hover:text-primary transition cursor-pointer"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveAddress} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="Street name, apartment, suite, etc."
                  value={formData.street}
                  onChange={handleFormChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Postal Code & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Postal / ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="flex gap-4">
                  {(["Home", "Work", "Other"] as const).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={handleFormChange}
                        className="text-primary accent-[#111827]"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Make Default Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleFormChange}
                    className="rounded text-primary accent-[#111827]"
                  />
                  <span>Make this my default shipping address</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

