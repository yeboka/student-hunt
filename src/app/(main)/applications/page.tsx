"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import JobCard from "@/components/shared/JobCart";

export default function Applications() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await API.get("/jobs/my-applications"); // Запрашиваем вакансии с откликами
      const appliedJobs = res.data; // Фильтруем только те вакансии, на которые есть отклик
      setJobs(appliedJobs); // Устанавливаем вакансии в стейт
    } catch (err) {
      console.error("Ошибка при получении откликов:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(); // Получаем отклики при монтировании компонента
  }, []);

  return (
    <div className="w-full max-w-[1120px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Мои отклики</h1>

      {/* Если данные загружаются */}
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {/* Отображаем карточки вакансий */}
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} isApplied={true} />
            ))
          ) : (
            <p>Вы еще не откликались на вакансии.</p>
          )}
        </div>
      )}
    </div>
  );
}
