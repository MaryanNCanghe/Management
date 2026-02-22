// src/app/Projects/HR-dashboard/components/KPIHeadcount.tsx
'use client';
import KPICard from './KPICard';
import { useHRData } from './HRDataContext';

export default function KPIHeadcount() {
  const { employees, loading } = useHRData();
  const headcount = employees.filter(e => e.status === 'active').length;

  return (
    <KPICard
      title="Headcount"
      value={loading ? '—' : headcount}
      helper="Active employees currently on payroll"
    />
  );
}