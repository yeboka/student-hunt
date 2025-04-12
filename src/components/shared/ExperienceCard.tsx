"use client";

import { format } from "date-fns"; // Импортируем функцию для форматирования дат
import { Button } from "@/components/ui/button"; // Кнопки для действий
import { Pen, Trash } from "lucide-react"; // Иконки редактирования и удаления

interface ExperienceCardProps {
  experience: any;
  onEdit: (experience: any) => void;
  onDelete: (experienceId: number) => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  // Форматируем дату
  const formattedStartDate = format(new Date(experience.start_date), "MMMM dd, yyyy");
  const formattedEndDate = experience.end_date
    ? format(new Date(experience.end_date), "MMMM dd, yyyy")
    : "Present"; // Если нет end_date, выводим "Present"

  return (
    <div className="border rounded-lg p-4 shadow-md w-full max-w-[500px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{experience.position}</h3>
          <p className="text-sm text-gray-500">{experience.company_name}</p>
          <p className="text-sm text-gray-500">{`${formattedStartDate} - ${formattedEndDate}`}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(experience)}>
            <Pen /> Редактировать
          </Button>
          <Button variant="outline" onClick={() => onDelete(experience.id)}>
            <Trash /> Удалить
          </Button>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700">{experience.description}</p>
    </div>
  );
}
