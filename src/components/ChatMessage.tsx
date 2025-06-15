
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: string;
  user?: any;
  orderTrackingContent?: React.ReactNode;
}

const ChatMessage: React.FC<{ message: Message; orderTrackingContent?: React.ReactNode }> = ({
  message,
  orderTrackingContent,
}) => (
  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[80vw] sm:max-w-[80%] p-3 rounded-lg break-words ${
      message.sender === 'user'
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }`}>
      <div className="whitespace-pre-wrap text-sm">{message.text}</div>
      {message.type === "order_tracking" && orderTrackingContent}
      <div className="text-xs mt-2 opacity-70">{message.timestamp.toLocaleTimeString()}</div>
    </div>
  </div>
);

export default ChatMessage;
