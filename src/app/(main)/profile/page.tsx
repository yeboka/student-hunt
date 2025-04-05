"use client"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import PassedJobCard from "@/components/shared/PassedProjectCard";
import { Pen } from "lucide-react";

const jobCards = Array.from({ length: 10 }, (_, i) => i + 1)

const user = {
  first_name: "Name",
  last_name: "Surname",
  university: "SDU University",
  bio: "3rd year student at SDU University, programmer and UI/UX Designer",
  info: [
    "blablabla bla balb alb",
    "blablabla bla alb blablablab bla balb alb",
    "blablabla bla balb alb",
    "blablabla bla balb alb",
  ],
  stack: "Redux, JS, HTML, React, NodeJs, Git, ExpressJs",
}

export default function Profile() {
  return (
    <div className="flex flex-col w-full items-center p-4">
      {/* Switcher container */}
      <div className="w-full flex justify-between items-center border-b px-4 py-3">
        <SidebarTrigger />
        <div className="flex gap-3 items-center">
          <p>Student mode</p>
          <Switch />
        </div>
      </div>

      {/* Profile Header */}
      <div className="w-full max-w-[1120px] flex gap-6 items-center mt-8">
        {/* Avatar and Name */}
        <Link className="text-[#0A6F6F] font-semibold flex gap-5" href="/profile">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
            <Button variant="link" className="text-sm">
              <Pen />
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div className={"w-full max-w-[1120px]"}>
        <div className="mt-3 text-sm">
          <p className="font-medium">Соц сети</p>
          <p>Stack: {user.stack}</p>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p className="font-medium">Опыт и образование</p>
          {user.info.map((line, idx) => (
            <p key={idx}>User info: {line}</p>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <div className="w-full max-w-[1120px] mt-6">
        <h2 className=" w-full text-lg font-semibold mb-4">
          Applied/Completed Projects:
        </h2>
        <div className="w-full flex flex-wrap items-center gap-4">
          {jobCards.map((item) => (
            <PassedJobCard key={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
