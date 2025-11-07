import { ApiLoginResponse } from "./api-login";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<ApiLoginResponse>;
  logout: () => void;
}