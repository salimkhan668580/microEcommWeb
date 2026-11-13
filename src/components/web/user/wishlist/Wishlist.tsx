"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "../../HomePage/ProductCard";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<
    (Product & { inStock?: boolean })[]
  >([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      title: "Wireless Noise-Canceling Headphones",
      desc: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
      mrp: 299.99,
      sellingPrice: 199.99,
      category: "Electronics",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      title: "Minimalist Smart Watch Pro",
      desc: "Track fitness, monitor health vitals, and receive notifications with AMOLED display.",
      mrp: 189.0,
      sellingPrice: 129.5,
      category: "Electronics",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      title: "Urban Travel Backpack",
      desc: "Weatherproof 25L commuter backpack with padded 16-inch laptop compartment.",
      mrp: 120.0,
      sellingPrice: 84.0,
      category: "Fashion",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
      title: "Polarized Classic Sunglasses",
      desc: "UV400 protective polarized lenses set in handcrafted acetate frames.",
      mrp: 85.0,
      sellingPrice: 49.0,
      category: "Accessories",
      rating: 4.6,
      inStock: false,
    },
  ]);

  const [addedItems, setAddedItems] = useState<{ [key: string | number]: boolean }>({});
  const [addAllSuccess, setAddAllSuccess] = useState(false);

  const removeFromWishlist = (id: string | number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const handleAddToCart = (id: string | number) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleAddAllToCart = () => {
    setAddAllSuccess(true);
    setTimeout(() => setAddAllSuccess(false), 2500);
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
          <span className="text-gray-900 font-medium">My Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              My Wishlist ({wishlistItems.length})
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Save your favorite items and move them to cart whenever you&apos;re ready
            </p>
          </div>

          {/* Header Action Buttons */}
          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs font-semibold text-gray-500 hover:text-red-600 transition px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer shadow-2xs"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="text-xs font-semibold text-white bg-primary hover:opacity-90 transition px-4 py-2 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {addAllSuccess ? "All Added to Cart!" : "Add All to Cart"}
              </button>
            </div>
          )}
        </div>

        {/* Empty Wishlist State */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 fill-none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              You haven&apos;t added any items to your wishlist yet. Browse our collections and tap the heart icon to save items.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 shadow-md transition"
              >
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const discountPct = Math.round(
                ((product.mrp - product.sellingPrice) / product.mrp) * 100
              );
              const isAdded = !!addedItems[product.id];

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                    {/* Discount Badge */}
                    {discountPct > 0 && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm pointer-events-none">
                        {discountPct}% OFF
                      </span>
                    )}

                    {/* Remove from Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 hover:bg-red-50 backdrop-blur-sm transition-all shadow-sm cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      className="block h-full w-full"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Category & Stock Status */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="uppercase tracking-wider font-medium text-gray-400">
                        {product.category || "General"}
                      </span>
                      {product.inStock ? (
                        <span className="text-[11px] font-semibold text-green-600">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-red-500">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors text-base hover:underline">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.desc}
                    </p>

                    {/* Price & Add to Cart Action */}
                    <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-primary">
                            ${product.sellingPrice.toFixed(2)}
                          </span>
                          {product.mrp > product.sellingPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.mrp.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product.id)}
                        className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          isAdded
                            ? "bg-green-600 text-white"
                            : "bg-primary text-white hover:opacity-90 active:scale-95"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Move to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

