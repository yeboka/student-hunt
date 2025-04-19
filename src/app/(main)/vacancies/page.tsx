"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/shared/JobCart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/lib/axios";

const Vacancies = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (query?: string) => {
    setLoading(true);
    try {
      const res = await API.get("/jobs/search", {
        params: { query: query || "" },
      });

      // Добавляем полученные вакансии в состояние
      setJobs(res.data);
    } catch (error) {
      console.error("Ошибка при получении вакансий:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(); // первая загрузка
  }, []);

  const handleSearch = () => {
    fetchJobs(search);
  };

  return (
    <div className={"w-full flex justify-center"}>
      <div className={"flex w-full max-w-[1120px] flex-col items-center p-4"}>
        {/* Поисковая строка */}
        <div className={"flex items-center justify-center gap-5 p-5"}>
          <Input
            type="text"
            placeholder="Стажировка Front-end developer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={"w-[500px] max-w-[720px]"}
          />
          <Button onClick={handleSearch} className={"bg-[#C6790E]"}>
            AI Search
          </Button>
        </div>

        <h1 className="text-2xl w-full font-semibold text-gray-900 mb-5">Предложения для тебя</h1>

        {/* Карточки вакансий */}
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className={"w-full flex flex-wrap gap-4"}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} isApplied={job.isApplied} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacancies;
