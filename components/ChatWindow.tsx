"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react"; // Added missing icons for completeness
import { AdCard } from "@/types/chat";
// Import your existing blocks
import AccountSelector from "./AccountSelector";
import ScoreBlock from "./ScoreBlock";
import RecommendationBlock from "./RecommendationBlock";
import AdSearchBlock from "./AdSearchBlock";
import TrendReportBlock from "./TrendReportBlock";
import ComparisonBlock from "./ComparisonBlock";
import MetaAAAgentBlock from "./MetaAAAgentBlock";
import QuickActions from "./QuickActions";

// Mock data imports
import { accounts, recommendations, adCards, trendReport, comparisonResult } from "@/service/staticData";

// --- Types ---
type FlowType = "media" | "variation" | "meta";
type ChatMessage = {
  type: "bot" | "user";
  content: React.ReactNode;
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Placeholder for ComparisonBlock (assuming it's a separate file, but defined here for context)

// --- MAIN COMPONENT ---
export default function ChatWindow() {
  const [history, setHistory] = useState<ChatMessage[]>([
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
  ]);

  const [flow, setFlow] = useState<FlowType | null>(null);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Media Flow State ---
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [score] = useState<number>(59);
  const [recIdx, setRecIdx] = useState(0);
  const [showRecDetail, setShowRecDetail] = useState(false);

  // --- Variation Flow State ---
  const [adSelected, setAdSelected] = useState<string[]>([]);
  const [showTrend, setShowTrend] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Scroll to bottom on state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history.length, isTyping, step, flow]);

  // Helper to add messages with a slight natural delay
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
  
  // New unified history update handler
  const handleHistoryUpdate = useCallback((userContent: string, botContent: string | React.ReactNode, delay = 600, callback?: () => void) => {
    // 1. Add User message immediately
    addUserMessage(userContent);
    
    // 2. Add Bot message after typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setHistory((prev) => [...prev, { type: "bot", content: botContent }]);
      if (callback) {
        // Run the step change/state update after the message is fully logged
        callback(); 
      }
    }, delay);
  }, []);

  // --- Flow & Step Handlers ---

  const handleQuickAction = (key: string) => {
    if (key === "media" || key === "variation" || key === "meta") {
      setFlow(key as FlowType);
      setStep(0);
      
      // Reset Sub-states
      setShowTrend(false);
      setShowComparison(false);
      setSelectedAccount("");
      setRecIdx(0);
      setAdSelected([]);
      setShowRecDetail(false);

      // Handle Meta Flow (Delegated to component)
      if (key === "meta") return; 

      // Handle Standard Flows
      const labels = {
        media: "📊 Media Operation Support AI × Optimization Score",
        variation: "💡 Variation Proposal",
      };

      addUserMessage(labels[key as "media" | "variation"]);

      if (key === "media") {
        addBotMessage("かしこまりました。分析対象の広告アカウントIDを選択してください。");
      } else if (key === "variation") {
        addBotMessage("広告のトレンド分析を開始します。Ad Creative Library APIに接続しています...");
        setTimeout(() => setStep(1), 1000); // Only sets step, no UI required yet
      }
    }
  };

  // Media Flow Logic
  const handleAccountConfirm = () => {
    addUserMessage(`アカウント ${selectedAccount} を選択しました`);
    setIsTyping(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsTyping(false);
      setHistory((h) => [...h, { type: "bot", content: <ScoreBlock score={score} accountId={selectedAccount} /> }]);
      
      setTimeout(() => {
        addBotMessage("📋 現状のスコアに基づき、推奨事項を一つずつ確認していきましょう。");
        setStep(2);
      }, 800);
    }, 1000);
  };

  const handleRecApply = () => {
    addUserMessage("✅ 適用する");
    handleRecNext("apply");
  };

  const handleRecReject = () => {
    addUserMessage("❌ 今回は見送る");
    handleRecNext("reject");
  };

  const handleRecNext = (action: "apply" | "reject") => {
    console.log(`Recommendation ${recIdx + 1} was ${action}ed.`);
    // Logic for tracking applied/rejected items would go here
    
    if (recIdx < recommendations.length - 1) {
      setRecIdx((prev) => prev + 1);
      setShowRecDetail(false);
    } else {
      setStep(3);
      addBotMessage(
        <div className="space-y-2">
          <p className="font-bold text-green-600">✅ すべての推奨事項を処理しました。</p>
          <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800">
            <p>予想される改善効果:</p>
            <ul className="list-disc pl-4 mt-1">
              <li>ROI: +15% 向上</li>
              <li>リーチ: +12% 拡大</li>
              <li>CPA: -8% 削減</li>
            </ul>
          </div>
          <p className="text-xs text-gray-500">変更は5-10分以内に広告マネージャに反映されます。</p>
        </div>
      );
    }
  };
  const processedAdCards: AdCard[] = adCards.map(card => ({
      ...card,
      timestamp: new Date(card.date).getTime(),
  }));

  
  // --- Variation Flow Handlers (FIXED) ---

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

  // --- Render Helpers ---

  const renderMessage = (msg: ChatMessage, index: number) => (
    <motion.div
      key={index}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`flex gap-3 mb-6 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0 ${
          msg.type === "bot" ? "bg-gradient-to-br from-blue-600 to-indigo-600" : "bg-gray-200"
        }`}
      >
        {msg.type === "bot" ? <Bot size={20} className="text-white" /> : <User size={20} className="text-gray-600" />}
      </div>

      {/* Bubble */}
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
    <div className="flex flex-col w-full max-w-5xl mx-auto mt-4 h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="font-bold text-gray-800 text-lg">Marketing AI Superagent</h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-500">Online • Powered by Meta AA</span>
          </div>
        </div>
      </header>

      {/* Chat Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 scroll-smooth">
        
        {/* 1. Standard History (Media & Variation) */}
        {flow !== "meta" && (
          <AnimatePresence>
            {history.map((msg, i) => renderMessage(msg, i))}
          </AnimatePresence>
        )}

        {/* 2. Typing Indicator */}
        {isTyping && flow !== "meta" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
                <Bot size={20} className="text-white" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </motion.div>
        )}

        {/* 3. Quick Actions (Initial State) */}
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

        {/* 4. Media Flow Interactive Components */}
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
            
            {step === 2 && recommendations[recIdx] && (
              <div className="max-w-xl mt-4">
                <RecommendationBlock
                  rec={recommendations[recIdx]}
                  expanded={showRecDetail}
                  onExpand={() => setShowRecDetail(true)}
                  onCollapse={() => setShowRecDetail(false)}
                  onApply={handleRecApply}
                  onReject={handleRecReject}
                />
                <div className="text-center mt-2 text-xs text-gray-400">
                   推奨事項 {recIdx + 1} / {recommendations.length}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. Variation Flow Interactive Components (FIXED LOGIC) */}
        {flow === "variation" && (
          <div className="pl-12 animate-fade-in">
             {/* Step 1: Ad Search */}
             {step === 1 && (
              <div className="max-w-2xl">
                <AdSearchBlock
                  ads={processedAdCards}
                  selected={adSelected}
                  onSelect={(id) =>
                    setAdSelected((sel) =>
                      sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]
                    )
                  }
                  onConfirm={handleAdConfirm} // FIXED: Use handler that updates history
                />
              </div>
            )}
            
            {/* Step 2: Trend Report */}
            {step === 2 && showTrend && (
              <div className="max-w-3xl mt-4">
                <TrendReportBlock
                  report={trendReport}
                  onCompare={handleCompare} // FIXED: Use handler that updates history
                  onSkip={handleSkip} // FIXED: Use handler that updates history
                />
              </div>
            )}

            {/* Step 3: Comparison Result */}
            {step === 3 && showComparison && (
              <div className="max-w-3xl mt-4">
                <ComparisonBlock 
                    result={comparisonResult} 
                    onNext={handleComparisonNext} // FIXED: Use handler that updates history
                />
              </div>
            )}

            {/* Step 4: Final Recommendation */}
            {step === 4 && (
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
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">1</span>
                    縦型動画フォーマットへの変更 (Reels最適化)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</span>
                    ライフスタイル要素の追加（商品単体ではなく使用シーン）
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">3</span>
                    UGC（ユーザー証言）の冒頭3秒への組み込み
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        )}

        {/* 6. Meta Agent Flow (Self-Contained) */}
        {flow === "meta" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <MetaAAAgentBlock />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}