"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex h-screen items-center flex-col justify-center p-6 ">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.jpg" width={100} height={100} />
        <div>GDGoC Universitas Gunadarma</div>
      </div>

      {/* Form */}
      <div>
        <div className="mt-8 mb-2 text-left">Buat Akun</div>

        <form className="space-y-1.5">
          {isRegister && <Input className="h-12" placeholder="Nama Lengkap" />}
          <Input className="h-12" placeholder="Email" />
          <Input className="h-12" placeholder="Password" />
          <Button className="w-full h-12">Daftar</Button>
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
