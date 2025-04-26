// app/register/page.tsx
"use client";
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter(); // Хук для перехода
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Состояние для ошибок

  const handleRegister = async (data: { email: string; password: string }) => {
    setErrorMessage(null); // Сбрасываем сообщение об ошибке при новом запросе
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Успешная регистрация
        console.log("Registration successful:", result);
        localStorage.setItem("token", result.token); // Сохраняем токен в localStorage
        router.push("/login"); // Перенаправление на страницу входа
      } else {
        // Если ошибка, отображаем ее
        setErrorMessage(result.message || "Ошибка регистрации"); // Устанавливаем ошибку
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Произошла ошибка при регистрации. Попробуйте позже.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full h-screen">
      <h1 className="text-2xl mb-4">Зарегистрироваться</h1>
      <AuthForm mode="register" onSubmit={handleRegister} />
      {errorMessage && (
        <div className="mt-4 text-red-500 text-sm">{errorMessage}</div> // Ошибка отображается под формой
      )}
      <Link href={"/login"}>Войти</Link>
    </div>
  );
}
