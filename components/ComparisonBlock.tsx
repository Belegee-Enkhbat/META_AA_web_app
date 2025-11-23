import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, User, MessageSquare, Monitor, 
  CheckCircle, XCircle, ArrowRight 
} from "lucide-react";
import { ComparisonResult } from "@/types/chat";

type Props = {
  data?: ComparisonResult; // Optionalにして存在チェック
  onNext: () => void;
  hideButton?: boolean;
};

// --- Helper Functions for UI ---
const renderStatusIcon = (match: boolean) => (
  <span className="shrink-0 ml-2">
    {match ? (
      <CheckCircle size={16} className="text-green-500" />
    ) : (
      <XCircle size={16} className="text-red-500" />
    )}
  </span>
);

const isMatch = (a: number | string | undefined, b: number | string | undefined) => {
  if (a == null || b == null) return false;
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
};

// Icon for each metric
const getRowIcon = (label: string) => {
  switch (label) {
    case "エンゲージメント": return <User size={16} />;
    case "CTR": return <TrendingUp size={16} />;
    case "CVR": return <MessageSquare size={16} />;
    case "総合スコア": return <Monitor size={16} />;
    default: return null;
  }
};

export default function ComparisonBlock({ data, onNext, hideButton }: Props) {
  // 🔹 データ未ロード時は Loading 表示
  if (!data) {
    return <div className="text-gray-500 p-4">Loading comparison data...</div>;
  }

  const benchmark = data.metrics_benchmark;
  const user = data.metrics_user_ad;

  // 🎯 比較行
  const comparisonRows = [
    { label: "エンゲージメント", trend: benchmark?.engagement, yourAd: user?.engagement },
    { label: "CTR", trend: benchmark?.ctr, yourAd: user?.ctr },
    { label: "CVR", trend: benchmark?.cvr, yourAd: user?.cvr },
    { label: "総合スコア", trend: benchmark?.overallScore, yourAd: user?.overallScore },
  ];

  // 推奨事項
  const recommendations = data.improvement_recommendations?.categories?.map(
    (c) => `${c.heading}：${c.recommendation}`
  ) ?? [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 my-4 w-full max-w-3xl"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <BarChart3 size={24} className="text-indigo-600" />
        <h4 className="font-bold text-xl text-gray-800">
          {data.report_name ?? "比較分析レポート"}
        </h4>
      </div>

      {/* Comparison Table */}
      <table className="w-full text-sm mb-6 border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 font-semibold text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">指標</th>
            <th className="py-2 px-3 bg-indigo-50/50 rounded-l-lg">業界ベンチマーク</th>
            <th className="py-2 px-3 bg-red-50/50 rounded-r-lg">あなたの広告</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => {
            const match = isMatch(row.trend, row.yourAd);

            return (
              <tr key={i} className="text-gray-700 hover:bg-gray-50/50 transition-colors">
                {/* Label */}
                <td className="text-left font-medium py-3 px-3 flex items-center gap-2">
                  <span className="text-indigo-500">{getRowIcon(row.label)}</span>
                  {row.label}
                </td>

                {/* Benchmark */}
                <td className="py-3 px-3 font-semibold bg-indigo-50/50 rounded-l-lg">
                  {row.trend ?? "-"}
                </td>

                {/* User Ad */}
                <td className={`py-3 px-3 font-semibold rounded-r-lg ${
                  match ? "bg-green-50/50" : "bg-red-50/50"
                }`}>
                  {row.yourAd ?? "-"}
                </td>

                {/* Match Status */}
                <td className="w-1/12">
                  {renderStatusIcon(match)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 shadow-sm">
          <h5 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
            <span className="text-blue-500">💡</span>
            {data.improvement_recommendations?.title ?? "改善推奨事項"}
          </h5>

          <ul className="list-none pl-0 text-sm text-gray-700 space-y-2">
            {recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold text-sm pt-0.5 shrink-0">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Button */}
      {!hideButton && (
        <div className="flex justify-end pt-3 border-t border-gray-100">
          <button 
            className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-300 active:scale-95"
            onClick={onNext}
          >
            具体的な改善提案を作成 <ArrowRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
