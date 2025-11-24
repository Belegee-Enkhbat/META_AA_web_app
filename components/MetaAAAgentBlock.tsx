"use client";
import React, { useState, useEffect, useRef } from "react";
import { metaReport } from "@/service/staticData";
import { MetaReportData } from "@/types/chat";

export interface DetailDataType {
  flow: "meta" | "variation" | "media" | null;
  metaReportData: MetaReportData;
}


// --- Icons ---
const BotIcon = () => (
  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1 2 2v2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v2a2 2 0 0 1-2 2v-2a2 2 0 0 1-2-2v-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2V4a2 2 0 0 1 2-2z" />
      <path d="M9 12h6" />
    </svg>
  </div>
);

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm shrink-0">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
);

export interface MetaAAAgentBlockProps {
  metaReportData: MetaReportData;
  onShowPreview: (data: DetailDataType) => void;
}

type ChatMsg = {
  type: "bot" | "user";
  content: React.ReactNode;
  choiceStyle?: string;
};

type StepType = "user" | "bot" | "botBlock" | "choice" | "auto" | "finalButtons";

type Step = {
  type: StepType;
  content?: React.ReactNode | ((props: MetaAAAgentBlockProps) => React.ReactNode);
  choices?: { label: string; value: string; style?: string }[];
  autoNext?: boolean;
  delay?: number;
};

// --- DATA: Conversation Steps (All content translated to Japanese) ---
export const steps: Step[] = [
   {
    type: "bot",
    content: (
      <span>
         META AA エージェントへようこそ！Meta Advanced Analyticsを活用した広告効果の詳細分析を支援します。ご質問やご要望をお聞かせください。
      </span>
    ),
    autoNext: true,
    delay: 1200,
  },
  {
    type: "user",
    content: (
      <span>
        クライアントから質問があります。広告のパフォーマンス分析をお願いします。
      </span>
    ),
    autoNext: true,
    delay: 1200,
  },
  {
    type: "bot",
    content: (
      <span>
        承知いたしました。Meta AA エージェントがお手伝いします。クライアント様が特に知りたい情報について、もう少し詳しくお聞かせください。
      </span>
    ),
    autoNext: true,
    delay: 1200,
  },
  {
    type: "user",
    content: (
      <span>
        資生堂キャンペーンにおけるデジタル広告のオフライン売上への貢献度を知りたいとのことです。TrueLift分析をお願いします。
      </span>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: (
      <div className="flex items-center gap-2">
        <span className="animate-spin text-lg">⏳</span>
        要件定義エージェントが分析中です...
      </div>
    ),
    autoNext: true,
    delay: 1500,
  },
  {
    type: "botBlock",
    content: (
      <div className="bg-white border border-gray-200 rounded-lg p-4 my-2 shadow-sm">
        <div className="font-bold mb-3 flex items-center gap-2 text-blue-800 border-b pb-2">
          <span role="img" aria-label="doc">📄</span>
          要件定義分析結果
        </div>
        <div className="text-sm space-y-2 text-gray-700">
          <div className="grid grid-cols-3"><b className="text-gray-900">クライアント:</b> <span className="col-span-2">資生堂</span></div>
          <div className="grid grid-cols-3"><b className="text-gray-900">目的:</b> <span className="col-span-2">デジタル広告のオフライン売上貢献度の測定</span></div>
          <div className="grid grid-cols-3"><b className="text-gray-900">手法:</b> <span className="col-span-2">TrueLift分析</span></div>
          <div>
            <b className="text-gray-900">必要データ:</b>
            <ul className="list-disc pl-5 mt-1 text-gray-600">
              <li>Meta広告配信データ</li>
              <li>オフライン売上データ (POS/店舗)</li>
              <li>顧客ID連携データ</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    autoNext: true,
    delay: 1000,
  },
  {
    type: "bot",
    content: "この分析方針でよろしいでしょうか？",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "はい、この分析で進めてください", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "修正が必要です", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "bot",
    content: (
      <div className="flex items-center gap-2">
        <span className="animate-pulse text-lg">📦</span>
        製品情報を確認中です...
      </div>
    ),
    autoNext: true,
    delay: 1000,
  },
  {
    type: "botBlock",
    content: (
      <div className="bg-white border border-gray-200 rounded-lg p-4 my-2 shadow-sm">
        <div className="font-bold mb-2 flex items-center gap-2 text-blue-800">
          <span role="img" aria-label="box">📦</span>
          製品情報確認
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <div><b className="text-gray-900">ブランド:</b> 資生堂</div>
          <div><b className="text-gray-900">カテゴリ:</b> スキンケア・化粧品</div>
          <div><b className="text-gray-900">ターゲット:</b> 女性 25〜55歳</div>
        </div>
      </div>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: "この製品情報で間違いありませんか？",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "はい、その通りです", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "修正が必要です", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "bot",
    content: (
      <div className="flex items-center gap-2">
        <span className="animate-bounce text-lg">🔎</span>
        データソースを確認中です...
      </div>
    ),
    autoNext: true,
    delay: 1000,
  },
  {
    type: "botBlock",
    content: (
      <div className="bg-white border border-gray-200 rounded-lg p-4 my-2 shadow-sm">
        <div className="font-bold mb-2 flex items-center gap-2 text-blue-800">
          <span role="img" aria-label="db">🗂️</span>
          推奨データソース
        </div>
        <div className="grid gap-2">
          <div className="border rounded p-2 bg-gray-50">
            <b className="text-sm">Meta広告データ</b>
            <div className="text-xs text-green-600 font-bold mt-1">✔ 利用可能</div>
          </div>
          <div className="border rounded p-2 bg-gray-50">
            <b className="text-sm">楽天データセット (Tobiras)</b>
            <div className="text-xs text-green-600 font-bold mt-1">✔ 推奨</div>
          </div>
        </div>
      </div>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: "この推奨データソース（Meta広告データ および 楽天データセット）で進めてよろしいでしょうか？",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "はい、推奨通り進めてください", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "他のデータソースを検討したい", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "botBlock",
    content: (
      <div className="bg-white border rounded-lg p-4 my-2 shadow-sm">
        <div className="font-bold mb-2 flex items-center gap-2 text-green-700">
          <span role="img" aria-label="check">✅</span>
          分析セットアップ完了
        </div>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>クライアント要件: 確認済み</li>
          <li>製品情報: 確認済み</li>
          <li>データソース: 楽天データセットで設定済み</li>
          <li>分析手法: TrueLift分析</li>
        </ul>
      </div>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: "分析を開始しますか？",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "はい、開始します", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "後で実行する", value: "no", style: "bg-gray-500 hover:bg-gray-600" },
    ],
  },
  {
    type: "auto",
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 animate-pulse text-blue-700">📡 分析を開始しています...</div>
        <div className="text-gray-500 text-sm pl-6">📊 Meta Advanced Analyticsに接続中...</div>
        <div className="text-gray-500 text-sm pl-6">🔗 Tobiras（楽天データセット）と統合中...</div>
        <div className="text-gray-500 text-sm pl-6">🧮 TrueLift統計モデルを実行中...</div>
        <div className="text-green-600 font-bold pl-6">✅ 分析が完了しました！</div>
      </div>
    ),
    autoNext: true,
    delay: 2500,
  },
 {
  type: "botBlock",
  content: (props: MetaAAAgentBlockProps) => {
    // 使用するデータは metaReport (¥2.1億, +21.4%)
    const incrementalSales = props.metaReportData.overall_summary.metrics.find(m => m.metric === '増分売上')?.value || '¥0';
    const totalLift = props.metaReportData.overall_summary.metrics.find(m => m.metric === '総売上リフト')?.value || '+0.0%';

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 my-2 shadow-md">
        <div className="font-bold mb-3 flex items-center gap-2 text-xl text-gray-800">
          <span role="img" aria-label="chart">📊</span>
          TrueLift分析サマリーレポート
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4 border border-blue-100">
          <div className="font-bold text-indigo-700 text-sm uppercase tracking-wide mb-1">
            エグゼクティブサマリー
          </div>
          <div className="text-lg">
            総合リフト: <span className="text-green-600 font-black text-2xl">{totalLift}</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Meta広告接触ユーザーは、非接触ユーザーと比較して有意に高い購入率を示しました。
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">増分売上</div>
            <div className="font-bold text-gray-900 text-lg">{incrementalSales}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">最適化CPA</div>
            <div className="font-bold text-gray-900 text-lg">¥12,450</div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() =>
              props?.onShowPreview?.({ flow: "meta", metaReportData: props.metaReportData })
            }
            className="text-sm font-medium px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
          >
            詳細レポートをプレビュー
          </button>
        </div>
      </div>
    );
  },
  autoNext: false,
  delay: 1000,
}
];

// --- COMPONENT ---
export default function MetaAAAgentBlock({ onShowPreview, metaReportData = metaReport }: MetaAAAgentBlockProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState<ChatMsg[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentStep]);

  useEffect(() => {
    if (currentStep >= steps.length) return;
    if (history.length > currentStep) return;

    const step = steps[currentStep];
    const isContentStep = (
      step.type === "user" ||
      step.type === "bot" ||
      step.type === "botBlock" ||
      step.type === "auto"
    );

    if (isContentStep) {
      const timer = setTimeout(() => {
        setHistory((prev) => {
          if (prev.length > currentStep) return prev;
          
          const content: React.ReactNode =
            typeof step.content === "function"
              ? step.content({ onShowPreview, metaReportData })
              : step.content;

          return [
            ...prev,
            {
              type: step.type === "user" ? "user" : "bot",
              content: content as React.ReactNode,
            },
          ];
        });

        if (step.autoNext) {
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
          }, step.delay || 600);
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [currentStep, onShowPreview, metaReportData]);

  const handleChoice = (label: string, style?: string) => {
    setHistory((h) => [
      ...h,
      { type: "user", content: <span>{label}</span>, choiceStyle: style },
    ]);
    // Move to the next step
    setCurrentStep((s) => s + 1);
  };
  
  // Note: There are no "finalButtons" in the current steps array, but keeping the function for completeness.
  const handleFinal = (label: string) => {
    setHistory((h) => [
      ...h,
      { type: "user", content: <span>{label}</span>, choiceStyle: "bg-blue-600" },
    ]);
  };

  const step = steps[currentStep];
  const showControls = history.length >= currentStep && (step?.type === "choice" || step?.type === "finalButtons");

  return (
    <div className="flex flex-col h-full w-full bg-transparent font-inter">
      <style jsx global>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.4s ease-out forwards;
        }
      `}</style>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full items-end gap-2 animate-slide-up ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.type === "bot" && <BotIcon />}
            <div
              className={`px-5 py-3 text-sm shadow-md transition-all max-w-[85%] lg:max-w-[70%] ${
                msg.type === "bot"
                  ? "bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100"
                  : msg.choiceStyle
                    ? `${msg.choiceStyle} text-white rounded-2xl rounded-br-none shadow-lg`
                    : "bg-blue-600 text-white rounded-2xl rounded-br-none"
              }`}
            >
              {msg.content}
            </div>
            {msg.type === "user" && <UserIcon />}
          </div>
        ))}

        {/* Typing Indicator for Next Auto Step */}
        {step && step.autoNext && history.length === currentStep && (
           <div className="flex w-full items-end gap-2 animate-slide-up justify-start opacity-70">
             <BotIcon />
             <div className="bg-gray-200 text-gray-500 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
               <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
               <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
             </div>
           </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* User Controls (Choices) */}
      {showControls && (
        <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-200 sticky bottom-0 z-20">
          {step.type === "choice" && (
            <div className="flex flex-wrap gap-2 justify-end animate-slide-up">
              {step.choices?.map((c) => (
                <button
                  key={c.value}
                  className={`px-5 py-2.5 rounded-full text-white font-medium text-sm transition-transform active:scale-95 shadow-lg ${c.style || "bg-blue-600 hover:bg-blue-700"}`}
                  onClick={() => handleChoice(c.label, c.style)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
          {step.type === "finalButtons" && (
            <div className="flex flex-wrap gap-2 justify-center animate-slide-up">
              <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition-colors" onClick={() => handleFinal("PDFとしてエクスポート")}>
                📥 PDFとしてエクスポート
              </button>
              <button className="px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow transition-colors" onClick={() => handleFinal("フォローアップをスケジュール")}>
                📅 フォローアップをスケジュール
              </button>
              <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium shadow transition-colors" onClick={() => handleFinal("新しい分析を開始")}>
                🔄 新しい分析を開始
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}