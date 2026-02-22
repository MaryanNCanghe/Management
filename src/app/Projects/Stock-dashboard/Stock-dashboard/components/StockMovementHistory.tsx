'use client';

import { useInventory, StockMovement } from './InventoryProvider';
import styles from '../Inventory.module.scss';

export default function StockMovementHistory() {
  const { movements, products, loading } = useInventory();

  if (loading) return <div>Loading…</div>;

  const productById = new Map(products.map(p => [String(p.id), p]));

  return (
    <div className={styles.section}>
      <h3>Stock Movement History</h3>

      {movements.length === 0 ? (
        <p>No stock movements yet.</p>
      ) : (
        <ul>
          {movements.map((m: StockMovement) => {
            const p = productById.get(String(m.product_id));
            const name = p?.name ?? 'Unknown product';
            const color = m.change > 0 ? '#22c55e' : '#ef4444';
            return (
              <li key={m.id} style={{ marginBottom: 8 }}>
                <strong>{name}:</strong>{' '}
                <span style={{ color }}>{m.change > 0 ? `+${m.change}` : m.change}</span>{' '}
                <em>({m.reason})</em> — {new Date(m.created_at).toLocaleString()}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}