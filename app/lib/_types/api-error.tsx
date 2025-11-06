import { ReactNode } from "react";

export interface ApiErrorProps {
  message?: string | null;
  align?: "left" | "center" | "right";
  className?: string;
  icon?: ReactNode; // opsional, kalau mau tambahkan ikon error
}
