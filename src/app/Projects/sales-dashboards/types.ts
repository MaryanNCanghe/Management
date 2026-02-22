// src/app/Projects/sales-dashboards/types.ts

export type LeadStage = "new" | "contacted" | "qualified" | "won" | "lost";

// UI currency symbols used by your components/page
export type Currency = "€" | "$" | "£";

// Keep your server/DB-facing models as you defined them (ISO codes)
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

  // ISO currency code from DB
  currency?: "EUR" | "USD" | "GBP";

  // Lead creation date
  created_at: string;
}

export interface Revenue {
  id: string;
  lead_id: string | null;
  amount: number;

  // ISO currency code from DB
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

/* ------------------------------------------------------------------ */
/*  Currency helpers: ISO <-> symbol                                  */
/* ------------------------------------------------------------------ */

// Map ISO -> symbol for display
export const ISO_TO_SYMBOL: Record<"EUR" | "USD" | "GBP", Currency> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

// Map symbol -> ISO (useful if user selects symbol in UI and you need to persist to DB)
export const SYMBOL_TO_ISO: Record<Currency, "EUR" | "USD" | "GBP"> = {
  "€": "EUR",
  "$": "USD",
  "£": "GBP",
};

/* ------------------------------------------------------------------ */
/*  Optional: keep Sales components in sync with shared props         */
/* ------------------------------------------------------------------ */

export type DashboardCommonProps = {
  dateRange?: DateRange;
  stages?: LeadStage[];
  currency: Currency; // UI symbol used by components
};
