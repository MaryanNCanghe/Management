'use client';

import { useMemo } from 'react';
import { useInventory } from './InventoryProvider';
import styles from '../Inventory.module.scss';

export default function StockLevels() {
  const { stock, loading } = useInventory();

  const { totalSkus, totalUnits, lowCount, lastUpdated } = useMemo(() => {
    if (loading || stock.length === 0) {
      return { totalSkus: 0, totalUnits: 0, lowCount: 0, lastUpdated: '—' };
    }
    const totalSkus = stock.length;
    const totalUnits = stock.reduce((sum, s) => sum + (s.quantity ?? 0), 0);
    const lowCount = stock.filter(s => s.quantity < 5).length;
    const lastUpdatedTs = Math.max(...stock.map(s => new Date(s.updated_at).getTime()));
    const lastUpdated = new Date(lastUpdatedTs).toLocaleString();
    return { totalSkus, totalUnits, lowCount, lastUpdated };
  }, [stock, loading]);

  return (
    <div className={styles.section}>
      <h3>Inventory Overview</h3>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <div>
            <div style={{ color: '#9fb0c7', fontSize: 12 }}>SKUs</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{totalSkus}</div>
          </div>
          <div>
            <div style={{ color: '#9fb0c7', fontSize: 12 }}>Total units</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{totalUnits}</div>
          </div>
          <div>
            <div style={{ color: '#9fb0c7', fontSize: 12 }}>Low stock (&lt;5)</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{lowCount}</div>
          </div>
          <div>
            <div style={{ color: '#9fb0c7', fontSize: 12 }}>Last update</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{lastUpdated}</div>
          </div>
        </div>
      )}
    </div>
  );
}