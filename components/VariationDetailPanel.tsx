// components/VariationDetailPanel.tsx
import { X, Sparkles } from "lucide-react";
import { TrendReport, ComparisonResult, AdCard } from "@/types/chat";
import TrendReportBlock from "./TrendReportBlock";
import ComparisonBlock from "./ComparisonBlock";
import { adCards } from "@/service/staticData"; // only import what you use
import { useMemo } from "react";

type VariationDetailPanelProps = {
  trendReport?: TrendReport;
  comparisonResult?: ComparisonResult;
  onClose: () => void;
};

export function VariationDetailPanel({
  trendReport,
  comparisonResult,
  onClose,
}: VariationDetailPanelProps) {
  // Move useMemo inside the component
  const processedAdCards: AdCard[] = useMemo(
    () =>
      adCards.map((card) => ({
        ...card,
        timestamp: new Date(card.date).getTime(),
      })),
    []
  );

  return (
    <div className="w-full scrollable h-full bg-white p-6 flex flex-col justify-center items-center shadow-2xl rounded-3xl overflow-hidden">
      <div className="flex justify-between w-5/6 items-center pb-4 border-b border-gray-100 mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles size={22} className="text-green-600" />
          Variation Analysis Detail
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">

        <div className="bg-white border border-green-200 rounded-xl p-6 my-4 shadow-sm">
          <h4 className="font-bold text-green-800 flex items-center gap-2 mb-3">
            <Sparkles size={18} /> Specific Improvement Proposals
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">1</span>
              Change to vertical video format (Reels optimisation)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</span>
              Addition of lifestyle elements (usage scenes, not individual products)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">3</span>
              Incorporating UGC (User Testimonials) into the First 3 Seconds
            </li>
          </ul>
        </div>
      </div>

      {trendReport && (
        <TrendReportBlock report={trendReport} onCompare={() => {}} onSkip={() => {}} hideButton={true} />
      )}
      {comparisonResult && (
        <ComparisonBlock data={comparisonResult} onNext={() => {}} hideButton={true} />
      )}
    </div>
  );
}
