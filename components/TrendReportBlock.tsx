import { TrendReport } from "@/types/chat";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Lightbulb, 
  SkipForward, 
  ArrowRight 
} from "lucide-react";

type Props = {
  report: TrendReport;
  onCompare: () => void;
  onSkip: () => void;
  hideButton?: boolean;
};

// Convert full report to UI-friendly lightweight format
const convertToUI = (report: TrendReport) => {
  return {
    title: report.report_title,
    theme: report.theme,
    date: report.date_generated,

    summary: report.summary.metrics
      .map(m => `${m.metric_name}: ${m.value}`)
      .join(" / "),

    metrics: report.summary.metrics.map(m => ({
      label: m.metric_name,
      value: m.value,
    })),

    insights: report.insights.list,

    platforms: report.platform_analysis.platforms.map(p => ({
      name: p.name,
      percent: p.usage_percentage,
    })),
  };
};

// Helper Metric UI Component
const MetricBadge = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-start justify-center">
    <div className="text-lg font-bold text-indigo-700">{value}</div>
    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
  </div>
);

export default function TrendReportBlock({
  report,
  onCompare,
  onSkip,
  hideButton,
}: Props) {
  const ui = convertToUI(report);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 shadow-xl p-6 my-3 w-full max-w-2xl"
    >
      {/* Top Title Section */}
      <div className="mb-4 pb-3 border-b border-gray-100">
        <h2 className="text-xl font-bold text-indigo-700">{ui.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{ui.theme}</p>
        <p className="text-xs text-gray-400 mt-1">生成日: {ui.date}</p>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <BarChart3 size={24} className="text-indigo-600" />
        <h4 className="font-bold text-xl text-gray-800">トレンド分析レポート</h4>
      </div>

      {/* Summary Box */}
      <div className="text-gray-700 mb-5 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
        <span className="font-semibold text-blue-800">サマリー: </span>
        {ui.summary}
      </div>

      {/* Metrics Grid */}
      <h5 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
        <TrendingUp size={16} /> 主要指標
      </h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {ui.metrics.map((m, i) => (
          <MetricBadge key={i} label={m.label} value={m.value} />
        ))}
      </div>

      {/* Insights List */}
      <h5 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
        <Lightbulb size={16} /> 主要インサイト
      </h5>
      <ul className="list-none pl-0 text-sm text-gray-600 space-y-2 mb-6 border-b border-gray-100 pb-4">
        {ui.insights.map((ins, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-500 font-bold text-xs pt-1.5 shrink-0">
              ★
            </span>
            {ins}
          </li>
        ))}
      </ul>

      {/* Platform Distribution */}
      <h5 className="font-bold text-gray-700 mb-3">配信プラットフォーム分布</h5>
      <div className="space-y-3 text-sm">
        {ui.platforms.map((p, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-gray-600 w-1/4">{p.name}</span>

            <div className="w-1/2 bg-gray-200 rounded-full h-2.5 relative">
              <div
                style={{
                  width: `${p.percent}%`,
                  backgroundColor: i % 2 === 0 ? "#4f46e5" : "#06b6d4",
                }}
                className="h-2.5 rounded-full transition-all duration-500 shadow-inner"
              ></div>
            </div>

            <span className="font-semibold text-gray-800 w-1/6 text-right">
              {p.percent}%
            </span>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      {!hideButton && (
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 justify-end">
          <button
            onClick={onSkip}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all active:scale-95"
          >
            <SkipForward size={16} /> 改善提案へスキップ
          </button>

          <button
            onClick={onCompare}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 active:scale-95"
          >
            比較分析を開始 <ArrowRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
