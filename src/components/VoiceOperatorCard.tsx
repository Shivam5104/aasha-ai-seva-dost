
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, User } from "lucide-react";

interface OperatorProps {
  operator: any;
  onStartCall: (type: string, staff: any) => void;
}

const VoiceOperatorCard: React.FC<OperatorProps> = ({ operator, onStartCall }) => (
  <Card className="w-full">
    <CardContent className="p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full min-w-0">
          <div 
            className={`w-12 h-12 flex-shrink-0 ${operator.gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}
          >
            <User className={`w-6 h-6 ${operator.gender === 'female' ? 'text-pink-600' : 'text-blue-600'}`} />
          </div>
          <div className="min-w-0">
            <h4 className="font-medium flex items-center gap-2 dark:text-white">
              {operator.name}
              <Badge variant="outline" className="text-xs">{operator.gender === 'female' ? '♀️' : '♂️'} AI Voice</Badge>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-200">{operator.specialty}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs flex items-center gap-1 text-yellow-700 dark:text-yellow-200">
                ⭐ {operator.rating}
              </span>
              <div className="flex gap-1 flex-wrap">
                {operator.languages.map((lang: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-gray-100">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-col items-end min-w-[90px] w-full sm:w-auto space-y-2 sm:space-y-0">
          <Badge 
            variant={operator.status === 'Available' ? "default" : "secondary"}
            className={
              operator.status === 'Available'
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 mb-2'
                : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300 mb-2'
            }
          >
            {operator.status}
          </Badge>
          {operator.status === 'Available' && (
            <Button 
              size="sm"
              className="mt-0 whitespace-nowrap"
              onClick={() => onStartCall('voice_query', operator)}
            >
              <Phone className="w-3 h-3 mr-1" />
              Call &amp; Speak
            </Button>
          )}
          {operator.status !== 'Available' && (
            <span className="text-xs text-gray-500 dark:text-gray-300 mt-2">Busy</span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default VoiceOperatorCard;
