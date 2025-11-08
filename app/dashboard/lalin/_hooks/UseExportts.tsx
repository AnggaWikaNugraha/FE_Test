"use client";

import { useCallback } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { LalinRow, SubtotalRuas } from "@/app/lib/_types/lalin";


/**
 * 🔹 Custom Hook untuk Export PDF Laporan Lalin
 * Reusable di semua halaman laporan lalu lintas
 */
export function useExportLalin() {
  const handleExportPDF = useCallback(
    (
      filteredData: LalinRow[],
      subtotalPerRuas: SubtotalRuas[],
      totalKeseluruhan: SubtotalRuas,
      tanggal: string,
      jenis: string
    ) => {
      if (!filteredData || filteredData.length === 0) {
        alert("Tidak ada data untuk diexport");
        return;
      }

      const doc = new jsPDF("l", "pt", "a4");
      const title = `Laporan Lalu Lintas - ${tanggal}`;
      const subtitle = `Jenis: ${jenis.toUpperCase()} | Total Data: ${
        filteredData.length
      }`;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, 40, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(subtitle, 40, 60);

      // 🧾 Tabel utama
      autoTable(doc, {
        startY: 80,
        head: [
          [
            "No.",
            "Ruas",
            "Gerbang",
            "Gardu",
            "Hari",
            "Tanggal",
            "Metode",
            "Gol I",
            "Gol II",
            "Gol III",
            "Gol IV",
            "Gol V",
            "Total",
          ],
        ],
        body: filteredData.map((r, i) => [
          i + 1,
          r.Ruas,
          r.Gerbang,
          r.Gardu,
          r.Hari,
          r.Tanggal,
          r.Metode,
          r.GolI.toLocaleString(),
          r.GolII.toLocaleString(),
          r.GolIII.toLocaleString(),
          r.GolIV.toLocaleString(),
          r.GolV.toLocaleString(),
          r.Total.toLocaleString(),
        ]),
        styles: { fontSize: 7, cellPadding: 3 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      let currentY = (doc as any).lastAutoTable.finalY + 20;

      // 📊 Subtotal per Ruas
      if (subtotalPerRuas && subtotalPerRuas.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("Subtotal per Ruas", 40, currentY - 6);

        autoTable(doc, {
          startY: currentY,
          head: [
            ["Ruas", "Gol I", "Gol II", "Gol III", "Gol IV", "Gol V", "Total"],
          ],
          body: subtotalPerRuas.map((r) => [
            r.Ruas,
            r.GolI.toLocaleString(),
            r.GolII.toLocaleString(),
            r.GolIII.toLocaleString(),
            r.GolIV.toLocaleString(),
            r.GolV.toLocaleString(),
            r.Total.toLocaleString(),
          ]),
          styles: { fontSize: 8, cellPadding: 3 },
          headStyles: { fillColor: [100, 100, 100], textColor: 255 },
        });

        currentY = (doc as any).lastAutoTable.finalY + 20;
      }

      // 🧮 Total keseluruhan
      doc.setFont("helvetica", "bold");
      doc.text("Total Lalin Keseluruhan", 40, currentY - 5);

      autoTable(doc, {
        startY: currentY,
        head: [["Gol I", "Gol II", "Gol III", "Gol IV", "Gol V", "Total"]],
        body: [
          [
            totalKeseluruhan.GolI.toLocaleString(),
            totalKeseluruhan.GolII.toLocaleString(),
            totalKeseluruhan.GolIII.toLocaleString(),
            totalKeseluruhan.GolIV.toLocaleString(),
            totalKeseluruhan.GolV.toLocaleString(),
            totalKeseluruhan.Total.toLocaleString(),
          ],
        ],
        styles: { fontSize: 8, halign: "center" },
        headStyles: { fillColor: [70, 130, 180], textColor: 255 },
      });

      doc.save(`Laporan_Lalin_${tanggal}.pdf`);
    },
    []
  );

  return { handleExportPDF };
}
