'use client';
import React from 'react';
import s from '../BussinessDev.module.scss';

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ title, subtitle, className, children }: Props) {
  return (
    <section className={`${s.panel} ${className ?? ''}`}>
      <h2 className={s.h2}>{title}</h2>
      {subtitle && <p className={s.p}>{subtitle}</p>}
      {children}
    </section>
  );
}
``