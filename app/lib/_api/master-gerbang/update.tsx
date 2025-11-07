import { api } from "@/app/lib/_api";
import { CreateGerbangPayload } from "@/app/lib/_types/api-gerbang";

/**
 * 🔹 Update Data Gerbang
 * Backend expects PUT /api/gerbangs (tanpa parameter id di URL)
 */
export async function updateGerbang(payload: CreateGerbangPayload) {
  try {
    const res = await api.put("/gerbangs", payload);
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Gagal memperbarui data gerbang"
    );
  }
}
