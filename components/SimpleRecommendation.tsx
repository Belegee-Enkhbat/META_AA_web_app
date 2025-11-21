import { Recommendation } from "@/types/chat";
import { motion } from "framer-motion";
import { Zap, Check, X, ChevronDown } from "lucide-react";

type Props = {
  rec: Recommendation;
  onExpand: () => void;
  onApply: () => void;
  onReject: () => void;
};

export default function SimpleRecommendation({ rec, onExpand, onApply, onReject }: Props) {
  // Determine color based on impact (simplified logic)
  const impactColor = rec.impact.toLowerCase().includes('high') 
    ? "bg-red-500 text-white shadow-red-200" 
    : rec.impact.toLowerCase().includes('medium') 
    ? "bg-orange-400 text-white shadow-orange-200" 
    : "bg-green-500 text-white shadow-green-200";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 my-3 w-full max-w-xl"
    >
      {/* Header and Impact Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <Zap size={18} />
          </div>
          <div className="font-bold text-lg text-gray-800 leading-tight">{rec.title}</div>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${impactColor}`}>
          {rec.impact}
        </span>
      </div>

      {/* Description */}
      <div className="text-gray-600 mb-3 text-sm border-b border-gray-100 pb-3">{rec.description}</div>

      {/* Reasons List */}
      <div className="mb-4">
        <h5 className="font-semibold text-gray-700 mb-2 text-sm">主要な理由:</h5>
        <ul className="list-none pl-0 text-sm text-gray-500 space-y-1">
          {rec.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold text-xs pt-1">•</span>
                {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-3 border-t border-gray-100">
        
        {/* Expand Button (Outline/Neutral) */}
        <button 
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all active:scale-95" 
          onClick={onExpand}
        >
          詳細を表示 <ChevronDown size={16} />
        </button>

        {/* Reject Button (Secondary/Gray) */}
        <button 
          className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all active:scale-95" 
          onClick={onReject}
        >
          <X size={16} /> 却下
        </button>
        
        {/* Apply Button (Primary/Green) */}
        <button 
          className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-md shadow-green-200 active:scale-95" 
          onClick={onApply}
        >
          <Check size={16} /> 適用
        </button>
      </div>
    </motion.div>
  );
}