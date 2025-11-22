"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react";
import { AdCard } from "@/types/chat"; 
import AccountSelector from "./AccountSelector";
import ScoreBlock from "./ScoreBlock";
import RecommendationsBlock from "@/components/RecommendationBlock";
import AdSearchBlock from "./AdSearchBlock";
import TrendReportBlock from "./TrendReportBlock";
import ComparisonBlock from "./ComparisonBlock";
import MetaAAAgentBlock from "./MetaAAAgentBlock";
import QuickActions from "./QuickActions";
import { accounts, recommendations, adCards, trendReport, comparisonResult, metaReport } from "@/service/staticData";

export type FlowType = "media" | "variation" | "meta";
type ChatMessage = {
  type: "bot" | "user";
  content: React.ReactNode;
};
type RecProcessedType = "applied" | "rejected" | null;

interface ChatWindowProps {
  onShowPreview: (data: unknown) => void; // Use your DetailDataType if available
  onChatReset: () => void;
  isDetailOpen: boolean;
  onFlowChange?: (flow: FlowType | null) => void;
}

const initialHistory: ChatMessage[] = [
  {
    type: "bot",
    content: (
      <div className="space-y-2">
        <p className="text-lg font-semibold text-gray-800">こんにちは、山本さん！👋</p>
        <p className="text-gray-600">
          私は <span className="font-bold text-blue-600">Marketing AI Superagent</span> です。
          <br />あなたのマーケティング活動を全面的にサポートします。
        </p>
        <p className="text-sm text-gray-500 mt-2">今日はどのようなサポートが必要ですか？</p>
      </div>
    ),
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ChatWindow({
  onShowPreview,
  onChatReset,
  isDetailOpen,
  onFlowChange,
}: ChatWindowProps) {
  const [history, setHistory] = useState<ChatMessage[]>(initialHistory);
  const [flow, setFlow] = useState<FlowType | null>(null);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [score] = useState<number>(59);
  const [recProcessed, setRecProcessed] = useState<RecProcessedType>(null);

  const [adSelected, setAdSelected] = useState<string[]>([]);
  const [showTrend, setShowTrend] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history.length, isTyping, step, flow]);

  useEffect(() => {
    if (onFlowChange) onFlowChange(flow);
  }, [flow, onFlowChange]);

  const addBotMessage = (content: React.ReactNode, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setHistory((prev) => [...prev, { type: "bot", content }]);
    }, delay);
  };

  const addUserMessage = (content: React.ReactNode) => {
    setHistory((prev) => [...prev, { type: "user", content }]);
  };

  const handleHistoryUpdate = useCallback(
    (
      userContent: string,
      botContent: string | React.ReactNode,
      delay = 600,
      callback?: () => void
    ) => {
      addUserMessage(userContent);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setHistory((prev) => [...prev, { type: "bot", content: botContent }]);
        if (callback) {
          callback();
        }
      }, delay);
    },
    []
  );

  const handleQuickAction = (key: string) => {
    if (key === "media" || key === "variation" || key === "meta") {
      setFlow(key as FlowType);
      setStep(0);
      setShowTrend(false);
      setShowComparison(false);
      setSelectedAccount("");
      setAdSelected([]);
      setRecProcessed(null);

      const labels = {
        media: "📊 Media Operation Support AI × Optimization Score",
        variation: "💡 Variation Proposal",
        meta: "⚙️ Meta AA Agent (TrueLift Analysis)",
      };

      addUserMessage(labels[key as "media" | "variation" | "meta"]);

      if (key === "media") {
        addBotMessage("かしこまりました。分析対象の広告アカウントIDを選択してください。");
      } else if (key === "variation") {
        addBotMessage("広告のトレンド分析を開始します。Ad Creative Library APIに接続しています...");
        setTimeout(() => setStep(1), 1000);
      }
    }
  };

  const handleAccountConfirm = () => {
    addUserMessage(`アカウント ${selectedAccount} を選択しました`);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setHistory((h) => [
        ...h,
        { type: "bot", content: <ScoreBlock score={score} accountId={selectedAccount} /> },
      ]);
      setStep(2);
      addBotMessage("📋 現状のスコアに基づき、推奨事項をすべて表示します。");
      setRecProcessed(null);
    }, 200);
  };

  // Final message for media flow (with preview button)
  const addPostRecBotMessage = (action: "applied" | "rejected") => {
    const message = (
      <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-800">
          {action === "applied"
            ? "✅ 推奨事項の適用処理を完了しました。最適化スコアが向上しました！"
            : "❌ 推奨事項の適用を見送りました。現状の設定が維持されます。"}
        </p>
        <p className="text-xs text-gray-500">
          {action === "applied"
            ? "ROI: +15%（予測） / CPA: -8%（予測）"
            : "キャンペーン設定に変更はありません。"}
        </p>
        <button
          onClick={() =>
            onShowPreview({
              flow: "media",
              score,
              accountId: selectedAccount,
              recProcessed: action,
              recommendations,
            })
          }
          className="self-start text-xs text-blue-600 hover:text-blue-800 transition mt-1"
        >
          プレビューを表示
        </button>
      </div>
    );
    addBotMessage(message, 1500);
  };

  const handleApplyAll = () => {
    addUserMessage("✅ すべての推奨事項を適用する");
    setRecProcessed("applied");
    addPostRecBotMessage("applied");
  };

  const handleRejectAll = () => {
    addUserMessage("❌ すべての推奨事項を見送る");
    setRecProcessed("rejected");
    addPostRecBotMessage("rejected");
  };

  const processedAdCards: AdCard[] = useMemo(
    () =>
      adCards.map((card) => ({
        ...card,
        timestamp: new Date(card.date).getTime(),
      })),
    []
  );

  const handleAdConfirm = () => {
    handleHistoryUpdate(
      `選択した広告 (${adSelected.length} 件) のトレンド分析を開始します。`,
      `承知しました。選択された広告クリエイティブに基づき、トレンド分析レポートを作成しました。`,
      1200,
      () => {
        setShowTrend(true);
        setStep(2);
      }
    );
  };

  const handleCompare = () => {
    handleHistoryUpdate(
      `比較分析を開始する`,
      `比較分析を実行しました。結果をご確認ください。`,
      1000,
      () => {
        setShowComparison(true);
        setStep(3);
      }
    );
  };

  const handleSkip = () => {
    handleHistoryUpdate(
      `改善提案へスキップする`,
      `承知しました。トレンド分析レポートの内容から直接、具体的な改善提案を提示します。`,
      1000,
      () => {
        setStep(4);
      }
    );
  };

  const handleComparisonNext = () => {
    handleHistoryUpdate(
      `分析結果に基づき、具体的な提案に進む`,
      `比較分析の結果を考慮し、最適なクリエイティブ改善提案を生成しました。`,
      1000,
      () => {
        setStep(4);
      }
    );
  };

  // Final message for variation flow (with preview button)
  const renderVariationFinal = () => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white border border-green-200 rounded-xl p-6 my-4 shadow-sm max-w-xl"
    >
      <h4 className="font-bold text-green-800 flex items-center gap-2 mb-3">
        <Sparkles size={18} /> 具体的改善提案
      </h4>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
            1
          </span>
          縦型動画フォーマットへの変更 (Reels最適化)
        </li>
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
            2
          </span>
          ライフスタイル要素の追加（商品単体ではなく使用シーン）
        </li>
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
            3
          </span>
          UGC（ユーザー証言）の冒頭3秒への組み込み
        </li>
      </ul>
      <button
        onClick={() =>
          onShowPreview({
            flow: "variation",
            trendReport,
            comparisonResult,
            proposals: [
              "縦型動画フォーマットへの変更 (Reels最適化)",
              "ライフスタイル要素の追加（商品単体ではなく使用シーン）",
              "UGC（ユーザー証言）の冒頭3秒への組み込み",
            ],
          })
        }
        className="mt-4 text-xs text-blue-600 hover:text-blue-800 transition"
      >
        プレビューを表示
      </button>
    </motion.div>
  );

  // Final message for meta flow (with preview button)
  const renderMetaFinal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-6 flex flex-col items-end"
    >
       <MetaAAAgentBlock
        onShowPreview={onShowPreview}
        metaReportData={metaReport}
      />
      {/* <button
        onClick={() =>
          onShowPreview({
            flow: "meta",
            metaReportData: metaReport,
          })
        }
        className="mt-4 text-xs text-blue-600 hover:text-blue-800 transition"
      >
        プレビューを表示
      </button> */}
    </motion.div>
  );

  const renderMessage = (msg: ChatMessage, index: number) => (
    <motion.div
      key={index}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`flex gap-3 mb-6 ${
        msg.type === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0 ${
          msg.type === "bot"
            ? "bg-gradient-to-br from-blue-600 to-indigo-600"
            : "bg-gray-200"
        }`}
      >
        {msg.type === "bot" ? (
          <Bot size={20} className="text-white" />
        ) : (
          <User size={20} className="text-gray-600" />
        )}
      </div>
      <div
        className={`relative max-w-[80%] px-5 py-4 text-sm leading-relaxed shadow-sm ${
          msg.type === "bot"
            ? "bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100"
            : "bg-blue-600 text-white rounded-2xl rounded-tr-none"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="font-bold text-gray-800 text-lg">
            Marketing AI Superagent
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-500">
              Online • Powered by Meta AA
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 scroll-smooth">
        {flow !== "meta" && (
          <AnimatePresence>
            {history.map((msg, i) => renderMessage(msg, i))}
          </AnimatePresence>
        )}

        {isTyping && flow !== "meta" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
              <Bot size={20} className="text-white" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1">
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </motion.div>
        )}

        {!flow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <QuickActions onSelect={handleQuickAction} />
          </motion.div>
        )}

        {flow === "media" && (
          <div className="pl-12 animate-fade-in">
            {step === 0 && (
              <div className="max-w-md">
                <AccountSelector
                  accounts={accounts}
                  value={selectedAccount}
                  onChange={setSelectedAccount}
                  onConfirm={handleAccountConfirm}
                />
              </div>
            )}

            {step === 2 && !recProcessed && (
              <div className="max-w-xl mt-4 space-y-4">
                <RecommendationsBlock
                  recommendations={recommendations}
                  onApplyAll={handleApplyAll}
                  onRejectAll={handleRejectAll}
                  disabled={!!recProcessed}
                />
              </div>
            )}
          </div>
        )}

        {flow === "variation" && (
          <div className="pl-12 animate-fade-in">
            {step === 1 && (
              <div className="max-w-2xl">
                <AdSearchBlock
                  ads={processedAdCards}
                  selected={adSelected}
                  onSelect={(id) =>
                    setAdSelected((sel) =>
                      sel.includes(id)
                        ? sel.filter((s) => s !== id)
                        : [...sel, id]
                    )
                  }
                  onConfirm={handleAdConfirm}
                />
              </div>
            )}

            {step >= 2 && showTrend && (
              <div className="max-w-3xl mt-4">
                <TrendReportBlock
                  report={trendReport}
                  onCompare={handleCompare}
                  onSkip={handleSkip}
                />
              </div>
            )}

            {step >= 3 && showComparison && (
              <div className="max-w-3xl mt-4">
                <ComparisonBlock
                  result={comparisonResult}
                  onNext={handleComparisonNext}
                />
              </div>
            )}

            {step >= 4 && renderVariationFinal()}
          </div>
        )}

        {flow === "meta" && renderMetaFinal()}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}