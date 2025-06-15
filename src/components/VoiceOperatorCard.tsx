
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
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${operator.gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
            <User className={`w-6 h-6 ${operator.gender === 'female' ? 'text-pink-600' : 'text-blue-600'}`} />
          </div>
          <div>
            <h4 className="font-medium flex items-center gap-2">
              {operator.name}
              <Badge variant="outline" className="text-xs">
                {operator.gender === 'female' ? '♀️' : '♂️'} AI Voice
              </Badge>
            </h4>
            <p className="text-sm text-gray-600">{operator.specialty}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs">⭐ {operator.rating}</span>
              <div className="flex gap-1">
                {operator.languages.map((lang: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Badge 
            variant={operator.status === 'Available' ? "default" : "secondary"}
            className={operator.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
          >
            {operator.status}
          </Badge>
          {operator.status === 'Available' && (
            <Button 
              size="sm" 
              className="mt-2"
              onClick={() => onStartCall('voice_query', operator)}
            >
              <Phone className="w-3 h-3 mr-1" />
              Call & Speak
            </Button>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default VoiceOperatorCard;
