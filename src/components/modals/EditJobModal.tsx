import { useState } from "react";
import { Button } from "@/components/ui/button";
import API from "@/lib/axios";

interface EditJobModalProps {
  job: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditJobModal({ job, onClose, onUpdate }: EditJobModalProps) {
  const [title, setTitle] = useState(job.title);
  const [companyName, setCompanyName] = useState(job.company_name);
  const [salary, setSalary] = useState(job.salary);
  const [schedule, setSchedule] = useState(job.schedule);
  const [workingHours, setWorkingHours] = useState(job.working_hours);
  const [deadline, setDeadline] = useState(job.deadline);
  const [description, setDescription] = useState(job.description);
  const [requirements, setRequirements] = useState(job.requirements);

  const handleSave = async () => {
    try {
      const updatedJob = {
        title,
        company_name: companyName,
        salary,
        schedule,
        working_hours: workingHours,
        deadline,
        description,
        requirements,
      };
      const res = await API.put(`/jobs/${job.id}`, updatedJob);

      if (res.status === 200) {
        onUpdate(); // Обновляем вакансии
        onClose(); // Закрываем модалку
      }
    } catch (err) {
      console.error("Ошибка при редактировании вакансии:", err);
    }
  };

  return (
    <div className=" w-screen h-screen fixed top-0 left-0 flex items-center justify-center p-20 bg-black/50 z-1000">
      <div className={"p-6 w-full max-w-[500px] max-h-[700px] overflow-hidden overflow-y-scroll bg-white rounded-xl shadow-lg"}>
        <h2 className="text-xl font-semibold mb-4">Редактировать вакансию</h2>

        {/* Название вакансии */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Название вакансии</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Компания */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Компания</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Зарплата */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Зарплата</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* График работы */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">График работы</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Рабочие часы */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Рабочие часы</label>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Дедлайн */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Дедлайн</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Описание */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        {/* Требования */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Требования</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <Button onClick={onClose} className="bg-gray-500 text-white">
            Отмена
          </Button>
          <Button onClick={handleSave} className="bg-blue-500 text-white">
            Сохранить
          </Button>
        </div>
      </div>

    </div>
  );
}
