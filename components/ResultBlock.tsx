import { Recommendation } from "@/types/chat";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check, X, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  rec: Recommendation;
  onExpand: () => void;
  onApply: () => void;
  onReject: () => void;
  expanded?: boolean;
  onCollapse?: () => void;
};

export default function RecommendationBlock({ rec, onExpand, onApply, onReject, expanded, onCollapse }: Props) {
  // Determine color based on impact (assuming rec.impact is a string like 'High' or 'Medium')
  const impactColor = rec.impact.toLowerCase().includes('high') 
    ? "bg-red-500 text-white" 
    : rec.impact.toLowerCase().includes('medium') 
    ? "bg-orange-400 text-white" 
    : "bg-green-500 text-white";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 my-3 w-full max-w-xl"
    >
      {/* Header and Impact Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Zap size={18} />
          </div>
          <div className="font-bold text-lg text-gray-800 leading-tight">{rec.title}</div>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${impactColor}`}>
          {rec.impact}
        </span>
      </div>

      {/* Summary */}
      <div className="text-gray-600 mb-3 text-sm">{rec.description}</div>

      {/* Expanded Details Section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pt-3 border-t border-gray-100 mt-3"
          >
            <h5 className="font-semibold text-gray-700 mb-2 text-sm">推奨理由:</h5>
            <ul className="list-none pl-0 text-sm text-gray-500 space-y-1">
              {rec.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold text-xs pt-1">•</span>
                    {r}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 mt-3 border-t border-gray-100">
        
        {/* Toggle Details Button */}
        <button 
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors" 
          onClick={expanded ? onCollapse : onExpand}
        >
          {expanded ? (
            <>詳細を非表示 <ChevronUp size={16} /></>
          ) : (
            <>詳細を表示 <ChevronDown size={16} /></>
          )}
        </button>

        {/* Reject Button */}
        <button 
          className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all active:scale-95" 
          onClick={onReject}
        >
          <X size={16} /> 却下
        </button>
        
        {/* Apply Button (Primary) */}
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