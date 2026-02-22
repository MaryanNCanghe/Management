import styles from "../MarketingStyle.module.scss";

export default function MarketingKPIs() {
  const adSpend = 3900;
  const leads = 190;
  const conversions = 56;
  const revenue = 15000;

  const cpl = adSpend / leads;
  const conversionRate = conversions / leads;
  const roi = (revenue - adSpend) / adSpend;

  return (
    <div className={styles.kpiGrid}>

      <div className={styles.kpiCard}>
        <h3>Cost per Lead</h3>
        <p>${cpl.toFixed(2)}</p>
      </div>

      <div className={styles.kpiCard}>
        <h3>Conversion Rate</h3>
        <p>{(conversionRate * 100).toFixed(2)}%</p>
      </div>

      <div className={styles.kpiCard}>
        <h3>ROI</h3>
        <p>{(roi * 100).toFixed(2)}%</p>
      </div>

    </div>
  );
}
