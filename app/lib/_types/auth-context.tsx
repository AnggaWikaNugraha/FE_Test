import { ApiLoginResponse } from "./api-login";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; name: string } | null;
  login: (username: string, password: string) => Promise<ApiLoginResponse>;
  logout: () => void;
}