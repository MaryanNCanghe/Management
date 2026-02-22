'use client';
import React, { useState } from 'react';
import s from '../BussinessDev.module.scss';

export default function Accordion({
  items,
}: {
  items: { q: string; a: React.ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={s.accordion}>
      {items.map((it, i) => (
        <div key={i} className={`${s.accordionItem} ${open === i ? 'open' : ''}`}>
          <button className={s.accordionBtn} onClick={() => setOpen(open === i ? null : i)}>
            <span>{it.q}</span>
            <i className={s.chev} />
          </button>
          {open === i && <div className={s.answer}>{it.a}</div>}
        </div>
      ))}
    </div>
  );
}