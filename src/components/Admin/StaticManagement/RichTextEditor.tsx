"use client";

import React, { useState, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "320px",
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to wrap selected text with markdown tags
  const applyFormat = (prefix: string, suffix: string = prefix, defaultPlaceholder: string = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultPlaceholder;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const updated = value.substring(0, start) + replacement + value.substring(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  // Helper to insert block-level prefixes like '# ', '## ', '> ', etc.
  const applyBlockFormat = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || "Heading";
    const replacement = `\n${prefix}${selectedText}\n`;

    const updated = value.substring(0, start) + replacement + value.substring(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length + 1,
        start + prefix.length + 1 + selectedText.length
      );
    }, 0);
  };

  // Quick link prompt
  const insertLink = () => {
    const url = prompt("Enter URL (e.g. https://example.com):", "https://");
    if (!url) return;
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart || 0;
    const end = textarea?.selectionEnd || 0;
    const selectedText = value.substring(start, end) || "Link Title";
    const linkMarkdown = `[${selectedText}](${url})`;

    const updated = value.substring(0, start) + linkMarkdown + value.substring(end);
    onChange(updated);
  };

  // Insert Horizontal Rule
  const insertHorizontalRule = () => {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart || value.length;
    const updated = value.substring(0, start) + "\n\n---\n\n" + value.substring(start);
    onChange(updated);
  };

  // Keyboard shortcut listener
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      applyFormat("**", "**", "bold text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      applyFormat("*", "*", "italic text");
    }
  };

  // Simple Markdown to HTML parser for the Preview tab
  const renderSimpleMarkdown = (text: string) => {
    if (!text) return "<p class='text-gray-400 italic'>No content written yet.</p>";

    const lines = text.split("\n");
    let html = "";
    let inList = false;

    lines.forEach((line) => {
      let trimmed = line.trim();

      if (trimmed.startsWith("### ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h3 class="text-base font-bold text-gray-900 mt-4 mb-2">${trimmed.slice(4)}</h3>`;
      } else if (trimmed.startsWith("## ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h2 class="text-lg font-bold text-gray-900 mt-5 mb-2 border-b pb-1">${trimmed.slice(3)}</h2>`;
      } else if (trimmed.startsWith("# ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h1 class="text-xl font-black text-gray-900 mt-6 mb-3">${trimmed.slice(2)}</h1>`;
      } else if (trimmed.startsWith("> ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<blockquote class="border-l-4 border-primary pl-4 py-1 my-3 bg-gray-50 text-gray-700 italic text-xs">${trimmed.slice(2)}</blockquote>`;
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) { html += "<ul class='list-disc pl-5 my-2 space-y-1 text-xs text-gray-700'>"; inList = true; }
        html += `<li>${formatInline(trimmed.slice(2))}</li>`;
      } else if (trimmed === "---") {
        if (inList) { html += "</ul>"; inList = false; }
        html += "<hr class='my-4 border-gray-200' />";
      } else if (trimmed === "") {
        if (inList) { html += "</ul>"; inList = false; }
        html += "<div class='h-2'></div>";
      } else {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<p class="text-xs text-gray-700 my-1.5 leading-relaxed">${formatInline(trimmed)}</p>`;
      }
    });

    if (inList) html += "</ul>";
    return html;
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-gray-900'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>")
      .replace(/~~(.*?)~~/g, "<del class='line-through text-gray-400'>$1</del>")
      .replace(/`(.*?)`/g, "<code class='bg-gray-100 text-primary px-1.5 py-0.5 rounded text-[11px] font-mono'>$1</code>")
      .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' class='text-primary underline font-medium'>$1</a>");
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-xs overflow-hidden flex flex-col">
      {/* Editor Toolbar & Mode Switcher */}
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => applyFormat("**", "**", "Bold text")}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition font-bold"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => applyFormat("*", "*", "Italic text")}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition italic"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => applyFormat("~~", "~~", "Strikethrough text")}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition line-through text-[11px]"
            title="Strikethrough"
          >
            S
          </button>

          <span className="w-px h-4 bg-gray-300 mx-1" />

          {/* Headings */}
          <button
            type="button"
            onClick={() => applyBlockFormat("# ")}
            className="px-2 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition font-black text-xs"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => applyBlockFormat("## ")}
            className="px-2 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition font-bold text-xs"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => applyBlockFormat("### ")}
            className="px-2 py-1 rounded-lg text-gray-700 hover:bg-gray-200 transition font-semibold text-xs"
            title="Heading 3"
          >
            H3
          </button>

          <span className="w-px h-4 bg-gray-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => applyBlockFormat("- ")}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            title="Bullet List"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyBlockFormat("> ")}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            title="Quote"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyFormat("`", "`", "code")}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition font-mono text-[11px]"
            title="Inline Code"
          >
            &lt;/&gt;
          </button>
          <button
            type="button"
            onClick={insertLink}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            title="Insert Link"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={insertHorizontalRule}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-200 transition text-[11px] font-bold"
            title="Divider Line"
          >
            ―
          </button>
        </div>

        {/* Edit / Preview Tabs */}
        <div className="flex items-center rounded-xl bg-gray-200 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === "edit"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ${
              activeTab === "preview"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {activeTab === "edit" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full p-4 text-xs font-mono text-gray-800 leading-relaxed bg-white focus:outline-none resize-y"
        />
      ) : (
        <div
          style={{ minHeight }}
          className="p-5 bg-white overflow-y-auto max-h-[500px]"
          dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(value) }}
        />
      )}

      {/* Word / Char Counter Footer */}
      <div className="px-4 py-2 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
        <span>Markdown formatted</span>
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}

