import { api } from "@/app/lib/_api";
import { CreateGerbangPayload, CreateGerbangResponse } from "../../_types/api-gerbang";

/**
 * 🔹 API Create Data Gerbang
 */
export async function createGerbang(
  payload: CreateGerbangPayload
): Promise<CreateGerbangResponse> {
  try {
    const res = await api.post("/gerbangs", payload);
    return res.data as CreateGerbangResponse;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Gagal menambahkan data gerbang"
    );
  }
}
