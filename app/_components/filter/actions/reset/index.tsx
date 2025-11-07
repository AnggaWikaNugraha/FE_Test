"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;              // teks di dalam tombol
  variant?: "primary" | "outline" | "danger" | "success"; // variasi gaya
  icon?: LucideIcon;          // icon dari lucide-react (opsional)
}

/**
 * 🔹 ButtonAction Component
 * Tombol serbaguna dengan tema biru langit (default)
 * Bisa digunakan di seluruh dashboard (Cari, Reset, Tambah, Hapus, dll)
 */
export default function ButtonAction({
  label,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}: ButtonActionProps) {
  // 🎨 Pilihan style berdasarkan variant
  const baseStyle =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97]";
  const variantStyles = {
    primary:
      "bg-sky-500 hover:bg-sky-600 text-white shadow-sm focus:ring-2 focus:ring-sky-400",
    outline:
      "border border-sky-200 text-sky-600 hover:bg-sky-50 focus:ring-2 focus:ring-sky-400",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-400",
    success:
      "bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:ring-green-400",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
}
