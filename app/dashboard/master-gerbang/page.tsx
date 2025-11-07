"use client";

import { useState } from "react";
import DataTableGerbang from "./_components/Table";
// import ModalGerbang from "@/components/ModalGerbang";
import { Plus } from "lucide-react";

export default function MasterGerbangPage() {
  const [showModal, setShowModal] = useState(false);

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

      <DataTableGerbang />
      {/* <ModalGerbang open={showModal} onClose={() => setShowModal(false)} /> */}
    </div>
  );
}
