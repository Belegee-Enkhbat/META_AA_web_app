// /service/chatFlows.ts
import React, { ReactNode } from "react";

export type ChatStep =
  | { type: "bot"; content: ReactNode }
  | { type: "user"; content: ReactNode }
  | { type: "input"; prompt: string; placeholder: string; key: string }
  | { type: "choice"; prompt: string; choices: { label: string; value: string; color?: string }[]; key: string }
  | { type: "score"; score: number; description: string }
  | { type: "loading"; message: string }
  | { type: "result"; title: string; message: ReactNode };

export type ChatFlow = {
  label: string;
  icon: ReactNode;
  steps: ChatStep[];
  content?: ReactNode;
};

import { BarChart, Lightbulb, LineChart } from "lucide-react";

export const chatFlows: Record<string, ChatFlow> = {
  media: {
    label: "Media Operation Support AI × Optimization Score",
    icon: React.createElement(BarChart, { className: "text-blue-600" }),
    steps: [
      { type: "bot", content: React.createElement(React.Fragment, null, [
        "最適化スコアを確認しましょう。",
        React.createElement("br", { key: "br1" }),
        "広告アカウントを選択してください。"
      ]) },
      { type: "input", prompt: "広告アカウントIDを入力してください。", placeholder: "例: 1234567890123456", key: "account" },
      { type: "bot", content: React.createElement(React.Fragment, null, "データを取得中...") },
      { type: "score", score: 59, description: "最適化スコアです。数値が高いほどアカウントのパフォーマンスが最適化されています。" },
      { type: "bot", content: React.createElement(React.Fragment, null, "改善提案をサーチしています...") },
      { type: "choice", prompt: "このスコアに大きな影響がありそうな項目を確認できます。該当しますか？", key: "impact", choices: [
        { label: "該当", value: "yes", color: "green" },
        { label: "該当しない", value: "no", color: "red" }
      ]},
      { type: "bot", content: React.createElement(React.Fragment, null, "改善内容を取得しています...") },
      { type: "result", title: "提案完了", message: (
        React.createElement("ul", { className: "list-disc pl-5" },
          React.createElement("li", null, "配信先の拡大"),
          React.createElement("li", null, "リーチ拡大施策"),
          React.createElement("li", null, "CPA一律引き下げ"),
          React.createElement("li", null, "広告文の訴求内容見直し")
        )
      )},
      { type: "bot", content: React.createElement(React.Fragment, null, "最適化スコア更新の内容をダッシュボードで確認できます。特にアラートがある場合はご注意ください。") },
    ]
  },
  variation: {
    label: "Variation Proposal ← Ad Creative Library API",
    icon: React.createElement(Lightbulb, { className: "text-yellow-500" }),
    steps: [
      { type: "bot", content: React.createElement(React.Fragment, null, "バリエーション提案フロー（後で実装）") }
    ]
  },
  meta: {
    label: "Meta AA Agent",
    icon: React.createElement(LineChart, { className: "text-pink-500" }),
    steps: [
      { type: "bot", content: React.createElement(React.Fragment, null, "Meta AA Agentフロー（後で実装）") }
    ]
  }
};