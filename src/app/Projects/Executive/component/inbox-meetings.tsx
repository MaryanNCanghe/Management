import Section from './Section';
import Accordion from './Accordion';
import MetricBar from './MetricBar';
import KPIChips from './KPIChips';
import s from '../Executive.module.scss';


/**
 * Inbox & Meetings component
 * - Uses local Executive components (no images)
 * - Drop this inside the grid on /Projects/Executive/page.tsx
 */
export default function InboxMeetings() {
  return (
    <>
      {/* Inbox Rules */}
      <Section
        title="Inbox Command"
        subtitle="Priority routing, templates, and escalation paths."
        className="span-6"
      >
        <Accordion
          items={[
            {
              q: 'Triage rules (labels & folders)',
              a: (
                <ul>
                  <li>P1: decision/deadline today. P2: 24h. P3: batch daily.</li>
                  <li>Smart folders: Finance / Travel / Vendor / Internal.</li>
                </ul>
              ),
            },
            {
              q: 'Templates & macros',
              a: (
                <ul>
                  <li>Intro, decline, reschedule, pre‑reads request.</li>
                  <li>Auto‑insert meeting link + agenda outline.</li>
                  <li>Doc request bundle (bio, logo, invoice/PO).</li>
                </ul>
              ),
            },
            {
              q: 'Escalation policy',
              a: (
                <ul>
                  <li>Only P1 via SMS/chat and include decision context.</li>
                  <li>Quiet hours respected; hard‑stop windows defined.</li>
                </ul>
              ),
            },
          ]}
        />
      </Section>

      {/* Meeting Operations */}
      <Section
        title="Meeting Operations"
        subtitle="From intake to action log—decision hygiene made repeatable."
        className="span-6"
      >
        <Accordion
          items={[
            {
              q: 'Meeting intake',
              a: (
                <ul>
                  <li>Objective, agenda, files, decision owner, success criteria.</li>
                  <li>Intake form required 24h before slot lock.</li>
                </ul>
              ),
            },
            {
              q: 'Briefing docs',
              a: (
                <ul>
                  <li>1‑pager: context, options, recommendation, risks.</li>
                  <li>Links to pre‑reads and calendar event.</li>
                </ul>
              ),
            },
            {
              q: 'Action log',
              a: (
                <ul>
                  <li>Owner + due date auto‑sent right after meeting.</li>
                  <li>Weekly follow‑up digest for open items.</li>
                </ul>
              ),
            },
          ]}
        />
      </Section>

      {/* Ops Health */}
      <Section title="Operational Health" className="span-12">
        <div style={{ marginTop: 12 }}>
          <MetricBar label="Inbox SLA compliance" value={88} />
          <MetricBar label="On‑time agendas & materials" value={95} />
          <MetricBar label="Action items closed on schedule" value={72} />
        </div>
        <KPIChips
          items={[
            { label: 'Zero missing pre‑reads', tone: 'success' },
            { label: 'Daily inbox cleared by 17:00', tone: 'warn' },
          ]}
        />
      </Section>
    </>
  );
}