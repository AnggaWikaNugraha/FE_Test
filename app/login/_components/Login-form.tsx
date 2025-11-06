"use client";

import { useForm } from "react-hook-form";
import { LoginFormValues } from "@/app/lib/_types/login";
import { useLoginHandler } from "../_hooks/submit";
import { AlertCircle } from "lucide-react";

import InputText from "@/app/_components/input/text";
import Button from "@/app/_components/button";
import ApiError from "@/app/_components/error-msg";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: "onBlur" });

  const { apiError, loading, handleLogin: onSubmit } = useLoginHandler();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-sm space-y-4 p-4 sm:p-0"
    >
      <ApiError
        message={apiError}
        icon={<AlertCircle size={16} />}
        align="center"
      />

      <InputText
        label="Username"
        placeholder="Masukkan username"
        register={register("username", { required: "Username wajib diisi" })}
        errorMessage={errors.username?.message}
      />

      <InputText
        label="Password"
        type="password"
        placeholder="Masukkan password"
        register={register("password", {
          required: "Password wajib diisi",
          minLength: {
            value: 4,
            message: "Password minimal 4 karakter",
          },
        })}
        errorMessage={errors.password?.message}
      />

      <Button type="submit" loading={loading} text="Login" />
    </form>
  );
}
