import { Account, Recommendation, AdCard, TrendReport, ComparisonResult, MetaReportData } from "@/types/chat";

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
    // Cards for Font Size Optimization (Based on original image)
    cards: [
      {
        id: "1-1",
        title: "メインテキスト",
        subtitle: "フォントサイズ最適化",
        details: "14px → 20px に変更",
        rationale: "Meta推奨基準に準拠",
        points: 4, // Changed points to make total 8 (4+4)
      },
      {
        id: "1-2",
        title: "サブテキスト",
        subtitle: "フォントサイズ最適化",
        details: "12px → 16px に変更",
        rationale: "可読性向上",
        points: 4, // Changed points to make total 8 (4+4)
      },
    ]
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
    // Cards for CTA Color Change (Plausible data based on description)
    cards: [
      {
        id: "2-1",
        title: "ボタン色変更",
        subtitle: "コントラスト比改善",
        details: "青色 (#007BFF) → オレンジ色 (#FF6B35)",
        rationale: "WCAG 2.1基準適合",
        points: 3,
      },
      {
        id: "2-2",
        title: "アクションテキスト",
        subtitle: "強調表現追加",
        details: "「詳細はこちら」→「今すぐ予約」",
        rationale: "アクション性の向上",
        points: 3,
      },
    ]
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
    // Cards for Reels Optimization (Plausible data based on description)
    cards: [
      {
        id: "3-1",
        title: "クリエイティブ縦型化",
        subtitle: "フォーマット最適化",
        details: "16:9 (横長) → 9:16 (縦型)",
        rationale: "リール配置への最適化",
        points: 7,
      },
      {
        id: "3-2",
        title: "動画尺調整",
        subtitle: "視聴完了率向上",
        details: "動画尺を15秒に短縮",
        rationale: "推奨動画尺へ調整",
        points: 3,
      },
    ]
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
    // Cards for Advantage+ Audience (Plausible data based on description)
    cards: [
      {
        id: "4-1",
        title: "オーディエンス設定",
        subtitle: "自動最適化ON",
        details: "Advantage+ オーディエンスを有効化",
        rationale: "AIによる最適化実行",
        points: 6,
      },
      {
        id: "4-2",
        title: "予算配分",
        subtitle: "柔軟な配分設定",
        details: "キャンペーン予算最適化をON",
        rationale: "パフォーマンス最大化",
        points: 2,
      },
    ]
  },
];

export const adCards: AdCard[] = [
  { id: "5", title: "Winter Skin Balm", brand: "DermPro", engagement: "2.1K", type: "image", date: "2025-11-21", dateDisplay: "2025年11月21日" },
  { id: "6", title: "Summer Sunscreen", brand: "SunGuard", engagement: "9.5K", type: "video", date: "2025-07-01", dateDisplay: "2025年07月01日" },
  { id: "7", title: "Holiday Gift Set", brand: "Beauty Brand A", engagement: "25.0K", type: "carousel", date: "2025-11-19", dateDisplay: "2025年11月19日" },
  { id: "8", title: "Daily Moisturizer", brand: "Organic Beauty", engagement: "3.2K", type: "image", date: "2025-11-18", dateDisplay: "2025年11月18日" },
  { id: "9", title: "A New Product Line", brand: "Startup Co.", engagement: "1.0K", type: "video", date: "2025-02-05", dateDisplay: "2025年02月05日" },
  {
    id: "1",
    title: "Luxury Lipstick Collection",
    brand: "Beauty Brand A",
    engagement: "12.5K",
    type: "video",
    date: "2025-11-20", // Recent for demo
    dateDisplay: "2025年11月20日"
  },
  {
    id: "2",
    title: "Matte Finish Lipstick",
    brand: "Cosmetics Co.",
    engagement: "8.9K",
    type: "image",
    date: "2025-11-15", // Older for demo
    dateDisplay: "2025年11月15日"
  },
  {
    id: "3",
    title: "Long-lasting Lip Color",
    brand: "Makeup Pro",
    engagement: "15.2K",
    type: "carousel",
    date: "2025-10-01", // Last 30 days filter
    dateDisplay: "2025年10月01日"
  },
  {
    id: "4",
    title: "Natural Lip Tint",
    brand: "Organic Beauty",
    engagement: "6.7K",
    type: "video",
    date: "2025-01-10", // This Year filter
    dateDisplay: "2025年01月10日"
  },
];

export const trendReport: TrendReport = {
  "report_title": "リップ製品広告トレンド分析レポート",
  "theme": "日本市場における限定色と実用性の訴求トレンド",
  "date_generated": "2025-11-22",
  "summary": {
    "title": "トレンド概要",
    "metrics": [
      {
        "metric_name": "主要カラートレンド",
        "value": "限定レッド・ラメ系",
        "value_en": "Limited Red & Glitter"
      },
      {
        "metric_name": "人気フォーマット",
        "value": "限定商品オファー",
        "value_en": "Limited Product Offer"
      }
    ]
  },
  "insights": {
    "title": "主要インサイト",
    "list": [
      "デュアル・メッセージ戦略: 実用性 (マスクにつきにくい) と季節の魅力 (きらめく赤) の両方を訴求している。",
      "希少価値マーケティング: すべての訴求を「限定色」とし、購入の緊急性 (FOMO) を高めている。",
      "フルフェイス提案: リップ単体ではなく、マスカラとのセット提案（Cosmic Red）で、顧客単価向上とトータルルックを提案。",
      "テクスチャー訴求: 「透けるラメ色」「きらめく」など、テクスチャーの質感を強調する表現を多用。"
    ]
  },
  "recommendations": {
    "title": "クリエイティブ提案",
    "list": [
      "限定感を視覚的に強調: 「LIMITED COLOR」や「限定色」の文字を、単なるテキストではなくデザイン要素として組み込む。",
      "冬の二面性を表現: 日常の「マスク映え」とホリデーの「華やかさ」を明確に使い分けるバリエーションを用意する。",
      "リップ+αの提案: 他のアイテムとのセット使用イメージを提示し、トータルコーディネートで購買意欲を刺激する。",
      "体温を感じる暖色系のライティングとモデル表現を用いる (Cosmic Red)。",
      "実用的なベネフィット (マスク対応) をキャッチーなアイコンで分かりやすく示す (Glitter My Lips)。"
    ]
  },
  "platform_analysis": {
    "title": "配信プラットフォーム分析 (市場動向)",
    "platforms": [
      {
        "name": "Instagram",
        "usage_percentage": 90
      },
      {
        "name": "Reels / TikTok",
        "usage_percentage": 75
      },
      {
        "name": "Pinterest / Lifest. Media",
        "usage_percentage": 50
      }
    ]
  },
  "key_findings": {
    "title": "主要発見事項",
    "findings": [
      {
        "icon": "🎁",
        "heading": "シーズンマーケティング",
        "detail": "限定色は冬の始まりに集中して投入し、認知度と売上を最大化する"
      },
      {
        "icon": "🎨",
        "heading": "クリエイティブの使い分け",
        "detail": "「実用性重視の静止画」と「情緒的・モデル重視の動画」の使い分けが効果的"
      },
      {
        "icon": "👥",
        "heading": "ターゲット層",
        "detail": "主にF1層 (20-34歳の女性) への限定商品による話題化戦略"
      }
    ]
  }
}

export const comparisonResult: ComparisonResult = {
  "report_name": "包括的比較分析レポート",
  "campaign_name": "Shiseido_Maquillage_Hybrid",
  "comparison_target": "業界トップパフォーマー平均 (OPERA/RIMMEL)",
  "metrics_benchmark": {
    "engagement": 4.2,
    "ctr": 2.1,
    "cvr": 4.8,
    "overallScore": 85
  },
  "metrics_user_ad": {
    "engagement": 3.5,
    "ctr": 1.5,
    "cvr": 4.2,
    "overallScore": 78,
    "colorTrend": 85,
    "textPlacement": 88,
    "brandExposure": 95,
    "age18_24": 78,
    "age25_34": 82,
    "age35_44": 70
  },
  "recent_ads_status": {
    "title": "あなたの直近の広告確認 (Maquillage/Shiseido)",
    "ads": [
      {
        "name": "広告A (ライフスタイル動画)",
        "format": "動画",
        "strategy": "情緒的・ブランド認知",
        "target": "Women 25～34歳",
        "assumed_metric": "CVR",
        "assumed_value": "0.8%",
        "status": "低調",
        "insight_summary": "ライフスタイル訴求に偏り、CVRが非常に低い。",
        "image_context": "Shiseido_video.jpgのイメージ：クローゼット前のモデル"
      },
      {
        "name": "広告B (製品クローズアップ静止画)",
        "format": "静止画",
        "strategy": "質感訴求・美容液効果",
        "target": "Women 18～25歳",
        "assumed_metric": "CTR",
        "assumed_value": "1.9%",
        "status": "平均",
        "insight_summary": "クローズアップは効果的だが、CTRが業界ベンチマークに届いていない。",
        "image_context": "Shiseido1.jpgのイメージ：「ぷるり」ルージュ"
      }
    ]
  },
  "improvement_recommendations": {
    "title": "クリエイティブ戦略の推奨事項",
    "categories": [
      {
        "heading": "推奨フォーマット",
        "recommendation": "動画 + 静止画のハイブリッド戦略の最適化",
        "details": "動画Aのリーチ力と静止画Bの訴求力を維持しつつ、実用性デモを両方に追加する。"
      },
      {
        "heading": "動画訴求の強化 (広告Aの改善)",
        "recommendation": "実用性/耐久性デモンストレーションの組み込み",
        "details": "OPERAトレンドに見られるように、ライフスタイル動画の冒頭や中間で「マスクに色がつきにくい」といった実用的な機能を明確に示すシーンを組み込む。"
      },
      {
        "heading": "静止画の訴求強化 (広告Bの改善)",
        "recommendation": "限定性と緊急性の明確化",
        "details": "静止画のクローズアップ写真に「数量限定」「本日終了」といった緊急性の高いオーバーレイを加え、CTRとCVRを直接的に刺激する。"
      }
    ]
  },
  "implementation_roadmap": {
    "title": "実装ロードマップ",
    "timeline": [
      {
        "timeframe": "1週間（低工数・高ROI）",
        "priority": "高",
        "actions": [
          "CTAボタンのテキストを「限定色を今すぐチェック」に変更",
          "広告コピーに「マスクプルーフ」の実用性キーワードを追記"
        ]
      },
      {
        "timeframe": "2-4週間（中工数・中ROI）",
        "priority": "中",
        "actions": [
          "UGC風の縦型動画クリエイティブを制作・A/Bテスト開始",
          "ランディングページに「限定色残りわずか」の緊急性バナーを追加"
        ]
      },
      {
        "timeframe": "1-3ヶ月（高工数・長期戦略）",
        "priority": "低",
        "actions": [
          "35-44歳層に特化した保湿/エイジングケア訴求の長尺動画を制作",
          "季節に合わせた新たなカラーパレットの訴求準備"
        ]
      }
    ]
  }
}


export const metaReport: MetaReportData = {
  summary: "Incremental Lift: Users exposed to Meta ads had a significantly higher purchase rate.",
  liftPercentage: 18.5,
  incrementalSales: "¥156,890,000",
  cpa: "¥12,450",
};