'use client';

import { useInventory } from './InventoryProvider';
import styles from '../Inventory.module.scss';

export default function StockTable() {
  const { stock, loading } = useInventory();

  if (loading) return <div>Loading…</div>;

  return (
    <div className={styles.section}>
      <h3>Stock Levels</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Slug</th>
            <th>Qty</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(s => (
            <tr key={s.id}>
              <td>{s.products?.[0]?.name ?? '—'}</td>
              <td>{s.products?.[0]?.slug ?? '—'}</td>
              <td>{s.quantity}</td>
              <td>{new Date(s.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}