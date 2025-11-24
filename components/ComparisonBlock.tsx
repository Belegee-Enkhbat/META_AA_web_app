import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, User, MessageSquare, Monitor, 
  CheckCircle, XCircle, ArrowRight, Clock, Target, Hash
} from "lucide-react";
import { ComparisonResult } from "@/types/chat";
// import { ComparisonResult } from "@/types/chat"; // 外部インポートを想定



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
  
  // 総合スコア以外は、ユーザー値がベンチマーク値に近いか上回っているかを「Good」と見なす
  if (typeof a === 'number' && typeof b === 'number') {
    // 総合スコア以外は yourAd >= trend (または近い値) をGoodとするシンプルなロジック
    // ここでは単純に yourAd >= trend の場合にtrueを返します
    return b >= a; 
  }
  
  // 数値でない場合はシンプルな一致チェック (ここでは使用しないが念のため残す)
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
};

// Icon for each primary metric
const getRowIcon = (label: string) => {
  switch (label) {
    case "エンゲージメント": return <User size={16} />;
    case "CTR": return <TrendingUp size={16} />;
    case "CVR": return <MessageSquare size={16} />;
    case "総合スコア": return <Monitor size={16} />;
    default: return null;
  }
};

// Priority badge
const PriorityBadge = ({ priority }: { priority: '高' | '中' | '低' }) => {
  let colorClass = 'bg-gray-100 text-gray-700';
  if (priority === '高') colorClass = 'bg-red-100 text-red-700';
  if (priority === '中') colorClass = 'bg-yellow-100 text-yellow-700';

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
      {priority}
    </span>
  );
};

// Main Component
export default function ComparisonBlock({ data, onNext, hideButton }: Props) {
  // 🔹 データ未ロード時は Loading 表示
  if (!data) {
    return <div className="text-gray-500 p-4">Loading comparison data...</div>;
  }

  const benchmark = data.metrics_benchmark;
  const user = data.metrics_user_ad;

  // 🎯 主要比較行
  const comparisonRows = [
    { label: "エンゲージメント", trend: benchmark.engagement, yourAd: user.engagement },
    { label: "CTR", trend: benchmark.ctr, yourAd: user.ctr },
    { label: "CVR", trend: benchmark.cvr, yourAd: user.cvr },
    { label: "総合スコア", trend: benchmark.overallScore, yourAd: user.overallScore },
  ];

  // 🎯 詳細スコア行 (新しいセクション用)
  const detailScores = [
    { label: "カラートレンド適合度", value: user.colorTrend, icon: "🎨" },
    { label: "テキスト配置スコア", value: user.textPlacement, icon: "✍️" },
    { label: "ブランド露出度", value: user.brandExposure, icon: "🏷️" },
  ];

  // 🎯 年齢層別スコア
  const ageScores = [
    { label: "18-24歳", value: user.age18_24 },
    { label: "25-34歳", value: user.age25_34 },
    { label: "35-44歳", value: user.age35_44 },
  ];

  // 推薦事項の整形
  const recommendations = data.improvement_recommendations?.categories ?? [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 my-4 w-full max-w-3xl"
    >
      {/* Header & Title */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <BarChart3 size={24} className="text-indigo-600" />
        <h4 className="font-bold text-xl text-gray-800">
          {data.report_name}
        </h4>
      </div>
      <div className="text-sm text-gray-500 mb-5">
        <p>
          <span className="font-semibold text-gray-700">キャンペーン: </span>
          {data.campaign_name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">比較対象: </span>
          {data.comparison_target}
        </p>
      </div>

      {/* Primary Comparison Table */}
      <h5 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
        <TrendingUp size={18} /> 主要パフォーマンス比較
      </h5>
      <table className="w-full text-sm mb-6 border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 font-semibold text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">指標</th>
            <th className="py-2 px-3 bg-indigo-50/50 rounded-l-lg">業界ベンチマーク</th>
            <th className="py-2 px-3 bg-red-50/50 rounded-r-lg">あなたの広告</th>
            <th className="w-1/12">評価</th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => {
            const isBetter = isMatch(row.trend, row.yourAd);

            return (
              <tr key={i} className="text-gray-700 hover:bg-gray-50/50 transition-colors">
                {/* Label */}
                <td className="text-left font-medium py-3 px-3 flex items-center gap-2">
                  <span className="text-indigo-500">{getRowIcon(row.label)}</span>
                  {row.label}
                </td>

                {/* Benchmark */}
                <td className="py-3 px-3 font-semibold bg-indigo-50/50 rounded-l-lg">
                  {row.trend}
                </td>

                {/* User Ad */}
                <td className={`py-3 px-3 font-semibold ${
                  isBetter ? "bg-green-50/50" : "bg-red-50/50"
                }`}>
                  {row.yourAd}
                </td>

                {/* Match Status */}
                <td className="w-1/12">
                  {renderStatusIcon(isBetter)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Detail & Age Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-4 border-t border-gray-100">
        <div>
          <h5 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Hash size={18} /> 詳細クリエイティブ評価 (スコア)
          </h5>
          <ul className="list-none pl-0 text-sm text-gray-700 space-y-2">
            {detailScores.map((s, i) => (
              <li key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="flex items-center gap-2">
                  {s.icon} {s.label}
                </span>
                <span className={`font-bold ${s.value >= 90 ? 'text-green-600' : s.value >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {s.value} 点
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Target size={18} /> 年齢層別パフォーマンススコア
          </h5>
          <ul className="list-none pl-0 text-sm text-gray-700 space-y-2">
            {ageScores.map((s, i) => (
              <li key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>{s.label}</span>
                <span className={`font-bold ${s.value >= 80 ? 'text-green-600' : s.value >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {s.value} 点
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Recent Ads Status */}
      <h5 className="font-bold text-gray-700 mb-3 pt-4 border-t border-gray-100 flex items-center gap-2">
        <Monitor size={18} /> {data.recent_ads_status.title}
      </h5>
      <div className="space-y-4 mb-6">
        {data.recent_ads_status.ads.map((ad, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
              <span className="font-semibold text-base text-indigo-700">{ad.name}</span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                ad.status === '低調' ? 'bg-red-100 text-red-700' : 
                ad.status === '平均' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-green-100 text-green-700'
              }`}>
                {ad.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">サマリー: </span>
              {ad.insight_summary}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              戦略: {ad.strategy} ({ad.format}) / ターゲット: {ad.target} / {ad.assumed_metric}: {ad.assumed_value}
            </p>
          </div>
        ))}
      </div>


      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <h5 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
            <span className="text-blue-500">💡</span>
            {data.improvement_recommendations.title}
          </h5>

          <div className="space-y-3">
            {recommendations.map((c, i) => (
              <div key={i}>
                <p className="font-semibold text-sm text-blue-800 flex items-center gap-1">
                  <span className="text-blue-500">→</span>
                  {c.heading}: <span className="text-gray-700 font-normal">{c.recommendation}</span>
                </p>
                <p className="text-xs text-gray-500 ml-4 border-l border-blue-200 pl-2">
                  * 詳細: {c.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Implementation Roadmap */}
      {data.implementation_roadmap && (
        <div className="mb-6 pt-4 border-t border-gray-100">
          <h5 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Clock size={18} /> {data.implementation_roadmap.title}
          </h5>
          <div className="space-y-4">
            {data.implementation_roadmap.timeline.map((item, i) => (
              <div key={i} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-sm text-indigo-700">{item.timeframe}</span>
                  <PriorityBadge priority={item.priority} />
                  <span className="text-xs text-gray-500"> (ROI: {item.priority} / 工数: {item.priority === '高' ? '低' : item.priority === '中' ? '中' : '高'})</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {item.actions.map((action, j) => (
                    <li key={j}>{action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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