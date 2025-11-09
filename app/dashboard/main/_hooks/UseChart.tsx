"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { LalinItem } from "@/app/lib/_types/lalin";

/**
 * ✅ Custom Hook: useDashboardLalin
 * Handle pengambilan data lalin, filter, dan transformasi untuk chart dashboard
 */
export function useDashboardLalin() {
  const [tanggal, setTanggal] = useState("2023-11-01");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<LalinItem[]>([]);

  // 🔹 Fetch Data dari API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/lalins?tanggal=${tanggal}&limit=999999`
      );
      const data = res?.data?.data?.rows?.rows || [];
      setRows(data);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tanggal]);

  // 🔹 Filter search global
  const filtered = useMemo(() => {
    if (!search) return rows;
    const term = search.toLowerCase();
    return rows.filter(
      (r) =>
        String(r.IdCabang).includes(term) ||
        String(r.IdGerbang).includes(term) ||
        String(r.Shift).includes(term)
    );
  }, [rows, search]);

  // 🔹 Total per Metode Pembayaran
  const paymentTotals = useMemo(() => {
    const totals = {
      BCA: 0,
      BRI: 0,
      BNI: 0,
      Mandiri: 0,
      Mega: 0,
      Flo: 0,
      KTP: 0,
    };

    filtered.forEach((r) => {
      totals.BCA += r.eBca || 0;
      totals.BRI += r.eBri || 0;
      totals.BNI += r.eBni || 0;
      totals.Mandiri += r.eMandiri || 0;
      totals.Mega += r.eMega || 0;
      totals.Flo += r.eFlo || 0;
      totals.KTP += r.Tunai || 0;
    });

    return totals;
  }, [filtered]);

  // 🔹 Total per Gerbang
  const gerbangTotals = useMemo(() => {
    const grouped: Record<string, number> = {};
    filtered.forEach((r) => {
      const key = `Gerbang ${r.IdGerbang}`;
      grouped[key] =
        (grouped[key] || 0) +
        (r.eBca || 0) +
        (r.eBri || 0) +
        (r.eBni || 0) +
        (r.eMandiri || 0) +
        (r.eMega || 0) +
        (r.eFlo || 0) +
        (r.Tunai || 0);
    });
    return grouped;
  }, [filtered]);

  // 🔹 Total per Shift
  const shiftTotals = useMemo(() => {
    const grouped = { 1: 0, 2: 0, 3: 0 };
    filtered.forEach((r) => {
      const total =
        (r.eBca || 0) +
        (r.eBri || 0) +
        (r.eBni || 0) +
        (r.eMandiri || 0) +
        (r.eMega || 0) +
        (r.eFlo || 0) +
        (r.Tunai || 0);
      grouped[r.Shift as 1 | 2 | 3] += total;
    });
    return grouped;
  }, [filtered]);

  // 🔹 Total per Ruas (Cabang)
  const ruasTotals = useMemo(() => {
    const grouped: Record<string, number> = {};
    filtered.forEach((r) => {
      const key = `Ruas ${r.IdCabang}`;
      const total =
        (r.eBca || 0) +
        (r.eBri || 0) +
        (r.eBni || 0) +
        (r.eMandiri || 0) +
        (r.eMega || 0) +
        (r.eFlo || 0) +
        (r.Tunai || 0);
      grouped[key] = (grouped[key] || 0) + total;
    });
    return grouped;
  }, [filtered]);

  return {
    tanggal,
    setTanggal,
    search,
    setSearch,
    loading,
    rows,
    fetchData,
    filtered,
    paymentTotals,
    gerbangTotals,
    shiftTotals,
    ruasTotals,
  };
}
