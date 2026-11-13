"use client";

import React, { useState } from "react";
import AddSubCategory, { SubCategoryFormData } from "./AddSubCategory";

export interface SubCategoryItem {
  id: string;
  name: string;
  slug: string;
  parentId: string;
  isActive: boolean;
}

interface SubCategoryProps {
  categories: { id: string; name: string }[];
}

export default function SubCategory({ categories }: SubCategoryProps) {
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([
    {
      id: "sub-01",
      name: "Laptops",
      slug: "laptops",
      parentId: "6aeb2f76b23c9d350b4ad3fc",
      isActive: true,
    },
    {
      id: "sub-02",
      name: "Smartphones",
      slug: "smartphones",
      parentId: "6aeb2f76b23c9d350b4ad3fc",
      isActive: true,
    },
    {
      id: "sub-03",
      name: "Wireless Earbuds",
      slug: "wireless-earbuds",
      parentId: "6aeb2f76b23c9d350b4ad3fc",
      isActive: true,
    },
    {
      id: "sub-04",
      name: "Casual Footwear",
      slug: "casual-footwear",
      parentId: "6aeb2f76b23c9d350b4ad3fd",
      isActive: true,
    },
    {
      id: "sub-05",
      name: "Sunglasses",
      slug: "sunglasses",
      parentId: "6aeb2f76b23c9d350b4ad3fe",
      isActive: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [parentFilter, setParentFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategoryItem | null>(null);

  const handleOpenAddModal = () => {
    setEditingSubCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: SubCategoryItem) => {
    setEditingSubCategory(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubCategory(null);
  };

  const handleToggleStatus = (id: string) => {
    setSubCategories((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      setSubCategories((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSaveSubCategory = (data: SubCategoryFormData) => {
    if (editingSubCategory) {
      setSubCategories((prev) =>
        prev.map((item) =>
          item.id === editingSubCategory.id
            ? {
                ...item,
                name: data.name,
                slug: data.slug,
                parentId: data.parentId,
                isActive: data.isActive,
              }
            : item
        )
      );
    } else {
      const newItem: SubCategoryItem = {
        id: `sub-${Date.now()}`,
        name: data.name,
        slug: data.slug,
        parentId: data.parentId,
        isActive: data.isActive,
      };
      setSubCategories((prev) => [newItem, ...prev]);
    }
  };

  const getParentName = (parentId: string) => {
    const parent = categories.find((c) => c.id === parentId);
    return parent ? parent.name : "Unassigned";
  };

  const totalCount = subCategories.length;
  const activeCount = subCategories.filter((s) => s.isActive).length;
  const inactiveCount = subCategories.filter((s) => !s.isActive).length;

  const filteredSubCategories = subCategories.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesParent =
      parentFilter === "All" || item.parentId === parentFilter;
    return matchesSearch && matchesParent;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
              Total SubCategories
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight mt-1 block">
              {totalCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
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
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
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
            placeholder="Search subcategory by name or slug..."
            className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary shadow-xs"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Parent Category Filter & Add CTA */}
        <div className="flex items-center gap-3">
          <select
            value={parentFilter}
            onChange={(e) => setParentFilter(e.target.value)}
            className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 shadow-xs focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="All">All Parent Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add SubCategory
          </button>
        </div>
      </div>

      {/* SubCategory Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">SubCategory Name</th>
                <th className="py-3.5 px-6">Slug</th>
                <th className="py-3.5 px-6">Parent Category</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filteredSubCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No subcategories found.
                  </td>
                </tr>
              ) : (
                filteredSubCategories.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition">
                    {/* Name */}
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      {sub.name}
                    </td>

                    {/* Slug */}
                    <td className="py-4 px-6 font-mono text-[11px] text-gray-500">
                      /{sub.slug}
                    </td>

                    {/* Parent Category */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {getParentName(sub.parentId)}
                      </span>
                    </td>

                    {/* Toggle Switch Status */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(sub.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            sub.isActive ? "bg-emerald-600" : "bg-gray-300"
                          }`}
                          title={sub.isActive ? "Active (Click to deactivate)" : "Inactive (Click to activate)"}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              sub.isActive ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[10px] font-bold ${
                            sub.isActive ? "text-emerald-700" : "text-gray-400"
                          }`}
                        >
                          {sub.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(sub)}
                          className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary hover:bg-gray-50 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(sub.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition cursor-pointer"
                          title="Delete SubCategory"
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

      {/* Add / Edit SubCategory Modal */}
      <AddSubCategory
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSubCategory}
        categories={categories}
        initialData={editingSubCategory}
      />
    </div>
  );
}

