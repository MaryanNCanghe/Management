// src/app/Projects/HR-dashboard/components/KPITurnover.tsx
'use client';
import KPICard from './KPICard';
import { useHRData } from './HRDataContext';

function calcTurnoverRate(employees: ReturnType<typeof useHRData>['employees']): number {
  // Period: last 365 days
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 365);

  const terminatedInPeriod = employees.filter(
    e =>
      e.status === 'terminated' &&
      e.termination_date &&
      new Date(e.termination_date) >= start &&
      new Date(e.termination_date) <= end
  ).length;

  const activeNow = employees.filter(e => e.status === 'active').length;
  const totalConsidered = employees.length;

  // Simple approximation of avg headcount for portfolio:
  const avgHeadcount = Math.max(1, Math.round((activeNow + totalConsidered) / 2));
  return (terminatedInPeriod / avgHeadcount) * 100;
}

export default function KPITurnover() {
  const { employees, loading } = useHRData();
  const rate = loading ? 0 : calcTurnoverRate(employees);

  return (
    <KPICard
      title="Turnover rate (12m)"
      value={loading ? '—' : `${rate.toFixed(1)}%`}
      helper="Terminations vs. average headcount"
    />
  );
}