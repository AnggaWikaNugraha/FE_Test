import { api } from "@/app/lib/_api";

export interface GerbangFilter {
  id?: number;
  IdCabang?: number;
  NamaCabang?: string;
  NamaGerbang?: string;
  page?: number;
}

// Struktur data satu item gerbang
export interface Gerbang {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}

// Struktur response dari backend
export interface GerbangResponse {
  status: boolean; // Status berhasil / gagal
  message: string; // Pesan dari backend (biasanya "successfully get data")
  code: number; // HTTP-like status code dari backend (biasanya 200)
  data: {
    total_pages: number; // Jumlah total halaman
    current_page: number; // Halaman aktif saat ini
    count: number; // Total data pada halaman ini
    rows: {
      count: number; // Jumlah item di field rows (biasanya sama dengan count di atas)
      rows: Gerbang[]; // Array berisi data gerbang
    };
  };
}

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
