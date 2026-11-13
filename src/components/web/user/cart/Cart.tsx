"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface CartItem {
    id: string | number;
    title: string;
    image: string;
    color?: string;
    price: number;
    mrp: number;
    quantity: number;
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            title: "Wireless Noise-Canceling Headphones",
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            color: "Dark Navy",
            price: 199.99,
            mrp: 299.99,
            quantity: 1,
        },
        {
            id: 2,
            title: "Minimalist Smart Watch Pro",
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
            color: "Silver Grey",
            price: 129.5,
            mrp: 189.0,
            quantity: 1,
        },
    ]);

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [couponError, setCouponError] = useState<string | null>(null);

    // Order Confirmed Modal state
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState<{
        orderId: string;
        items: CartItem[];
        total: number;
        date: string;
    } | null>(null);

    const handleCheckout = () => {
        setConfirmedOrder({
            orderId: `SH-${Math.floor(100000 + Math.random() * 900000)}`,
            items: [...cartItems],
            total: grandTotal,
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        });
        setIsOrderConfirmed(true);
    };

    const handleCloseModal = () => {
        setIsOrderConfirmed(false);
        setCartItems([]); // Clears cart once order is confirmed
    };

    const updateQuantity = (id: string | number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const removeItem = (id: string | number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        setCouponError(null);

        if (couponCode.trim().toUpperCase() === "SAVE15") {
            setAppliedCoupon("SAVE15");
            setCouponCode("");
        } else {
            setCouponError("Invalid coupon. Try using code SAVE15");
        }
    };

    // Calculations
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalMrp = cartItems.reduce(
        (sum, item) => sum + item.mrp * item.quantity,
        0
    );
    const totalSavings = totalMrp - subtotal;
    const discount = appliedCoupon ? subtotal * 0.15 : 0;
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
    const grandTotal = Math.max(0, subtotal - discount + shipping);

    return (
        <div className="bg-gray-50/50 py-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb & Title */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Link href="/" className="hover:text-primary transition">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Shopping Cart</span>
                    </nav>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}{" "}
                            items)
                        </h1>
                        {cartItems.length > 0 && (
                            <button
                                type="button"
                                onClick={clearCart}
                                className="text-xs font-semibold text-red-600 hover:text-red-700 transition cursor-pointer self-start sm:self-auto"
                            >
                                Clear all items
                            </button>
                        )}
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-xl mx-auto shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-6">
                            <svg
                                className="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Your cart is currently empty
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                            Looks like you haven&apos;t added any items yet. Explore our latest
                            deals and find something you love!
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 shadow-md transition"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Main Cart Content Grid */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Cart Items List (8 Columns) */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
                                {cartItems.map((item) => {
                                    const discountPct = Math.round(
                                        ((item.mrp - item.price) / item.mrp) * 100
                                    );

                                    return (
                                        <div
                                            key={item.id}
                                            className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition hover:bg-gray-50/40"
                                        >
                                            {/* Product Thumbnail & Details */}
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <Link
                                                    href={`/products/${item.id}`}
                                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
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
                                                        className="font-semibold text-gray-900 text-sm sm:text-base hover:text-primary transition line-clamp-1"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    {item.color && (
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            Color:{" "}
                                                            <span className="font-medium text-gray-700">
                                                                {item.color}
                                                            </span>
                                                        </p>
                                                    )}
                                                    <div className="mt-1 flex items-baseline gap-2">
                                                        <span className="text-base font-bold text-primary">
                                                            ${item.price.toFixed(2)}
                                                        </span>
                                                        {item.mrp > item.price && (
                                                            <span className="text-xs text-gray-400 line-through">
                                                                ${item.mrp.toFixed(2)}
                                                            </span>
                                                        )}
                                                        {discountPct > 0 && (
                                                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                                                {discountPct}% off
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity & Actions */}
                                            <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                                {/* Quantity Counter */}
                                                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-primary transition cursor-pointer font-bold text-sm"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-primary transition cursor-pointer font-bold text-sm"
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Item Total */}
                                                <div className="text-right">
                                                    <span className="text-sm sm:text-base font-extrabold text-gray-900 block">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                                                    title="Remove item"
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
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Guarantees Box */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-semibold text-gray-900">Secure Payment</p>
                                        <p className="text-gray-500">256-bit SSL encrypted</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
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
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-semibold text-gray-900">30-Day Returns</p>
                                        <p className="text-gray-500">Hassle-free money back</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
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
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-semibold text-gray-900">Fast Shipping</p>
                                        <p className="text-gray-500">Dispatched in 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar (4 Columns) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Order Summary
                                </h2>

                                {/* Promo Code Input */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                                        Promo Code
                                    </label>
                                    {appliedCoupon ? (
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200 text-xs">
                                            <span className="font-semibold text-green-700">
                                                {appliedCoupon} (15% OFF applied)
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setAppliedCoupon(null)}
                                                className="text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="e.g. SAVE15"
                                                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 uppercase placeholder:normal-case placeholder-gray-400 focus:outline-none focus:border-primary"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition cursor-pointer"
                                            >
                                                Apply
                                            </button>
                                        </form>
                                    )}
                                    {couponError && (
                                        <p className="text-red-500 text-[11px] mt-1.5">
                                            {couponError}
                                        </p>
                                    )}
                                </div>

                                <hr className="border-gray-100" />

                                {/* Line Items */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>

                                    {totalSavings > 0 && (
                                        <div className="flex justify-between text-green-600 font-medium">
                                            <span>Retail Discount</span>
                                            <span>-${totalSavings.toFixed(2)}</span>
                                        </div>
                                    )}

                                    {appliedCoupon && (
                                        <div className="flex justify-between text-green-600 font-medium">
                                            <span>Coupon Discount (15%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-gray-900">
                                            {shipping === 0 ? (
                                                <span className="text-green-600 uppercase text-xs font-bold">
                                                    Free
                                                </span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                {/* Grand Total */}
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <span className="text-base font-bold text-gray-900 block">
                                            Total Amount
                                        </span>
                                        <span className="text-[11px] text-gray-400">
                                            Includes all applicable taxes
                                        </span>
                                    </div>
                                    <span className="text-2xl font-black text-primary">
                                        ${grandTotal.toFixed(2)}
                                    </span>
                                </div>

                                {/* Checkout CTA */}
                                <button
                                    type="button"
                                    onClick={handleCheckout}
                                    className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl bg-primary text-white text-sm font-bold shadow-lg hover:opacity-95 transition cursor-pointer"
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="text-center">
                                    <Link
                                        href="/"
                                        className="text-xs font-semibold text-primary hover:underline"
                                    >
                                        ← Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Order Confirmed Modal */}
            {isOrderConfirmed && confirmedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
                        {/* Close button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header status */}
                        <div className="text-center pb-5 border-b border-gray-100">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                Order Confirmed!
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Order ID: <span className="font-bold text-gray-800">{confirmedOrder.orderId}</span> • {confirmedOrder.date}
                            </p>
                            <p className="text-xs text-green-600 font-medium mt-1">
                                Confirmation sent to <span className="font-semibold">salim@example1.com</span>
                            </p>
                        </div>

                        {/* Scrollable order details */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                            {/* Delivery info */}
                            <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Estimated Delivery:</span>
                                    <span className="font-semibold text-gray-900">3-5 Business Days</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Shipping Address:</span>
                                    <span className="font-semibold text-gray-900 text-right">123 Tech Park Ave, CA</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Payment Method:</span>
                                    <span className="font-semibold text-gray-900">Credit Card (•••• 4242)</span>
                                </div>
                            </div>

                            {/* Ordered items */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                                    Purchased Items ({confirmedOrder.items.length})
                                </h4>
                                <div className="space-y-2.5">
                                    {confirmedOrder.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-gray-100 bg-white"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-12 h-12 rounded-lg object-cover bg-gray-50 shrink-0"
                                            />
                                            <div className="flex-1 min-w-0 text-xs">
                                                <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                                                <p className="text-gray-400">
                                                    Qty: {item.quantity} {item.color && `• ${item.color}`}
                                                </p>
                                            </div>
                                            <span className="font-bold text-gray-900 text-xs shrink-0">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Summary */}
                            <div className="p-3 bg-primary/5 rounded-2xl flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-800">Total Paid</span>
                                <span className="text-lg font-black text-primary">
                                    ${confirmedOrder.total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                            <Link
                                href="/account/orders"
                                className="flex-1 text-center py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                            >
                                Track Order
                            </Link>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:opacity-95 transition cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

