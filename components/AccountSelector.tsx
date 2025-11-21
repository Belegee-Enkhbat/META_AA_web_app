import { Account } from "@/types/chat";
import { Building2, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  accounts: Account[];
  value: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
};

export default function AccountSelector({ accounts, value, onChange, onConfirm }: Props) {
  // Find the selected account object to display extra details if needed
  const selectedAccountData = accounts.find((acc) => acc.id === value);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 max-w-md w-full"
    >
      {/* Header Label */}
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
          <Building2 size={18} />
        </div>
        <span className="font-semibold text-sm">対象アカウントを選択</span>
      </div>

      {/* Custom Select Wrapper */}
      <div className="relative group">
        <select
          className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 cursor-pointer transition-all hover:bg-gray-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled className="text-gray-400">
            アカウントIDを選択...
          </option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.id})
            </option>
          ))}
        </select>
        
        {/* Custom Chevron Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-gray-600">
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Selected Feedback (Optional visual confirmation) */}
      {selectedAccountData && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 mb-3 flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-md"
        >
          <CheckCircle2 size={14} />
          <span>{selectedAccountData.name} が選択されています</span>
        </motion.div>
      )}

      {/* Confirm Button */}
      <div className="mt-4">
        <button
          onClick={onConfirm}
          disabled={!value}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 
            ${value 
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-[0.98]" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          <span>分析を開始する</span>
          {value && <ArrowRight size={16} />}
        </button>
      </div>
    </motion.div>
  );
}