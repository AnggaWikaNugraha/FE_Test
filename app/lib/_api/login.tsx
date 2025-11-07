import { api } from "@/app/lib/_api";
import { ApiLoginResponse } from "../_types/api-login";


/**
 * Fungsi login ke API
 * @param username - Username yang diinput user
 * @param password - Password user
 * @returns data dari response API
 */
export async function loginApi(
  username: string,
  password: string
): Promise<ApiLoginResponse> {
  try {
    const res = await api.post("/auth/login", { username, password });
    return res.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Terjadi kesalahan koneksi ke server";
    return { status: false, message: msg };
  }
}
