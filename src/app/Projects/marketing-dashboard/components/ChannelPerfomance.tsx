 "use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import styles from "../MarketingStyle.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function ChannelPerformance() {
  const data = {
    labels: [
      "Facebook",
      "Google Ads",
      "Instagram",
      "TikTok",
      "YouTube",
      "LinkedIn",
      "Twitter (X)"
    ],

    datasets: [
      {
        label: "Leads",
        data: [60, 90, 40, 75, 55, 30, 25],
        backgroundColor: [
          "#3B82F6", // Facebook - Blue
          "#EF4444", // Google Ads - Red
          "#F59E0B", // Instagram - Yellow/Orange
          "#8B5CF6", // TikTok - Purple
          "#DC2626", // YouTube - Strong Red
          "#0EA5E9", // LinkedIn - Soft Blue
          "#64748B"  // Twitter/X - Slate Gray
        ],
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
      },
      y: {
        ticks: { color: "#6b7280" },
        beginAtZero: true,
      }
    }
  };

  return (
    <div className={styles.chartBox}>
      <h2>Leads by Channel</h2>

      {/* Smaller height for dashboard fit */}
      <div style={{ height: "260px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}