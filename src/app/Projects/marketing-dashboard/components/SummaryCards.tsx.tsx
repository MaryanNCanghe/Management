import styles from "../MarketingStyle.module.scss";

export default function SummaryCards() {
  return (
    <div className={styles.summaryGrid}>
      
      <div className={styles.summaryCard}>
        <h3>Total Ad Spend</h3>
        <p>$3,900</p>
      </div>

      <div className={styles.summaryCard}>
        <h3>Total Leads</h3>
        <p>190</p>
      </div>

      <div className={styles.summaryCard}>
        <h3>Total Conversions</h3>
        <p>56</p>
      </div>

      <div className={styles.summaryCard}>
        <h3>Revenue Generated</h3>
        <p>$15,000</p>
      </div>

    </div>
  );
}
