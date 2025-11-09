"use client";

import ReactPaginate from "react-paginate";
import { useLalinData } from "./_hooks/UseLalin";
import { useTotalLalin } from "./_hooks/UseTotal";
import { useExportLalin } from "./_hooks/UseExportts";
import FilterLalin from "./_components/filter";
import TableLalin from "./_components/table";

const jenisTabs = [
  { key: "tunai", label: "Total Tunai" },
  { key: "etoll", label: "Total E-Toll" },
  { key: "flo", label: "Total Flo" },
  { key: "ktp", label: "Total KTP" },
  { key: "keseluruhan", label: "Total Keseluruhan" },
  { key: "gabungan", label: "Total E-Toll + Tunai + Flo" },
];

export default function PageLalin() {
  const {
    data,
    loading,
    error,
    tanggal,
    setTanggal,
    jenis,
    setJenis,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    totalPages,
    filteredData,
    fetchData,
  } = useLalinData();

  const { subtotalPerRuas, totalKeseluruhan } = useTotalLalin(filteredData);
  const { handleExportPDF } = useExportLalin();

  const handlePageChange = (selected: { selected: number }) => {
    const nextPage = selected.selected + 1;
    fetchData(nextPage);
  };

  const handleReset = () => {
    setTanggal("2023-11-01");
    setSearchTerm("");
    fetchData(1);
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-5">
      <h1 className="text-2xl font-semibold text-[#1F2937]">
        Laporan Lalu Lintas Per Hari
      </h1>

      <FilterLalin
        tanggal={tanggal}
        setTanggal={setTanggal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onReset={handleReset}
        onExport={handleExportPDF}
        filteredData={filteredData}
        subtotalPerRuas={subtotalPerRuas}
        totalKeseluruhan={totalKeseluruhan}
        jenis={jenis}
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg">
        {jenisTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setJenis(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              jenis === tab.key
                ? "bg-gray-700 text-white shadow-sm"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 italic">Loading data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredData.length > 0 ? (
        <>
          <TableLalin
            filteredData={filteredData}
            subtotalPerRuas={subtotalPerRuas}
            totalKeseluruhan={totalKeseluruhan}
            page={page}
          />

          {/* Pagination */}
          <div className="flex justify-end mt-6">
            <ReactPaginate
              breakLabel="..."
              nextLabel="›"
              previousLabel="‹"
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              forcePage={page - 1}
              containerClassName="flex items-center gap-2 select-none"
              pageLinkClassName="px-3 py-1 rounded-md text-sm text-sky-600 hover:bg-sky-100 transition"
              previousLinkClassName="px-3 py-1 rounded-md text-sm text-sky-600 hover:bg-sky-100"
              nextLinkClassName="px-3 py-1 rounded-md text-sm text-sky-600 hover:bg-sky-100"
              activeLinkClassName="bg-sky-500 text-white rounded-md"
              disabledLinkClassName="opacity-40 cursor-not-allowed"
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center py-6">
          Tidak ada data untuk pencarian ini
        </p>
      )}
    </div>
  );
}
