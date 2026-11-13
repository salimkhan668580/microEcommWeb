"use client";

import React, { useState, useEffect } from "react";

export interface CouponFormData {
  id?: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  startDate: string;
  expiryDate: string;
  isActive: boolean;
}

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CouponFormData) => void;
  initialData?: CouponFormData | null;
}

export default function AddCouponModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddCouponModalProps) {
  const defaultState: CouponFormData = {
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 500,
    maxDiscountAmount: 200,
    usageLimit: 100,
    startDate: "",
    expiryDate: "",
    isActive: true,
  };

  const [formData, setFormData] = useState<CouponFormData>(defaultState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const today = new Date().toISOString().split("T")[0];
      const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      setFormData({
        ...defaultState,
        startDate: today,
        expiryDate: thirtyDays,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      code: formData.code.toUpperCase().trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/60 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {initialData ? "Edit Discount Coupon" : "Create New Coupon"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure promotional discounts, usage caps, and redemption rules
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {/* Coupon Code & Discount Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase().replace(/\s+/g, ""),
                  })
                }
                placeholder="e.g. FESTIVE50"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-mono font-bold tracking-wider focus:outline-none focus:border-primary uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Discount Type *
              </label>
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountType: e.target.value as "percentage" | "fixed",
                  })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="percentage">Percentage Discount (%)</option>
                <option value="fixed">Fixed Cart Amount ($)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description / Campaign Name
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="e.g. Get 20% off on electronics festive orders"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Discount Value & Max Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Discount Value ({formData.discountType === "percentage" ? "%" : "$"}) *
              </label>
              <input
                type="number"
                min={1}
                max={formData.discountType === "percentage" ? 100 : undefined}
                required
                value={formData.discountValue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountValue: Number(e.target.value),
                  })
                }
                placeholder="e.g. 20"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Max Discount Cap ($)
              </label>
              <input
                type="number"
                min={0}
                value={formData.maxDiscountAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxDiscountAmount: Number(e.target.value),
                  })
                }
                placeholder="Optional max limit (e.g. 50)"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Minimum Order Amount & Usage Limit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Min. Cart Order Amount ($)
              </label>
              <input
                type="number"
                min={0}
                value={formData.minOrderAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minOrderAmount: Number(e.target.value),
                  })
                }
                placeholder="e.g. 500"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Total Redemptions Limit *
              </label>
              <input
                type="number"
                min={1}
                required
                value={formData.usageLimit || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    usageLimit: Number(e.target.value),
                  })
                }
                placeholder="e.g. 250"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Dates: Start & Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Active / Inactive Toggle Switch */}
          <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <span className="block text-xs font-semibold text-gray-800">
                Coupon Status
              </span>
              <span className="text-[11px] text-gray-500">
                Active coupons can be redeemed by customers at checkout
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span
                className={`text-xs font-semibold ${
                  formData.isActive ? "text-emerald-700" : "text-gray-400"
                }`}
              >
                {formData.isActive ? "Active" : "Inactive"}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, isActive: !formData.isActive })
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  formData.isActive ? "bg-emerald-600" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={formData.isActive}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    formData.isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
            >
              {initialData ? "Save Changes" : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

