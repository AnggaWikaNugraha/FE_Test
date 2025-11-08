"use client";

import { LalinRow, SubtotalRuas } from "@/app/lib/_types/lalin";
import React from "react";

interface TableLalinProps {
  filteredData: LalinRow[];
  subtotalPerRuas: SubtotalRuas[];
  totalKeseluruhan: SubtotalRuas;
  page: number;
}

/**
 * 🔹 Komponen Tabel Lalin (Data Lalu Lintas)
 * Menampilkan tabel utama + subtotal per ruas + total keseluruhan
 */
export default function TableLalin({
  filteredData,
  subtotalPerRuas,
  totalKeseluruhan,
  page,
}: TableLalinProps) {
  if (!filteredData || filteredData.length === 0) {
    return (
      <p className="text-gray-500 text-center py-6">
        Tidak ada data untuk ditampilkan
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="px-3 py-2 text-left">No.</th>
            <th className="px-3 py-2 text-left">Ruas</th>
            <th className="px-3 py-2 text-left">Gerbang</th>
            <th className="px-3 py-2 text-left">Gardu</th>
            <th className="px-3 py-2 text-left">Hari</th>
            <th className="px-3 py-2 text-left">Tanggal</th>
            <th className="px-3 py-2 text-left">Metode Pembayaran</th>
            <th className="px-3 py-2 text-right">Gol I</th>
            <th className="px-3 py-2 text-right">Gol II</th>
            <th className="px-3 py-2 text-right">Gol III</th>
            <th className="px-3 py-2 text-right">Gol IV</th>
            <th className="px-3 py-2 text-right">Gol V</th>
            <th className="px-3 py-2 text-right">Total Lalin</th>
          </tr>
        </thead>

        <tbody>
          {/* 🔹 Data utama */}
          {filteredData.map((r, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2 text-center">
                {(page - 1) * filteredData.length + i + 1}
              </td>
              <td className="px-3 py-2">{r.Ruas}</td>
              <td className="px-3 py-2">{r.Gerbang}</td>
              <td className="px-3 py-2">{r.Gardu}</td>
              <td className="px-3 py-2">{r.Hari}</td>
              <td className="px-3 py-2">{r.Tanggal}</td>
              <td className="px-3 py-2">{r.Metode}</td>
              <td className="px-3 py-2 text-right">{r.GolI.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolII.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolIII.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolIV.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolV.toLocaleString()}</td>
              <td className="px-3 py-2 text-right font-semibold">
                {r.Total.toLocaleString()}
              </td>
            </tr>
          ))}

          {/* 🔹 Subtotal per Ruas */}
          {subtotalPerRuas.map((r, i) => (
            <tr key={`subtotal-${i}`} className="font-semibold bg-gray-100">
              <td colSpan={7} className="px-3 py-2 text-left">
                Total Lalin {r.Ruas}
              </td>
              <td className="px-3 py-2 text-right">{r.GolI.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolII.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolIII.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolIV.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.GolV.toLocaleString()}</td>
              <td className="px-3 py-2 text-right">{r.Total.toLocaleString()}</td>
            </tr>
          ))}

          {/* 🔹 Total Keseluruhan */}
          <tr className="font-bold bg-gray-300 text-gray-900">
            <td colSpan={7} className="px-3 py-2 text-left">
              Total Lalin Keseluruhan
            </td>
            <td className="px-3 py-2 text-right">
              {totalKeseluruhan.GolI.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right">
              {totalKeseluruhan.GolII.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right">
              {totalKeseluruhan.GolIII.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right">
              {totalKeseluruhan.GolIV.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right">
              {totalKeseluruhan.GolV.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right">
              {totalKeseluruhan.Total.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
