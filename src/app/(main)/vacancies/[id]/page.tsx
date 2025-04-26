"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ApplyDialog from "@/components/modals/ApplyDialog";
import Link from "next/link"; // Импортируем новый компонент

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false); // Состояние для поп-апа
  const [hasApplied, setHasApplied] = useState(false); // Состояние для проверки, подался ли пользователь
  const [advises, setAdvises] = useState<any[]>([])
  const [complete, setComplete] = useState("")
  const [adviseLoading, setAdviseLoading] = useState(true)
  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${jobId}`);
      setJob(res.data);
    } catch (err) {
      console.error("Ошибка при получении вакансии:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdviseForJob = async () => {
    try {
      const res = await API.get(`/jobs/advise/${jobId}`);
      const data = res.data;
      if (data.ready == "none") {
        setAdvises(data.advises)
        setComplete("")
      } else {
        setAdvises([])
        setComplete(data.ready)
      }
    } catch (err) {
      console.error("Ошибка при получении вакансии:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const res = await API.get(`/applications/${jobId}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Используем токен из LocalStorage
          },
        });

        if (res.data.applied) {
          setHasApplied(true);
        } else {
          setHasApplied(false);
        }
      } catch (err) {
        console.error("Ошибка при проверке статуса отклика:", err);
      }
    };

    if (jobId) {
      fetchJob();
      fetchAdviseForJob().finally(() => setAdviseLoading(false));
      checkApplicationStatus(); // Проверка статуса отклика при загрузке страницы
    }
  }, [jobId]);

  if (loading) return <div className="p-10">Загрузка...</div>;
  if (!job) return <div className="p-10 text-red-500">Вакансия не найдена</div>;

  return (
    <div className="flex w-full max-w-[1120px] gap-3 p-6">
      {/* Left Side - Job Details */}
      <div className="flex-1 w-full p-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Job Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src={job.logo || "https://cdn-icons-png.freepik.com/256/4300/4300059.png"}
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{job.title}</h1>
              <p className="text-sm text-gray-500">Компания: {job.company_name}</p>
              <p className="text-sm text-gray-500">Оплата: {job.salary || "Не указана"}</p>
            </div>
          </div>

          {/* Job Info */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p>График: {job.schedule}</p>
              <p>Занятость: {job.work_time}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p>Тип: {job.job_format || "—"}</p>
              <p>Дедлайн: {job.deadline || "Не указан"}</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <h3 className="font-semibold">Описание</h3>
          <p>{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <h3 className="font-semibold">Требования</h3>
          <ul className="list-disc pl-6">
            {job.requirements?.split("\n").map((req: string, idx: number) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="mt-6">
          {hasApplied ? (
            <Button className="bg-gray-500 text-white" disabled>
              Вы уже откликнулись
            </Button>
          ) : (
            <Button onClick={() => setDialogOpen(true)} className="bg-green-500 text-white">
              Откликнуться
            </Button>
          )}
        </div>
      </div>

      {/* Right Side - Similar Jobs */}
      <div className="space-y-4 max-w-[300px] h-fit bg-white shadow-md rounded-xl p-3 ">
        <h2 className="text-lg font-semibold">Какие темы для этой вакансии стоит изучить</h2>
        <div className="flex flex-col space-y-4">
          {/* Можем добавить похожие вакансии позже */}
          {/* <JobCard /> */}
          {complete && <p>{complete}</p>}
          {adviseLoading && <div className={"w-full text-center animate-pulse my-5"}>
              Обрабатываем данные
          </div>}
          {advises && advises.length > 0 && advises.map((advise) => {
            return <div key={advise.text} className={"flex flex-col items-end"}>
              <h2 className={""}>{advise.text}</h2>
              <Link href={advise.link} target={"_blank"} className={"hover:underline "}>Ссылка 🔗</Link>
            </div>
          })}
        </div>
      </div>

      {/* Окно отклика */}
      <ApplyDialog jobId={jobId as any} isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} setHasApplied={setHasApplied} />
    </div>
  );
}
