"use client";

import { XCircle, AlertTriangle } from "lucide-react";
import ButtonAction from "@/app/_components/filter/actions/reset";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title = "Konfirmasi",
  message,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-lg border border-sky-100 p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <XCircle size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={24} className="text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        </div>

        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message}</p>

        <div className="flex justify-end gap-3">
          <ButtonAction
            label="Batal"
            variant="outline"
            onClick={onCancel}
            type="button"
          />
          <ButtonAction
            label={loading ? "Menghapus..." : "Hapus"}
            variant="danger"
            onClick={onConfirm}
            type="button"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
