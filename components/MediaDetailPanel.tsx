import { ComparisonResult, MetaReportData, Recommendation, TrendReport } from "@/types/chat";
import { Sparkles, X } from "lucide-react";
import ScoreBlock from "./ScoreBlock";

// Assuming types for data lifted from ChatWindow
export type RecProcessedType = "applied" | "rejected" | null;

export type DetailDataType = {
  flow: "media" | "meta" | null; // Track which flow populated the panel
  score?: number;
  accountId?: string;
  recProcessed?: RecProcessedType;
  recommendations?: Recommendation[];
  trendReport?: TrendReport;
  comparisonResult?: ComparisonResult;
  metaReportData?: MetaReportData; // New field for Meta AA data
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
                      
                      <ScoreBlock accountId={accountId} score={score} />
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
      return (
          <div className="w-full h-full bg-white p-6 flex flex-col shadow-2xl rounded-3xl overflow-hidden">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Meta AA TrueLift Analysis Detail</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-4">
                  <h3 className="text-3xl font-extrabold text-purple-700 mb-6 flex items-center gap-3">
                      <Sparkles size={28} /> Shiseido Campaign TrueLift Result
                  </h3>
                  
                  <div className="rounded-xl p-6 shadow-xl bg-purple-50 border border-purple-200 mb-8">
                      <div className="font-bold text-purple-700 text-lg uppercase tracking-wider mb-3">Key Finding: Offline Sales Contribution</div>
                      <div className="text-6xl font-black text-green-600">
                          +{metaReportData.liftPercentage}%
                      </div>
                      <p className="text-xl text-gray-700 mt-2">Incremental Lift</p>
                      <p className="text-sm text-gray-500 mt-4">{metaReportData.summary}</p>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial Impact Metrics</h4>
                  <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                          <p className="text-sm text-gray-500 font-medium">Total Incremental Sales</p>
                          <p className="text-3xl font-bold text-blue-600 mt-1">{metaReportData.incrementalSales}</p>
                          <p className="text-xs text-gray-400 mt-1">Directly attributed to Meta Advertising</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                          <p className="text-sm text-gray-500 font-medium">Optimized CPA (Cost Per Acquisition)</p>
                          <p className="text-3xl font-bold text-red-500 mt-1">{metaReportData.cpa}</p>
                          <p className="text-xs text-gray-400 mt-1">Calculated post-lift analysis</p>
                      </div>
                  </div>

                  <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-gray-700">
                      <p className="font-bold">Next Steps:</p>
                      <ul className="list-disc pl-5 mt-1">
                          <li>Export this PDF for client presentation.</li>
                          <li>Utilize the Incremental Lift data to adjust future budget allocations for optimal ROI.</li>
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