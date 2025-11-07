"use client";

import { useState } from "react";
import { deleteGerbang } from "@/app/lib/_api/master-gerbang/delete";
import { Gerbang } from "@/app/lib/_types/api-gerbang";

/**
 * 🔹 Hook untuk handle konfirmasi & eksekusi delete data gerbang.
 * Termasuk state modal, item yang dipilih, dan loading.
 */
export function useDeleteGerbang(refetch?: () => void) {
  // ✅ State terpisah untuk readability
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState<Gerbang | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 🔹 Buka modal dan simpan row yang mau dihapus
  const askDelete = (row: Gerbang) => {
    setSelectedDelete(row);
    setConfirmOpen(true);
  };

  // 🔹 Konfirmasi hapus dan panggil API
  const confirmDelete = async () => {
    if (!selectedDelete) return;
    setLoadingDelete(true);

    try {
      const res = await deleteGerbang(
        selectedDelete.id,
        selectedDelete.IdCabang
      );

      if (res.status) {
        refetch?.(); // reload tabel
      } else {
        console.warn("Delete gagal:", res.message);
      }
    } catch (err: any) {
      console.error("Delete error:", err.message);
    } finally {
      setLoadingDelete(false);
      setConfirmOpen(false);
      setSelectedDelete(null);
    }
  };

  return {
    confirmOpen,
    setConfirmOpen,
    selectedDelete,
    setSelectedDelete,
    loadingDelete,
    askDelete,
    confirmDelete,
  };
}
