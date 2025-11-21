import { ChatMessage } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatMessageBlock({ message }: { message: ChatMessage }) {
  const isUser = message.type === "user";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full gap-3 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm shrink-0 ${
        isUser ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-blue-600"
      }`}>
        {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
      </div>

      {/* Message Bubble */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-5 py-3.5 shadow-sm text-sm leading-relaxed break-words
            ${isUser 
              ? "bg-blue-600 text-white rounded-2xl rounded-tr-none" 
              : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none"
            }
          `}
        >
          {message.content}
        </div>
        
        {/* Timestamp (Optional/Mock) */}
        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {isUser ? "You" : "AI Agent"}
        </span>
      </div>
    </motion.div>
  );
}