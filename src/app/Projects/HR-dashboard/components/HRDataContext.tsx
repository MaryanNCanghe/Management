// src/app/Projects/HR-dashboard/components/HRDataContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from "@/lib/supabaseClient";

export type Employee = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  department: string | null;
  role: string | null;
  hire_date: string | null;           // ISO date string
  termination_date: string | null;    // ISO date string
  status: 'active' | 'terminated';
};

export type Attendance = {
  id: string;
  employee_id: string;
  date: string;   // ISO
  status: 'present' | 'absent' | 'sick' | 'remote';
};

export type Review = {
  id: string;
  employee_id: string;
  review_date: string; // ISO
  score: number;       // 1..5
};

type HRData = {
  employees: Employee[];
  attendanceLast30: Attendance[];
  reviews: Review[];
  loading: boolean;
  error?: string;
};

const HRDataContext = createContext<HRData>({
  employees: [],
  attendanceLast30: [],
  reviews: [],
  loading: true,
});

export const HRDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceLast30, setAttendanceLast30] = useState<Attendance[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const sinceISO = since.toISOString().slice(0, 10);

        const [empRes, attRes, revRes] = await Promise.all([
          supabase
            .from('employees')
            .select('id, first_name, last_name, email, department, role, hire_date, termination_date, status')
            .order('hire_date', { ascending: false }),
          supabase
            .from('attendance')
            .select('id, employee_id, date, status')
            .gte('date', sinceISO)
            .order('date', { ascending: false }),
          supabase
            .from('performance_reviews')
            .select('id, employee_id, review_date, score')
            .order('review_date', { ascending: false }),
        ]);

        if (empRes.error) throw empRes.error;
        if (attRes.error) throw attRes.error;
        if (revRes.error) throw revRes.error;

        setEmployees(empRes.data ?? []);
        setAttendanceLast30(attRes.data ?? []);
        setReviews(revRes.data ?? []);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const value = useMemo(
    () => ({ employees, attendanceLast30, reviews, loading, error }),
    [employees, attendanceLast30, reviews, loading, error]
  );

  return <HRDataContext.Provider value={value}>{children}</HRDataContext.Provider>;
};

export const useHRData = () => useContext(HRDataContext);