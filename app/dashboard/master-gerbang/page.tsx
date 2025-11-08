"use client";

import { useState } from "react";
import DataTableGerbang from "./_components/Table";
// import ModalGerbang from "@/components/ModalGerbang";
import { Plus } from "lucide-react";
import CreateGerbangModal from "./_components/Modal/create";
import { useGerbangData } from "./_hooks/UseDataGerbang";
import EditGerbangModal from "./_components/Modal/edit";
import { Gerbang } from "@/app/lib/_types/api-gerbang";
import { deleteGerbang } from "@/app/lib/_api/master-gerbang/delete";
import ConfirmModal from "./_components/Modal/confirmation";
import { useDeleteGerbang } from "./_hooks/UseDeleteGerbang";

export default function MasterGerbangPage() {
  const [showModal, setShowModal] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedGerbang, setSelectedGerbang] = useState<Gerbang | null>(null);

  const {
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
    refetch,
  } = useGerbangData();

  const {
    confirmOpen,
    setConfirmOpen,
    selectedDelete,
    loadingDelete,
    askDelete,
    confirmDelete: handleConfirmDelete,
    setSelectedDelete,
    
  } = useDeleteGerbang(refetch);

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
        setFilters={setFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
        setPage={setPage}
        resetFilters={resetFilters}
        setIsEditOpen={setIsEditOpen}
        setSelectedGerbang={setSelectedGerbang}
        setSelectedDelete={setSelectedDelete}
        setConfirmOpen={setConfirmOpen}
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

      <EditGerbangModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={() => {
          setTimeout(() => {
            refetch();
          }, 2000);
        }}
        dataToEdit={selectedGerbang}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        title="Hapus Data Gerbang"
        message={`Apakah Anda yakin ingin menghapus gerbang "${selectedDelete?.NamaGerbang}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loadingDelete}
      />
    </div>
  );
}
