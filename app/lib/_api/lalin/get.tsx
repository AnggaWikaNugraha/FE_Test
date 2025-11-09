import { api } from "@/app/lib/_api";
import { LalinItem } from "../../_types/lalin";

export interface LalinResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    total_pages: number;
    rows: {
      rows: LalinItem[];
      total_pages?: number;
    };
  };
}

/**
 * 🧭 Filter params untuk Lalin API
 */
export interface LalinFilter {
  tanggal: string;
  page?: number;
}

/**
 * 🚀 Ambil data lalu lintas berdasarkan tanggal dan page
 */
export async function getLalinList(
  params: LalinFilter
): Promise<LalinResponse> {
  try {
    const res = await api.get("/lalins", { params });
    return res.data as LalinResponse;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Gagal memuat data lalu lintas"
    );
  }
}
