"use client";

import { useState } from "react";

export default function ProductAccordion({
  title,
  children,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-gray-800">
          {title}
        </span>

        <span
          className={`text-lg text-gray-600 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* CONTENT */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}