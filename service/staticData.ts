import { Account, Recommendation, AdCard, TrendReport, ComparisonResult } from "@/types/chat";

export const accounts: Account[] = [
  { id: "379122459531219", name: "Main Account" },
  { id: "123456789012345", name: "Test Account" },
];

export const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "メインテキストのサイズを拡大",
    impact: "+8点",
    description: "現在のフォントサイズ（14px）を20pxに拡大することで、視認性が大幅に向上します。特にモバイルデバイスでの可読性が改善されます。",
    reasons: [
      "Meta推奨のフォントサイズは18px以上",
      "競合他社の成功事例では平均20px使用",
      "A/Bテストで20%のクリック率向上を確認"
    ],
    points: 8,
  },
  {
    id: "2",
    title: "CTAボタンの色を変更",
    impact: "+6点",
    description: "CTAボタンを現在の青色から、より目立つオレンジ色（#FF6B35）に変更します。背景とのコントラスト比が4.5:1以上になります。",
    reasons: [
      "オレンジ色はアクションを促す色として効果的",
      "背景色とのコントラストが不足（現在2.8:1）",
      "WCAG 2.1アクセシビリティ基準を満たす必要"
    ],
    points: 6,
  },
  {
    id: "3",
    title: "リール形式（9:16）に最適化",
    impact: "+10点",
    description: "現在の横長フォーマット（16:9）を縦型（9:16）に変更し、Instagram ReelsとFacebook Reelsに最適化します。",
    reasons: [
      "リール配置でのCPMが平均30%低い",
      "縦型動画のエンゲージメント率が2.5倍高い",
      "Meta Ad Library APIデータで効果実証済み"
    ],
    points: 10,
  },
  {
    id: "4",
    title: "Advantage+ オーディエンス活用",
    impact: "+8点",
    description: "このクリエイティブでAdvantage+ オーディエンス機能を有効化し、AIによる自動最適化を実施します。",
    reasons: [
      "類似キャンペーンでCPA 18%削減を達成",
      "リーチが平均35%拡大",
      "手動ターゲティングの制約を超えた配信が可能"
    ],
    points: 8,
  },
];

export const adCards: AdCard[] = [
  {
    id: "1",
    title: "Luxury Lipstick Collection",
    brand: "Beauty Brand A",
    engagement: "12.5K",
    type: "video",
    date: "2024-11-15",
    dateDisplay: "2024年11月15日"
  },
  {
    id: "2",
    title: "Matte Finish Lipstick",
    brand: "Cosmetics Co.",
    engagement: "8.9K",
    type: "image",
    date: "2024-11-12",
    dateDisplay: "2024年11月12日"
  },
  {
    id: "3",
    title: "Long-lasting Lip Color",
    brand: "Makeup Pro",
    engagement: "15.2K",
    type: "carousel",
    date: "2024-11-14",
    dateDisplay: "2024年11月14日"
  },
  {
    id: "4",
    title: "Natural Lip Tint",
    brand: "Organic Beauty",
    engagement: "6.7K",
    type: "video",
    date: "2024-11-10",
    dateDisplay: "2024年11月10日"
  },
];

export const trendReport: TrendReport = {
  summary: "「lipstick」検索結果 (523件)",
  metrics: [
    { label: "平均エンゲージメント率", value: "4.2%" },
    { label: "主要カラートレンド", value: "レッド系 (68%)" },
    { label: "人気フォーマット", value: "縦型動画 (45%)" }
  ],
  insights: [
    "ライフスタイル統合型の広告が高いエンゲージメントを獲得",
    "ユーザー生成コンテンツスタイルが効果的",
    "ビフォー・アフター形式の動画が人気",
    "季節プロモーション要素の組み込みが増加傾向"
  ],
  platforms: [
    { name: "Instagram", percent: 85 },
    { name: "Facebook", percent: 70 },
    { name: "Reels", percent: 60 }
  ]
};

export const comparisonResult: ComparisonResult = {
  yourAd: {
    format: "横型動画 (16:9)",
    target: "Women 18-65",
    message: "機能説明型",
    platform: "Facebook中心"
  },
  trend: {
    format: "縦型動画 (9:16)",
    target: "Women 25-44",
    message: "感情訴求型",
    platform: "Instagram/Reels重視"
  },
  recommendations: [
    "フォーマットを縦型動画（9:16）に変更 → CTR +115%, エンゲージメント +156%",
    "ターゲット層をWomen 25-44に絞る → CPA -35%, ROAS +45%",
    "感情訴求型のメッセージに変更 → コンバージョン率 +28%",
    "Instagram ReelsとStoriesを優先配信 → リーチ +60%, エンゲージメント +80%"
  ]
};