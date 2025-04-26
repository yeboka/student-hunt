"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import API from "@/lib/axios";
import useSwitchState from "@/hooks/useSwitchState";
import StudentCard from "@/components/shared/StudentCard";
import JobCard from "@/components/shared/JobCart";
import Image from "next/image";
import Link from "next/link"; // твой axios инстанс

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isChecked, setIsChecked] = useSwitchState("isStudent", false);
  const [currJob, setCurrJob] = useState<any>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
    }
  }, [])

  // Фетчим вакансии при загрузке
  useEffect(() => {
    setLoading(true);

    if (isLogged) {
      if (!isChecked) {
        fetchStudents("").finally(() => setLoading(false));
      } else {
        fetchJobs("").finally(() => setLoading(false));
      }
    } else {
      setLoading(false)
    }
  }, [isChecked, isLogged]);

  const fetchJobs = async (query?: string) => {

    try {
      const res = await API.get("/jobs/recommendations", {
        params: { query: query || "" },
      });
      setItems(res.data.jobs);
      setCurrJob(null);
    } catch (error) {
      console.error("Ошибка при загрузке вакансий:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (query?: string) => {
    try {
      const res = await API.get("/students/job", {
        params: { query: query || "" },
      });
      setItems(res.data.students);
      setCurrJob(res.data.job);
    } catch (error: any) {
      if (error.status == 404) {
        setItems([])
      }
      console.error("Ошибка при загрузке вакансий:", error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className={"w-full flex justify-between items-center border-b p-3"}>
        <SidebarTrigger />
        <div className={"flex gap-3 items-center"}>
          <p>Student mode</p>
          <Switch
            checked={isChecked}
            onCheckedChange={setIsChecked}
          />
        </div>
      </div>

      {/*Search container*/}
      <div className={"flex flex-col items-center justify-center gap-5 p-5"}>
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          {isChecked ? "Вакансии" : "Студенты"} для вас
        </h1>
        <p>
          {isChecked ? "Вакансии" : "Студенты"} подобранные ИИ {isChecked ? "на базе вашего резюме" : ""}
        </p>
      </div>

      {/*Cards container*/}
      <div className={"p-5 w-full max-w-[1120px]"}>
        {/*<h1 className="text-2xl font-semibold text-gray-900 mb-5">*/}
        {/*  {search ? "Результаты поиска" : `Подходящие ${isChecked ? "вакансии" : "студенты"}`}*/}
        {/*</h1>*/}

        {loading ? (
          <p className={"w-full text-center"}>Загрузка вакансий...</p>
        ) : isLogged ? (
          <div className="flex flex-col gap-4 items-center">
            {currJob && <div>
                <h3 className={"text-lg font-semibold"}>Студенты для вашей вакансии: <Link href={`/vacancies/${currJob?.id}`} className={"text-sky-600 cursor-pointer hover:underline"}>{currJob?.title}</Link></h3>
            </div>}
            <div className="flex flex-wrap gap-4">
              {items.length > 0 && items.map((item, idx) => {
                if (isChecked) return item ? <JobCard key={item.id} job={item}/> : <React.Fragment key={idx}></React.Fragment>
                else return item ? <StudentCard key={item.id} student={item}/> : <React.Fragment key={idx}></React.Fragment>
              })}
              {
                items.length === 0 && <div className={"flex flex-col items-center"}>
                      <Image src={"https://img.freepik.com/free-vector/empty-box-concept-illustration_114360-29453.jpg?semt=ais_hybrid&w=740"} alt={""} width={300} height={300}/>
                      <h1 className={"text-md font-semibold mb-5"}>Недостаточно данных что бы показать вам предложения </h1>
                  <p className={"text-sm"}>Заполните данные профиля или создайте вакансию</p>
                  </div>
              }
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center p-6">
            <div className="bg-white flex flex-col items-center p-8 rounded-xl shadow-lg max-w-md w-full text-center">
              <Image src={'/login_illustration.svg'} width={300} height={400} alt={"Login Illustration"}/>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Авторизуйтесь и заполните свой профиль</h2>
              <p className="text-gray-600 text-lg">Чтобы мы подобрали вам вакансию</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
