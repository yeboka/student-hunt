import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  job: {
    id: number;
    title: string;
    company_name: string;
    salary: string;
    logo?: string;
  };
}

function ProjectCard({ job }: ProjectCardProps) {
  return (
    <div className="max-w-sm rounded-lg border bg-white shadow-md p-2 flex flex-col justify-between gap-2">
      <div className={"p-3 bg-[#E4EFE7] rounded-md"}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">{`${job.salary} $` || "$--"}</span>
          <button className="text-gray-500 hover:text-gray-700">
            <Image src={"/icons/favourite.svg"} alt={"add to fav"} width={24} height={24} />
          </button>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
      </div>
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-3"}>
          <Avatar>
            <AvatarImage src={job.logo || "https://github.com/shadcn.png"} alt="@logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-gray-600 text-sm">{job.company_name}</p>
        </div>
        <Link href={`/project/${job.id}`}>
          <Button className="text-white py-2 rounded-full">View</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
