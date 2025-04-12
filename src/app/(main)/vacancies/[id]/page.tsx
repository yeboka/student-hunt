"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (jobId) fetchJob();
  }, [jobId]);

  if (loading) return <div className="p-10">Загрузка...</div>;
  if (!job) return <div className="p-10 text-red-500">Вакансия не найдена</div>;

  return (
    <div className="flex w-full max-w-[1120px] gap-12 p-6">
      {/* Left Side - Job Details */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Job Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src={job.logo || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"}
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
          <Button className="bg-green-500 text-white">Откликнуться</Button>
        </div>
      </div>

      {/* Right Side - Similar Jobs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Похожие вакансии</h2>
        <div className="flex flex-col space-y-4">
          {/* Можем добавить похожие вакансии позже */}
          {/* <JobCard /> */}
        </div>
      </div>
    </div>
  );
}
