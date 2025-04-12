"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProjectCard from "@/components/shared/ProjectCard";
import API from "@/lib/axios"; // твой axios инстанс

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Фетчим вакансии при загрузке
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query?: string) => {
    setLoading(true);
    try {
      const res = await API.get("/jobs/search", {
        params: { query: query || "" },
      });
      setJobs(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке вакансий:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchJobs(search);
  };

  return (
    <div className="flex flex-col w-full items-center">
      {/*Switcher container*/}
      <div className={"w-full flex justify-between items-center border-b p-3"}>
        <SidebarTrigger />
        <div className={"flex gap-3 items-center"}>
          <p>Student mode</p>
          <Switch />
        </div>
      </div>

      {/*Search container*/}
      <div className={"flex items-center justify-center gap-5 p-5"}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Стажировка Front-end developer"
          className={"w-[500px] max-w-[720px]"}
        />
        <Button onClick={handleSearch} className={"bg-[#C6790E]"}>
          AI Search
        </Button>
      </div>

      {/*Cards container*/}
      <div className={"p-5 w-full max-w-[1120px]"}>
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">
          {search ? "Результаты поиска" : "Подходящие вакансии"}
        </h1>

        {loading ? (
          <p>Загрузка вакансий...</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {jobs.map((job) => (
              <ProjectCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
