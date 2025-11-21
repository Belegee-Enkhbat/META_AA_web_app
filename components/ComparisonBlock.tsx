import { ComparisonResult } from "@/types/chat";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, User, MessageSquare, Monitor, CheckCircle, XCircle, ArrowRight } from "lucide-react";

type Props = {
  result: ComparisonResult;
  onNext: () => void;
};

// --- Helper Functions for UI ---

// Function to render an icon based on comparison status
const renderStatusIcon = (isMatch: boolean) => (
  <span className="shrink-0 ml-2">
    {isMatch ? (
      <CheckCircle size={16} className="text-green-500" />
    ) : (
      <XCircle size={16} className="text-red-500" />
    )}
  </span>
);

// Function to determine if the values match (for basic status comparison)
const isMatch = (trendValue: string, adValue: string): boolean => {
    // Simple case-insensitive comparison for demo purposes
    return trendValue.toLowerCase().trim() === adValue.toLowerCase().trim();
};

// Function to get a descriptive icon for the row item
const getRowIcon = (item: string) => {
    switch (item) {
        case "フォーマット": return <Monitor size={16} />;
        case "ターゲット層": return <User size={16} />;
        case "メッセージタイプ": return <MessageSquare size={16} />;
        case "配信プラットフォーム": return <TrendingUp size={16} />;
        default: return null;
    }
};


export default function ComparisonBlock({ result, onNext }: Props) {
  
  // Create an array of rows to map over and apply styling/logic
  const comparisonRows = [
    { label: "フォーマット", trend: result.trend.format, yourAd: result.yourAd.format },
    { label: "ターゲット層", trend: result.trend.target, yourAd: result.yourAd.target },
    { label: "メッセージタイプ", trend: result.trend.message, yourAd: result.yourAd.message },
    { label: "配信プラットフォーム", trend: result.trend.platform, yourAd: result.yourAd.platform },
  ];

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
        <h4 className="font-bold text-xl text-gray-800">比較分析レポート</h4>
      </div>

      {/* Comparison Table */}
      <table className="w-full text-sm mb-6 border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 font-semibold text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">項目</th>
            <th className="py-2 px-3 bg-indigo-50/50 rounded-l-lg">市場トレンド</th>
            <th className="py-2 px-3 bg-red-50/50 rounded-r-lg">あなたの広告</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => {
            const match = isMatch(row.trend, row.yourAd);
            return (
              <tr key={i} className="text-gray-700 hover:bg-gray-50/50 transition-colors">
                {/* Item Label */}
                <td className="text-left font-medium py-3 px-3 flex items-center gap-2">
                    <span className="text-indigo-500">{getRowIcon(row.label)}</span>
                    {row.label}
                </td>
                
                {/* Trend Value */}
                <td className="py-3 px-3 font-semibold bg-indigo-50/50 rounded-l-lg">{row.trend}</td>
                
                {/* Your Ad Value */}
                <td className={`py-3 px-3 font-semibold rounded-r-lg ${match ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
                    {row.yourAd}
                </td>

                {/* Status Icon */}
                <td className="w-1/12">
                    {renderStatusIcon(match)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 shadow-sm">
        <h5 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
            <span className="text-blue-500">💡</span> 改善推奨事項 (現状のギャップ)
        </h5>
        <ul className="list-none pl-0 text-sm text-gray-700 space-y-2">
          {result.recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold text-sm pt-0.5 shrink-0">•</span>
                {r}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-end pt-3 border-t border-gray-100">
          <button 
            className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-300 active:scale-95" 
            onClick={onNext}
          >
            具体的な改善提案を作成 <ArrowRight size={16} />
          </button>
      </div>
    </motion.div>
  );
}