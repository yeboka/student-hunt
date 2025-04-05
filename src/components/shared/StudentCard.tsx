import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

export default function StudentCard() {
  return (
    <Link href={"/profile"} className="flex items-center justify-between bg-[#f7fcea] rounded-xl p-4 w-[340px] shadow-sm border border-[#e7f2da]">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src="https://cdn-icons-png.flaticon.com/512/236/236831.png" alt="User avatar" />
          <AvatarFallback>NS</AvatarFallback>
        </Avatar>

        <div className="text-sm text-gray-700 space-y-0.5">
          <p className="font-medium text-gray-900 cursor-pointer">Name Surname</p>
          <p>profession</p>
          <p>education</p>
          <p>skills</p>
        </div>
      </div>

      {/* Rating + View */}
      <div className="flex flex-col items-end justify-between h-full">
        <div className="flex items-center text-sm text-yellow-600 font-medium">
          5 <Star size={14} className="ml-1 fill-yellow-400" />
        </div>
        <button className="text-sm text-gray-600 hover:underline mt-6">view</button>
      </div>
    </Link>
  )
}
