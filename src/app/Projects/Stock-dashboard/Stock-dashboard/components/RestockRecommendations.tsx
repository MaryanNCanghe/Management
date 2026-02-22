'use client';

import { useInventory, StockRow, Supplier } from './InventoryProvider';
import styles from '../Inventory.module.scss';

export default function RestockRecommendations() {
  const { stock, suppliers } = useInventory();

  // simple mock daily sales model for portfolio
  const DAILY_SALES = 3;

  // pick a supplier: prefer lowest lead_time_days
  const bestSupplier = (suppliers: Supplier[]): Supplier | undefined => {
    return suppliers
      .filter(s => s.lead_time_days != null)
      .sort((a, b) => (a.lead_time_days ?? 999) - (b.lead_time_days ?? 999))[0] ?? suppliers[0];
  };

  const sup = bestSupplier(suppliers);
  const lead = sup?.lead_time_days ?? 7;

  const recs = stock
    .map((row: StockRow) => {
      const product = row.products?.[0];
      if (!product) return null;

      const needed = DAILY_SALES * lead;
      const current = row.quantity;
      const deficit = Math.max(0, needed - current);

      return {
        id: row.id,
        product,
        supplier: sup,
        current,
        needed,
        orderQty: deficit === 0 ? 0 : Math.max(10, deficit), // suggest minimum batch 10
        shouldOrder: deficit > 0,
      };
    })
    .filter(Boolean)
    .filter((r: any) => r.shouldOrder) as {
      id: string;
      product: { name: string; slug: string };
      supplier?: Supplier;
      current: number;
      needed: number;
      orderQty: number;
      shouldOrder: boolean;
    }[];

  return (
    <div className={styles.section}>
      <h3>Restock Recommendations</h3>
      {recs.length === 0 ? (
        <p>No restock needed ✔️</p>
      ) : (
        <ul>
          {recs.map(r => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <strong>{r.product.name}</strong> (slug: {r.product.slug}) — stock {r.current}, target {r.needed}{' '}
              → <strong>order {r.orderQty}</strong>{' '}
              {r.supplier ? `from ${r.supplier.name}` : ''}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.alert} style={{ marginTop: 8, opacity: 0.8 }}>
        Assumption: {DAILY_SALES}/day sales, lead time {lead} days. Tune these in code or with settings UI.
      </div>
    </div>
  );
}