'use client';

import s from './Executive.module.scss';

// Use local Executive components
import Section from './component/Section';
import Accordion from './component/Accordion';
import MetricBar from './component/MetricBar';
import KPIChips from './component/KPIChips';

// Feature blocks
import CalendarTravel from './component/calendar-travel';
import InboxMeetings from './component/inbox-meetings';
import StepTimeline from './component/StepTimeline';

export default function ExecutiveSupportPage() {
  return (
    <main className={`${s.container} light` /* remove 'light' for dark theme */}>
      <header className={s.header}>
        <div>
          <h1 className={s.title}>Executive Support</h1>
         
        </div>
      </header>

      <div className={s.grid}>
        {/* Overview */}


<Section title="90‑Day Ops Rollout" className="span-12">
  <StepTimeline
    steps={[
      { title: 'Weeks 1–2 • Audit', detail: 'Calendar, inbox, meetings, travel, vendors.' },
      { title: 'Weeks 3–4 • Foundations', detail: 'Rules, templates, intake forms, weekly cadence.' },
      { title: 'Weeks 5–8 • Execution', detail: 'Pilot routines, automate, tune SLAs, vendor alignment.' },
      { title: 'Weeks 9–12 • Scale', detail: 'Expand playbooks, add reporting, formalize handoffs.' },
    ]}
  />
</Section>
       


        <InboxMeetings />

        {/* Documentation & Knowledge Base */}
        <Section title="Documentation & Knowledge Base" className="span-6">
          <Accordion
            items={[
              {
                q: 'SOPs & templates',
                a: (
                  <ul>
                    <li>Meeting intake, briefing doc, recap format, vendor onboarding.</li>
                    <li>Naming conventions and versioning rules.</li>
                  </ul>
                ),
              },
              {
                q: 'Storage & access',
                a: (
                  <ul>
                    <li>Shared drive structure by function + permissions matrix.</li>
                    <li>Quarterly access review and archive policy.</li>
                  </ul>
                ),
              },
            ]}
          />
        </Section>

        {/* Reporting */}
        <Section title="Reporting & Dashboards" className="span-6">
          <p className={s.p}>
            Weekly executive digest tracks decisions, risks, and follow‑ups; monthly snapshot covers
            time allocation, meeting load, and operational health.
          </p>
          <div style={{ marginTop: 12 }}>
            <MetricBar label="On‑time pre‑reads" value={92} />
            <MetricBar label="Action items closed on schedule" value={74} />
            <MetricBar label="Meeting → decision conversion" value={61} />
          </div>
        </Section>

        
        {/* Risk & Compliance */}
        <Section title="Risk & Compliance" className="span-12">
          <KPIChips
            items={[
              { label: 'Access: least‑privilege', tone: 'success' },
              { label: 'PII handling: restricted channels', tone: 'warn' },
              { label: 'Backups & versioning: weekly', tone: 'success' },
              { label: 'Vendor due diligence: annual', tone: 'warn' },
            ]}
          />
        </Section>
    <CalendarTravel />


      </div>
    </main>
  );
}