// src/app/Projects/HR-dashboard/page.tsx
import styles from './HR.module.scss';
import { HRDataProvider } from './components/HRDataContext';
import KPIHeadcount from './components/KPIHeadcount';
import KPITurnover from './components/KPITurnover';
import KPIAbsence from './components/KPIAbsence';
import PerformanceDistribution from './components/PerformanceDistribution';
import EmployeeTable from './components/EmployeeTable';

// This page is a Server Component by default — it just renders Client components inside.
export default function HRDashboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>HR Dashboard</div>
          <div className={styles.subtitle}>People analytics for your ecommerce team</div>
        </div>
      </div>

      <HRDataProvider>
        <section className={styles.kpiRow}>
          <KPIHeadcount />
          <KPITurnover />
          <KPIAbsence />
        </section>

        <section className={styles.twoCol}>
          <PerformanceDistribution />
          <div className={styles.card}>
            <div className={styles.sectionTitle}>Notes</div>
            <div className={styles.helper}>
              • Turnover = terminations (12m) / average headcount (approx).<br />
              • Absence = (absent + sick) / all attendance (last 30d).<br />
              • Distribution uses the latest review / employee.
            </div>
          </div>
        </section>

        <EmployeeTable />
      </HRDataProvider>
    </div>
  );
}