"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import styles from "../MarketingStyle.module.scss";

ChartJS.register(ArcElement, Tooltip);

export default function TrafficSourcePie() {
  // ===================== PIE 1 — Traffic Source =====================
  const trafficData = {
    labels: ["Organic", "Paid", "Referral"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#7BD389", "#5AA9E6", "#FFC561"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // ===================== PIE 2 — Device Breakdown =====================
  const deviceData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        data: [65, 28, 7],
        backgroundColor: ["#9B59B6", "#5AA9E6", "#7BD389"], // purple, blue, green
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // ===================== PIE 3 — Campaign Reach =====================
  const reachData = {
    labels: ["USA", "Europe", "APAC", "LATAM"],
    datasets: [
      {
        data: [42, 33, 18, 7],
        backgroundColor: ["#FF7A7A", "#FFC561", "#34495E", "#5AA9E6"], // red / yellow / navy / blue
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      {/* PIE 1 */}
      <div className={styles.chartBox}>
        <h2>Traffic Sources</h2>
        <div style={{ height: "200px" }}>
          <Pie data={trafficData} />
        </div>
      </div>

      {/* PIE 2 */}
      <div className={styles.chartBox}>
        <h2>Device Breakdown</h2>
        <div style={{ height: "200px" }}>
          <Pie data={deviceData} />
        </div>
      </div>

      {/* PIE 3 */}
      <div className={styles.chartBox}>
        <h2>Campaign Reach</h2>
        <div style={{ height: "200px" }}>
          <Pie data={reachData} />
        </div>
      </div>
    </div>
  );
}