import s from '../BussinessDev.module.scss';

export default function KPIChips({
  items,
}: {
  items: { label: string; tone?: 'success' | 'warn' | 'danger' }[];
}) {
  return (
    <div className={s.kpis}>
      {items.map((k, i) => (
        <span key={i} className={`${s.kpi} ${k.tone ? k.tone : ''}`}>{k.label}</span>
      ))}
    </div>
  );
}