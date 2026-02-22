// src/app/Projects/sales-dashboards/components/RevenueChart.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styles from "../SaleStyles.module.scss";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

interface RevenueRow {
  amount: number;
  currency: string;
  occurred_at: string;
}

interface Props {
  dateRange?: { from?: string; to?: string };
  currency: "€" | "$" | "£";
}

export default function RevenueChart({ dateRange, currency }: Props) {
  const [state, setState] = useState<{ loading: boolean; error?: string; revenue: RevenueRow[] }>({
    loading: true,
    revenue: [],
  });

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const { data, error } = await supabase
          .from("revenue")
          .select("amount, currency, occurred_at");

        if (!alive) return;

        if (error) {
          setState({ loading: false, error: error.message, revenue: [] });
          return;
        }

        setState({ loading: false, revenue: data as RevenueRow[] });
      } catch (e: any) {
        if (!alive) return;
        setState({ loading: false, error: e.message, revenue: [] });
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  // FILTER by date only
  const filtered = useMemo(() => {
    return state.revenue.filter((r) => {
      const d = new Date(r.occurred_at);
      if (dateRange?.from && d < new Date(dateRange.from)) return false;
      if (dateRange?.to) {
        const end = new Date(dateRange.to);
        end.setHours(23, 59, 59, 999);
        if (d > end) return false;
      }
      return true;
    });
  }, [state.revenue, dateRange]);

  // GROUP by month
  const byMonth = useMemo(() => {
    const bucket: Record<string, number> = {};

    for (const r of filtered) {
      const d = new Date(r.occurred_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      bucket[key] = (bucket[key] || 0) + Number(r.amount);
    }

    const keys = Object.keys(bucket).sort();

    return {
      labels: keys.map((k) => {
        const [y, m] = k.split("-").map(Number);
        return new Date(y, m - 1).toLocaleString("en", { month: "short" });
      }),
      values: keys.map((k) => bucket[k]),
    };
  }, [filtered]);

  const noData = !byMonth.labels.length;

  const chartData = {
    labels: byMonth.labels,
    datasets: [
      {
        label: `Revenue (${currency})`,
        data: byMonth.values,
        borderColor: "#0fb9c6",
        backgroundColor: "rgba(15,185,198,0.15)",
        fill: true,
        tension: 0.35,
        borderWidth: 2,
      },
    ],
  };

  if (state.loading) return <p className={styles.loading}>Loading chart…</p>;

  return (
    <section className={styles.dashboardCard}>
      <h2 className={styles.dashboardTitle}>Total revenue per month</h2>


      {noData ? (
        <p className={styles.loading}>No data for selected filters.</p>
      ) : (
        <div className={styles.chartWrapper}>
          <Line data={chartData} />
        </div>
      )}
    </section>
  );
}