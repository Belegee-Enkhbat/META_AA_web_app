import { ComparisonResult, MetaReportData, Recommendation, TrendReport } from "@/types/chat";
import { DollarSign, Info, ListChecks, Sparkles, Target, TrendingUp, X } from "lucide-react";
import ScoreBlock from "./ScoreBlock";

// Assuming types for data lifted from ChatWindow
export type RecProcessedType = "applied" | "rejected" | null;

export type DetailDataType = {
  flow: "meta" | "variation" | "media" | null; // Track which flow populated the panel
  score?: number;
  accountId?: string;
  recProcessed?: RecProcessedType;
  recommendations?: Recommendation[];
  trendReport?: TrendReport;
  comparisonResult?: ComparisonResult;
  metaReportData?: MetaReportData; // New field for Meta AA data
  proposals?: string[];
};


// --- Detail Panel Component (Simulating the right side document view) ---
export const MediaDetailPanel = ({
  data,
  onClose,
}: {
  data: DetailDataType;
  onClose: () => void;
}) => {
  const { flow, score, accountId, recProcessed, recommendations, metaReportData } = data;
  
  // --- MEDIA FLOW RENDERING ---
  if (flow === "media" && score !== undefined && accountId && recProcessed && recommendations) {
      const newScore = score + (recProcessed === "applied" ? 15 : 0);
      const totalRecommendations = recommendations.length;
      const appliedCount = recProcessed === "applied" ? totalRecommendations : 0;
      const actionText = recProcessed === "applied" ? "Applied" : "Rejected";
      const colorClass = recProcessed === "applied" ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200';
      const recStatusClass = recProcessed === "applied" ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white';

      return (
          <div className="w-full h-full bg-white p-6 flex flex-col shadow-2xl rounded-3xl overflow-hidden">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Media Optimization Report</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-4">
                  <h3 className="text-2xl font-extrabold text-blue-700 mb-6">
                      Optimization Score Analysis: Account {accountId}
                  </h3>
                  
                  <div className={`rounded-xl p-4 shadow-md ${colorClass} mb-6`}>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Performance Impact Summary (Action: {actionText})</h4>
                      
                      <ScoreBlock accountId={accountId} score={newScore} />
                      <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
                          <li>Total Recommendations Found: **{totalRecommendations}**</li>
                          <li>Recommendations {actionText}: **{appliedCount}**</li>
                          {recProcessed === "applied" ? (
                              <>
                                  <li>ROI: **+15% Projected**</li>
                                  <li>CPA: **-8% Projected**</li>
                              </>
                          ) : (
                              <li>Status: No changes applied to campaign settings.</li>
                          )}
                      </ul>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-3">📋 Detailed Recommendations List ({totalRecommendations} items)</h4>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${recProcessed === "applied" ? 'bg-white border-blue-100' : 'bg-gray-50 border-gray-200'}`}>
                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                          {index + 1}. {rec.title} 
                          <span className={`text-xs px-2 py-0.5 rounded-full ${recStatusClass}`}>
                              {actionText.toUpperCase()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      </div>
                    ))}
                  </div>
              </div>
          </div>
      );
  }

  // --- META AA FLOW RENDERING ---
  if (flow === "meta" && metaReportData) {
      const report = metaReportData; // 提供されたmetaReportDataを使用

    return (
      <div className="w-full h-full bg-white p-6 flex flex-col shadow-2xl rounded-3xl overflow-hidden font-inter">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Meta AA TrueLift 分析詳細</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-gray-50"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-10">
          <header className="pb-4 border-b border-purple-100">
            <h3 className="text-3xl font-extrabold text-purple-700 mb-2 flex items-center gap-3">
              <Sparkles size={28} className="text-purple-500" /> {report.report_name}
            </h3>
            <p className="text-sm text-gray-500">キャンペーンテーマ: {report.campaign_theme}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-600">
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"><Info size={14} className="text-blue-500"/> 分析期間: {report.metadata.analysis_period}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"><Info size={14} className="text-blue-500"/> データソース: {report.metadata.data_source}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"><Info size={14} className="text-blue-500"/> 手法: {report.metadata.analysis_method}</span>
            </div>
          </header>

          {/* 1. Overall Summary */}
          <section>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 flex items-center gap-2"><TrendingUp size={20} className="text-green-600"/> {report.overall_summary.title}</h4>
            
            {/* Key Finding Block */}
            <div className="rounded-xl p-6 shadow-xl bg-green-50 border border-green-200 mb-6">
                <div className="font-bold text-green-700 text-lg uppercase tracking-wider mb-3">主要な分析結果: オフライン売上への貢献</div>
                <div className="text-6xl font-black text-green-600">
                    {report.overall_summary.metrics.find(m => m.metric === 'オフライン売上リフト')?.value || '+0.0%'}
                </div>
                <p className="text-xl text-gray-700 mt-2">インクリメンタル・リフト</p>
                <p className="text-sm text-gray-500 mt-4">{report.overall_summary.conclusion}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {report.overall_summary.metrics.map((m, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                        <p className="text-xs text-gray-500 font-medium truncate">{m.metric}</p>
                        <p className="text-xl font-bold text-blue-600 mt-1">{m.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-bold text-blue-700 flex items-center gap-2 mb-1"><Target size={18}/> 最も貢献したセグメント:</p>
                <p className="text-lg font-semibold text-gray-800">{report.overall_summary.best_segment.name}</p>
                <p className="text-3xl font-black text-pink-600 mt-1">
                    リフト値: {report.overall_summary.best_segment.lift_value}
                </p>
                <ul className="list-disc pl-5 mt-3 text-sm text-gray-600 grid grid-cols-3">
                    {report.overall_summary.best_segment.detail_metrics.map((m, i) => (
                        <li key={i}>{m.metric}: <span className="font-medium text-gray-800">{m.value}</span></li>
                    ))}
                </ul>
            </div>
          </section>

          {/* 2. Detailed Segment Analysis */}
          <section>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 flex items-center gap-2"><ListChecks size={20} className="text-indigo-600"/> {report.detailed_segment_analysis.title}</h4>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">セグメント</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">接触群率</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">対照群率</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">リフト効果</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">有意性</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.detailed_segment_analysis.table.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.segment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.exposed_rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.control_rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700">{row.lift_effect}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{row.significance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm italic text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">{report.detailed_segment_analysis.key_insight}</p>
          </section>

          {/* 3. Attribution and Behavior */}
          <section>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 flex items-center gap-2"><DollarSign size={20} className="text-yellow-600"/> {report.attribution_and_behavior.title}</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Behavior Metrics */}
                <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md border border-gray-100">
                    <p className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">購買行動リフト</p>
                    <ul className="space-y-2">
                        {report.attribution_and_behavior.behavior_metrics.map((m, i) => (
                            <li key={i} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{m.metric}</span>
                                <span className="font-bold text-purple-600">{m.lift}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Channel Contribution */}
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md border border-gray-100">
                    <p className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">チャネル貢献度</p>
                    <div className="space-y-3">
                        {report.attribution_and_behavior.channel_contribution.map((c, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-1/4 text-sm font-medium text-gray-800">{c.name}</div>
                                <div className="w-1/12 text-center text-lg font-extrabold text-red-500">{c.contribution}</div>
                                <div className="w-8/12 bg-gray-100 rounded-full h-2.5">
                                    <div 
                                        className="bg-red-500 h-2.5 rounded-full" 
                                        style={{ width: c.contribution }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-500 w-full ml-2">{c.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Omnichannel Insights */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 text-sm text-gray-700">
                <p className="font-bold text-orange-700 mb-2">オムニチャネル・インサイト:</p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{report.attribution_and_behavior.omnichannel_insights.offline_purchase_rate}</p>
                        <p className="text-xs text-gray-600">オフライン購買率</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{report.attribution_and_behavior.omnichannel_insights.time_to_purchase}</p>
                        <p className="text-xs text-gray-600">平均購買までの日数</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{report.attribution_and_behavior.omnichannel_insights.search_behavior}</p>
                        <p className="text-xs text-gray-600">ブランド名検索後の購買率</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. Statistical Validation */}
          <section>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 flex items-center gap-2"><ListChecks size={20} className="text-gray-600"/> {report.statistical_validation.title}</h4>
            <div className="grid grid-cols-3 gap-4">
                {report.statistical_validation.validation_metrics.map((v, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500 font-medium">{v.label}</p>
                        <p className="text-3xl font-bold text-gray-700 mt-1">{v.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{v.desc}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* 5. Action Plan */}
          <section>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 flex items-center gap-2"><Sparkles size={20} className="text-red-500"/> {report.action_plan.title}</h4>
            <ol className="list-decimal pl-5 space-y-3">
                {report.action_plan.recommendations.map((r, i) => (
                    <li key={i} className="text-gray-700 text-base">
                        <span className={`font-extrabold ${r.priority === 'High' ? 'text-red-600' : 'text-orange-500'}`}>
                            [{r.priority === 'High' ? '最優先' : '中優先'}]
                        </span>{' '}
                        {r.action}
                    </li>
                ))}
            </ol>
          </section>

          {/* Footer Next Steps */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-gray-700 sticky bottom-0 z-10">
              <p className="font-bold">次のステップ:</p>
              <ul className="list-disc pl-5 mt-1">
                  <li>このPDFをクライアントへのプレゼンテーション用にエクスポートします。</li>
                  <li>インクリメンタル・リフトのデータを活用し、将来の予算配分を最適化してROIを最大化します。</li>
              </ul>
          </div>

        </div>
      </div>
    );
  }

  // Default fallback (should ideally not happen if data validation is good)
  return (
      <div className="p-6">
          <p className="text-gray-500">Select a flow result to view detailed report.</p>
          <button onClick={onClose} className="mt-4 text-blue-500">Close Panel</button>
      </div>
  );
};