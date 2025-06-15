
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Type {
  id: string,
  label: string,
  icon: React.ReactNode,
  price: string
}

interface ConsultationTypeCardProps {
  type: Type;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ConsultationTypeCard: React.FC<ConsultationTypeCardProps> = ({ type, selected, onSelect }) => (
  <Card
    className={`cursor-pointer border-2 transition-all ${
      selected ? 'border-orange-500 bg-orange-50 dark:bg-orange-900' : 'border-gray-200 dark:border-gray-700 dark:bg-gray-900'
    }`}
    onClick={() => onSelect(type.id)}
  >
    <CardContent className="p-4 text-center">
      <div className="flex justify-center mb-2">{type.icon}</div>
      <h4 className="font-medium text-sm dark:text-gray-100">{type.label}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.price}</p>
    </CardContent>
  </Card>
);

export default ConsultationTypeCard;
