"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    // ✅ Tunggu sampai AuthContext selesai inisialisasi
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  // ✅ Kalau belum inisialisasi, tampilkan loading state
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}
