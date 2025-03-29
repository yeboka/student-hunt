// components/AuthForm.tsx
"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Валидация с использованием Zod
const validationSchema = z.object({
  email: z.string().email("Некорректный email").min(1, "Поле обязательно"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  confirmPassword: z.string().optional(),
});

type FormData = z.infer<typeof validationSchema>;

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: FormData) => void;
}

export const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} type="email" placeholder="Email" className={"w-[300px]"}/>
          )}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label>Пароль</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} type={isPasswordVisible ? "text" : "password"} placeholder="Пароль" className={"w-[300px]"} />
          )}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      {mode === "register" && (
        <div className="flex flex-col gap-2">
          <label>Подтвердите пароль</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input {...field} type={isPasswordVisible ? "text" : "password"} placeholder="Подтвердите пароль" className={"w-[300px]"} />
            )}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Switch checked={isPasswordVisible} onCheckedChange={() => setIsPasswordVisible(!isPasswordVisible)} />
        <span>{isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}</span>
      </div>

      <Button type="submit" className="bg-[#C6790E]">
        {mode === "register" ? "Зарегистрироваться" : "Войти"}
      </Button>
    </form>
  );
};
