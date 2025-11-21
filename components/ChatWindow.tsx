"use client";
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageBlock from "./ChatMessage";
import QuickActions from "./QuickActions";
import AccountSelector from "./AccountSelector";
import ScoreBlock from "./ScoreBlock";
import RecommendationBlock from "./RecommendationBlock";
import AdSearchBlock from "./AdSearchBlock";
import TrendReportBlock from "./TrendReportBlock";
import ComparisonBlock from "./ComparisonBlock";
import MetaAAAgentBlock, { metaAAAgentSteps } from "./MetaAAAgentBlock";
import { ChatMessage } from "@/types/chat";
import { accounts, recommendations, adCards, trendReport, comparisonResult } from "@/service/staticData";

type FlowType = "media" | "variation" | "meta";

export default function ChatWindow() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [flow, setFlow] = useState<FlowType | null>(null);
  const [step, setStep] = useState(0);

  // Media flow state
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [score] = useState<number>(59);
  const [recIdx, setRecIdx] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [applied, setApplied] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  // Variation flow state
  const [adSelected, setAdSelected] = useState<string[]>([]);
  const [showTrend, setShowTrend] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Meta AA flow state
  const [metaStep, setMetaStep] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting (only once)
  useEffect(() => {
    setHistory([
      {
        type: "bot",
        content: (
          <>
            <strong>こんにちは、山本さん！</strong>
            <br />
            私はMarketing AI Superagentです。あなたのマーケティング活動を全面的にサポートします。
            <br />
            <span style={{ marginTop: 15 }}>今日はどのようなサポートが必要ですか？</span>
          </>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handler for main quick actions
  const handleQuickAction = (key: FlowType) => {
    setFlow(key);
    setStep(0);
    setMetaStep(0);
    setShowTrend(false);
    setShowComparison(false);
    setSelectedAccount("");
    setRecIdx(0);
    setApplied([]);
    setRejected([]);
    setAdSelected([]);
    setShowDetail(false);
    setAdSelected([]);
    setShowDetail(false);

    setHistory((h) => [
      ...h,
      {
        type: "user",
        content:
          key === "media"
            ? "📊 Media Operation Support AI × Optimization Score"
            : key === "variation"
            ? "💡 Variation Proposal"
            : "📈 Meta AA Agent",
      },
    ]);

    // Add first bot message for each flow
    if (key === "media") {
      setTimeout(() => {
        setHistory((h) => [
          ...h,
          { type: "bot", content: "かしこまりました。広告アカウントIDを選択してください。" },
        ]);
      }, 300);
    } else if (key === "variation") {
      setTimeout(() => {
        setHistory((h) => [
          ...h,
          { type: "bot", content: "広告のトレンド分析をしたいです" },
        ]);
        setTimeout(() => {
          setHistory((h) => [
            ...h,
            { type: "bot", content: "かしこまりました。Ad Creative Library APIを使用してトレンド分析を行います。" },
          ]);
          setStep(1);
        }, 600);
      }, 300);
    } else if (key === "meta") {
      setTimeout(() => {
        setHistory((h) => [
          ...h,
          { type: "bot" as ChatMessage["type"], content: metaAAAgentSteps[0].bot },
          ...(metaAAAgentSteps[0].user
            ? [{ type: "user" as ChatMessage["type"], content: metaAAAgentSteps[0].user }]
            : []),
        ]);
      }, 300);
    }
  };

  // Media flow: handle account selection
  const handleAccountConfirm = () => {
    setHistory((h) => [
      ...h,
      { type: "user", content: `アカウント ${selectedAccount} を選択しました` },
      { type: "bot", content: "データを取得中..." },
    ]);
    setTimeout(() => {
      setHistory((h) => [
        ...h,
        { type: "bot", content: <ScoreBlock score={score} accountId={selectedAccount} /> },
      ]);
      setTimeout(() => {
        setHistory((h) => [
          ...h,
          { type: "bot", content: "📋 推奨事項を一つずつ確認していきます：" },
        ]);
        setStep(2);
      }, 800);
    }, 800);
  };

  // Meta AA Agent: handle next step
  const handleMetaNext = () => {
    const nextStep = metaStep + 1;
    if (nextStep < metaAAAgentSteps.length) {
      setHistory((h) => [
        ...h,
        { type: "bot" as ChatMessage["type"], content: metaAAAgentSteps[nextStep].bot },
        ...(metaAAAgentSteps[nextStep].user
          ? [{ type: "user" as ChatMessage["type"], content: metaAAAgentSteps[nextStep].user }]
          : []),
      ]);
      setMetaStep(nextStep);
    }
  };

  return (
    <div className="w-full max-w-4xl  mx-auto mt-8 bg-zinc-50 rounded-b-2xl pb-8">
      <ChatHeader />
      <div className="px-4 py-6">
        {history.map((msg, i) => (
          <ChatMessageBlock key={i} message={msg} />
        ))}
        {!flow && <QuickActions onSelect={handleQuickAction} />}
        {/* Media Flow */}
        {flow === "media" && step === 0 && (
          <AccountSelector
            accounts={accounts}
            value={selectedAccount}
            onChange={setSelectedAccount}
            onConfirm={handleAccountConfirm}
          />
        )}
        {flow === "media" && step === 2 && (
          <RecommendationBlock
            rec={recommendations[recIdx]}
            expanded={showDetail}
            onExpand={() => setShowDetail(true)}
            onCollapse={() => setShowDetail(false)}
            onApply={() => {
              setApplied((a) => [...a, recommendations[recIdx].id]);
              setHistory((h) => [...h, { type: "user", content: "適用" }]);
              if (recIdx < recommendations.length - 1) {
                setRecIdx(recIdx + 1);
                setShowDetail(false);
              } else {
                setStep(3);
                setHistory((h) => [
                  ...h,
                  {
                    type: "bot",
                    content:
                      "✅ 推奨事項を適用しました。以下の効果が期待されます：\nROI: +15%向上\nリーチ: +12%拡大\nCPA: -8%削減\n変更は5-10分で反映されます。",
                  },
                ]);
              }
            }}
            onReject={() => {
              setRejected((r) => [...r, recommendations[recIdx].id]);
              setHistory((h) => [...h, { type: "user", content: "却下" }]);
              if (recIdx < recommendations.length - 1) {
                setRecIdx(recIdx + 1);
                setShowDetail(false);
              } else {
                setStep(3);
                setHistory((h) => [
                  ...h,
                  {
                    type: "bot",
                    content:
                      "✅ 推奨事項を適用しました。以下の効果が期待されます：\nROI: +15%向上\nリーチ: +12%拡大\nCPA: -8%削減\n変更は5-10分で反映されます。",
                  },
                ]);
              }
            }}
          />
        )}
        {/* Variation Flow */}
        {flow === "variation" && step === 1 && (
          <AdSearchBlock
            ads={adCards}
            selected={adSelected}
            onSelect={(id) =>
              setAdSelected((sel) =>
                sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]
              )
            }
            onConfirm={() => {
              setShowTrend(true);
              setStep(2);
            }}
          />
        )}
        {flow === "variation" && showTrend && (
          <TrendReportBlock
            report={trendReport}
            onCompare={() => {
              setShowComparison(true);
              setStep(3);
            }}
            onSkip={() => setStep(4)}
          />
        )}
        {flow === "variation" && showComparison && (
          <ComparisonBlock result={comparisonResult} onNext={() => setStep(4)} />
        )}
        {flow === "variation" && step === 4 && (
          <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 my-2">
            <h4 className="font-bold mb-2">🎯 具体的改善提案</h4>
            <ul>
              <li>1. 縦型動画フォーマットへの変更</li>
              <li>2. ライフスタイル要素の追加</li>
              <li>3. ユーザー証言の組み込み</li>
            </ul>
          </div>
        )}
        {/* Meta AA Agent Flow */}
        {flow === "meta" && (
          <MetaAAAgentBlock
            step={metaStep}
            onNext={handleMetaNext}
            isLast={metaStep === metaAAAgentSteps.length - 1}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}