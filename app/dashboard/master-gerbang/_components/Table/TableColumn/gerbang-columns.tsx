"use client";

import { TableColumn } from "react-data-table-component";
import { Pencil, Eye, Trash } from "lucide-react";
import { Gerbang } from "@/app/lib/_types/api-gerbang";

/**
 * 🔹 Fungsi pembuat kolom DataTable untuk Master Gerbang
 * Bisa dipanggil di komponen mana pun agar konsisten.
 */
export function getGerbangColumns(
  onEdit?: (row: Gerbang) => void,
  onView?: (row: Gerbang) => void,
  onDelete?: (row: Gerbang) => void
): TableColumn<Gerbang>[] {
  return [
    {
      name: "No.",
      cell: (_row, index) => <div>{index + 1}</div>,
      width: "80px",
    },
    {
      name: "Nama Cabang",
      selector: (row) => row.NamaCabang,
      sortable: true,
    },
    {
      name: "Nama Gerbang",
      selector: (row) => row.NamaGerbang,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2">
          <Pencil
            size={16}
            className="text-blue-600 cursor-pointer hover:opacity-75"
            onClick={() => onEdit && onEdit(row)}
          />
          <Trash
            size={16}
            className="text-red-600 cursor-pointer hover:opacity-75"
            onClick={() => onDelete && onDelete(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
}
