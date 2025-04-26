import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company_name: string;
    salary: string;
    schedule?: string;
    location?: string;
    timezone?: string;
    logo?: string;
  };
  isApplied?: boolean;  // Статус, подался ли пользователь
}

export default function JobCard({ job, isApplied }: JobCardProps) {
  return (
    <Link
      href={`/vacancies/${job.id}`}
      className="w-[300px] bg-[#f7fcea] cursor-pointer hover:scale-[1.01] transition rounded-xl p-4 shadow-sm border border-[#e7f2da]"
    >
      {/* Top Row: Logo + Actions */}
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 relative">
          <Image
            src={job.logo || "https://cdn-icons-png.freepik.com/256/4300/4300059.png"}
            alt={`${job.company_name} Logo`}
            fill
            className="object-contain rounded-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{job.schedule || "График не указан"}</span>
          </div>
        </div>
      </div>

      {/* Title & Company */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">{job.company_name}</h3>
        <p className="text-sm text-gray-600">{job.title}</p>
      </div>

      {/* Salary */}
      <div className="mt-3 text-gray-800 font-semibold text-sm">
        {`${job.salary} $` || "Зарплата не указана"}
      </div>

      {/* Info Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">

        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{job.location || "Не указано"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{job.timezone || "Время любое"}</span>
        </div>
      </div>

      {/* Applied Status */}
      <div className="mt-2">
        {isApplied && <span className="text-sm text-green-500">Вы уже откликнулись на эту вакансию</span>}
      </div>
    </Link>
  );
}
