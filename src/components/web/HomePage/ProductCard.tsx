"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface Product {
  id: string | number;
  image: string;
  title: string;
  desc: string;
  mrp: number;
  sellingPrice: number;
  category?: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercentage = Math.round(
    ((product.mrp - product.sellingPrice) / product.mrp) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container with Link to Details */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm pointer-events-none">
            {discountPercentage}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 shadow-sm cursor-pointer"
        >
          <svg
            className={`h-4 w-4 transition-colors ${
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

        {/* Product Image Link */}
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
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span className="uppercase tracking-wider font-medium">
            {product.category || "General"}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Title Link */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors text-base hover:underline">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {product.desc}
        </p>

        {/* Price & Action */}
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
            <span className="text-[11px] text-green-600 font-medium block">
              Save ${(product.mrp - product.sellingPrice).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
              isAdded
                ? "bg-green-600 text-white"
                : "bg-primary text-white hover:opacity-90 active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added
              </>
            ) : (
              <>
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
