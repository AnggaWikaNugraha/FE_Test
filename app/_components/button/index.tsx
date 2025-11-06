"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  loading?: boolean;
  children?: ReactNode;
}

export default function Button({
  text,
  loading = false,
  disabled,
  children,
  className = "",
  type = "button", // ✅ default button, bukan submit
  ...props
}: ButtonProps) {
  return (
    <button
      type={type} // ✅ bisa diubah jadi "submit" atau "reset" dari luar
      disabled={disabled || loading}
      className={`py-2 px-4 rounded font-semibold text-white transition 
        ${
          loading || disabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        } ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children || text
      )}
    </button>
  );
}
