'use client';

import React, { useId, useState } from 'react';
import s from '../Executive.module.scss';

export type AccordionItem = { q: string; a: React.ReactNode };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const groupId = useId();

  return (
    <div className={s.accordion}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${groupId}-btn-${i}`;
        const panelId = `${groupId}-panel-${i}`;

        return (
          <div key={i} className={`${s.accordionItem} ${isOpen ? 'open' : ''}`}>
            <button
              id={btnId}
              className={s.accordionBtn}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{it.q}</span>
              <i aria-hidden className={s.chev} />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className={s.answer}
            >
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}