import { ChatMessage } from "@/types/chat";

export default function ChatMessageBlock({ message }: { message: ChatMessage }) {
  return (
    <div className={`flex ${message.type === "user" ? "justify-end" : ""} mb-4`}>
      <div
        className={`rounded-lg px-4 py-3 shadow max-w-[80%] whitespace-pre-line break-words
          ${message.type === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-blue-100"}
        `}
      >
        {message.content}
      </div>
    </div>
  );
}