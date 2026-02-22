// src/app/Projects/HR-dashboard/components/KPIAbsence.tsx
'use client';
import KPICard from './KPICard';
import { useHRData } from './HRDataContext';

export default function KPIAbsence() {
  const { attendanceLast30, loading } = useHRData();

  // Absences include 'absent' + 'sick' over last 30 days
  const total = attendanceLast30.length;
  const absences =
    attendanceLast30.filter(a => a.status === 'absent' || a.status === 'sick').length;

  const rate = total === 0 ? 0 : (absences / total) * 100;

  return (
    <KPICard
      title="Absence rate (30d)"
      value={loading ? '—' : `${rate.toFixed(1)}%`}
      helper="(absent + sick) / all attendance records"
    />
  );
}