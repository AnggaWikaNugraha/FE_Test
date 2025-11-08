"use client";

import { LalinRow, SubtotalRuas } from "@/app/lib/_types/lalin";
import { useMemo } from "react";

/**
 * 🔹 Custom Hook untuk menghitung subtotal per ruas dan total keseluruhan
 * Input: filteredData (hasil filter FE)
 * Output: subtotalPerRuas & totalKeseluruhan
 */
export function useTotalLalin(filteredData: LalinRow[]) {
  // 🧮 Subtotal per Ruas
  const subtotalPerRuas: SubtotalRuas[] = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return Object.values(
      filteredData.reduce<Record<string, SubtotalRuas>>((acc, curr) => {
        if (!acc[curr.Ruas]) {
          acc[curr.Ruas] = {
            Ruas: curr.Ruas,
            GolI: 0,
            GolII: 0,
            GolIII: 0,
            GolIV: 0,
            GolV: 0,
            Total: 0,
          };
        }

        acc[curr.Ruas].GolI += curr.GolI || 0;
        acc[curr.Ruas].GolII += curr.GolII || 0;
        acc[curr.Ruas].GolIII += curr.GolIII || 0;
        acc[curr.Ruas].GolIV += curr.GolIV || 0;
        acc[curr.Ruas].GolV += curr.GolV || 0;
        acc[curr.Ruas].Total += curr.Total || 0;

        return acc;
      }, {})
    );
  }, [filteredData]);

  // 🧾 Total Keseluruhan
  const totalKeseluruhan: SubtotalRuas = useMemo(() => {
    if (!subtotalPerRuas || subtotalPerRuas.length === 0)
      return {
        Ruas: "Keseluruhan",
        GolI: 0,
        GolII: 0,
        GolIII: 0,
        GolIV: 0,
        GolV: 0,
        Total: 0,
      };

    return subtotalPerRuas.reduce<SubtotalRuas>(
      (acc, curr) => ({
        Ruas: "Keseluruhan",
        GolI: acc.GolI + curr.GolI,
        GolII: acc.GolII + curr.GolII,
        GolIII: acc.GolIII + curr.GolIII,
        GolIV: acc.GolIV + curr.GolIV,
        GolV: acc.GolV + curr.GolV,
        Total: acc.Total + curr.Total,
      }),
      {
        Ruas: "Keseluruhan",
        GolI: 0,
        GolII: 0,
        GolIII: 0,
        GolIV: 0,
        GolV: 0,
        Total: 0,
      }
    );
  }, [subtotalPerRuas]);

  return { subtotalPerRuas, totalKeseluruhan };
}
