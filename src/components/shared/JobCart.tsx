import Image from "next/image"
import { Star, Share2, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link";

export default function JobCard() {
  return (
    <Link href={"/vacancies/1"} className="w-[300px] bg-[#f7fcea] cursor-pointer hover:scale-101 transition rounded-xl p-4 shadow-sm border border-[#e7f2da]">
      {/* Top Row: Logo + Tag + Actions */}
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 relative">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-black">
            <Share2 size={16} />
          </button>
          <button className="text-gray-500 hover:text-black">
            <Star size={16} />
          </button>
        </div>
      </div>

      {/* Middle: Title & Company */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">Google</h3>
        <p className="text-sm text-gray-600">Senior UI Designer</p>
      </div>

      {/* Rate */}
      <div className="mt-3 text-gray-800 font-semibold text-sm">
        $70 – 90/hr
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>40 hrs/wk</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>Remote</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>PST only</span>
        </div>
      </div>
    </Link>
  )
}
