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
  date: string;
  dateDisplay: string;
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