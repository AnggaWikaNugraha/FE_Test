import { api } from "@/app/lib/_api";

/**
 * 🔹 Delete Data Gerbang
 * Backend expects DELETE /api/gerbangs
 * dengan body { id, IdCabang }
 */
export async function deleteGerbang(id: number, IdCabang: number) {
  try {
    const res = await api.delete("/gerbangs", {
      data: { id, IdCabang }, // ✅ axios support body di DELETE lewat property `data`
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Gagal menghapus data gerbang"
    );
  }
}
