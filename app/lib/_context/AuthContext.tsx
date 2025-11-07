"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType } from "../_types/auth-context";
import { api } from "../_api";
import { ApiLoginResponse } from "../_types/api-login";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // restore token saat refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const login = async (username: string, password: string): Promise<ApiLoginResponse> => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      if (data.status === true && data.token) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        return { status: true, message: data.message, token: data.token };
      } else {
        return { status: false, message: data.message || "Username atau password salah" };
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // Ambil pesan error dari response API (jika ada)
      const apiMsg =
        error?.response?.data?.message || "Terjadi kesalahan koneksi ke server";

      return { status: false, message: apiMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
