"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import EditJobModal from "@/components/modals/EditJobModal";
import CreateJobModal from "@/components/modals/CreateJobModal";
import ApplicantsModal from "@/components/modals/ApplicantsModal";
import { Button } from "@/components/ui/button";
import MyJobCard from "@/components/shared/MyJobCart";

export default function MyVacancies() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<any>(null); // Стейт для выбранной вакансии
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false); // Стейт для открытия модалки вакансии
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState<boolean>(false); // Стейт для открытия модалки создания вакансии
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState<boolean>(false); // Стейт для открытия модалки откликов
  const [applicants, setApplicants] = useState<any[]>([]); // Стейт для списка откликов

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const userCreatedJobs = await API.get("/jobs/user") // Запрашиваем вакансии с откликами
      const appliedJobs = userCreatedJobs.data; // Фильтруем только те вакансии, на которые есть отклик
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

  const openJobModal = (job: any) => {
    setSelectedJob(job); // Устанавливаем выбранную вакансию
    setIsJobModalOpen(true); // Открываем модалку
  };

  // Функция для закрытия модалки редактирования вакансии
  const closeJobModal = () => {
    setIsJobModalOpen(false); // Закрываем модалку
    setSelectedJob(null); // Очищаем выбранную вакансию
  };

  const openCreateJobModal = () => {
    setIsCreateJobModalOpen(true); // Открываем модалку создания вакансии
  };

  // Функция для закрытия модалки создания вакансии
  const closeCreateJobModal = () => {
    setIsCreateJobModalOpen(false); // Закрываем модалку
  };

  // Функция для удаления вакансии
  const handleDeleteJob = async (jobId: number) => {
    try {
      const response = await API.delete(`/jobs/${jobId}`);
      if (response.status === 200) {
        fetchApplications(); // Перезагружаем профиль и вакансии
      }
    } catch (error) {
      console.error("Ошибка при удалении вакансии:", error);
    }
  };

  const openApplicantsModal = async (jobId: number) => {
    try {
      const res = await API.get(`/jobs/${jobId}/applicants`); // Запрашиваем отклики на вакансию
      setApplicants(res.data); // Устанавливаем отклики в стейт
      setIsApplicantsModalOpen(true); // Открываем модалку с откликами
    } catch (err) {
      console.error("Ошибка при получении откликов:", err);
    }
  };

  // Функция для закрытия модалки откликов
  const closeApplicantsModal = () => {
    setIsApplicantsModalOpen(false); // Закрываем модалку
    setApplicants([]); // Очищаем список откликов
  };

  return (
    <div className="w-full max-w-[1120px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Мои отклики</h1>

      {/* Если данные загружаются */}
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="mt-6 w-full max-w-[1120px]">
          <div className={"w-full flex justify-between"}>
            <h2 className="text-2xl font-semibold mb-4">Мои вакансии</h2>
            <Button variant="outline" onClick={openCreateJobModal}>Создать вакансию</Button>
          </div>
          <div className="w-full flex flex-wrap gap-6">
            {!jobs.length && <div>
                Пока нет вакансий
            </div> }
            {jobs.map((job) => (
              <div key={job.id} className="w-[300px] flex flex-col">
                <MyJobCard job={job} onEdit={() => openJobModal(job)} onDelete={() => handleDeleteJob(job.id)} />
                <Button onClick={() => openApplicantsModal(job.id)} className="mt-2 bg-blue-500 text-white">
                  Просмотреть отклики
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Модалка редактирования вакансии */}
      {isJobModalOpen && (
        <EditJobModal
          job={selectedJob}
          onClose={closeJobModal} // Закрытие модалки
          onUpdate={fetchApplications} // Обновление списка вакансий после редактирования
        />
      )}

      {isCreateJobModalOpen && (
        <CreateJobModal
          onClose={closeCreateJobModal} // Закрытие модалки
          onCreate={fetchApplications} // Обновление списка вакансий после создания новой
        />
      )}

      {/* Модалка откликов */}
      {isApplicantsModalOpen && (
        <ApplicantsModal
          applicants={applicants}
          onClose={closeApplicantsModal} // Закрытие модалки
        />
      )}
    </div>
  );
}
