"use client";
import { MetaReportData } from "@/types/chat";
import { useState, useEffect, useRef } from "react";
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
import { DetailDataType } from "./MediaDetailPanel";

type MetaAAAgentBlockProps = {
  onShowPreview: (data: DetailDataType) => void;
  metaReportData: MetaReportData; // Replace 'MetaReportData' with the actual type definition
};

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

// --- DATA ---
export const steps: Step[] = [
   {
    type: "bot",
    content: (
      <span>
         META AA Agentへようこそ！こちらのエージェントは、Meta Advanced Analyticsを活用して、広告効果の詳細な分析を支援します。ご質問やご要望をお聞かせください。
      </span>
    ),
    autoNext: true, 
    delay: 1200,
  },
  {
    type: "user",
    content: (
      <span>
        I have a question from my client. Please analyse the performance of your ads.
      </span>
    ),
    autoNext: true,
    delay: 1200,
  },
  {
    type: "bot",
    content: (
      <span>
        Certainly. Meta AA Agent will help. Please tell us more about what the client wants to know.
      </span>
    ),
    autoNext: true,
    delay: 1200,
  },
  {
    type: "user",
    content: (
      <span>
        They want to know how much digital advertising contributes to offline sales in Shiseido`s campaign. TrueLift Analysis, please.
      </span>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: (
      <div className="flex items-center gap-2">
        {/* <span className="animate-spin">⏳</span> */}
        Requirements Definition Agent Analyzing...
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
          Requirements Definition Analysis Results
        </div>
        <div className="text-sm space-y-2 text-gray-700">
          <div className="grid grid-cols-3"><b className="text-gray-900">Client:</b> <span className="col-span-2">Shiseido</span></div>
          <div className="grid grid-cols-3"><b className="text-gray-900">Purpose:</b> <span className="col-span-2">Measuring contribution of digital ads to offline sales</span></div>
          <div className="grid grid-cols-3"><b className="text-gray-900">Technique:</b> <span className="col-span-2">TrueLift Analytics</span></div>
          <div>
            <b className="text-gray-900">Required data:</b>
            <ul className="list-disc pl-5 mt-1 text-gray-600">
              <li>Meta ad serving data</li>
              <li>Offline sales data (POS/store)</li>
              <li>Customer ID linkage data</li>
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
    content: "Are you sure of this analysis policy?",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "Yes, please with that analysis", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "Needs to be corrected", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "bot",
    content: (
      <div className="flex items-center gap-2">
        <span className="animate-pulse">📦</span>
        Reviewing Product Information...
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
          Product Information Confirmation
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <div><b className="text-gray-900">Brand:</b> Shiseido</div>
          <div><b className="text-gray-900">Category:</b> Skin Care & Cosmetics</div>
          <div><b className="text-gray-900">Target:</b> Female 25-55 years old</div>
        </div>
      </div>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: "Is this product information correct?",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "Yes, that's right", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "Needs to be corrected", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "bot",
    content: (
      <div className="flex items-center gap-2">
        <span className="animate-bounce">🔎</span>
        Checking data sources...
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
          Recommended Data Sources
        </div>
        <div className="grid gap-2">
          <div className="border rounded p-2 bg-gray-50">
            <b className="text-sm">Meta ad data</b>
            <div className="text-xs text-green-600 font-bold mt-1">✔ Available</div>
          </div>
          <div className="border rounded p-2 bg-gray-50">
            <b className="text-sm">Yahoo! Shopping Data</b>
            <div className="text-xs text-green-600 font-bold mt-1">✔ Recommended</div>
          </div>
        </div>
      </div>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: "Are you satisfied with this recommended data source?",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "Yes, please do as recommended", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "I want to change the data source", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "bot",
    content: "Within the Tobiras platform, we are currently planning to use the Yahoo! Shopping dataset. Are you sure we can continue like this?",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "Proceed with Yahoo! Shopping", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "Switch to Rakuten", value: "no", style: "bg-orange-500 hover:bg-orange-600" },
    ],
  },
  {
    type: "botBlock",
    content: (
      <div className="bg-white border rounded-lg p-4 my-2 shadow-sm">
        <div className="font-bold mb-2 flex items-center gap-2 text-green-700">
          <span role="img" aria-label="check">✅</span>
          Analysis Setup Complete
        </div>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Client Requirements: Confirmed</li>
          <li>Product Info: Verified</li>
          <li>Data Source: Configured</li>
          <li>Methodology: TrueLift Analytics</li>
        </ul>
      </div>
    ),
    autoNext: true,
    delay: 800,
  },
  {
    type: "bot",
    content: "Do you want to start the analysis?",
    autoNext: true,
    delay: 500,
  },
  {
    type: "choice",
    choices: [
      { label: "Yes, get started", value: "yes", style: "bg-green-600 hover:bg-green-700" },
      { label: "Run later", value: "no", style: "bg-gray-500 hover:bg-gray-600" },
    ],
  },
  {
    type: "auto",
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 animate-pulse text-blue-700">📡 Start your analysis...</div>
        <div className="text-gray-500 text-sm pl-6">📊 Connecting to Meta Advanced Analytics...</div>
        <div className="text-gray-500 text-sm pl-6">🔗 Integrating with Tobiras data sources...</div>
        <div className="text-gray-500 text-sm pl-6">🧮 Running TrueLift statistical model...</div>
        <div className="text-green-600 font-bold pl-6">✅ Analysis completed!</div>
      </div>
    ),
    autoNext: true,
    delay: 2500,
  },
 {
  type: "botBlock",
  content: (props: MetaAAAgentBlockProps) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 my-2 shadow-md">
        <div className="font-bold mb-3 flex items-center gap-2 text-xl text-gray-800">
          <span role="img" aria-label="chart">📊</span>
          TrueLift Analysis Report
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4 border border-blue-100">
          <div className="font-bold text-indigo-700 text-sm uppercase tracking-wide mb-1">
            Executive Summary
          </div>
          <div className="text-lg">
            Incremental Lift: <span className="text-green-600 font-black text-2xl">+18.5%</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Users exposed to Meta ads had a significantly higher purchase rate.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Incremental Sales</div>
            <div className="font-bold text-gray-900">¥156,890,000</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">CPA</div>
            <div className="font-bold text-gray-900">¥12,450</div>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={() =>
              props?.onShowPreview?.({ flow: "meta", metaReportData: props.metaReportData })
            }
            className="text-xs text-blue-600 hover:text-blue-800 transition"
          >
            プレビューを表示
          </button>
        </div>
      </div>
    );
  },
  autoNext: true,
  delay: 1000,
}
];

// --- COMPONENT ---
export default function MetaAAAgentBlock({ onShowPreview, metaReportData }: MetaAAAgentBlockProps) {
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
          // For step 22, pass onShowPreview and metaReportData as props to content
          if (currentStep === 22 && typeof step.content === "function") {
            return [
              ...prev,
              {
                type: "bot",
                content: step.content({ onShowPreview, metaReportData }),
              },
            ];
          }
          return [
            ...prev,
            {
              type: step.type === "user" ? "user" : "bot",
              content: typeof step.content === "function" ? step.content({ onShowPreview, metaReportData }) : step.content,
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
    setCurrentStep((s) => s + 1);
  };

  const handleFinal = (label: string) => {
    setHistory((h) => [
      ...h,
      { type: "user", content: <span>{label}</span>, choiceStyle: "bg-blue-600" },
    ]);
  };

  const step = steps[currentStep];
  const showControls = history.length >= currentStep && (step?.type === "choice" || step?.type === "finalButtons");

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
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
              className={`px-5 py-3 text-sm shadow-sm max-w-[85%] transition-all ${
                msg.type === "bot"
                  ? "bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100"
                  : msg.choiceStyle 
                    ? `${msg.choiceStyle} text-white rounded-2xl rounded-br-none shadow-md`
                    : "bg-blue-600 text-white rounded-2xl rounded-br-none"
              }`}
            >
              {msg.content}
            </div>
            {msg.type === "user" && <UserIcon />}
          </div>
        ))}

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

      {showControls && (
        <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-200">
          {step.type === "choice" && (
            <div className="flex flex-wrap gap-2 justify-end animate-slide-up">
              {step.choices?.map((c) => (
                <button
                  key={c.value}
                  className={`px-5 py-2.5 rounded-full text-white font-medium text-sm transition-transform active:scale-95 shadow-md ${c.style || "bg-blue-600 hover:bg-blue-700"}`}
                  onClick={() => handleChoice(c.label, c.style)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
          {step.type === "finalButtons" && (
            <div className="flex flex-wrap gap-2 justify-center animate-slide-up">
              <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition-colors" onClick={() => handleFinal("Export as PDF")}>
                📥 Export PDF
              </button>
              <button className="px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow transition-colors" onClick={() => handleFinal("Schedule a follow-up")}>
                📅 Follow-up
              </button>
              <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium shadow transition-colors" onClick={() => handleFinal("Start a new analysis")}>
                🔄 Restart
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}