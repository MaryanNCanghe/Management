import s from '../BussinessDev.module.scss';

export default function MetricBar({
  label, value, hint
}: { label: string; value: number; hint?: string }) {
  return (
    <div className={s.metric} style={{ ['--value' as any]: `${value}%` }}>
      <div className={s.metricLabel}>
        <span>{label}</span>
        <span>{hint ?? `${value}%`}</span>
      </div>
      <div className={s.bar}><div className={s.fill} /></div>
    </div>
  );
}