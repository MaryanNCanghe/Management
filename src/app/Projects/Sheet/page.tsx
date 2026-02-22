'use client';

import { useEffect, useState } from 'react';
import styles from './sheet.module.scss';

type Shot = {
  src: string;     // e.g. /sheet/excel-1.png
  alt: string;     // accessible text
};

const shots: Shot[] = [
  { src: '/sheet/E1.png',    alt: 'Excel Salary sheet' },
  //{ src: '/sheet/E2.png',    alt: 'Excel pivot report' },
  //{src: '/sheet/E3.png',    alt: 'Excel pivot report' },
  { src: '/sheet/S1.png', alt: 'Supabase Logic & Analyse view' },
  { src: '/sheet/S2.png', alt: 'Supabase Database scheme view' },
   { src: '/sheet/S3.png', alt: 'Supabase Database Tables' },
    { src: '/sheet/S4.png', alt: 'Supabase SQL Database Tables' },
  // Add more as needed...
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Close on Esc key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight' && openIndex !== null) {
        setOpenIndex((prev) => (prev === null ? null : (prev + 1) % shots.length));
      }
      if (e.key === 'ArrowLeft' && openIndex !== null) {
        setOpenIndex((prev) => (prev === null ? null : (prev - 1 + shots.length) % shots.length));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sheets — Excel & Supabase</h1>
        <p className={styles.subtitle}>
          A minimal gallery showcasing my spreadsheet and database views. Click any image to open.
        </p>
      </header>

      <section className={styles.grid} aria-label="Gallery de capturas de Excel y Supabase">
        {shots.map((shot, i) => (
          <figure key={shot.src} className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.alt}
              className={styles.thumb}
              loading="lazy"
              decoding="async"
              onClick={() => setOpenIndex(i)}
            />
            <figcaption className={styles.caption}>{shot.alt}</figcaption>
          </figure>
        ))}
      </section>

      {/* Lightbox Modal */}
      {openIndex !== null && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setOpenIndex(null)}
        >
          <button
            className={styles.close}
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
          >
            ✕
          </button>

          <button
            className={styles.navLeft}
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((prev) =>
                prev === null ? null : (prev - 1 + shots.length) % shots.length
              );
            }}
          >
            ‹
          </button>

          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shots[openIndex].src}
              alt={shots[openIndex].alt}
              className={styles.full}
            />
            <div className={styles.modalCaption}>{shots[openIndex].alt}</div>
          </div>

          <button
            className={styles.navRight}
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((prev) =>
                prev === null ? null : (prev + 1) % shots.length
              );
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}