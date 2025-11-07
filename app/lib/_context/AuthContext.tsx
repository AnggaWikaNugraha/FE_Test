"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType } from "../_types/auth-context";
import { loginApi } from "../_api/login";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<{ username: string; name: string } | null>(
    null
  );

  // restore token saat refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    // ✅ Tandai bahwa restore selesai
    setIsInitialized(true);
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginApi(username, password);

    if (data.status && data.token) {
      localStorage.setItem("token", data.token);

      const userData = {
        username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
