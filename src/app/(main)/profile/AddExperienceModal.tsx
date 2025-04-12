"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/axios"; // инстанс axios

interface AddExperienceModalProps {
  onClose: () => void; // функция закрытия модалки
  onUpdate: () => void; // функция обновления данных
}

export default function AddExperienceModal({ onClose, onUpdate }: AddExperienceModalProps) {
  const [formData, setFormData] = useState({
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

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
      const response = await API.post("/profile/experience", formData); // Отправляем запрос на добавление нового опыта
      if (response.status === 201) {
        onUpdate(); // Обновляем данные на странице
        onClose(); // Закрываем модалку
      }
    } catch (error) {
      console.error("Ошибка при добавлении опыта:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Добавить опыт</DialogTitle>
        <DialogDescription>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="position" className="text-sm font-medium">Должность</label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="company_name" className="text-sm font-medium">Компания</label>
              <Input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="start_date" className="text-sm font-medium">Дата начала</label>
              <Input
                id="start_date"
                name="start_date"
                type={"date"}
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="end_date" className="text-sm font-medium">Дата окончания</label>
              <Input
                id="end_date"
                name="end_date"
                type={"date"}
                value={formData.end_date}
                onChange={handleChange}
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
