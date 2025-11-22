"use client";

import ChatWindow from "@/components/ChatWindow";
import { useState } from "react";
import { MediaDetailPanel, type DetailDataType } from "@/components/MediaDetailPanel";
import { VariationDetailPanel } from "@/components/VariationDetailPanel";
import type { FlowType } from "@/components/ChatWindow";
export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<DetailDataType>({ flow: null });
  const [chatKey, setChatKey] = useState(() => Date.now());

  // Unified preview handler for all flows
  const handleShowPreview = (data: DetailDataType) => {
    setDetailData(data);
    setShowDetail(true);
  };

  const handleResetChat = () => {
    setChatKey(Date.now());
    setShowDetail(false);
    setDetailData({ flow: null });
  };

  // --- LOG FLOW ---

  const handleFlowChange = (flow: FlowType | null) => {
    console.log("Current flow:", flow);
  };
  // ---------------

  // Validation for each flow
  const isValidDetailData =
    detailData.flow &&
    ((detailData.flow === "media" && detailData.recProcessed) ||
      (detailData.flow === "meta" && detailData.metaReportData) ||
      (detailData.flow === "variation" && detailData.trendReport && detailData.comparisonResult));

  // Panel selector
  const renderDetailPanel = () => {
    if (detailData.flow === "media" && detailData.recProcessed) {
      return (
        <MediaDetailPanel
          data={detailData}
          onClose={() => setShowDetail(false)}
        />
      );
    }
    if (detailData.flow === "variation" && detailData.trendReport && detailData.comparisonResult) {
      return (
        <VariationDetailPanel
          trendReport={detailData.trendReport}
          comparisonResult={detailData.comparisonResult}
          onClose={() => setShowDetail(false)}
        />
      );
    }
    if (detailData.flow === "meta" && detailData.metaReportData) {
      return (
        <MediaDetailPanel
          data={detailData}
          onClose={() => setShowDetail(false)}
        />
      );
    }
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 italic">No detailed data available to display.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white flex justify-center w-full p-8">
      <div className="w-full max-w-5/7 h-[90vh] flex gap-8">
        <div
          className={`h-full ${
            showDetail ? "w-1/3" : "w-full max-w-5xl mx-auto"
          } transition-all duration-500 shrink-0`}
        >
          <ChatWindow
            key={chatKey}
            onShowPreview={handleShowPreview}
            onChatReset={handleResetChat}
            isDetailOpen={showDetail}
            onFlowChange={handleFlowChange}
          />
        </div>
        {showDetail && (
          <div className="flex-1 transition-opacity duration-500">
            {renderDetailPanel()}
          </div>
        )}
      </div>
    </div>
  );
}