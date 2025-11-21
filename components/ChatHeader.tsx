import { Bot, MoreHorizontal, Zap } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-4 flex items-center justify-between shadow-md shrink-0 z-10 relative">
      <div className="flex items-center gap-4">
        {/* Avatar Container */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
            <Bot size={24} className="text-white" />
          </div>
          {/* Online Status Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-800 rounded-full animate-pulse"></div>
        </div>

        {/* Text Info */}
        <div>
          <div className="font-bold text-lg tracking-wide flex items-center gap-2">
            Marketing AI Superagent
            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
          <div className="text-blue-100 text-xs font-medium flex items-center gap-1 opacity-90">
            <span>●</span> オンライン・いつでもサポートします
          </div>
        </div>
      </div>

      {/* Actions placeholder */}
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
}