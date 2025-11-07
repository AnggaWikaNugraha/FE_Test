import { api } from "@/app/lib/_api";
import { GerbangFilter, GerbangResponse } from "../../_types/api-gerbang";

/**
 * Ambil semua data gerbang dari API
 */
export async function getGerbangList(
  params: GerbangFilter = {}
): Promise<GerbangResponse> {
  try {
    const res = await api.get("/gerbangs", { params });
    return res.data as GerbangResponse;
  } catch (error: any) {
    console.error("❌ Gagal mengambil data gerbang:", error);
    throw new Error(
      error?.response?.data?.message || "Gagal memuat data gerbang"
    );
  }
}
