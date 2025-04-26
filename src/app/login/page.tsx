// app/login/page.tsx
"use client";
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter(); // Хук для перехода
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Состояние для ошибок

  const handleLogin = async (data: { email: string; password: string }) => {
    setErrorMessage(null); // Сбрасываем сообщение об ошибке при новом запросе
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Успешный логин
        console.log("Login successful:", result);
        localStorage.setItem("token", result.token); // Сохраняем токен в localStorage
        router.push("/"); // Перенаправление на главную страницу
      } else {
        // Если ошибка, отображаем ее
        setErrorMessage(result.message || "Ошибка входа"); // Устанавливаем ошибку
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Произошла ошибка при входе. Попробуйте позже.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full h-screen">
      <h1 className="text-2xl mb-4">Войти</h1>
      <AuthForm mode="login" onSubmit={handleLogin} />
      {errorMessage && (
        <div className="mt-4 text-red-500 text-sm">{errorMessage}</div> // Ошибка отображается под формой
      )}
      <Link href={"/register"}>Зарегистрироваться</Link>
    </div>
  );
}
