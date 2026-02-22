'use client';

import s from '../Executive.module.scss';
import Section from './Section';
import KPIChips from './KPIChips';
import Accordion from './Accordion';

export default function CalendarTravelPage() {
  return (
    <main className={`${s.container} light`}>
      
      <div className={s.grid}>


        <Section title="Travel Workflow" className="span-6">
          <Accordion
            items={[
              {
                q: 'Intake form',
                a: (
                  <ul>
                    <li>Dates, purpose, preferences, budget, constraints.</li>
                  </ul>
                ),
              },
              {
                q: 'Itinerary pack',
                a: (
                  <ul>
                    <li>All confirmations + maps + calendar holds.</li>
                  </ul>
                ),
              },
              {
                q: 'Contingency',
                a: (
                  <ul>
                    <li>Vendor contacts, backup routes, remote links.</li>
                  </ul>
                ),
              },
            ]}
          />
        </Section>

        <Section title="SLAs & Metrics" className="span-12">
          <KPIChips
            items={[
              { label: 'Request→proposal ≤ 2h', tone: 'success' },
              { label: 'Change confirmations ≤ 30m', tone: 'success' },
              { label: 'Missed connections = 0', tone: 'danger' },
            ]}
          />
        </Section>

       

      </div>
    </main>
  );
}