"use client";

import { useCallback, useEffect, useState } from "react";
import { getGerbangList } from "@/app/lib/_api/master-gerbang/get";
import { Gerbang } from "@/app/lib/_types/api-gerbang";

interface Filters {
  NamaGerbang: string;
  NamaCabang: string;
  IdCabang: string;
  limit: number;
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
    limit: 2,
  });

  /**
   * 🧠 Fungsi utama fetch data dari API
   */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getGerbangList({
        page: page + 1,
        NamaGerbang: filters.NamaGerbang || undefined,
        NamaCabang: filters.NamaCabang || undefined,
        IdCabang: filters.IdCabang ? Number(filters.IdCabang) : undefined,
        limit: filters?.limit,
      });

      setData(res.data.rows.rows);
      setTotalPages(res.data.total_pages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  /**
   * 🔄 Refetch manual — bisa dipanggil dari luar
   */
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  /**
   * 🔥 Fetch API otomatis + debounce 500ms saat filter/page berubah
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fetchData]);

  /**
   * ✏️ Handler perubahan filter
   */
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 🔁 Reset filter ke default
   */
  const resetFilters = () => {
    setFilters({ NamaGerbang: "", NamaCabang: "", IdCabang: "", limit: 5 });
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
    refetch, // ✅ tambahan baru
  };
}
