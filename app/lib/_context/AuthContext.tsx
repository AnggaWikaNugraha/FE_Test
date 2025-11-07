"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType } from "../_types/auth-context";
import { api } from "../_api";
import { ApiLoginResponse } from "../_types/api-login";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; name: string } | null>(null);

  // restore token saat refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token) setIsAuthenticated(true);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (username: string, password: string): Promise<ApiLoginResponse> => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      if (data.status === true && data.token) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        
        const userData = {
          username,
          name: username.charAt(0).toUpperCase() + username.slice(1), // kapitalisasi huruf depan
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        return { status: true, message: data.message, token: data.token, user: userData,};
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
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout , user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
