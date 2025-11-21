import { Send, Paperclip } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && value.trim()) onSend();
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <form
        className="flex items-center gap-2 max-w-4xl mx-auto relative"
        onSubmit={handleSubmit}
      >
        {/* Attachment Icon (Visual only for realism) */}
        <button 
          type="button"
          disabled={disabled}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Paperclip size={20} />
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <input
            className="w-full bg-gray-50 text-gray-800 border-0 rounded-full py-3 pl-5 pr-12 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner placeholder:text-gray-400"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="メッセージを入力してください..."
            disabled={disabled}
          />
          
          {/* Send Button (Inside Input) */}
          <button 
            type="submit" 
            disabled={disabled || !value.trim()}
            className={`absolute right-1.5 top-1.5 p-1.5 rounded-full transition-all duration-200 ${
              value.trim() && !disabled
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={18} className={value.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
      </form>
    </div>
  );
}