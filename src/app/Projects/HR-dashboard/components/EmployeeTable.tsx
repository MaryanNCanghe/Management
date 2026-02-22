// src/app/Projects/HR-dashboard/components/EmployeeTable.tsx
'use client';
import styles from '../HR.module.scss';
import { useHRData } from './HRDataContext';

function fmt(d?: string | null) {
  if (!d) return '—';
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return '—';
  return dt.toLocaleDateString();
}

export default function EmployeeTable() {
  const { employees, loading, error } = useHRData();

  return (
    <div className={styles.card}>
      <div className={styles.sectionTitle}>Employees</div>
      {error && <div className={styles.helper}>Error: {error}</div>}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dept</th>
              <th>Role</th>
              <th>Email</th>
              <th>Hire date</th>
              <th>Termination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className={styles.helper}>Loading…</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan={7} className={styles.helper}>No employees yet.</td></tr>
            ) : (
              employees.map(e => (
                <tr key={e.id}>
                  <td>{[e.first_name, e.last_name].filter(Boolean).join(' ') || '—'}</td>
                  <td>{e.department || '—'}</td>
                  <td>{e.role || '—'}</td>
                  <td>{e.email || '—'}</td>
                  <td>{fmt(e.hire_date)}</td>
                  <td>{fmt(e.termination_date)}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        e.status === 'active' ? styles.statusActive : styles.statusTerminated
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}