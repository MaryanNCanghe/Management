// src/app/Projects/sales-dashboards/page.tsx
"use client";

import { useMemo, useState } from "react";
import KPISection from "./components/KPISection";
import RevenueChart from "./components/RevenueChart";
import LeadsTable from "./components/LeadsTable";
import styles from "./SaleStyles.module.scss";
import type { DateRange, LeadStage } from "./types";

const ALL_STAGES: LeadStage[] = ["new", "contacted", "qualified", "won", "lost"];

export default function SalesDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [stages, setStages] = useState<LeadStage[]>(["won"]); // default to “won” for revenue views
  const [currency, setCurrency] = useState<"€" | "$" | "£">("€");

  const stageToggles = useMemo(
    () =>
      ALL_STAGES.map((s) => ({
        label: s[0].toUpperCase() + s.slice(1),
        value: s,
        checked: stages.includes(s),
      })),
    [stages]
  );

  function toggleStage(stage: LeadStage) {
    setStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  }

  return (
    <div className={styles.dashboardPage} aria-labelledby="sales-title">
      <h1 id="sales-title" className={styles.pageTitle}>
        Sales Dashboard
      </h1>

      {/* Simple filter toolbar */}
      <section
        aria-labelledby="filters-title"
        className={styles.dashboardCard}
      >
        <div className={styles.filterToolbar}>
          <h2 id="filters-title" className={styles.dashboardTitle}>
            Filters
          </h2>

          <div className={styles.filterRow}>
            <div className={styles.field}>
              <label htmlFor="from">From</label>
              <input
                id="from"
                type="date"
                className={styles.input}
                onChange={(e) => setDateRange((r) => ({ ...r, from: e.target.value }))}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="to">To</label>
              <input
                id="to"
                type="date"
                className={styles.input}
                onChange={(e) => setDateRange((r) => ({ ...r, to: e.target.value }))}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className={styles.select}
                aria-label="Select currency"
              >
                <option value="€">Euro (€)</option>
                <option value="$">USD ($)</option>
                <option value="£">GBP (£)</option>
              </select>
            </div>
           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
  <div className={styles.miniDonut} style={{ ["--p" as any]: 72, ["--kpi-color" as any]: "#C72408" }}>
    <div className={styles.miniDonutLabel}>72%</div>
  </div>
  <div>
    <div className={styles.miniKPI}>
      <span className={styles.miniCircle} style={{ ["--shape-color" as any]: "#7bd389" }} />
      <span className={styles.kpiProSub}>Sales improving</span>
    </div>
    <div className={styles.sparklinePlaceholder} />
  </div>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  <div className={styles.miniDonut} style={{ ["--p" as any]: 82, ["--kpi-color" as any]: "#7bd389" }}>
    <div className={styles.miniDonutLabel}>82%</div>
  </div>
  <div>
    <div className={styles.miniKPI}>
      <span className={styles.miniCircle} style={{ ["--shape-color" as any]: "#7bd389" }} />
      <span className={styles.kpiProSub}>Trend improving</span>
    </div>
    <div className={styles.sparklinePlaceholder} />
  </div>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  <div className={styles.miniDonut} style={{ ["--p" as any]: 52, ["--kpi-color" as any]: "#087EC7" }}>
    <div className={styles.miniDonutLabel}>52%</div>
  </div>
  <div>
    <div className={styles.miniKPI}>
      <span className={styles.miniCircle} style={{ ["--shape-color" as any]: "#087EC7" }} />
      <span className={styles.kpiProSub}> Performance</span>
    </div>
    <div className={styles.sparklinePlaceholder} />
  </div>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  <div className={styles.miniDonut} style={{ ["--p" as any]: 90 , ["--kpi-color" as any]: "#EBE073" }}>
    <div className={styles.miniDonutLabel}>90%</div>
  </div>
  <div>
    <div className={styles.miniKPI}>
      <span className={styles.miniCircle} style={{ ["--shape-color" as any]: "#EBE073" }} />
      <span className={styles.kpiProSub}>Customer Service</span>
    </div>
    <div className={styles.sparklinePlaceholder} />
  </div>
</div>
          </div>

          <div className={styles.toggleGroup} aria-label="Stage filters" role="group" aria-describedby="stage-help">
            {stageToggles.map((t) => (
              <label
                key={t.value}
                className={styles.checkboxPill}
                data-checked={t.checked ? "true" : "false"}
              >
                <input
                  type="checkbox"
                  checked={t.checked}
                  onChange={() => toggleStage(t.value)}
                  aria-label={`Toggle ${t.value}`}
                />
                {t.label}
              </label>
            ))}
          </div>
          <div id="stage-help" className={styles.helper}>
            Tip: Combine multiple stages to compare pipeline performance.
          </div>
        </div>
      </section>

      {/* Main layout */}
      <div className={styles.layoutGrid}>
        <KPISection dateRange={dateRange} stages={stages} currency={currency} />
        <RevenueChart dateRange={dateRange} stages={stages} currency={currency} />
        <LeadsTable dateRange={dateRange} stages={stages} currency={currency} />
      </div>
    </div>
  );
}