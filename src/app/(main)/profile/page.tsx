"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import API from "@/lib/axios";
import EditProfileModal from "@/app/(main)/profile/EditProfileModal";
import AddExperienceModal from "@/app/(main)/profile/AddExperienceModal";
import EditExperienceModal from "@/app/(main)/profile/EditExperienceModal";
import ExperienceCard from "@/components/shared/ExperienceCard";
import MyJobCard from "@/components/shared/MyJobCart";
import EditJobModal from "@/components/modals/EditJobModal";
import CreateJobModal from "@/components/modals/CreateJobModal";
import ApplicantsModal from "@/components/modals/ApplicantsModal"; // импортируем инстанс axios


export default function Profile() {
  const [user, setUser] = useState<any>(null); // Стейт для пользователя
  const [loading, setLoading] = useState<boolean>(true); // Стейт загрузки
  const [error, setError] = useState<string | null>(null); // Стейт ошибки
  const [selectedExperience, setSelectedExperience] = useState<any>(null); // Стейт для выбранного опыта
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState<boolean>(false); // Стейт для модалки добавления опыта
  const [jobs, setJobs] = useState<any[]>([]); // Стейт для вакансий
  const [selectedJob, setSelectedJob] = useState<any>(null); // Стейт для выбранной вакансии
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false); // Стейт для открытия модалки вакансии
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState<boolean>(false); // Стейт для открытия модалки создания вакансии
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState<boolean>(false); // Стейт для открытия модалки откликов
  const [applicants, setApplicants] = useState<any[]>([]); // Стейт для списка откликов

  // Функция для получения профиля
  const fetchProfile = async () => {
    try {
      const response = await API.get("/profile");
      const userCreatedJobs = await API.get("/jobs/user")// Используем наш инстанс Axios
      setUser(response.data); // Устанавливаем данные пользователя в стейт
      setJobs(userCreatedJobs.data);
    } catch (err: any) {
      console.log("Ошибка при загрузке профиля", err)
      setError("Ошибка при загрузке профиля"); // Обработка ошибки
    } finally {
      setLoading(false); // Останавливаем загрузку
    }
  };

  useEffect(() => {
    fetchProfile(); // Получаем профиль при монтировании компонента
  }, []);

  // Функция для удаления опыта
  const handleDeleteExperience = async (experienceId: number) => {
    try {
      const response = await API.delete(`/profile/experience/${experienceId}`);
      if (response.status === 200) {
        fetchProfile(); // Перезагружаем профиль
      }
    } catch (error) {
      console.error("Ошибка при удалении опыта:", error);
    }
  };

  // Функция для открытия модалки добавления опыта
  const openAddExperienceModal = () => {
    setIsAddExperienceModalOpen(true); // устанавливаем стейт для открытия модалки
  };

  // Функция для закрытия модалки добавления опыта
  const closeAddExperienceModal = () => {
    setIsAddExperienceModalOpen(false);
  };

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
        fetchProfile(); // Перезагружаем профиль и вакансии
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



  if (loading) {
    return <div>Загрузка...</div>; // Если данные загружаются, показываем "Загрузка..."
  }

  if (error) {
    return <div>{error}</div>; // Если произошла ошибка
  }

  return (
    <div className="flex flex-col w-full items-center p-4">
      {/* Switcher container */}
      <div className="w-full flex justify-between items-center border-b px-4 py-3">
        <SidebarTrigger />

      </div>

      {/* Profile Header */}
      <div className="w-full max-w-[1120px] flex gap-6 items-center mt-8">
        {/* Avatar and Name */}
        <Link className="text-[#0A6F6F] font-semibold flex gap-5" href="/profile">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.profile_picture || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-sm text-muted-foreground">{user.description}</p>
            </div>
            <EditProfileModal user={user} onUpdate={fetchProfile} />
          </div>
        </div>
      </div>

      <div className={"w-full max-w-[1120px]"}>
        <div className="mt-3 text-sm">
          <p className="font-bold">Социальные сети и контакты:</p>
          {user.phone && <p className="font-normal"><span className={"font-medium"}>Номер телефона - </span>{user.phone}</p>}
          {user.telegram && <p className="font-normal"><span className={"font-medium"}>Telegram - </span>{user.telegram}</p>}
          {user.github && <p className="font-normal"><span className={"font-medium"}>GitHub - </span>{user.github}</p>}
          <p className={"mt-4"}><span className={"font-bold"}>Stack - </span> {user.skills}</p>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <div className={"w-full flex justify-between"}>
            <p className="font-medium">Опыт и образование</p>
            <Button variant="outline" onClick={openAddExperienceModal}>Добавить опыт</Button>
          </div>

          {user.WorkExperiences?.map((experience: any, idx: number) => (
            <ExperienceCard
              key={idx}
              experience={experience}
              onEdit={(experience) => {
                setSelectedExperience(experience); // Устанавливаем выбранный опыт для редактирования
              }}
              onDelete={handleDeleteExperience} // Удаление опыта
            />
          ))}
        </div>
      </div>

      {/* Job Cards */}
      {/*<div className="w-full max-w-[1120px] mt-6">*/}
      {/*  <h2 className=" w-full text-lg font-semibold mb-4">*/}
      {/*    Applied/Completed Projects:*/}
      {/*  </h2>*/}
      {/*  <div className="w-full flex flex-wrap items-center gap-4">*/}
      {/*    {jobCards.map((item) => (*/}
      {/*      <PassedJobCard key={item} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* Карточки вакансий */}
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

      {selectedExperience && (
        <EditExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)} // Закрываем модалку
          onUpdate={fetchProfile} // Обновляем профиль после изменений
        />
      )}

      {/* Модалка для добавления опыта */}
      {isAddExperienceModalOpen && (
        <AddExperienceModal
          onClose={closeAddExperienceModal} // Закрытие модалки
          onUpdate={fetchProfile} // Обновление профиля после добавления нового опыта
        />
      )}

      {/* Модалка редактирования вакансии */}
      {isJobModalOpen && (
        <EditJobModal
          job={selectedJob}
          onClose={closeJobModal} // Закрытие модалки
          onUpdate={fetchProfile} // Обновление списка вакансий после редактирования
        />
      )}

      {isCreateJobModalOpen && (
        <CreateJobModal
          onClose={closeCreateJobModal} // Закрытие модалки
          onCreate={fetchProfile} // Обновление списка вакансий после создания новой
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