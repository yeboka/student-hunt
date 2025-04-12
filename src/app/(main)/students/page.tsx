"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StudentCard from "@/components/shared/StudentCard";
import API from "@/lib/axios";

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStudents = async (query?: string) => {
    setLoading(true);
    try {
      const res = await API.get("/students/search", {
        params: { query: query || "" },
      });
      setStudents(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке студентов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(); // первый рендер
  }, []);

  const handleSearch = () => {
    fetchStudents(search);
  };

  return (
    <div className={"w-full flex justify-center"}>
      <div className={"flex w-full max-w-[1120px] flex-col items-center"}>
        <div className={"flex items-center justify-center gap-5 p-5"}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ищу Front-end стажёра"
            className={"w-[500px] max-w-[720px]"}
          />
          <Button onClick={handleSearch} className={"bg-[#C6790E]"}>
            AI Search
          </Button>
        </div>
        <h1 className="text-2xl w-full font-semibold text-gray-900 mb-5">Подходящие кандидаты</h1>

        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className={"w-full flex flex-wrap gap-4"}>
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
