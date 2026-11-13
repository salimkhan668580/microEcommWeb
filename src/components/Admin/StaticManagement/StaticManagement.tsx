"use client";

import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export type StaticPageKey =
  | "faqs"
  | "contact-us"
  | "about-us"
  | "privacy-policy"
  | "terms-of-service";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StaticPageData {
  id: StaticPageKey;
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  isPublished: boolean;
  content: string;
  // Specific properties
  contactDetails?: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  faqs?: FAQItem[];
}

export default function StaticManagement() {
  const [activePage, setActivePage] = useState<StaticPageKey>("faqs");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [pages, setPages] = useState<Record<StaticPageKey, StaticPageData>>({
    faqs: {
      id: "faqs",
      name: "FAQs & Help Center",
      slug: "/help",
      metaTitle: "Frequently Asked Questions | ShopHub Help Center",
      metaDescription:
        "Find quick answers to common questions about orders, payments, shipping, returns, and account security.",
      lastUpdated: "Nov 14, 2026",
      isPublished: true,
      content:
        "# Welcome to ShopHub Help Center\n\nFind quick answers to the most commonly asked customer queries below or contact our 24/7 dedicated support team.\n\n---\n\n### Need immediate assistance?\nIf your query isn't listed below, please check our **Contact Us** page or reach out via live chat.",
      faqs: [
        {
          id: "faq-1",
          question: "How do I track my order shipment?",
          answer:
            "Once your order has been dispatched, you will receive an SMS and email notification with your real-time courier tracking number. You can also view live delivery tracking in your 'Orders' profile tab.",
          category: "Shipping",
        },
        {
          id: "faq-2",
          question: "What is your refund and return policy?",
          answer:
            "We offer a 7-day hassle-free return window for all eligible items. Items must be unopened, in their original packaging, and with tags intact. Refunds are credited back to your original payment method within 3-5 business days.",
          category: "Returns",
        },
        {
          id: "faq-3",
          question: "Which payment options do you support?",
          answer:
            "We support major credit/debit cards (Visa, MasterCard, Amex), UPI, Net Banking, Razorpay, and Cash on Delivery (COD) for eligible pin codes.",
          category: "Payments",
        },
      ],
    },
    "contact-us": {
      id: "contact-us",
      name: "Contact Us",
      slug: "/contact",
      metaTitle: "Contact Us | ShopHub Customer Support",
      metaDescription:
        "Have a question, feedback, or need help with your order? Get in touch with the ShopHub support team.",
      lastUpdated: "Nov 12, 2026",
      isPublished: true,
      content:
        "# Get in Touch With Us\n\nWe are here to help you with any questions about products, active orders, warranties, or business partnerships. Fill out our contact form or reach us via phone or email.\n\n> Our average response time for email inquiries is under **2 hours** during business hours.",
      contactDetails: {
        email: "support@shophub.com",
        phone: "+1 (800) 234-5678",
        address: "452 Innovation Blvd, Suite 200, Tech District, CA 94105",
        hours: "Monday - Saturday: 9:00 AM - 8:00 PM EST",
      },
    },
    "about-us": {
      id: "about-us",
      name: "About Us",
      slug: "/about",
      metaTitle: "About ShopHub | Empowering Modern Commerce",
      metaDescription:
        "Discover our journey, mission, and how ShopHub brings top-tier products directly to your doorstep.",
      lastUpdated: "Nov 10, 2026",
      isPublished: true,
      content:
        "# Building the Future of Modern Retail\n\nFounded in 2024, **ShopHub** was created with a clear mission: to make authentic, premium tech, electronics, and lifestyle products accessible to everyone at transparent prices.\n\n---\n\n## Our Core Values\n- **Quality Guaranteed**: Every product is authentic and vetted by certified manufacturers.\n- **Lightning Fast Logistics**: Seamless warehousing and reliable delivery partners.\n- **Customer First**: 24/7 dedicated customer care and worry-free warranties.\n\n### Our Footprint\nOver **500,000+** delighted customers across 120 cities.",
    },
    "privacy-policy": {
      id: "privacy-policy",
      name: "Privacy Policy",
      slug: "/privacy",
      metaTitle: "Privacy Policy | ShopHub Data Protection",
      metaDescription:
        "Learn how ShopHub collects, encrypts, and protects your personal data in compliance with GDPR and global privacy standards.",
      lastUpdated: "Nov 01, 2026",
      isPublished: true,
      content:
        "# Privacy Policy & Data Protection\n\n*Effective Date: November 1, 2026*\n\nYour privacy is fundamentally important to us. This policy details how ShopHub collects, stores, and protects your personal data when you browse our site, purchase items, or create an account.\n\n---\n\n## 1. Information We Collect\nWe collect information you provide directly to us when placing orders, including:\n- Contact information (Name, Email address, Phone number)\n- Delivery & billing address\n- Payment transaction references (We never store your raw CVV or card PIN)\n\n## 2. How We Protect Your Data\nAll sensitive transmissions are protected using industry-standard **256-bit TLS/SSL encryption**.\n\n## 3. Cookie Policy\nWe use session cookies and analytics to remember your cart preferences and improve browsing speed.",
    },
    "terms-of-service": {
      id: "terms-of-service",
      name: "Terms of Service",
      slug: "/terms",
      metaTitle: "Terms of Service | ShopHub User Agreement",
      metaDescription:
        "Review the terms and conditions governing purchases, returns, warranty coverage, and user conduct on ShopHub.",
      lastUpdated: "Nov 01, 2026",
      isPublished: true,
      content:
        "# Terms & Conditions of Use\n\n*Last Updated: November 1, 2026*\n\nWelcome to ShopHub. By accessing our platform, browsing catalog items, or making a purchase, you agree to comply with and be bound by the following Terms of Service.\n\n---\n\n## 1. Account Obligations\nYou are responsible for safeguarding your login credentials and for any purchases initiated under your account.\n\n## 2. Pricing and Availability\nAll prices are listed in USD/INR inclusive of applicable taxes unless specified otherwise. We reserve the right to correct typographical pricing errors before order fulfillment.\n\n## 3. Product Warranties\nProducts carry their official manufacturer warranty. Please retain your digital invoice for warranty claims.",
    },
  });

  const currentPage = pages[activePage];

  // Handlers for modifying page details
  const updateCurrentPage = (updates: Partial<StaticPageData>) => {
    setPages((prev) => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        ...updates,
      },
    }));
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentPage({
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // FAQ specific handlers
  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: "New Frequently Asked Question?",
      answer: "Provide the detailed answer here.",
      category: "General",
    };
    const updatedFaqs = [...(currentPage.faqs || []), newFaq];
    updateCurrentPage({ faqs: updatedFaqs });
  };

  const handleUpdateFaq = (
    id: string,
    field: "question" | "answer" | "category",
    val: string
  ) => {
    const updated = (currentPage.faqs || []).map((faq) =>
      faq.id === id ? { ...faq, [field]: val } : faq
    );
    updateCurrentPage({ faqs: updated });
  };

  const handleDeleteFaq = (id: string) => {
    const updated = (currentPage.faqs || []).filter((faq) => faq.id !== id);
    updateCurrentPage({ faqs: updated });
  };

  return (
    <div className="space-y-8">
      {/* Title & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Static Content & Legal Pages
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage public website pages, FAQs, policies, and terms with rich markdown formatting
          </p>
        </div>

        {saveSuccess && (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs animate-in fade-in">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Page changes published successfully!
          </div>
        )}
      </div>

      {/* Pages Tab Bar */}
      <div className="flex overflow-x-auto pb-1 gap-2 border-b border-gray-200 text-xs scrollbar-none">
        {(
          [
            { key: "faqs", label: "FAQs & Help Center", icon: "❓" },
            { key: "contact-us", label: "Contact Us", icon: "📞" },
            { key: "about-us", label: "About Us", icon: "🏢" },
            { key: "privacy-policy", label: "Privacy Policy", icon: "🔒" },
            { key: "terms-of-service", label: "Terms of Service", icon: "📜" },
          ] as const
        ).map((tab) => {
          const isActive = activePage === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActivePage(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold transition whitespace-nowrap cursor-pointer border-b-2 -mb-px ${
                isActive
                  ? "border-primary text-primary bg-white shadow-xs"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  pages[tab.key].isPublished ? "bg-emerald-500" : "bg-amber-400"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Main Editing Card */}
      <form onSubmit={handleSavePage} className="space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
          {/* Header Metadata Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {currentPage.name}
                </h2>
                <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                  {currentPage.slug}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    currentPage.isPublished
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {currentPage.isPublished ? "Published" : "Draft Mode"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Last modified on {currentPage.lastUpdated}
              </p>
            </div>

            {/* Status Toggle & Save CTA */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                <span className="text-xs font-semibold text-gray-700">
                  {currentPage.isPublished ? "Live" : "Draft"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateCurrentPage({ isPublished: !currentPage.isPublished })
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    currentPage.isPublished ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                  role="switch"
                  aria-checked={currentPage.isPublished}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      currentPage.isPublished
                        ? "translate-x-4"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:opacity-90 transition cursor-pointer"
              >
                Save & Publish
              </button>
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={currentPage.metaTitle}
                onChange={(e) =>
                  updateCurrentPage({ metaTitle: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                SEO Meta Description
              </label>
              <input
                type="text"
                value={currentPage.metaDescription}
                onChange={(e) =>
                  updateCurrentPage({ metaDescription: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Specific Module: Contact Details */}
          {activePage === "contact-us" && currentPage.contactDetails && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Support Channels & Business Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={currentPage.contactDetails.email}
                    onChange={(e) =>
                      updateCurrentPage({
                        contactDetails: {
                          ...currentPage.contactDetails!,
                          email: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Hotline Phone
                  </label>
                  <input
                    type="text"
                    value={currentPage.contactDetails.phone}
                    onChange={(e) =>
                      updateCurrentPage({
                        contactDetails: {
                          ...currentPage.contactDetails!,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Office / Warehouse Address
                  </label>
                  <input
                    type="text"
                    value={currentPage.contactDetails.address}
                    onChange={(e) =>
                      updateCurrentPage({
                        contactDetails: {
                          ...currentPage.contactDetails!,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={currentPage.contactDetails.hours}
                    onChange={(e) =>
                      updateCurrentPage({
                        contactDetails: {
                          ...currentPage.contactDetails!,
                          hours: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Specific Module: FAQs Q&A Builder */}
          {activePage === "faqs" && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Interactive FAQ Items ({currentPage.faqs?.length || 0})
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Add, edit, and organize individual expandable accordion questions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-primary hover:bg-gray-100 shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Question
                </button>
              </div>

              <div className="space-y-3">
                {currentPage.faqs?.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs font-black text-gray-400">
                          #{index + 1}
                        </span>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            handleUpdateFaq(faq.id, "question", e.target.value)
                          }
                          placeholder="Question Title..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={faq.category}
                          onChange={(e) =>
                            handleUpdateFaq(faq.id, "category", e.target.value)
                          }
                          placeholder="Category"
                          className="w-24 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-medium text-gray-600 focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded transition"
                          title="Delete FAQ"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        handleUpdateFaq(faq.id, "answer", e.target.value)
                      }
                      placeholder="Detailed answer explanation..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 leading-relaxed focus:outline-none focus:border-primary resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Rich Text / Markdown Editor */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Main Body Content (Markdown Text Editor)
            </label>
            <RichTextEditor
              value={currentPage.content}
              onChange={(content) => updateCurrentPage({ content })}
              placeholder="Compose your static page content with markdown formatting..."
              minHeight="360px"
            />
          </div>

          {/* Bottom Save Action */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Changes reflect immediately on published public routes
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:opacity-90 transition cursor-pointer"
            >
              Save & Publish Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

