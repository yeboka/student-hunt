import React from 'react';
import JobCard from "@/components/shared/JobCart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Vacancies = () => {
  const jobCards = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className={"w-full flex justify-center"}>
      <div className={"flex w-full max-w-[1120px] flex-col items-center"}>
        <div className={"flex items-center justify-center gap-5 p-5"}>
          <Input type="email" placeholder="Стажировка Front-end developer" className={"w-[500px] max-w-[720px]"}/>
          <Button type="submit" className={"bg-[#C6790E]"}>AI Search</Button>
        </div>
        <h1 className="text-2xl w-full font-semibold text-gray-900 mb-5">Предложения для тебя</h1>
        <div className={"w-full flex flex-wrap gap-4"}>
          {jobCards.map((item) => (
            <JobCard key={item} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Vacancies;