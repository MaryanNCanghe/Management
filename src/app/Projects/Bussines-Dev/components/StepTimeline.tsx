import s from '../BussinessDev.module.scss';

export default function StepTimeline({
  steps,
}: { steps: { title: string; detail?: string }[] }) {
  return (
    <div className={s.timeline}>
      {steps.map((st, i) => (
        <div className={s.step} key={i}>
          <span className={s.dot} />
          <div>
            <strong>{st.title}</strong>
            {st.detail && <div className={s.p}>{st.detail}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
``