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
export type Recommendation = {
  id: string;
  title: string;
  impact: string;
  description: string;
  reasons: string[];
  points: number;
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
  summary: string;
  metrics: { label: string; value: string }[];
  insights: string[];
  platforms: { name: string; percent: number }[];
};

export type ComparisonResult = {
  yourAd: { format: string; target: string; message: string; platform: string };
  trend: { format: string; target: string; message: string; platform: string };
  recommendations: string[];
};