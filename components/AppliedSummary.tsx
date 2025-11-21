import { Recommendation } from "@/types/chat";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, TrendingUp, FileText } from "lucide-react";

type Props = {
  applied: Recommendation[];
  rejected: Recommendation[];
};

export default function AppliedSummary({ applied, rejected }: Props) {
  const totalPoints = applied.reduce((sum, r) => sum + r.points, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden my-3 w-full max-w-md"
    >
      {/* Header / Hero Metric */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-green-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-800">
          <TrendingUp size={20} className="text-green-600" />
          <span className="font-bold">最適化完了</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-green-600 font-medium uppercase tracking-wide">スコア向上予測</span>
          <span className="text-2xl font-black text-green-600">+{totalPoints}<span className="text-sm font-medium ml-1">pt</span></span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Applied Section */}
        <div>
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
            <CheckCircle2 size={14} /> 適用した施策 ({applied.length})
          </h5>
          <div className="space-y-2">
            {applied.length > 0 ? (
              applied.map((r) => (
                <div key={r.id} className="flex items-center justify-between bg-green-50/50 p-2.5 rounded-lg border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{r.title}</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded shadow-sm">
                    +{r.points}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic pl-2">適用された項目はありません</div>
            )}
          </div>
        </div>

        {/* Rejected Section (Only if exists) */}
        {rejected.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1 mt-2">
              <XCircle size={14} /> 見送った施策 ({rejected.length})
            </h5>
            <div className="space-y-2">
              {rejected.map((r) => (
                <div key={r.id} className="flex items-center justify-between px-2.5 py-1.5 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                    <span className="text-sm text-gray-500 line-through decoration-gray-400">{r.title}</span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    Skip
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 text-[10px] text-gray-500 flex items-center gap-2">
        <FileText size={12} />
        反映には5〜10分程度かかる場合があります
      </div>
    </motion.div>
  );
}