"use client";

import ChatWindow from "@/components/ChatWindow";
import { useState } from "react";
import { recommendations, trendReport, comparisonResult } from "@/service/staticData";
import { MetaReportData } from "@/types/chat";
import { MediaDetailPanel, type DetailDataType, type RecProcessedType } from "@/components/MediaDetailPanel";

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<DetailDataType>({ flow: null });
  const [chatKey, setChatKey] = useState(() => Date.now());

  const handleShowDetail = (score: number, accountId: string, recProcessed: RecProcessedType) => {
    setDetailData({
      flow: "media",
      score,
      accountId,
      recProcessed,
      recommendations: recommendations,
      trendReport: trendReport,
      comparisonResult: comparisonResult,
    });
    setShowDetail(true);
  };

  const handleShowMetaDetail = (data: MetaReportData) => {
    setDetailData({
      flow: "meta",
      metaReportData: data,
    });
    setShowDetail(true);
  }

  const handleResetChat = () => {
    setChatKey(Date.now());
    setShowDetail(false);
    setDetailData({ flow: null });
  }

  // --- LOG FLOW ---
  const handleFlowChange = (flow: string) => {
    console.log("Current flow:", flow);
  };
  // ---------------

  const isValidDetailData = detailData.flow && (
    (detailData.flow === "media" && detailData.recProcessed) ||
    (detailData.flow === "meta" && detailData.metaReportData)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white flex justify-center w-full p-8">
      <div className="w-full max-w-5/7 h-[90vh] flex gap-8">
        <div className={`h-full ${showDetail ? 'w-1/3' : 'w-full max-w-5xl mx-auto'} transition-all duration-500 shrink-0`}>
          <ChatWindow
            key={chatKey}
            onShowDetail={handleShowDetail}
            onShowMetaDetail={handleShowMetaDetail}
            onChatReset={handleResetChat}
            isDetailOpen={showDetail}
            onFlowChange={handleFlowChange} // <-- Pass here
          />
        </div>
        {showDetail && isValidDetailData && (
          <div className="flex-1 transition-opacity duration-500">
            <MediaDetailPanel
              data={detailData}
              onClose={() => setShowDetail(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}