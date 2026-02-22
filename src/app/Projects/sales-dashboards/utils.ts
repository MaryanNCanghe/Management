// src/app/Projects/sales-dashboards/utils.ts
import type { Lead, DateRange, LeadStage } from "./types";

// If you want a mock fallback when env vars or Supabase fail:
export const IS_MOCK =
  !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if a date is within a From/To range
export function withinDateRange(dateISO: string, range?: DateRange): boolean {
  if (!range?.from && !range?.to) return true;

  const d = new Date(dateISO);

  if (range.from && d < new Date(range.from)) return false;

  if (range.to) {
    const end = new Date(range.to);
    end.setHours(23, 59, 59, 999); // include entire day
    if (d > end) return false;
  }

  return true;
}

// Filters leads by stage + date
export function filterLeads(
  leads: Lead[],
  stages: LeadStage[] | undefined,
  dateRange: DateRange | undefined
): Lead[] {
  return leads.filter((l) => {
    const stageOk = !stages || stages.length === 0 || stages.includes(l.stage);
    const dateOk = withinDateRange(l.created_at, dateRange);
    return stageOk && dateOk;
  });
}

// Simple formatting helpers
export const fmt = {
  money(n: number, currency = "€") {
    return `${currency}${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  },
  number(n: number) {
    return n.toLocaleString();
  },
  percent(n: number) {
    return `${(n * 100).toFixed(1)}%`;
  },
};

// Generate mock leads for demo mode
export function makeMockLeads(): Lead[] {
  const companies = ["ACME", "TechCorp", "Meta", "Tesla", "Widget Corp"];
  const stages: LeadStage[] = ["new", "contacted", "qualified", "won", "lost"];
  const now = new Date();
  const arr: Lead[] = [];

  for (let i = 0; i < 35; i++) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - Math.floor(Math.random() * 6));

    arr.push({
      id: `mock-${i}`,
      name: `Lead ${i + 1}`,
      email: `lead${i + 1}@example.com`,
      company: companies[i % companies.length],
      stage: stages[Math.floor(Math.random() * stages.length)],
      value: Math.floor(Math.random() * 30000) + 3000, // correct field
      currency: "EUR",
      created_at: d.toISOString(),
      amount: 0,
      occurred_at: ""
    });
  }

  return arr;
}
