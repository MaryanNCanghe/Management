import styles from "../MarketingStyle.module.scss";

export default function MarketingFunnel() {
  const steps = [
    { label: "Website Visits", value: 5000 },
    { label: "Leads", value: 190 },
    { label: "Qualified Leads", value: 120 },
    { label: "Conversions", value: 56 },
  ];

  return (
    <div className={styles.funnelBox}>
      <h2>Marketing Funnel</h2>

      <div className={styles.funnel}>
        {steps.map((step, i) => (
          <div key={i} className={styles.funnelStep}>
            <span>{step.label}</span>
            <strong>{step.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}