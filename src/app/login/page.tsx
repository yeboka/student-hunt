// app/page.tsx
"use client"
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    // Логика авторизации
    console.log("Login with:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full h-screen ">
      <h1 className="text-2xl mb-4">Войти</h1>
      <AuthForm mode="login" onSubmit={handleLogin}/>
      <Link href={"/register"}>Зарегистрироваться</Link>
    </div>
  );
}
