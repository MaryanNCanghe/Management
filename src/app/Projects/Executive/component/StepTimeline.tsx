import React from 'react';
import s from '../Executive.module.scss'

export default function StepTimeline({
  steps,
}: {
  steps: { title: string; detail?: string }[];
}) {
  return (
    <div className={s.timeline} role="list">
      {steps.map((st, i) => (
        <div className={s.step} role="listitem" key={i}>
          <span className={s.dot} aria-hidden />
          <div>
            <strong>{st.title}</strong>
            {st.detail && <div className={s.p}>{st.detail}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}