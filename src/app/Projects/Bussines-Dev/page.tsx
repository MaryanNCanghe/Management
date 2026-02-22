import s from './BussinessDev.module.scss';
import Section from './components/Section';
import Accordion from './components/Accordion';
import KPIChips from './components/KPIChips';
import StepTimeline from './components/StepTimeline';
import MetricBar from './components/MetricBar';


export default function BusinessDevPage() {
  return (
    <main className={`${s.container} light` /* remove 'light' for dark */}>
      <header className={s.header}>
        <div>
          <h1 className={s.title}>Business Development</h1>
          <p className={s.subtitle}>
            Strategy frameworks and execution plans for taking ideas to market:
            market analysis, SWOT, ICP, value proposition, GTM, and a 90‑day roadmap.
          </p>
        </div>
      </header>

      <div className={s.grid}>
        {/* Market Opportunity */}
        <Section title="Market Opportunity Scan" className="span-8">
          <p className={s.p}>
            Define the space, size the problem, and identify the edge. We assess macro trends,
            category maturity, switching costs, and channel viability to outline a credible path to traction.
          </p>
          <div style={{ marginTop: 14 }}>
            <MetricBar label="Category Growth Potential" value={78} />
            <MetricBar label="Competitive Intensity (lower is better)" value={42} hint="moderate" />
            <MetricBar label="Channel Readiness" value={65} />
          </div>
        </Section>

        {/* KPI Chips */}
        <Section title="North‑Star KPIs" className="span-4">
          <KPIChips items={[
            { label: 'Activation rate ≥ 35%', tone: 'success' },
            { label: 'CAC payback ≤ 6 mo', tone: 'warn' },
            { label: 'LTV:CAC ≥ 3.0', tone: 'success' },
            { label: 'Churn ≤ 3%/mo' },
          ]} />
        </Section>

        {/* SWOT */}
        <Section title="SWOT Analysis" subtitle="A quick internal vs. external snapshot for decision‑making." className="span-6">
          <div className={s.badges}>
            <span className={s.badge} aria-selected="true">Strengths</span>
            <span className={s.badge}>Weaknesses</span>
            <span className={s.badge}>Opportunities</span>
            <span className={s.badge}>Threats</span>
          </div>
          <Accordion items={[
            { q: 'Strengths — leverage to win', a:
              <ul>
                <li>Unique process or IP that speeds delivery.</li>
                <li>Focused niche with proof points and references.</li>
                <li>Lean operations enabling rapid iteration.</li>
              </ul>
            },
            { q: 'Weaknesses — constraints to address', a:
              <ul>
                <li>Limited brand awareness and share of voice.</li>
                <li>Few acquisition channels validated.</li>
                <li>Manual onboarding; low automation.</li>
              </ul>
            },
            { q: 'Opportunities — where to play', a:
              <ul>
                <li>Adjacent segments with high willingness to pay.</li>
                <li>Partnership distribution (platform or agency).</li>
                <li>Educational content and templates as lead magnets.</li>
              </ul>
            },
            { q: 'Threats — defend the moat', a:
              <ul>
                <li>Fast‑moving substitutes commoditizing the offer.</li>
                <li>Platform algorithm shifts impacting organic reach.</li>
                <li>Price compression from low‑cost entrants.</li>
              </ul>
            },
          ]}/>
        </Section>

        {/* ICP */}
        <Section title="ICP (Ideal Customer Profile)" className="span-6">
          <Accordion items={[
            { q: 'Profile', a:
              <ul>
                <li>SMB/Startup teams (5–50), owner‑led or RevOps‑driven.</li>
                <li>Budget: mid‑tier; values speed and measurable ROI.</li>
              </ul>
            },
            { q: 'Jobs‑to‑be‑Done', a:
              <ul>
                <li>Publish consistent, on‑brand collateral quickly.</li>
                <li>Generate qualified pipeline with lower CAC.</li>
              </ul>
            },
            { q: 'Pain Points', a:
              <ul>
                <li>Ad‑hoc processes, inconsistent brand execution.</li>
                <li>Lack of data‑driven prioritization across channels.</li>
              </ul>
            },
            { q: 'Buying Triggers', a:
              <ul>
                <li>New product/market launch; need for GTM structure.</li>
                <li>Missed targets prompting a systemized plan.</li>
              </ul>
            },
          ]}/>
        </Section>

        {/* Value Proposition */}
        <Section title="Value Proposition" className="span-6">
          <p className={s.p}>
            <strong>Promise:</strong> predictably turn content and outreach into pipeline.  
            <strong> Proof:</strong> transparent dashboards, case snapshots, and time‑to‑value under 30 days.
          </p>
          <KPIChips items={[
            { label: 'Time‑to‑First‑Value ≤ 14d', tone: 'success' },
            { label: 'Saves/Share‑rate ↑', tone: 'success' },
            { label: 'Demo→Close ≥ 25%' },
          ]}/>
        </Section>

        {/* GTM Strategy */}
        <Section title="GTM Strategy" subtitle="Message → Channel → Conversion → Revenue" className="span-6">
          <Accordion items={[
            { q: 'Messaging Pillars', a:
              <ul>
                <li>Pain‑removal (save time, reduce CAC)</li>
                <li>Proof (mini‑cases, testimonials, transparent metrics)</li>
                <li>Value (templates, checklists, calculators)</li>
              </ul>
            },
            { q: 'Acquisition Channels', a:
              <ul>
                <li>LinkedIn ABM + partnerships</li>
                <li>Content engine (how‑to, teardown carousels)</li>
                <li>Email nurture with 1–2 lead magnets</li>
                <li>Paid tests on best creatives</li>
              </ul>
            },
            { q: 'Conversion Flow', a:
              <ol>
                <li>Hook (pain/insight)</li>
                <li>Proof (mini case or demo)</li>
                <li>CTA (template, audit, or trial)</li>
              </ol>
            },
          ]}/>
        </Section>

        {/* 90-Day Roadmap */}
        <Section title="90‑Day Roadmap" className="span-8">
          <StepTimeline steps={[
            { title: 'Weeks 1–2 • Research',
              detail: 'Market mapping, competitor scan, SWOT, ICP, core KPIs.' },
            { title: 'Weeks 3–4 • Offer & Asset Build',
              detail: 'Define packages, pricing, and create the core templates.' },
            { title: 'Weeks 5–8 • Validation',
              detail: 'Launch content series, run 2–3 A/B creative tests, partner outreach.' },
            { title: 'Weeks 9–12 • Scale',
              detail: 'Double down on winners, automate ops, introduce paid retargeting.' },
          ]}/>
        </Section>

        {/* Measurement */}
        <Section title="Measurement & Review" className="span-4">
          <p className={s.p}>
            Cadence: weekly creative review, monthly KPI deep dive, quarterly strategy retro.
          </p>
          <div style={{ marginTop: 12 }}>
            <MetricBar label="Acquisition Efficiency" value={72} />
            <MetricBar label="Activation Quality" value={63} />
            <MetricBar label="Retention Health" value={58} />
          </div>
        </Section>
      </div>
    </main>
  );
}
