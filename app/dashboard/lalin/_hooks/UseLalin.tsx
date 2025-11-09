"use client";

import { useEffect, useState, useMemo } from "react";
import { LalinRow, LalinItem, SubtotalRuas } from "@/app/lib/_types/lalin";
import { useTransformLalinData } from "./UseTranformApi";
import { getLalinList } from "@/app/lib/_api/lalin/get";

export function useLalinData() {
  const [data, setData] = useState<LalinRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tanggal, setTanggal] = useState("2023-11-01");
  const [jenis, setJenis] = useState("tunai");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const transformData = useTransformLalinData();

  const fetchData = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLalinList({ tanggal, page: pageNum });

      const raw = res?.data?.rows?.rows ?? [];
      const transformed = transformData(raw, jenis);
      setData(transformed);

      const totalPage =
        res?.data?.total_pages ?? res?.data?.rows?.total_pages ?? 1;
      setTotalPages(totalPage);
      setPage(res?.data?.current_page ?? 1);
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Gagal memuat data Lalin");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // 🔹 Auto fetch setiap kali tanggal atau jenis berubah
  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tanggal, jenis]);

  // 🔍 Filter FE
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.Ruas.toLowerCase().includes(term) ||
        item.Gerbang.toLowerCase().includes(term) ||
        item.Gardu.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  // 🔹 Return semua variable yang diminta
  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    tanggal,
    setTanggal,
    jenis,
    setJenis,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    totalPages,
    setTotalPages,
    filteredData,
    fetchData,
  };
}
