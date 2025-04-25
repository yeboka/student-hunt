// components/ApplyDialog.tsx

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import API from "@/lib/axios";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation"; // Для перенаправления

// Пропсы компонента
interface ApplyDialogProps {
  jobId: string;  // ID вакансии
  isOpen: boolean;  // Статус открытия поп-апа
  onClose: () => void;
  setHasApplied: (bool: boolean) => void;// Функция для закрытия поп-апа
}

const ApplyDialog = ({ jobId, isOpen, onClose, setHasApplied }: ApplyDialogProps) => {
  const [message, setMessage] = useState(""); // Состояние для сообщения отклика
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отправки отклика
  const router = useRouter(); // Для перенаправления на страницу авторизации

  // Обработчик отправки отклика
  const handleApply = async () => {
    const token = localStorage.getItem("token");

    // Проверка, есть ли токен в localStorage
    if (!token) {
      alert("Вы должны быть авторизованы для отклика на вакансию.");
      router.push("/login"); // Перенаправление на страницу входа
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post(
        "/applications/",
        { jobId, message },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Используем токен из LocalStorage
          },
        }
      ).then(() => {
        setHasApplied(true)
      });
      alert("Отклик отправлен успешно!");
      onClose(); // Закрытие поп-апа после отправки
    } catch (err) {
      console.error("Ошибка при отправке отклика:", err);
      alert("Ошибка при отправке отклика");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-96 max-w-full bg-white rounded-xl shadow-lg">
        <DialogTitle>Откликнуться на вакансию</DialogTitle>
        <DialogDescription>Напишите ваше сообщение для работодателя:</DialogDescription>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ваше сообщение"
          rows={4}
          className="mb-4"
        />
        <Button
          onClick={handleApply}
          className="bg-green-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
