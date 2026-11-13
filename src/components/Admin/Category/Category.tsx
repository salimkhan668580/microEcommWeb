"use client";

import React, { useState } from "react";
import SubCategory from "./SubCategory/SubCategory";
import AddCategoryModal, { CategoryFormData } from "./AddCategoryModal";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  subCategoriesCount?: number;
}

export default function Category() {
  const [activeTab, setActiveTab] = useState<"category" | "subCategory">(
    "category"
  );

  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: "6aeb2f76b23c9d350b4ad3fc",
      name: "Electronics",
      slug: "electronics",
      isActive: true,
      subCategoriesCount: 3,
    },
    {
      id: "6aeb2f76b23c9d350b4ad3fd",
      name: "Fashion",
      slug: "fashion",
      isActive: true,
      subCategoriesCount: 1,
    },
    {
      id: "6aeb2f76b23c9d350b4ad3fe",
      name: "Accessories",
      slug: "accessories",
      isActive: true,
      subCategoriesCount: 1,
    },
    {
      id: "6aeb2f76b23c9d350b4ad3ff",
      name: "Home & Kitchen",
      slug: "home-kitchen",
      isActive: false,
      subCategoriesCount: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: CategoryItem) => {
    setEditingCategory(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleToggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSaveCategory = (data: CategoryFormData) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingCategory.id
            ? {
                ...item,
                name: data.name,
                slug: data.slug,
                isActive: data.isActive,
              }
            : item
        )
      );
    } else {
      const newItem: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: data.name,
        slug: data.slug,
        isActive: data.isActive,
        subCategoriesCount: 0,
      };
      setCategories((prev) => [newItem, ...prev]);
    }
  };

  const totalCount = categories.length;
  const activeCount = categories.filter((c) => c.isActive).length;
  const inactiveCount = categories.filter((c) => !c.isActive).length;

  const filteredCategories = categories.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" ? item.isActive : !item.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Title & Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Catalog Categories
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize products with structured primary categories and subcategories
          </p>
        </div>

        {/* Tab Switcher (Category & SubCategory) */}
        <div className="flex rounded-xl bg-gray-100 p-1 self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("category")}
            className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "category"
                ? "bg-primary text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Categories ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("subCategory")}
            className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "subCategory"
                ? "bg-primary text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            SubCategories
          </button>
        </div>
      </div>

      {/* TAB 1: Category Management */}
      {activeTab === "category" ? (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                  Total Categories
                </span>
                <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
                  {totalCount}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                  Active
                </span>
                <span className="text-2xl font-black text-emerald-600 tracking-tight mt-1 block">
                  {activeCount}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                  Inactive
                </span>
                <span className="text-2xl font-black text-gray-400 tracking-tight mt-1 block">
                  {inactiveCount}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search category by name or slug..."
                className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary shadow-xs"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter and Add Category CTA */}
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Category
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                    <th className="py-3.5 px-6">Category Name</th>
                    <th className="py-3.5 px-6">Slug</th>
                    <th className="py-3.5 px-6">SubCategories</th>
                    <th className="py-3.5 px-6 text-center">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-gray-50/50 transition">
                        <td className="py-4 px-6 font-semibold text-gray-900">
                          {cat.name}
                        </td>
                        <td className="py-4 px-6 font-mono text-[11px] text-gray-500">
                          /{cat.slug}
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-700">
                          {cat.subCategoriesCount || 0} subcategories
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(cat.id)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                cat.isActive ? "bg-emerald-600" : "bg-gray-300"
                              }`}
                              title={cat.isActive ? "Active (Click to deactivate)" : "Inactive (Click to activate)"}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  cat.isActive ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </button>
                            <span
                              className={`text-[10px] font-bold ${
                                cat.isActive ? "text-emerald-700" : "text-gray-400"
                              }`}
                            >
                              {cat.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(cat)}
                              className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary hover:bg-gray-50 transition cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(cat.id)}
                              className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition cursor-pointer"
                              title="Delete Category"
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
          </div>
        </div>
      ) : (
        /* TAB 2: SubCategory Management */
        <SubCategory
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      )}

      {/* Add / Edit Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
        initialData={editingCategory}
      />
    </div>
  );
}

