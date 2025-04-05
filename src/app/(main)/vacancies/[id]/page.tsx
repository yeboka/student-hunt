import Image from "next/image"
import { Button } from "@/components/ui/button"
import JobCard from "@/components/shared/JobCart";

export default function JobDetailsPage() {
  return (
    <div className="flex w-full max-w-[1120px] gap-12 p-6">
      {/* Left Side - Job Details */}
      <div className="flex-1 p-6">
        <div className={"bg-white shadow-md rounded-xl p-6"}>
          {/* Job Header */}
          <div className="flex  items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Анимационное видео/Реклама</h1>
              <p className="text-sm text-gray-500">Оплата: $588$</p>
            </div>
          </div>

          {/* Job Info */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p>График: 5/2</p>
              <p>Рабочий: час 40 часов в неделю</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p>Оплата: $588$</p>
              <p>Дедлайн: 12.12.2024</p>
            </div>
          </div>
        </div>


        {/* Job Description */}
        <div className="mt-6">
          <h3 className="font-semibold">Описание</h3>
          <p>Нужно сделать 3D анимационное видео для клиента...</p>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <h3 className="font-semibold">Требования</h3>
          <ul className="list-disc pl-6">
            <li>Опыт разработки от 1 года</li>
            <li>Глубокие знания CSS и HTML</li>
            <li>Хорошее знание TypeScript</li>
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
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </div>
  )
}
