// src/app/Projects/HR-dashboard/components/PerformanceDistribution.tsx
'use client';
import styles from '../HR.module.scss';
import { useHRData } from './HRDataContext';

type Bucket = { score: number; count: number };

function getDistribution(reviews: ReturnType<typeof useHRData>['reviews']): Bucket[] {
  // Use the latest review per employee
  const latestByEmployee = new Map<string, number>(); // employee_id -> score
  for (const r of reviews) {
    const prev = latestByEmployee.get(r.employee_id);
    // reviews fetched descending by date in provider, so first encountered is latest
    if (prev === undefined) latestByEmployee.set(r.employee_id, r.score);
  }
  const buckets: Bucket[] = Array.from({ length: 5 }, (_, i) => ({ score: i + 1, count: 0 }));
  for (const score of latestByEmployee.values()) {
    if (score >= 1 && score <= 5) buckets[score - 1].count += 1;
  }
  return buckets;
}

export default function PerformanceDistribution() {
  const { reviews, loading } = useHRData();
  const dist = loading ? [] : getDistribution(reviews);
  const max = dist.length ? Math.max(...dist.map(d => d.count)) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.sectionTitle}>Performance distribution (latest review)</div>
      {loading ? (
        <div className={styles.helper}>Loading…</div>
      ) : dist.length === 0 ? (
        <div className={styles.helper}>No reviews yet.</div>
      ) : (
        <div className={styles.chart}>
          {dist.map(d => {
            const pct = max === 0 ? 0 : (d.count / max) * 100;
            return (
              <div key={d.score} className={styles.barRow}>
                <div className={styles.barLabel}>{d.score}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%` }} />
                </div>
                <div className={styles.badge}>{d.count}</div>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.footerNote}>Scale 1 (low) → 5 (high)</div>
    </div>
  );
}