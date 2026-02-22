'use client';

import { useMemo, useState } from 'react';
import { useInventory, StockRow } from './InventoryProvider';
import styles from '../Inventory.module.scss';

type LowStockAlertsProps = {
  threshold?: number;   // default: 5
  limit?: number;       // default: all
  includeEquals?: boolean; // default: false
};

export default function LowStockAlerts({
  threshold = 5,
  limit,
  includeEquals = false,
}: LowStockAlertsProps) {
  const { stock, loading } = useInventory();
  const [showAll, setShowAll] = useState(false);

  const getName = (row: StockRow) => row.products?.[0]?.name ?? 'Unknown product';
  const getSlug = (row: StockRow) => row.products?.[0]?.slug ?? '—';

  const filtered = useMemo(() => {
    const cmp = includeEquals ? (q: number) => q <= threshold : (q: number) => q < threshold;
    const items = stock.filter(s => cmp(s.quantity)).sort((a, b) => a.quantity - b.quantity);
    if (!limit || showAll) return items;
    return items.slice(0, limit);
  }, [stock, threshold, includeEquals, limit, showAll]);

  if (loading) {
    return (
      <div className={styles.section}>
        <h3>Low Stock Alerts</h3>
        <p>Loading…</p>
      </div>
    );
  }

  const totalMatches = stock.filter(s =>
    includeEquals ? s.quantity <= threshold : s.quantity < threshold
  ).length;

  return (
    <div className={styles.section}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Low Stock Alerts</h3>
        <div style={{ fontSize: 12, color: '#9fb0c7' }}>
          Threshold: <strong>{includeEquals ? '≤' : '<'} {threshold}</strong>
        </div>
      </div>

      {totalMatches === 0 ? (
        <p>All stock levels healthy ✔️</p>
      ) : (
        <>
          <ul style={{ marginTop: 12 }}>
            {filtered.map(item => {
              const name = getName(item);
              const slug = getSlug(item);
              const qty = item.quantity;
              const critical = qty <= Math.max(1, Math.floor(threshold / 2));

              return (
                <li key={item.id} style={{ marginBottom: 8, lineHeight: 1.4 }}>
                  <span className={styles.alert}>{critical ? '⚠️' : '❗'} {name}</span>{' '}
                  <span style={{ color: '#9fb0c7' }}>(slug: {slug})</span>{' '}
                  — <strong>{qty}</strong> left
                </li>
              );
            })}
          </ul>

          {!showAll && limit && totalMatches > limit && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              style={{
                marginTop: 8,
                padding: '6px 10px',
                background: 'transparent',
                border: '1px solid #1e263a',
                borderRadius: 8,
                color: '#e6ebf3',
                cursor: 'pointer',
              }}
            >
              Show all ({totalMatches})
            </button>
          )}
        </>
      )}
    </div>
  );
}