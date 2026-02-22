import React from 'react';
import s from '../Executive.module.scss';

type Tone = 'success' | 'warn' | 'danger';

export default function KPIChips({
  items,
}: {
  items: { label: string; tone?: Tone }[];
}) {
  return (
    <div className={s.kpis}>
      {items.map((k, i) => (
        <span key={i} className={`${s.kpi} ${k.tone ?? ''}`}>
          {k.label}
        </span>
      ))}
    </div>
  );
}