"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import API from "@/lib/axios";
import { useRouter } from "next/navigation"; // импортируем инстанс axios

interface EditProfileModalProps {
  user: any; // Тип для данных пользователя
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditProfileModal({ user, onClose, onUpdate }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    description: user.description || "",
    phone: user.phone || "",
    telegram: user.telegram || "",
    github: user.github || "",
    skills: user.skills || "",
    available_time: user.available_time || "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Обработчик изменения данных формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await API.put("/profile", formData); // Отправляем запрос на обновление
      if (response.status === 200) {
        onUpdate(); // Обновляем профиль на странице
        router.refresh()
      }
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" onClick={() => {}}>
          <Pen />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Редактировать профиль</DialogTitle>
        <DialogDescription>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="first_name" className="text-sm font-medium">Имя</label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="last_name" className="text-sm font-medium">Фамилия</label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium">Описание</label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium">Телефон</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="telegram" className="text-sm font-medium">Telegram</label>
              <Input
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="github" className="text-sm font-medium">GitHub</label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="skills" className="text-sm font-medium">Навыки</label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="available_time" className="text-sm font-medium">Время работы</label>
              <Input
                id="available_time"
                name="available_time"
                value={formData.available_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-500 text-white"
              >
                {loading ? "Обновляется..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
