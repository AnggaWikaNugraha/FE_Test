"use client";

import React from "react";

interface InputFilterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Label di atas input
  name: string; // Nama untuk handleChange
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  widthClass?: string; // Tailwind width optional
}

/**
 * 🔹 InputFilter Component
 * Reusable input filter field with label + styling
 * Bisa dipakai untuk semua form filter (Nama Cabang, Nama Gerbang, ID, dll)
 */
export default function InputFilter({
  label,
  name,
  value,
  onChange,
  placeholder,
  widthClass = "w-56",
  ...props
}: InputFilterProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-xs font-semibold text-sky-800 mb-1 uppercase tracking-wide"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-sky-200 rounded-lg px-3 py-2 text-sm ${widthClass} 
                    focus:ring-2 focus:ring-sky-400 focus:outline-none
                    placeholder:text-sky-300 transition-all duration-200`}
        style={{ textTransform: "none" }}
        {...props}
      />
    </div>
  );
}
