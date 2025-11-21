import ChatWindow from "@/components/ChatWindow";

export default function Home() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white flex flex-col items-center py-8 w-full">
      <ChatWindow />
    </div>
  );
}