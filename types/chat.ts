import { ReactNode } from "react";

export type ChatMessageType = "user" | "bot" | "system";

export type ChatMessage = {
  type: ChatMessageType;
  content: ReactNode;
};

export type Account = {
  id: string;
  name: string;
};
export interface MetaReportData {
  summary: string;
  liftPercentage: number;
  incrementalSales: string; // Formatted currency
  cpa: string; // Formatted currency
}
// --- 1. DEFINING THE INNER CARD TYPE ---
export type recCard = {
  id: string;
  title: string;       // e.g., 'メインテキスト'
  subtitle: string;    // e.g., 'フォントサイズ最適化'
  details: string;     // e.g., '14px → 20px に変更'
  rationale: string;   // e.g., 'Meta推奨基準に準拠' or '可読性向上'
  points: number;      // e.g., 1
};

// --- 2. UPDATING THE RECOMMENDATION TYPE ---
export type Recommendation = {
  id: string;
  title: string;
  impact: string;
  description: string;
  reasons: string[];
  points: number;
  // **FIX:** Add the 'cards' property to resolve the type error
  cards: recCard[];
};
export type AdCard = {
  id: string;
  title: string;
  brand: string;
  engagement: string;
  type: string;
  platform?: string;
  impressions?: number;
  date: string;
  dateDisplay: string;
  timestamp?: number;
};

export type TrendReport = {
  report_title: string;
  theme: string;
  date_generated: string;

  summary: {
    title: string;
    metrics: {
      metric_name: string;
      value: string;
      value_en?: string;
    }[];
  };

  insights: {
    title: string;
    list: string[];
  };

  recommendations: {
    title: string;
    list: string[];
  };

  platform_analysis: {
    title: string;
    platforms: {
      name: string;
      usage_percentage: number;
    }[];
  };

  key_findings: {
    title: string;
    findings: {
      icon: string;
      heading: string;
      detail: string;
    }[];
  };
};

export type ComparisonResult = {
  report_name: string;
  campaign_name: string;
  comparison_target: string;

  metrics_benchmark: {
    engagement: number;
    ctr: number;
    cvr: number;
    overallScore: number;
  };

  metrics_user_ad: {
    engagement: number;
    ctr: number;
    cvr: number;
    overallScore: number;
    colorTrend: number;
    textPlacement: number;
    brandExposure: number;
    age18_24: number;
    age25_34: number;
    age35_44: number;
  };

  recent_ads_status: {
    title: string;
    ads: {
      name: string;
      format: string;
      strategy: string;
      target: string;
      assumed_metric: string;
      assumed_value: string;
      status: string;
      insight_summary: string;
      image_context: string;
    }[];
  };

  improvement_recommendations: {
    title: string;
    categories: {
      heading: string;
      recommendation: string;
      details: string;
    }[];
  };

  implementation_roadmap: {
    title: string;
    timeline: {
      timeframe: string;
      priority: "高" | "中" | "低";
      actions: string[];
    }[];
  };
};
