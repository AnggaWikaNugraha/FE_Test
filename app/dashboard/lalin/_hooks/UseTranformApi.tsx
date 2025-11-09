"use client";

import { LalinItem, LalinRow, SubtotalRuas } from "@/app/lib/_types/lalin";
import { useCallback } from "react";

/**
 * 🔹 Custom Hook: Transformasi data raw API menjadi tabel laporan lalu lintas
 * Reusable di berbagai halaman (harian, mingguan, bulanan, dll)
 */
export function useTransformLalinData() {
  const transformData = useCallback(
    (rows: LalinItem[], jenis: string): LalinRow[] => {
      const grouped: Record<string, LalinRow> = {};

      for (const item of rows || []) {
        const key = `${item.IdCabang}-${item.IdGerbang}-${item.IdGardu}`;

        if (!grouped[key]) {
          grouped[key] = {
            Ruas: `Ruas ${item.IdCabang}`,
            Gerbang: `Gerbang ${item.IdGerbang}`,
            Gardu: String(item.IdGardu).padStart(2, "0"),
            Hari: new Date(item.Tanggal).toLocaleDateString("id-ID", {
              weekday: "long",
            }),
            Tanggal: new Date(item.Tanggal).toLocaleDateString("id-ID"),
            Metode:
              jenis === "tunai"
                ? "Tunai"
                : jenis === "etoll"
                ? "E-Toll"
                : jenis === "flo"
                ? "Flo"
                : jenis === "ktp"
                ? "KTP"
                : jenis === "keseluruhan"
                ? "Keseluruhan"
                : "E-Toll + Tunai + Flo",
            GolI: 0,
            GolII: 0,
            GolIII: 0,
            GolIV: 0,
            GolV: 0,
            Total: 0,
          };
        }

        let total = 0;
        if (jenis === "tunai") {
          total = item.Tunai ?? 0;
        } else if (jenis === "etoll") {
          total =
            (item.eMandiri ?? 0) +
            (item.eBri ?? 0) +
            (item.eBni ?? 0) +
            (item.eBca ?? 0) +
            (item.eDki ?? 0) +
            (item.eMega ?? 0) +
            (item.eNobu ?? 0);
        } else if (jenis === "flo") {
          total = item.eFlo ?? 0;
        } else if (jenis === "ktp") {
          total =
            (item.DinasKary ?? 0) +
            (item.DinasMitra ?? 0) +
            (item.DinasOpr ?? 0);
        } else if (jenis === "keseluruhan") {
          total =
            (item.Tunai ?? 0) +
            (item.eMandiri ?? 0) +
            (item.eBri ?? 0) +
            (item.eBni ?? 0) +
            (item.eBca ?? 0) +
            (item.eDki ?? 0) +
            (item.eMega ?? 0) +
            (item.eNobu ?? 0) +
            (item.eFlo ?? 0) +
            (item.DinasKary ?? 0) +
            (item.DinasMitra ?? 0) +
            (item.DinasOpr ?? 0);
        } else {
          // default: total kombinasi utama
          total =
            (item.Tunai ?? 0) +
            (item.eMandiri ?? 0) +
            (item.eBri ?? 0) +
            (item.eBni ?? 0) +
            (item.eBca ?? 0) +
            (item.eFlo ?? 0);
        }

        // Tentukan kolom golongan
        const keyGol =
          item.Golongan === 1
            ? "GolI"
            : item.Golongan === 2
            ? "GolII"
            : item.Golongan === 3
            ? "GolIII"
            : item.Golongan === 4
            ? "GolIV"
            : "GolV";

        grouped[key][keyGol] += total;
        grouped[key].Total += total;
      }

      return Object.values(grouped);
    },
    []
  );

  return transformData;
}
