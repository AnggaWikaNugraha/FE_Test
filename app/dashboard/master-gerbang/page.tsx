"use client";

import { useState } from "react";
import DataTableGerbang from "./_components/Table";
// import ModalGerbang from "@/components/ModalGerbang";
import { Plus } from "lucide-react";
import CreateGerbangModal from "./_components/Modal/create";
import { useGerbangData } from "./_hooks/UseDataGerbang";

export default function MasterGerbangPage() {
  const [showModal, setShowModal] = useState(false);
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
    refetch,
  } = useGerbangData();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Master Data Gerbang</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Tambah
        </button>
      </div>

      <DataTableGerbang
        data={data}
        page={page}
        totalPages={totalPages}
        loading={loading}
        error={error}
        filters={filters}
        handleFilterChange={handleFilterChange}
        setPage={setPage}
        resetFilters={resetFilters}
      />
      {/* Modal */}
      <CreateGerbangModal
        existingData={data}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setTimeout(() => {
            refetch();
          }, 2000);
        }}
      />
    </div>
  );
}
