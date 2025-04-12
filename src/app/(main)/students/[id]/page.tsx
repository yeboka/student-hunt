"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function StudentPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);




  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/students/${id}`);
        setUser(res.data);
      } catch (err: any) {
        setError(`Студент не найден или произошла ошибка ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStudent();
  }, [id]);
  if (loading) return <div className="p-10">Загрузка...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col w-full items-center p-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center border-b px-4 py-3">
        <SidebarTrigger />
        <div className="flex gap-3 items-center">
          <p>Student mode</p>
          <Switch checked disabled />
        </div>
      </div>

      {/* Avatar + Info */}
      <div className="w-full max-w-[1120px] flex gap-6 items-center mt-8">
        <div className="text-[#0A6F6F] font-semibold flex gap-5">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.profile_picture || "https://cdn-icons-png.flaticon.com/512/236/236831.png"} alt={user.first_name} />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">{user.first_name} {user.last_name}</h1>
          <p className="text-sm text-muted-foreground">{user.description}</p>
        </div>
      </div>

      {/* Socials */}
      <div className="w-full max-w-[1120px] mt-4 text-sm">
        <p className="font-bold">Контакты и соцсети:</p>
        {user.phone && <p><span className="font-medium">Телефон:</span> {user.phone}</p>}
        {user.telegram && <p><span className="font-medium">Telegram:</span> {user.telegram}</p>}
        {user.github && <p><span className="font-medium">GitHub:</span> {user.github}</p>}
        <p className="mt-2"><span className="font-bold">Stack:</span> {user.skills}</p>
        <p className="mt-1"><span className="font-bold">Доступное время:</span> {user.available_time}</p>
      </div>

      {/* Work Experience */}
      <div className="w-full max-w-[1120px] mt-6 space-y-3 text-sm">
        <p className="font-bold">Опыт и образование:</p>
        {user.WorkExperiences?.map((exp: any, idx: number) => (
          <div key={idx} className="border p-3 rounded-md shadow-sm">
            <p className="text-lg font-semibold">{exp.position}</p>
            <p className="text-gray-700">{exp.company_name}</p>
            <p className="text-xs text-gray-500">{exp.start_date} - {exp.end_date || "настоящее время"}</p>
            <p className="mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Dummy section (если надо показать "прошлые проекты") */}
      {/*<div className="w-full max-w-[1120px] mt-6">*/}
      {/*  <h2 className="text-lg font-semibold mb-4">Пройденные проекты</h2>*/}
      {/*  <div className="flex flex-wrap gap-4">*/}
      {/*    {Array.from({ length: 3 }).map((_, i) => (*/}
      {/*      <PassedJobCard key={i} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
