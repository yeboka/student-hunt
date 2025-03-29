// app/page.tsx
"use client"
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  const handleRegister = async (data: { email: string; password: string }) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {

    } else {
      // Обработка ошибок
    }
  };


  return (
    <div className="flex flex-col items-center justify-center p-5 w-full h-screen">
      <h1 className="text-2xl mb-4">Зарегистрироваться</h1>
      <AuthForm mode="register" onSubmit={handleRegister} />
      <Link href={"/login"}>Войти</Link>
    </div>
  );
}
