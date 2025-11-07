"use client";
import DataTable, { TableColumn } from "react-data-table-component";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Pencil, Eye, Trash } from "lucide-react";

interface Gerbang {
  id: number;
  ruas: string;
  gerbang: string;
}

export default function DataTableGerbang() {
  const [data, setData] = useState<Gerbang[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setData([
      { id: 1, ruas: "Ruas 1", gerbang: "Gerbang 1" },
      { id: 2, ruas: "Ruas 1", gerbang: "Gerbang 2" },
      { id: 3, ruas: "Ruas 2", gerbang: "Gerbang 3" },
      { id: 4, ruas: "Ruas 2", gerbang: "Gerbang 4" },
    ]);
  }, []);

  const columns: TableColumn<Gerbang>[] = [
    {
      name: "No.",
      cell: (row, index) => <div>{index + 1}</div>, // ✅ gunakan cell, bukan selector
      width: "80px",
    },
    { name: "Ruas", selector: (row) => row.ruas },
    { name: "Gerbang", selector: (row) => row.gerbang },
    {
      name: "Aksi",
      cell: () => (
        <div className="flex gap-2">
          <Pencil size={16} className="cursor-pointer text-blue-600" />
          <Eye size={16} className="cursor-pointer text-green-600" />
          <Trash size={16} className="cursor-pointer text-red-600" />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination={false}
        highlightOnHover
        dense
      />

      <div className="flex justify-end mt-4">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageCount={10}
          onPageChange={(p) => setPage(p.selected)}
          containerClassName="flex items-center gap-2"
          activeClassName="bg-blue-500 text-white rounded px-2"
          pageClassName="px-2"
        />
      </div>
    </>
  );
}
