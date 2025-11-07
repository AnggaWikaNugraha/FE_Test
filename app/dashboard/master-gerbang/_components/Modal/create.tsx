"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { XCircle, PlusCircle } from "lucide-react";
import { createGerbang } from "@/app/lib/_api/master-gerbang/create";
import InputFilter from "@/app/_components/filter/input/text";
import ButtonAction from "@/app/_components/filter/actions/reset";
import { CreateGerbangPayload } from "@/app/lib/_types/api-gerbang";
import { useCreateGerbang } from "../../_hooks/UseCreategerbang";
import { useGenerateAutoId } from "../../_hooks/UseGenerateId";

interface CreateGerbangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // refresh data table setelah berhasil
  existingData?: { id: number; IdCabang: number }[]; // ✅ data untuk pengecekan
}

export default function CreateGerbangModal({
  isOpen,
  onClose,
  onSuccess,
  existingData,
}: CreateGerbangModalProps) {
  // 🧠 pakai custom hook

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGerbangPayload>({
    defaultValues: {
      id: undefined,
      IdCabang: undefined,
      NamaGerbang: "",
      NamaCabang: "",
    },
  });

  const { loading, apiError, successMsg, handleCreate } = useCreateGerbang(
    onSuccess,
    onClose,
    reset
  );
  // 🔥 Form submit pakai hook
  const onSubmit = (data: CreateGerbangPayload) => handleCreate(data);
  // 🧠 panggil custom hook
  const { nextId, nextCabangId } = useGenerateAutoId(isOpen, existingData);

  // 🧠 update form otomatis saat id berubah
  useEffect(() => {
    if (isOpen) {
      reset((prev) => ({
        ...prev,
        id: nextCabangId,      // ❗ disamakan seperti versi kamu sebelumnya
        IdCabang: nextCabangId,
      }));
    }
  }, [isOpen, nextCabangId, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[480px] p-6 relative border border-sky-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <XCircle size={20} />
        </button>

        <h2 className="text-lg font-semibold text-sky-700 mb-4 flex items-center gap-2">
          <PlusCircle size={20} className="text-sky-500" /> Tambah Data Gerbang
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* ID */}
          <InputFilter
            disabled
            label="ID"
            {...register("id", {
              required: "ID wajib diisi",
              valueAsNumber: true,
            })}
            placeholder="4"
            widthClass="w-full"
          />
          {errors.id && (
            <p className="text-red-500 text-xs">{errors.id.message}</p>
          )}

          {/* IdCabang */}
          <InputFilter
            disabled
            label="ID Cabang"
            {...register("IdCabang", {
              required: "ID Cabang wajib diisi",
              valueAsNumber: true,
            })}
            placeholder="16"
            widthClass="w-full"
          />
          {errors.IdCabang && (
            <p className="text-red-500 text-xs">{errors.IdCabang.message}</p>
          )}

          {/* Nama Gerbang */}
          <InputFilter
            label="Nama Gerbang"
            {...register("NamaGerbang", {
              required: "Nama Gerbang wajib diisi",
            })}
            placeholder="Kebumen 2"
            widthClass="w-full"
          />
          {errors.NamaGerbang && (
            <p className="text-red-500 text-xs">{errors.NamaGerbang.message}</p>
          )}

          {/* Nama Cabang */}
          <InputFilter
            label="Nama Cabang"
            {...register("NamaCabang", { required: "Nama Cabang wajib diisi" })}
            placeholder="Gedebage Cilacap"
            widthClass="w-full"
          />
          {errors.NamaCabang && (
            <p className="text-red-500 text-xs">{errors.NamaCabang.message}</p>
          )}

          {/* Feedback Section */}
          {apiError && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
              ❌ {apiError}
            </div>
          )}
          {successMsg && (
            <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-md px-3 py-2">
              {successMsg}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <ButtonAction
              label="Batal"
              variant="outline"
              onClick={onClose}
              type="button"
            />
            <ButtonAction
              label={loading ? "Menyimpan..." : "Simpan"}
              variant="primary"
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
