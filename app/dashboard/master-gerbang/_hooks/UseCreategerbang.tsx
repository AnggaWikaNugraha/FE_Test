"use client";

import { useState } from "react";
import { createGerbang } from "@/app/lib/_api/master-gerbang/create";
import { CreateGerbangPayload } from "@/app/lib/_types/api-gerbang";

/**
 * 🔹 Hook untuk handle proses Create Gerbang
 * Mengelola state loading, error, dan success message
 */
export function useCreateGerbang(
  onSuccess?: () => void,
  onClose?: () => void,
  resetForm?: () => void
) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreate = async (data: CreateGerbangPayload) => {
    setLoading(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const res = await createGerbang(data);

      if (res.status) {
        setSuccessMsg("✅ Data berhasil ditambahkan!");
        resetForm?.();
        onSuccess?.();

        setTimeout(() => {
          setSuccessMsg(null);
          onClose?.();
        }, 1200);
      } else {
        setApiError(res.message || "Gagal menambahkan data gerbang");
      }
    } catch (err: any) {
      setApiError(err.message || "Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    apiError,
    successMsg,
    handleCreate,
  };
}
