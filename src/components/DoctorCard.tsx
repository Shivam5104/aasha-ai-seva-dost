
import React from "react";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface DoctorCardProps {
  doctor: any;
  selected: boolean;
  onSelect: (id: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, selected, onSelect }) => (
  <div
    className={`flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md border transition
      ${selected ? 'border-orange-500 ring-2 ring-orange-400 dark:ring-orange-500' : 'border-gray-200 dark:border-gray-700'} 
      ${!doctor.available ? 'opacity-70' : ''} p-4 flex gap-3 items-center min-w-0`}
    onClick={() => doctor.available && onSelect(doctor.id)}
    style={{ minWidth: 0 }}
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
      <User className="w-6 h-6 text-orange-600" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-semibold text-gray-900 dark:text-gray-100 text-base">{doctor.name}</div>
      <div className="text-xs text-gray-700 dark:text-gray-300">{doctor.specialty}</div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-xs flex items-center gap-1"><span role="img" aria-label="star">⭐</span> {doctor.rating}</span>
        <span className="text-xs text-gray-500">{doctor.experience}</span>
        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{doctor.fee}</span>
      </div>
      <div className="flex gap-1 mt-1 flex-wrap">
        {doctor.languages.map((lang: string, idx: number) => (
          <Badge
            key={idx}
            variant="secondary"
            className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
          >{lang}</Badge>
        ))}
      </div>
    </div>
  </div>
);

export default DoctorCard;
