"use client";

import { ApiErrorProps } from "@/app/lib/_types/api-error";

export default function ApiError({
  message,
  align = "center",
  className = "",
  icon,
}: ApiErrorProps) {
  if (!message) return null; // tidak tampil kalau message kosong

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  return (
    <div
      className={`bg-red-50 border border-red-400 text-red-700 text-sm rounded-md p-2 ${alignClass} ${className}`}
      role="alert"
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
}
