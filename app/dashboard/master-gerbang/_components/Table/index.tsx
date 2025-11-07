"use client";

import DataTable, { TableColumn } from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { Pencil, Eye, Trash, Search, RotateCcw } from "lucide-react";
import { getGerbangList, Gerbang } from "@/app/lib/_api/master-gerbang/get";
import { useGerbangData } from "../../_hooks/UseDataGerbang";
import InputFilter from "@/app/_components/filter/input/text";
import ButtonAction from "@/app/_components/filter/actions/reset";
import { getGerbangColumns } from "./TableColumn/gerbang-columns";
import Pagination from "@/app/_components/paginations";

export default function DataTableGerbang() {
  const {
    data,
    page,
    totalPages,
    loading,
    error,
    filters,
    handleFilterChange,
    setPage,
    resetFilters,
  } = useGerbangData();

  // Callback untuk aksi di kolom
  const handleEdit = (row: Gerbang) => {
    console.log("Edit:", row);
  };
  const handleView = (row: Gerbang) => {
    console.log("View:", row);
  };
  const handleDelete = (row: Gerbang) => {
    console.log("Delete:", row);
  };

  const columns = getGerbangColumns(handleEdit, handleView, handleDelete);

  if (loading) return <div className="p-4 text-gray-500">Loading data...</div>;
  if (error)
    return <div className="p-4 text-red-500">Gagal memuat data: {error}</div>;

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-6 bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md border border-sky-100">
        {/* 🔍 Nama Cabang */}
        <InputFilter
          label="Nama Cabang"
          name="NamaCabang"
          value={filters.NamaCabang}
          onChange={handleFilterChange}
          placeholder="Cari cabang..."
        />
        <InputFilter
          label="Nama Gerbang"
          name="NamaGerbang"
          value={filters.NamaGerbang}
          onChange={handleFilterChange}
          placeholder="Cari gerbang..."
        />
        <InputFilter
          label="ID Cabang"
          name="IdCabang"
          value={filters.IdCabang}
          onChange={handleFilterChange}
          placeholder="16"
          widthClass="w-24"
        />

        {/* 🎯 Tombol Aksi */}
        <ButtonAction
          label="Reset"
          icon={RotateCcw}
          onClick={resetFilters}
          variant="outline"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination={false}
        highlightOnHover
        dense
      />

      <Pagination
        pageCount={totalPages}
        onPageChange={(p) => setPage(p)}
        currentPage={page}
      />
    </>
  );
}
