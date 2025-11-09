"use client";

import dynamic from "next/dynamic";
import { Calendar, Search } from "lucide-react";
import type { ApexOptions } from "apexcharts";
import { useDashboardLalin } from "./_hooks/UseChart";

// ✅ safe for SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ApexSeries = { name?: string; data: number[] };

export default function DashboardPage() {
  
  const {
    tanggal,
    setTanggal,
    search,
    setSearch,
    loading,
    fetchData,
    paymentTotals,
    gerbangTotals,
    shiftTotals,
    ruasTotals,
  } = useDashboardLalin();

  // 🔹 Chart Options
  const barOptions = (title: string): ApexOptions => ({
    chart: { type: "bar", toolbar: { show: false } },
    title: {
      text: title,
      align: "left",
      style: { fontSize: "14px", fontWeight: 600, color: "#374151" },
    },
    xaxis: { categories: [], labels: { style: { fontSize: "12px" } } },
    yaxis: { title: { text: "Jumlah Lalin" } },
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
    colors: ["#334155"],
  });

  const donutOptions = (labels: string[]): ApexOptions => ({
    chart: { type: "donut" },
    labels,
    legend: { position: "bottom" },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    colors: ["#CBD5E1", "#94A3B8", "#475569"],
  });

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg border border-gray-200">
      <h1 className="text-2xl font-semibold text-[#1F2937]">Dashboard</h1>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="relative flex items-center">
          <Calendar size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </div>

      </div>

      {loading ? (
        <p className="text-gray-500 italic">Memuat data...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* Chart 1: Metode Pembayaran */}
          <div>
            <Chart
              options={{
                ...barOptions("Jumlah Lalin per Metode Pembayaran"),
                xaxis: { categories: Object.keys(paymentTotals) },
              }}
              series={[
                { name: "Jumlah Lalin", data: Object.values(paymentTotals) },
              ] as ApexSeries[]}
              type="bar"
              height={300}
            />
          </div>

          {/* Donut 1: Shift */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <Chart
              options={donutOptions(Object.keys(shiftTotals))}
              series={Object.values(shiftTotals) as number[]}
              type="donut"
              height={260}
            />
            <div className="text-sm">
              <p className="font-semibold mb-1 text-center">Total Lalin</p>
              {Object.entries(shiftTotals).map(([key, val], i) => (
                <div key={i} className="flex justify-between text-gray-700 w-40">
                  <span>Shift {key}</span>
                  <span>{val.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Gerbang */}
          <div>
            <Chart
              options={{
                ...barOptions("Jumlah Lalin per Gerbang"),
                xaxis: { categories: Object.keys(gerbangTotals) },
              }}
              series={[
                { name: "Jumlah Lalin", data: Object.values(gerbangTotals) },
              ] as ApexSeries[]}
              type="bar"
              height={300}
            />
          </div>

          {/* Donut 2: Ruas */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <Chart
              options={donutOptions(Object.keys(ruasTotals))}
              series={Object.values(ruasTotals) as number[]}
              type="donut"
              height={260}
            />
            <div className="text-sm">
              <p className="font-semibold mb-1 text-center">Total Lalin</p>
              {Object.entries(ruasTotals).map(([key, val], i) => (
                <div key={i} className="flex justify-between text-gray-700 w-40">
                  <span>{key}</span>
                  <span>{val.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
