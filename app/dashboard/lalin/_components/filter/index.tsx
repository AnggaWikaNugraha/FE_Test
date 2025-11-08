"use client";

import { Download, RotateCcw, Search } from "lucide-react";
import ButtonAction from "@/app/_components/filter/actions/reset";
import React from "react";
import { LalinRow, SubtotalRuas } from "@/app/lib/_types/lalin";

interface FilterLalinProps {
  tanggal: string;
  setTanggal: (val: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onReset: () => void;
  onExport: (
    filteredData: LalinRow[],
    subtotalPerRuas: SubtotalRuas[],
    totalKeseluruhan: SubtotalRuas,
    tanggal: string,
    jenis: string
  ) => void;
  filteredData: LalinRow[];
  subtotalPerRuas: SubtotalRuas[];
  totalKeseluruhan: SubtotalRuas;
  jenis: string;
}

/**
 * 🔹 Komponen Filter Lalin (Tanggal, Search, Reset, Export PDF)
 */
export default function FilterLalin({
  tanggal,
  setTanggal,
  searchTerm,
  setSearchTerm,
  onReset,
  onExport,
  filteredData,
  subtotalPerRuas,
  totalKeseluruhan,
  jenis,
}: FilterLalinProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
      {/* 📅 Filter tanggal */}
      <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-400 outline-none"
      />

      {/* 🔍 Filter pencarian */}
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-3 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="ruas / gerbang / gardu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-sky-400 outline-none"
        />
      </div>

      {/* 🔁 Tombol reset */}
      <ButtonAction
        label="Reset"
        icon={RotateCcw}
        onClick={onReset}
        variant="outline"
      />

      {/* 📄 Tombol export PDF */}
      <button
        onClick={() =>
          onExport(
            filteredData,
            subtotalPerRuas,
            totalKeseluruhan,
            tanggal,
            jenis
          )
        }
        className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 text-sm font-medium"
      >
        <Download size={16} /> Export PDF
      </button>
    </div>
  );
}
