import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PassedJobCard() {
  return (
    <div className="max-w-sm rounded-lg border bg-white shadow-md p-2 flex flex-col justify-between gap-2">
      <div className={"p-3 bg-[#E4EFE7] rounded-md"}>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Senior UI Developer</h3>
      </div>
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-3"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-gray-600 text-sm">Nike</p>
        </div>
      </div>
    </div>
  )
}

export default PassedJobCard
