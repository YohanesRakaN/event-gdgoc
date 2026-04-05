"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import useLoginForm from "./hooks/useLoginForm";
import { FormProvider } from "react-hook-form";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  const { onSubmit, register, onRegister } = useLoginForm();

  return (
    <div className="flex h-screen items-center flex-col justify-center p-6 ">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center">
        <Image alt="logo" src="/logo.jpg" width={100} height={100} />
        <div>GDGoC Universitas Gunadarma</div>
      </div>

      {/* Form */}
      <div>
        <div className="mt-8 mb-2 text-left">Buat Akun</div>

        <form
          className="space-y-1.5"
          onSubmit={isRegister ? onRegister : onSubmit}
        >
          {isRegister && (
            <Input
              {...register("fullname")}
              className="h-12"
              placeholder="Nama Lengkap"
            />
          )}
          <Input {...register("email")} className="h-12" placeholder="Email" />
          <Input
            {...register("password")}
            className="h-12"
            placeholder="Password"
          />
          <Button type="submit" className="w-full h-12">
            {isRegister ? "Daftar" : "Masuk"}
          </Button>
        </form>
      </div>
      <div className="my-2">
        {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
        <a
          onClick={() => {
            setIsRegister((prev) => !prev);
          }}
          className="font-bold text-amber-600"
        >
          {isRegister ? "Masuk disini" : "Daftar sekarang"}
        </a>
      </div>
    </div>
  );
}
