"use client";

import { useEffect, useState } from "react";
import { getGerbangList, Gerbang } from "@/app/lib/_api/master-gerbang/get";

interface Filters {
  NamaGerbang: string;
  NamaCabang: string;
  IdCabang: string;
}

export function useGerbangData() {
  const [data, setData] = useState<Gerbang[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    NamaGerbang: "",
    NamaCabang: "",
    IdCabang: "",
  });

  // 🔥 Fetch API dengan debounce (hindari hit per huruf)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);

          const res = await getGerbangList({
            page: page + 1,
            NamaGerbang: filters.NamaGerbang || undefined,
            NamaCabang: filters.NamaCabang || undefined,
            IdCabang: filters.IdCabang ? Number(filters.IdCabang) : undefined,
          });

          setData(res.data.rows.rows);
          setTotalPages(res.data.total_pages);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 500);

    return () => clearTimeout(timeout);
  }, [page, filters]);

  // handler input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // reset filter
  const resetFilters = () => {
    setFilters({ NamaGerbang: "", NamaCabang: "", IdCabang: "" });
    setPage(0);
  };

  return {
    data,
    page,
    totalPages,
    loading,
    error,
    filters,
    setFilters,
    handleFilterChange,
    setPage,
    resetFilters,
  };
}
