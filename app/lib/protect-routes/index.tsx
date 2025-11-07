"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // kalau tidak ada token dan belum login, redirect ke login
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
