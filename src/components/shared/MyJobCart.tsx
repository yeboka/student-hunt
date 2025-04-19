import { Button } from "@/components/ui/button";

interface MyJobCardProps {
  job: {
    id: number;
    title: string;
    company_name: string;
    salary: string;
    schedule?: string;
    location?: string;
  };
  onEdit: () => void; // Функция для редактирования вакансии
  onDelete: () => void; // Функция для удаления вакансии
}

export default function MyJobCard({ job, onEdit, onDelete }: MyJobCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.company_name}</p>
      <p className="text-sm text-gray-800">{job.salary} $</p>
      <p className="text-xs text-gray-500">{job.schedule || "График не указан"}</p>

      <div className="mt-4 flex gap-4">
        <Button onClick={onEdit} className="bg-blue-500 text-white">
          Редактировать
        </Button>
        <Button onClick={onDelete} className="bg-red-500 text-white">
          Удалить
        </Button>
      </div>
    </div>
  );
}
