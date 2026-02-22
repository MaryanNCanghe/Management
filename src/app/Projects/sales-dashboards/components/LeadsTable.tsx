// src/app/Projects/sales-dashboards/components/LeadsTable.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "../SaleStyles.module.scss";
import type { DateRange, LeadStage, Lead } from "../types";
import { filterLeads, fmt, IS_MOCK, makeMockLeads } from "../utils";

interface Props {
  dateRange?: DateRange;
  stages?: LeadStage[];
  currency: "€" | "$" | "£";
}

type SortKey = "name" | "company" | "stage" | "value" | "created_at";

export default function LeadsTable({ dateRange, stages, currency }: Props) {
  const [state, setState] = useState<{ loading: boolean; error?: string; leads: Lead[] }>({
    loading: true,
    leads: [],
  });
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        if (IS_MOCK) {
          if (!alive) return;
          setState({ loading: false, leads: makeMockLeads() });
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

  const sorted = useMemo(() => {
    const arr = [...leads];
    arr.sort((a, b) => {
      const va = (a as any)[sortKey];
      const vb = (b as any)[sortKey];
      if (sortKey === "value") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return sortDir === "asc" ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
    return arr;
  }, [leads, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  }

  if (state.loading) return <p className={styles.loading}>Loading table…</p>;
  if (state.error)
    return (
      <section className={`${styles.dashboardCard} ${styles.tableContainer}`} role="alert">
        <h2 className={styles.dashboardTitle}>Leads</h2>
        <p style={{ color: "#b91c1c" }}>Failed to load: {state.error}</p>
      </section>
    );

  return (
    <section className={`${styles.dashboardCard} ${styles.tableContainer}`} aria-labelledby="leads-title">
      <h2 id="leads-title" className={styles.dashboardTitle}>
        Leads
      </h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")} style={{ cursor: "pointer" }}>
              Employee name {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => toggleSort("company")} style={{ cursor: "pointer" }}>
              Company {sortKey === "company" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => toggleSort("stage")} style={{ cursor: "pointer" }}>
              Stage {sortKey === "stage" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => toggleSort("value")} style={{ cursor: "pointer" }}>
              Value {sortKey === "value" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => toggleSort("created_at")} style={{ cursor: "pointer" }}>
              Date {sortKey === "created_at" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 24, color: "#6c7a90" }}>
                No leads match your filters.
              </td>
            </tr>
          ) : (
            sorted.map((l) => (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>{l.company}</td>
                <td style={{ textTransform: "capitalize" }}>{l.stage}</td>
                <td>{fmt.money(l.value, currency)}</td>
                <td>{new Date(l.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}