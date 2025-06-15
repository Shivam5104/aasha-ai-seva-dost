
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Truck, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  medicine: string;
  status: string;
  partnerName: string;
  partnerPhone: string;
  estimatedTime: string;
  currentLocation: string;
  trackingSteps: { status: string; time: string; completed: boolean }[];
}

const OrderTrackingCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-medium text-gray-800 dark:text-white">Order #{order.id}</h4>
      <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
        {order.status}
      </Badge>
    </div>
    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-100">
      <div><strong>Medicine:</strong> {order.medicine}</div>
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-blue-600" />
        <span><strong>Delivery Partner:</strong> {order.partnerName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-green-600" />
        <span>{order.partnerPhone}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-orange-600" />
        <span><strong>ETA:</strong> {order.estimatedTime}</span>
      </div>
      <div className="flex items-center gap-2">
        <Navigation className="w-4 h-4 text-purple-600" />
        <span><strong>Current Location:</strong> {order.currentLocation}</span>
      </div>
    </div>
    <div className="mt-3 space-y-1">
      {order.trackingSteps.map((step, idx) => (
        <div key={idx} className={`flex items-center gap-2 text-xs ${
          step.completed ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            step.completed ? 'bg-green-500 dark:bg-green-300' : 'bg-gray-300 dark:bg-gray-700'
          }`}></div>
          <span>{step.status} - {step.time}</span>
        </div>
      ))}
    </div>
    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
      <Button size="sm" className="w-full">
        <Phone className="w-3 h-3 mr-1" />
        Call Delivery Partner
      </Button>
    </div>
  </div>
);

export default OrderTrackingCard;
