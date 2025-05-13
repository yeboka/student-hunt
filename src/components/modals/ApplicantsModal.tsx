import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ApplicantsModalProps {
  applicants: any[];
  onClose: () => void;
}

export default function ApplicantsModal({applicants, onClose}: ApplicantsModalProps) {
  return (
    <div className={"w-screen h-screen fixed top-0 left-0 flex items-center justify-center p-20 bg-black/50 z-1000"}
         onClick={onClose}>
      <div
        className=" p-6 w-full max-w-[500px] max-h-[700px] overflow-hidden overflow-y-auto bg-white rounded-xl shadow-lg"
        onClick={(e) => {
          e.stopPropagation()
        }}>
        <h2 className="text-xl font-semibold mb-4">Откликнувшиеся пользователи</h2>
        <div className="space-y-4">
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <Link href={`/students/${applicant.id}`} key={applicant.id}
                    className="border p-4 rounded-lg block cursor-pointer">
                <p className="font-semibold">{applicant.first_name} {applicant.last_name}</p>
                <p className="text-sm text-gray-500">{applicant.email}</p>
              </Link>
            ))
          ) : (
            <p>Нет откликов на эту вакансию.</p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="bg-gray-500 text-white">Закрыть</Button>
        </div>
      </div>
    </div>
  );
}
