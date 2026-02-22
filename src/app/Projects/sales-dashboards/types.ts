// src/app/Projects/sales-dashboards/types.ts

export type LeadStage = "new" | "contacted" | "qualified" | "won" | "lost";

export interface Lead {
  amount: number;
  occurred_at: string | number | Date;
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  stage: LeadStage;

  // 💡 This is the CORRECT field — matches your Supabase table
  value: number;

  currency?: "EUR" | "USD" | "GBP";

  // Lead creation date
  created_at: string; 
}

export interface Revenue {
  id: string;
  lead_id: string | null;
  amount: number;
  currency: "EUR" | "USD" | "GBP";
  status: "paid" | "pending" | "refunded";
  channel: string | null;
  occurred_at: string;
  created_at: string;
}

export interface DateRange {
  from?: string; 
  to?: string;
}

export interface FetchState<T> {
  loading: boolean;
  error?: string;
  data?: T;
}