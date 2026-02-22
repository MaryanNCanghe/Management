"use client";

import styles from "../MarketingStyle.module.scss";

const campaigns = [
  { name: "Q1 Awareness", channel: "Facebook", spend: 1200, leads: 60, conv: 15 },
  { name: "Spring Promo", channel: "Google Ads", spend: 1800, leads: 90, conv: 32 },
  { name: "Influencers", channel: "Instagram", spend: 900, leads: 40, conv: 9 },
];

export default function CampaignTable() {
  return (
    <div className={styles.tableWrapper}>
      <h2>Campaign Performance</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Channel</th>
            <th>Spend</th>
            <th>Leads</th>
            <th>Conversions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.channel}</td>
              <td>${c.spend}</td>
              <td>{c.leads}</td>
              <td>{c.conv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
