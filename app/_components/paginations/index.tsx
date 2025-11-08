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
  filters,
  setFilters,
  setPage,
  data,
}: any) {
  return (
    <div className="flex justify-between mt-4">
       {/* 🔽 Limit selector */}
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-neutral-700 mr-1">
          Total Gerbang: {data?.length || 0}
        </h2>

        <div className="flex items-center gap-2">
          <label
            htmlFor="limit"
            className="text-sm font-medium text-neutral-600"
          >
            Rows per page:
          </label>

          <select
            id="limit"
            value={filters.limit}
            onChange={(e) => {
              const newLimit = Number(e.target.value);
              setFilters((prev : any) => ({ ...prev, limit: newLimit }));
              setPage(0);
            }}
            className="
              appearance-none rounded-lg border border-neutral-300
              bg-white px-3 py-1.5 text-sm font-medium text-neutral-700
              shadow-sm outline-none transition
              hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100
            "
          >
            {[2, 5, 7, 10].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>
      </div>

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
