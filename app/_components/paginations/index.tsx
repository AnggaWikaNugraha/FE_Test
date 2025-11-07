"use client";

import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;                   // total halaman
  onPageChange: (page: number) => void; // callback saat ganti halaman
  currentPage?: number;                // halaman aktif (optional)
}

/**
 * 🔹 Pagination Component
 * Reusable wrapper untuk ReactPaginate dengan tema biru langit.
 */
export default function Pagination({
  pageCount,
  onPageChange,
  currentPage = 0,
}: PaginationProps) {
  return (
    <div className="flex justify-end mt-4">
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={(p) => onPageChange(p.selected)}
        containerClassName="flex items-center gap-2 select-none"
        pageLinkClassName="px-3 py-1 rounded-md text-sm text-sky-600 hover:bg-sky-100 transition"
        previousLinkClassName="px-3 py-1 rounded-md text-sm text-sky-600 hover:bg-sky-100"
        nextLinkClassName="px-3 py-1 rounded-md text-sm text-sky-600 hover:bg-sky-100"
        activeLinkClassName="bg-sky-500 text-white rounded-md"
        disabledLinkClassName="opacity-40 cursor-not-allowed"
      />
    </div>
  );
}
