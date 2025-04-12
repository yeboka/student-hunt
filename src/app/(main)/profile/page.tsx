"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import API from "@/lib/axios";
import EditProfileModal from "@/app/(main)/profile/EditProfileModal";
import AddExperienceModal from "@/app/(main)/profile/AddExperienceModal";
import EditExperienceModal from "@/app/(main)/profile/EditExperienceModal";
import ExperienceCard from "@/components/shared/ExperienceCard"; // импортируем инстанс axios

const jobCards = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Profile() {
  const [user, setUser] = useState<any>(null); // Стейт для пользователя
  const [loading, setLoading] = useState<boolean>(true); // Стейт загрузки
  const [error, setError] = useState<string | null>(null); // Стейт ошибки
  const [selectedExperience, setSelectedExperience] = useState<any>(null); // Стейт для выбранного опыта
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState<boolean>(false); // Стейт для модалки добавления опыта

  // Функция для получения профиля
  const fetchProfile = async () => {
    try {
      const response = await API.get("/profile"); // Используем наш инстанс Axios
      setUser(response.data); // Устанавливаем данные пользователя в стейт
    } catch (err: any) {
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
        <div className="flex gap-3 items-center">
          <p>Student mode</p>
          <Switch />
        </div>
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
            <EditProfileModal user={user} onClose={() => {}} onUpdate={fetchProfile} />
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
    </div>
  );
}
