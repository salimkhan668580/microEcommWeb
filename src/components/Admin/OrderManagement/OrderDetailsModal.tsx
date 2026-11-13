"use client";

import React from "react";
import Image from "next/image";

export interface OrderItemProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: OrderItemProduct[];
  date: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "Card" | "COD" | "UPI" | "Razorpay";
  paymentStatus: "Paid" | "Pending" | "Refunded" | "Failed";
  orderStatus:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  trackingNumber?: string;
}

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: AdminOrder["orderStatus"]) => void;
  onPaymentStatusChange: (
    orderId: string,
    newStatus: AdminOrder["paymentStatus"]
  ) => void;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
  onPaymentStatusChange,
}: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/60 shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Order #{order.orderNumber}
              </h2>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusBadge(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getPaymentBadge(
                  order.paymentStatus
                )}`}
              >
                Payment: {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Placed on {order.date}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
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

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Status Control Bar */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-700">
                Update Order Status:
              </span>
              <select
                value={order.orderStatus}
                onChange={(e) =>
                  onStatusChange(
                    order.id,
                    e.target.value as AdminOrder["orderStatus"]
                  )
                }
                className="bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-xl px-3 py-1.5 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-700">
                Payment Status:
              </span>
              <select
                value={order.paymentStatus}
                onChange={(e) =>
                  onPaymentStatusChange(
                    order.id,
                    e.target.value as AdminOrder["paymentStatus"]
                  )
                }
                className="bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-xl px-3 py-1.5 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Customer Details
              </h3>
              <div className="space-y-1.5 text-xs text-gray-700">
                <p className="font-bold text-gray-900">{order.customer.name}</p>
                <p className="text-gray-500">{order.customer.email}</p>
                <p className="text-gray-500">{order.customer.phone}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Shipping Address
              </h3>
              <div className="space-y-1 text-xs text-gray-700">
                <p>{order.customer.address}</p>
                <p>
                  {order.customer.city}, {order.customer.postalCode}
                </p>
                {order.trackingNumber && (
                  <p className="pt-2 text-primary font-mono font-semibold">
                    Tracking #: {order.trackingNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
            <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Ordered Items ({order.items.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between gap-4 bg-white"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-mono text-gray-400">
                        SKU: {item.sku}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-gray-900 block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Shipping Fee</span>
              <span>
                {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Estimated Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>Discount Applied</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
              <span>Grand Total</span>
              <span className="text-primary text-base">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-500">
            Payment Method:{" "}
            <span className="font-bold text-gray-800">
              {order.paymentMethod}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

