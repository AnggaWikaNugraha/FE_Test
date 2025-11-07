"use client";

import React from "react";

interface InputFilterProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  value?: string | number; // ✅ ubah: value optional
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ ubah: opsional
  widthClass?: string;
}

/**
 * 🔹 InputFilter Component (reusable)
 * Dapat digunakan untuk controlled (pakai value/onChange) atau uncontrolled (pakai {...register})
 */
const InputFilter = React.forwardRef<HTMLInputElement, InputFilterProps>(
  ({ label, name, value, onChange, placeholder, widthClass = "w-56", ...props }, ref) => {
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
          ref={ref} // ✅ penting untuk react-hook-form
          className={`border border-sky-200 rounded-lg px-3 py-2 text-sm ${widthClass} 
                      focus:ring-2 focus:ring-sky-400 focus:outline-none
                      placeholder:text-sky-300 transition-all duration-200`}
          style={{ textTransform: "none" }}
          {...props}
        />
      </div>
    );
  }
);

InputFilter.displayName = "InputFilter";
export default InputFilter;
