"use client";

import { useEffect, useState } from "react";

interface DataItem {
  id: number;
  IdCabang: number;
}

/**
 * 🔹 Hook untuk generate id dan IdCabang otomatis berdasarkan existingData
 * 
 * @param isOpen - kondisi modal terbuka
 * @param existingData - array data yang sudah ada
 * @returns { nextId, nextCabangId }
 */
export function useGenerateAutoId(isOpen: boolean, existingData?: DataItem[]) {
  const [nextId, setNextId] = useState<number>(1);
  const [nextCabangId, setNextCabangId] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      // ✅ hitung id berikutnya (berdasarkan celah terkecil)
      let newNextId = 1;

      if (existingData && existingData.length > 0) {
        const ids = existingData.map((d) => d.id).sort((a, b) => a - b);

        for (let i = 0; i < ids.length; i++) {
          if (ids[i] !== newNextId) break; // ketemu celah, stop
          newNextId++;
        }
      }

      // ✅ ambil IdCabang terakhir lalu +1
      const newNextCabangId =
        existingData && existingData.length > 0
          ? existingData[existingData.length - 1].IdCabang + 1
          : 1;

      // simpan ke state
      setNextId(newNextId);
      setNextCabangId(newNextCabangId);

      console.log("Auto nextId:", newNextId, "Next IdCabang:", newNextCabangId);
    }
  }, [isOpen, existingData]);

  return { nextId, nextCabangId };
}
