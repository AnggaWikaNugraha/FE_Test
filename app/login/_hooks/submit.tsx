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
      const success = await login(data.username, data.password);
      if (success) {
        setApiError(null);
        router.push("/dashboard");
      } else {
        setApiError("Username atau password salah");
      }
    } catch (err) {
      setApiError("Terjadi kesalahan, coba lagi nanti");
    } finally {
      setTimeout(() => {
            setLoading(false);   
      }, 2000);
    }
  };

  return {
    apiError,
    loading,
    handleLogin,
    setApiError, // opsional, kalau mau reset manual dari luar
  };
}
