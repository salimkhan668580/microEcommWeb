"use client";

import React, { useState } from "react";
import Link from "next/link";
import AddProductModal, {
  ProductFormData,
  sampleCategories,
} from "./AddProductModal";

export interface AdminProduct {
  id: string | number;
  sku: string;
  title: string;
  description?: string;
  image: string;
  images?: string[];
  category: string;
  categoryId?: string;
  subCatId?: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  productStatus?: "active" | "inactive";
  salesCount: number;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<AdminProduct[]>([
    {
      id: 1,
      sku: "APP-IP15-128",
      title: "Salim 128GB",
      description:
        "Apple iPhone 15 with 128GB storage, advanced dual camera system and A16 Bionic chip.",
      image:
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
      ],
      category: "Electronics",
      categoryId: "6aeb2f76b23c9d350b4ad3fc",
      subCatId: "6aeb30fdb23c9d350b4ad3ff",
      mrp: 69900,
      sellingPrice: 62999,
      stock: 11,
      status: "In Stock",
      productStatus: "active",
      salesCount: 1240,
    },
    {
      id: 2,
      sku: "PROD-EL-002",
      title: "Minimalist Smart Watch Pro",
      description: "AMOLED screen with active health monitoring.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      category: "Electronics",
      categoryId: "6aeb2f76b23c9d350b4ad3fc",
      subCatId: "6aeb30fdb23c9d350b4ad401",
      mrp: 18900,
      sellingPrice: 12950,
      stock: 8,
      status: "Low Stock",
      productStatus: "active",
      salesCount: 980,
    },
    {
      id: 3,
      sku: "PROD-AC-003",
      title: "Classic Chronograph Wristwatch",
      description: "Handcrafted analog timepiece with leather straps.",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80",
      category: "Accessories",
      categoryId: "6aeb2f76b23c9d350b4ad3fe",
      subCatId: "6aeb30fdb23c9d350b4ad401",
      mrp: 24900,
      sellingPrice: 17500,
      stock: 35,
      status: "In Stock",
      productStatus: "active",
      salesCount: 640,
    },
    {
      id: 4,
      sku: "PROD-EL-004",
      title: "Studio Wireless Earbuds",
      description: "Hi-Fi wireless earbuds with deep bass and ENC.",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
      category: "Electronics",
      categoryId: "6aeb2f76b23c9d350b4ad3fc",
      subCatId: "6aeb30fdb23c9d350b4ad400",
      mrp: 9900,
      sellingPrice: 5999,
      stock: 0,
      status: "Out of Stock",
      productStatus: "inactive",
      salesCount: 812,
    },
    {
      id: 5,
      sku: "PROD-FA-005",
      title: "Urban Travel Backpack",
      description: "Weatherproof 25L commuter backpack with laptop sleeve.",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
      category: "Fashion",
      categoryId: "6aeb2f76b23c9d350b4ad3fd",
      subCatId: "6aeb30fdb23c9d350b4ad3ff",
      mrp: 12000,
      sellingPrice: 8400,
      stock: 42,
      status: "In Stock",
      productStatus: "active",
      salesCount: 820,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(
    null
  );

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: AdminProduct) => {
    setEditingProduct({
      id: prod.id,
      name: prod.title,
      description: prod.description || "",
      images: prod.images || [prod.image],
      categoryId: prod.categoryId || "6aeb2f76b23c9d350b4ad3fc",
      subCatId: prod.subCatId || "6aeb30fdb23c9d350b4ad3ff",
      mrp: prod.mrp,
      sellingPrice: prod.sellingPrice,
      stock: prod.stock,
      sku: prod.sku,
      status: prod.productStatus || "active",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (data: ProductFormData) => {
    const getStockStatus = (stock: number): AdminProduct["status"] => {
      if (stock === 0) return "Out of Stock";
      if (stock <= 10) return "Low Stock";
      return "In Stock";
    };

    const categoryObj = sampleCategories.find((c) => c.id === data.categoryId);
    const categoryName = categoryObj ? categoryObj.name : "General";

    if (editingProduct?.id) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === editingProduct.id) {
            return {
              ...p,
              title: data.name,
              sku: data.sku,
              description: data.description,
              image: data.images[0] || p.image,
              images: data.images,
              category: categoryName,
              categoryId: data.categoryId,
              subCatId: data.subCatId,
              mrp: data.mrp,
              sellingPrice: data.sellingPrice,
              stock: data.stock,
              status: getStockStatus(data.stock),
              productStatus: data.status,
            };
          }
          return p;
        })
      );
    } else {
      const newProduct: AdminProduct = {
        id: Date.now(),
        title: data.name,
        sku: data.sku,
        description: data.description,
        image:
          data.images[0] ||
          "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80",
        images: data.images,
        category: categoryName,
        categoryId: data.categoryId,
        subCatId: data.subCatId,
        mrp: data.mrp,
        sellingPrice: data.sellingPrice,
        stock: data.stock,
        status: getStockStatus(data.stock),
        productStatus: data.status,
        salesCount: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    handleCloseModal();
  };

  const handleDeleteProduct = (id: string | number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleProductStatus = (id: string | number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus =
            p.productStatus === "active" ? "inactive" : "active";
          return { ...p, productStatus: nextStatus };
        }
        return p;
      })
    );
  };

  // Stats calculation
  const totalProducts = products.length + 836;
  const inStockCount = products.filter((p) => p.status === "In Stock").length + 812;
  const lowStockCount = products.filter((p) => p.status === "Low Stock").length + 16;
  const outOfStockCount = products.filter((p) => p.status === "Out of Stock").length + 5;

  const categories = ["All", "Electronics", "Fashion", "Accessories"];

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || prod.category === categoryFilter;

    const matchesStock =
      stockFilter === "All" || prod.status === stockFilter;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Product Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your store catalog, monitor stock levels, and update product pricing
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      </div>

      {/* SECTION 1: Product Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total Products
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {totalProducts}
            </span>
            <span className="text-xs text-purple-600 font-semibold mt-1 inline-flex items-center gap-1">
              Active catalog items
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              In Stock
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {inStockCount}
            </span>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1">
              ↑ 97.2% available
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Low Stock Alerts
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {lowStockCount}
            </span>
            <span className="text-xs text-amber-600 font-semibold mt-1 inline-flex items-center gap-1">
              ≤ 10 items remaining
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Out of Stock
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {outOfStockCount}
            </span>
            <span className="text-xs text-rose-600 font-semibold mt-1 inline-flex items-center gap-1">
              Restock required
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>

      {/* SECTION 2: Search, Filter & Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product title or SKU..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Stock:</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Selling Price</th>
                <th className="py-3.5 px-6">MRP</th>
                <th className="py-3.5 px-6">Stock Level</th>
                <th className="py-3.5 px-6">Stock Status</th>
                <th className="py-3.5 px-6 text-center">Active Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No products found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50/50 transition">
                    {/* Product Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-50 border border-gray-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/products/${prod.id}`}
                            className="font-semibold text-gray-900 hover:text-primary transition line-clamp-1 block"
                          >
                            {prod.title}
                          </Link>
                          <span className="font-mono text-[10px] text-gray-400">
                            {prod.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-gray-100 font-medium text-gray-700 text-[11px]">
                        {prod.category}
                      </span>
                    </td>

                    {/* Selling Price */}
                    <td className="py-4 px-6 font-bold text-gray-900 text-sm">
                      ${prod.sellingPrice.toLocaleString()}
                    </td>

                    {/* MRP */}
                    <td className="py-4 px-6 text-gray-400 line-through">
                      ${prod.mrp.toLocaleString()}
                    </td>

                    {/* Stock units */}
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {prod.stock} units
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.status === "In Stock"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : prod.status === "Low Stock"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            prod.status === "In Stock"
                              ? "bg-green-600"
                              : prod.status === "Low Stock"
                              ? "bg-amber-600"
                              : "bg-rose-600"
                          }`}
                        />
                        {prod.status}
                      </span>
                    </td>

                    {/* Active / Inactive Toggle Switch */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleProductStatus(prod.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            prod.productStatus === "active"
                              ? "bg-emerald-600"
                              : "bg-gray-300"
                          }`}
                          title={
                            prod.productStatus === "active"
                              ? "Active (Click to deactivate)"
                              : "Inactive (Click to activate)"
                          }
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              prod.productStatus === "active"
                                ? "translate-x-4"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[10px] font-bold ${
                            prod.productStatus === "active"
                              ? "text-emerald-700"
                              : "text-gray-400"
                          }`}
                        >
                          {prod.productStatus === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(prod)}
                          className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary hover:bg-gray-50 transition cursor-pointer"
                        >
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition cursor-pointer"
                          title="Delete Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of{" "}
            <strong className="text-gray-900">{products.length}</strong> catalog entries
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-gray-300 text-xs cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-gray-300 text-xs cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Extracted Modular Add / Edit Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </div>
  );
}
