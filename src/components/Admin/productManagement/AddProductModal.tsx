"use client";

import React, { useState, useEffect } from "react";

export interface ProductFormData {
  id?: string | number;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  subCatId: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
  sku: string;
  status: "active" | "inactive";
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  initialData?: ProductFormData | null;
}

export const sampleCategories = [
  { id: "6aeb2f76b23c9d350b4ad3fc", name: "Electronics" },
  { id: "6aeb2f76b23c9d350b4ad3fd", name: "Fashion" },
  { id: "6aeb2f76b23c9d350b4ad3fe", name: "Accessories" },
];

export const sampleSubCategories = [
  { id: "6aeb30fdb23c9d350b4ad3ff", name: "Smartphones & Mobile" },
  { id: "6aeb30fdb23c9d350b4ad400", name: "Audio & Headphones" },
  { id: "6aeb30fdb23c9d350b4ad401", name: "Wearables & Smartwatches" },
];

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddProductModalProps) {
  const defaultState: ProductFormData = {
    name: "Salim 128GB",
    description:
      "Apple iPhone 15 with 128GB storage, advanced dual camera system and A16 Bionic chip.",
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    ],
    categoryId: "6aeb2f76b23c9d350b4ad3fc",
    subCatId: "6aeb30fdb23c9d350b4ad3ff",
    mrp: 69900,
    sellingPrice: 62999,
    stock: 11,
    sku: "APP-IP15-128",
    status: "active",
  };

  const [formData, setFormData] = useState<ProductFormData>(defaultState);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultState);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
              {initialData ? "Edit Product" : "Add New Product"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the product specifications, pricing, and stock details
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

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Product Name (`name`) *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Salim 128GB"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description (`description`) *
            </label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed product features, specs and notes..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary focus:bg-white resize-none"
            />
          </div>

          {/* Category & SubCategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Category ID (`categoryId`) *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary cursor-pointer"
              >
                {sampleCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id.slice(-6)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sub-Category ID (`subCatId`) *
              </label>
              <select
                name="subCatId"
                value={formData.subCatId}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary cursor-pointer"
              >
                {sampleSubCategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id.slice(-6)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SKU & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                SKU (`sku`) *
              </label>
              <input
                type="text"
                name="sku"
                required
                value={formData.sku}
                onChange={handleChange}
                placeholder="APP-IP15-128"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Status (`status`) *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                MRP (`mrp`) *
              </label>
              <input
                type="number"
                name="mrp"
                required
                value={formData.mrp}
                onChange={handleChange}
                placeholder="69900"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Selling Price (`sellingPrice`) *
              </label>
              <input
                type="number"
                name="sellingPrice"
                required
                value={formData.sellingPrice}
                onChange={handleChange}
                placeholder="62999"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Stock Quantity (`stock`) *
              </label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                placeholder="11"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Product Images Array */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Product Images (`images[]`)
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add image URL (e.g. https://example.com/image.jpg)"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition cursor-pointer"
              >
                + Add Image
              </button>
            </div>

            {/* Image Thumbnails List */}
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl border border-gray-200 overflow-hidden aspect-square bg-gray-50"
                  >
                    <img
                      src={img}
                      alt={`Product img ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                      title="Remove image"
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-gray-400 italic">
                No images added yet. Add at least one image URL above.
              </p>
            )}
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
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
            >
              {initialData ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

