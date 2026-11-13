"use client";

import React, { useState } from "react";
import ProductCard, { Product } from "./ProductCard";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const sampleProducts: Product[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      title: "Wireless Noise-Canceling Headphones",
      desc: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.",
      mrp: 299.99,
      sellingPrice: 199.99,
      category: "Electronics",
      rating: 4.8,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      title: "Minimalist Smart Watch Pro",
      desc: "Track fitness, monitor health vitals, and receive notifications with a stunning AMOLED display.",
      mrp: 189.0,
      sellingPrice: 129.5,
      category: "Electronics",
      rating: 4.6,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
      title: "Classic Chronograph Wristwatch",
      desc: "Timeless analog timepiece with genuine Italian leather strap and water-resistant casing.",
      mrp: 249.0,
      sellingPrice: 175.0,
      category: "Accessories",
      rating: 4.7,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      title: "Studio Wireless Earbuds",
      desc: "Ultra-compact true wireless earbuds with deep bass, low latency gaming mode, and IPX5 resistance.",
      mrp: 99.99,
      sellingPrice: 59.99,
      category: "Electronics",
      rating: 4.5,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      title: "Urban Travel Backpack",
      desc: "Weatherproof 25L commuter backpack with padded 16-inch laptop compartment and hidden anti-theft pockets.",
      mrp: 120.0,
      sellingPrice: 84.0,
      category: "Fashion",
      rating: 4.9,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
      title: "Retro High-Top Sneakers",
      desc: "Casual everyday high-top sneakers with cushioned insoles and durable vulcanized rubber soles.",
      mrp: 110.0,
      sellingPrice: 79.99,
      category: "Fashion",
      rating: 4.7,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
      title: "Polarized Classic Sunglasses",
      desc: "UV400 protective polarized lenses set in handcrafted acetate frames for timeless style and protection.",
      mrp: 85.0,
      sellingPrice: 49.0,
      category: "Accessories",
      rating: 4.6,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      title: "Designer Matte Sunglasses",
      desc: "Sleek aerodynamic frame with tinted mirror lenses, lightweight design for all-day comfort.",
      mrp: 95.0,
      sellingPrice: 65.0,
      category: "Accessories",
      rating: 4.4,
    },
  ];

  const categories = ["All", "Electronics", "Fashion", "Accessories"];

  const filteredProducts =
    selectedCategory === "All"
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-primary text-white p-8 sm:p-12 mb-12 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-white/10 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Seasonal Collection 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Elevate Your Everyday Essentials
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Explore our curated selection of high-performance electronics, modern apparel, and premium accessories.
            </p>
          </div>
          {/* Subtle Decorative Background circles */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-32 -top-12 w-64 h-64 bg-white/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Featured Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Handpicked top-rated products with the best discounts
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

