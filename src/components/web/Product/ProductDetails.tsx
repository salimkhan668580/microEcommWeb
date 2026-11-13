"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "../HomePage/ProductCard";

interface ProductDetailsProps {
  product?: Product;
}

export default function ProductDetails({ product: initialProduct }: ProductDetailsProps) {
  // Default fallback product if none provided via props
  const product: Product = initialProduct || {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    title: "Wireless Noise-Canceling Headphones Pro",
    desc: "Experience pure sound immersion with industry-leading active noise cancellation, custom acoustic drivers, 30-hour battery life, and ultra-plush ergonomic ear cushions designed for all-day comfort.",
    mrp: 299.99,
    sellingPrice: 199.99,
    category: "Electronics",
    rating: 4.8,
  };

  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
  ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Dark Navy");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "reviews">("features");
  const [cartSuccess, setCartSuccess] = useState(false);

  const colors = [
    { name: "Dark Navy", class: "bg-[#111827]" },
    { name: "Silver Grey", class: "bg-gray-400" },
    { name: "Matte Black", class: "bg-black" },
  ];

  const discountPercentage = Math.round(
    ((product.mrp - product.sellingPrice) / product.mrp) * 100
  );

  const handleAddToCart = () => {
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2500);
  };

  return (
    <div className="bg-gray-50/50 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category?.toLowerCase() || "products"}`}
            className="hover:text-primary transition"
          >
            {product.category || "Products"}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs sm:max-w-md">
            {product.title}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Preview */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
              {discountPercentage > 0 && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {discountPercentage}% OFF
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-500 backdrop-blur-sm shadow-sm transition hover:text-red-500 cursor-pointer"
              >
                <svg
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "fill-none"
                  }`}
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
              </button>

              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-gray-50 ${
                    selectedImage === img
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider font-semibold text-primary/70">
              {product.category || "General"}
            </span>

            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.title}
            </h1>

            {/* Rating & Reviews */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{product.rating || 4.8}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500">128 verified customer reviews</span>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                In Stock
              </span>
            </div>

            {/* Pricing Section */}
            <div className="mt-6 p-4 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-primary">
                ${product.sellingPrice.toFixed(2)}
              </span>
              {product.mrp > product.sellingPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${product.mrp.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                    Save ${(product.mrp - product.sellingPrice).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-sm text-gray-600 leading-relaxed">
              {product.desc}
            </p>

            <hr className="my-6 border-gray-100" />

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Color: <span className="text-primary font-bold">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                      selectedColor === c.name
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${c.class} inline-block`} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-primary transition cursor-pointer text-base font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-primary transition cursor-pointer text-base font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-white text-sm font-bold shadow-lg hover:opacity-95 transition active:scale-95 cursor-pointer"
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartSuccess ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>

              {/* Buy Now Button */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center py-3 px-6 rounded-xl border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition cursor-pointer"
              >
                Buy Now
              </Link>
            </div>

            {/* Assurances / Badges */}
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-gray-500 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>30-day hassle-free returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Genuine product</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>1-Year Official Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Details (Features, Specs, Reviews) */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-6 border-b border-gray-100 pb-4 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("features")}
              className={`pb-2 transition cursor-pointer relative ${
                activeTab === "features"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              Key Features
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`pb-2 transition cursor-pointer relative ${
                activeTab === "specs"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 transition cursor-pointer relative ${
                activeTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              Customer Reviews (128)
            </button>
          </div>

          <div className="pt-6 text-sm text-gray-600 leading-relaxed">
            {activeTab === "features" && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">✓</span>
                  <span>Active Noise Cancellation with ambient transparency mode</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">✓</span>
                  <span>Up to 30 hours of continuous playback on a single charge</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">✓</span>
                  <span>Quick Charge: 10 minutes charging provides 4 hours of listening</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">✓</span>
                  <span>Multipoint Bluetooth connectivity for seamless switching</span>
                </li>
              </ul>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">Driver Size</span>
                  <span className="font-medium text-gray-800">40mm Neodymium</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">Battery Life</span>
                  <span className="font-medium text-gray-800">30 Hours (ANC On)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">Connectivity</span>
                  <span className="font-medium text-gray-800">Bluetooth 5.3, 3.5mm AUX</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">Weight</span>
                  <span className="font-medium text-gray-800">254 grams</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Alex M.</span>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs my-1">
                    ★★★★★
                  </div>
                  <p className="text-xs text-gray-600">
                    The noise canceling is phenomenal! The build quality feels super premium and battery lasts for days.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

