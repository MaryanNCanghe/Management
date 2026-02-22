// src/app/Projects/HR-dashboard/components/KPICard.tsx
'use client';
import styles from '../HR.module.scss';

type Props = {
  title: string;
  value: string | number;
  helper?: string;
  pill?: string;
};

export default function KPICard({ title, value, helper, pill }: Props) {
  return (
    <div className={`${styles.card} ${styles.kpiCard}`}>
      <div className={styles.kpiTitle}>{title}</div>
      <div className={styles.kpiValue}>
        {value}
        {pill && <span className={styles.kpiPill}>{pill}</span>}
      </div>
      {helper && <div className={styles.helper}>{helper}</div>}
    </div>
  );
}