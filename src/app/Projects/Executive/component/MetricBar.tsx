import React from 'react';
import s from '../Executive.module.scss';

export default function MetricBar({
  label,
  value,
  hint,
}: {
  label: string;
  /** 0–100 */
  value: number;
  hint?: string;
}) {
  const v = Math.max(0, Math.min(100, value)); // clamp

  return (
    <div className={s.metric} style={{ ['--value' as any]: `${v}%` }}>
      <div className={s.metricLabel}>
        <span>{label}</span>
        <span>{hint ?? `${v}%`}</span>
      </div>
      <div className={s.bar}>
        <div className={s.fill} />
      </div>
    </div>
  );
}