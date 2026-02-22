'use client';

import { useInventory, Supplier } from './InventoryProvider';
import styles from '../Inventory.module.scss';

export default function SupplierList() {
  const { suppliers, purchaseOrders, loading } = useInventory();

  if (loading) return <div>Loading…</div>;

  const posBySupplier = new Map<string, typeof purchaseOrders>();
  for (const s of suppliers) posBySupplier.set(s.id, []);
  for (const po of purchaseOrders) {
    const arr = posBySupplier.get(po.supplier_id) ?? [];
    arr.push(po);
    posBySupplier.set(po.supplier_id, arr);
  }

  const nextETA = (supplierId: string) => {
    const arr = posBySupplier.get(supplierId) ?? [];
    const pending = arr.filter(p => p.status !== 'received' && p.expected_date);
    if (pending.length === 0) return '—';
    const soonest = pending.sort(
      (a, b) => new Date(a.expected_date as string).getTime() - new Date(b.expected_date as string).getTime()
    )[0];
    return soonest.expected_date ? new Date(soonest.expected_date).toLocaleDateString() : '—';
    };

  return (
    <div className={styles.section}>
      <h3>Suppliers</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lead time (days)</th>
            <th>POs</th>
            <th>Next ETA</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s: Supplier) => {
            const pos = posBySupplier.get(s.id) ?? [];
            return (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.lead_time_days ?? '—'}</td>
                <td>{pos.length}</td>
                <td>{nextETA(s.id)}</td>
                <td>
                  {s.contact_email ?? '—'}
                  {s.phone ? ` / ${s.phone}` : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
