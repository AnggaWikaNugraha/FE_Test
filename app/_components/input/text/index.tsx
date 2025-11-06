"use client";

import { InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // lucide-react udah built-in di Next 13+

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
}

export default function InputText({
  label,
  register,
  errorMessage,
  type = "text",
  className = "",
  ...props
}: InputTextProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-gray-700 font-medium">{label}</label>
      )}

      <div className="relative">
        <input
          {...register}
          {...props}
          type={inputType}
          className={`w-full border rounded-md p-2 pr-10 text-gray-900 focus:outline-none focus:ring-2 ${
            errorMessage
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } ${className}`}
        />

        {/* 👁 Toggle show/hide password */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.8} />
            ) : (
              <Eye size={18} strokeWidth={1.8} />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
