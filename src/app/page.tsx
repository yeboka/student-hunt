import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/shared/JobCard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const jobCards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

export default function Home() {
  return (
    <div className={"flex "}>
      <AppSidebar />
      <div className="flex flex-col w-full items-center">
        {/*Switcher container*/}
        <div className={"w-full flex justify-between items-center border-b-1 p-3"}>
          <SidebarTrigger />
          <div className={"flex gap-3 items-center  "}>
            <p>Student mode</p>
            <Switch/>
          </div>
        </div>
        {/*Search container*/}
        <div className={"flex items-center justify-center gap-5 p-5"}>
          <Input type="email" placeholder="Стажировка Front-end developer" className={"w-[500px] max-w-[720px]"} />
          <Button type="submit" className={"bg-[#C6790E]"}>AI Search</Button>
        </div>
        {/*Cards container*/}
        <div className={"p-5"}>
          <div className={"max-w-[1120px]  w-full flex flex-wrap items-center gap-4"}>
            {
              jobCards.map((item) => (
                <JobCard key={item}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
