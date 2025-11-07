"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/_context/AuthContext";
import { LoginFormValues } from "@/app/lib/_types/login";


export function useLoginHandler() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (data: LoginFormValues) => {
    setApiError(null);
    setLoading(true);
  
    try {
      // login() sekarang return object
      const res = await login(data.username, data.password);
      console.log(res);
      
  
      if (res.status) {
        // ✅ sukses login
        setApiError(null);
        router.push("/dashboard");
      } else {
        // ❌ gagal login → tampilkan pesan dari API
        setApiError(res.message || "Username atau password salah");
      }
    } catch (err) {
      console.error("Login error:", err);
      setApiError("Terjadi kesalahan, coba lagi nanti");
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return {
    apiError,
    loading,
    handleLogin,
    setApiError, // opsional, kalau mau reset manual dari luar
  };
}
