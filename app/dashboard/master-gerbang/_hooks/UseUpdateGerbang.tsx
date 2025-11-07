"use client";

import { useState } from "react";
import { updateGerbang } from "@/app/lib/_api/master-gerbang/update";
import { CreateGerbangPayload } from "@/app/lib/_types/api-gerbang";

/**
 * 🔹 Hook untuk update data Gerbang
 * Mengelola state loading, success message, dan error API
 */
export function useUpdateGerbang(
  onSuccess?: () => void,
  onClose?: () => void
) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUpdate = async (data: CreateGerbangPayload) => {
    setLoading(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const res = await updateGerbang(data); // 🔥 kirim langsung body lengkap
      if (res.status) {
        setSuccessMsg("✅ Data berhasil diperbarui!");
        onSuccess?.();

        setTimeout(() => {
          setSuccessMsg(null);
          onClose?.();
        }, 1200);
      } else {
        setApiError(res.message || "Gagal memperbarui data gerbang");
      }
    } catch (err: any) {
      setApiError(err.message || "Terjadi kesalahan saat mengupdate data");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    apiError,
    successMsg,
    handleUpdate,
  };
}
