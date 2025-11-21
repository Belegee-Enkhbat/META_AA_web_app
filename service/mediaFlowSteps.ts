// /service/mediaFlowSteps.ts
export const mediaFlowSteps = [
  {
    type: "input",
    title: "最適化スコアを確認しましょう",
    prompt: "少しお待ちください。広告アカウントの選択をしてください。",
    inputType: "account",
    accounts: [
      { id: "1234567890123456", name: "Test Account" },
      { id: "9876543210987654", name: "Sample Account" },
    ],
  },
  {
    type: "info",
    title: "",
    message: (account: string) => `アカウント ${account} を選択しました`,
  },
  {
    type: "loading",
    title: "",
    message: "データを取得中...",
  },
  {
    type: "score",
    title: "",
    score: 59,
    description: "最適化スコアです。数値が高いほどアカウントのパフォーマンスが最適化されています。",
    detailLink: "#",
  },
  {
    type: "loading",
    title: "",
    message: "改善提案をサーチしています...",
  },
  {
    type: "choice",
    title: "予想の確認",
    message: "このスコアに大きな影響がありそうな項目を確認できます。該当しますか？",
    choices: [
      { label: "該当", value: "yes", color: "green" },
      { label: "該当しない", value: "no", color: "red" },
    ],
  },
  {
    type: "loading",
    title: "",
    message: "改善内容を取得しています...",
  },
  {
    type: "result",
    title: "提案完了",
    message: [
      "配信先の拡大",
      "リーチ拡大施策",
      "CPA一律引き下げ",
      "広告文の訴求内容見直し"
    ].map((item, idx) => `・${item}`).join('\n'),
  },
  {
    type: "info",
    title: "",
    message: "最適化スコア更新の内容をダッシュボードで確認できます。特にアラートがある場合はご注意ください。",
  },
];