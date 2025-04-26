import { useState } from "react";
import { Button } from "@/components/ui/button";
import API from "@/lib/axios";

interface CreateJobModalProps {
  onClose: () => void;
  onCreate: () => void;
}

export default function CreateJobModal({ onClose, onCreate }: CreateJobModalProps) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [salary, setSalary] = useState("");
  const [schedule, setSchedule] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleCreate = async () => {
    try {
      const newJob = {
        title,
        company_name: companyName,
        salary,
        schedule,
        working_hours: workingHours,
        deadline,
        description,
        requirements,
      };
      const res = await API.post("/jobs", newJob);

      if (res.status === 201) {
        onCreate(); // Обновляем вакансии после создания
        onClose(); // Закрываем модалку
      }
    } catch (err) {
      console.error("Ошибка при создании вакансии:", err);
    }
  };

  return (
    <div className={"w-screen h-screen fixed overflow-y-scroll top-0 left-0 flex items-center justify-center p-20 bg-black/50"}>
      <div className=" p-6 w-full mt-100 max-w-[500px] bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Создать вакансию</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Название вакансии</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Компания</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Зарплата</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">График работы</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Рабочие часы</label>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Дедлайн</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Требования</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={onClose} className="bg-gray-500 text-white">
            Отмена
          </Button>
          <Button onClick={handleCreate} className="bg-green-500 text-white">
            Создать
          </Button>
        </div>
      </div>
    </div>

  );
}
