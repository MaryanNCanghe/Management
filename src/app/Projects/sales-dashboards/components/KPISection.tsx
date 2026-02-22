// src/app/Projects/sales-dashboards/components/KPISection.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { DateRange, LeadStage, Lead } from "../types";
import { filterLeads, fmt, IS_MOCK, makeMockLeads } from "../utils";
import styles from "../SaleStyles.module.scss";
interface Props {
  dateRange?: DateRange;
  stages?: LeadStage[];
  currency: "€" | "$" | "£";
}

export default function KPISection({ dateRange, stages, currency }: Props) {
  const [state, setState] = useState<{ loading: boolean; error?: string; leads: Lead[] }>({
    loading: true,
    leads: [],
  });

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        if (IS_MOCK) {
          const mock = makeMockLeads();
          if (!alive) return;
          setState({ loading: false, leads: mock });
          return;
        }

        const { data, error } = await supabase.from("leads").select("*");
        if (!alive) return;
        if (error) {
          setState({ loading: false, error: error.message, leads: [] });
          return;
        }
        setState({ loading: false, leads: data as Lead[] });
      } catch (e: any) {
        if (!alive) return;
        setState({ loading: false, error: e?.message || "Unknown error", leads: [] });
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const leads = useMemo(() => filterLeads(state.leads, stages, dateRange), [state.leads, stages, dateRange]);
  const totals = useMemo(() => {
    const total = leads.length;
    const won = leads.filter((l) => l.stage === "won");
    const wonCount = won.length;
    const revenue = won.reduce((sum, l) => sum + Number(l.value || 0), 0);
    const conversionRate = total > 0 ? wonCount / total : 0;
    return { total, wonCount, revenue, conversionRate };
  }, [leads]);

  if (state.loading) {
    return (
      <section className={styles.dashboardCard} aria-busy="true" aria-label="KPIs loading">
        <h2 className={styles.dashboardTitle}>KPIs</h2>
        <div className={styles.kpiGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.kpiCard} style={{ minHeight: 120 }}>
              <div className={styles.kpiNumber} style={{ opacity: 0.2 }}>
                ▬▬▬
              </div>
              <div className={styles.kpiLabel} style={{ opacity: 0.2 }}>
                Loading…
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (state.error) {
    return (
      <section className={styles.dashboardCard} role="alert" aria-live="polite">
        <h2 className={styles.dashboardTitle}>KPIs</h2>
        <p style={{ color: "#b91c1c" }}>Failed to load KPIs: {state.error}</p>
      </section>
    );
  }

  return (
    <section className={styles.dashboardCard} aria-labelledby="kpi-title">
      <h2 id="kpi-title" className={styles.dashboardTitle}>
        KPIs
      </h2>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <p className={styles.kpiNumber}>{fmt.number(totals.total)}</p>
          <p className={styles.kpiLabel}>Total Leads</p>
        </div>

        <div className={styles.kpiCard}>
          <p className={styles.kpiNumber}>{fmt.percent(totals.conversionRate)}</p>
          <p className={styles.kpiLabel}>Conversion Rate</p>
        </div>

        <div className={styles.kpiCard}>
          <p className={styles.kpiNumber}>{fmt.money(totals.revenue, currency)}</p>
          <p className={styles.kpiLabel}>Total Revenue</p>
        </div>
      </div>
      
    </section>
  );
}