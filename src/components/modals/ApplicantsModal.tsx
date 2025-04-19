import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ApplicantsModalProps {
  applicants: any[];
  onClose: () => void;
}

export default function ApplicantsModal({ applicants, onClose }: ApplicantsModalProps) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-[400px] max-w-full bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Откликнувшиеся пользователи</h2>
      <div className="space-y-4">
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <Link href={`/students/${applicant.id}`} key={applicant.id} className="border p-4 rounded-lg block cursor-pointer">
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
  );
}
