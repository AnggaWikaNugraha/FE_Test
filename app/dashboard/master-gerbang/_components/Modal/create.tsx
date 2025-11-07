"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { XCircle, PlusCircle } from "lucide-react";
import { createGerbang } from "@/app/lib/_api/master-gerbang/create";
import InputFilter from "@/app/_components/filter/input/text";
import ButtonAction from "@/app/_components/filter/actions/reset";
import { CreateGerbangPayload } from "@/app/lib/_types/api-gerbang";

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
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  console.log(existingData);

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

  // 🧠 Auto-generate ID berdasarkan existingData
  useEffect(() => {
    if (isOpen) {
      let nextId = 1;

      // 🔹 Ambil IdCabang terakhir, lalu +1
      const lastCabangId =
        existingData && existingData.length > 0
          ? existingData[existingData.length - 1].IdCabang + 1
          : 1;

      console.log("Auto nextId:", nextId, "Next IdCabang:", lastCabangId);

      // 🧠 Isi otomatis form
      reset((prev) => ({
        ...prev,
        id: lastCabangId,
        IdCabang: lastCabangId,
      }));
    }
  }, [isOpen, existingData, reset]);

  const onSubmit = async (data: CreateGerbangPayload) => {
    setLoading(true);
    setApiError(null);
    setSuccessMsg(null);
    try {
      const res = await createGerbang(data);
      if (res.status) {
        setSuccessMsg("✅ Data berhasil ditambahkan!");
        reset();
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1200);
      } else {
        setApiError(res.message || "Gagal menambahkan data gerbang");
      }
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
