"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { XCircle, Edit3 } from "lucide-react";
import InputFilter from "@/app/_components/filter/input/text";
import ButtonAction from "@/app/_components/filter/actions/reset";
import { updateGerbang } from "@/app/lib/_api/master-gerbang/update";
import { CreateGerbangPayload } from "@/app/lib/_types/api-gerbang";

interface EditGerbangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // refresh tabel setelah berhasil
  dataToEdit?: CreateGerbangPayload | null; // data yang mau diedit
}

export default function EditGerbangModal({
  isOpen,
  onClose,
  onSuccess,
  dataToEdit,
}: EditGerbangModalProps) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

  // 🧠 Prefill data ketika modal dibuka
  useEffect(() => {
    if (isOpen && dataToEdit) {
      reset({
        id: dataToEdit.id,
        IdCabang: dataToEdit.IdCabang,
        NamaGerbang: dataToEdit.NamaGerbang,
        NamaCabang: dataToEdit.NamaCabang,
      });
    }
  }, [isOpen, dataToEdit, reset]);

  const onSubmit = async (data: CreateGerbangPayload) => {
    setLoading(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const res = await updateGerbang(data); // ✅ langsung kirim body lengkap
      if (res.status) {
        setSuccessMsg("✅ Data berhasil diperbarui!");
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1200);
      } else {
        setApiError(res.message || "Gagal memperbarui data gerbang");
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
          <Edit3 size={20} className="text-sky-500" /> Edit Data Gerbang
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
            widthClass="w-full"
          />

          {/* ID Cabang */}
          <InputFilter
            disabled
            label="ID Cabang"
            {...register("IdCabang", {
              required: "ID Cabang wajib diisi",
              valueAsNumber: true,
            })}
            widthClass="w-full"
          />

          {/* Nama Gerbang */}
          <InputFilter
            label="Nama Gerbang"
            {...register("NamaGerbang", {
              required: "Nama Gerbang wajib diisi",
            })}
            placeholder="Isi nama gerbang"
            widthClass="w-full"
          />
          {errors.NamaGerbang && (
            <p className="text-red-500 text-xs">{errors.NamaGerbang.message}</p>
          )}

          {/* Nama Cabang */}
          <InputFilter
            label="Nama Cabang"
            {...register("NamaCabang", {
              required: "Nama Cabang wajib diisi",
            })}
            placeholder="Isi nama cabang"
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
              label={loading ? "Menyimpan..." : "Update"}
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
