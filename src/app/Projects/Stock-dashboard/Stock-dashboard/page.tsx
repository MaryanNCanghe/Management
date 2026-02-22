import styles from './Inventory.module.scss';
import InventoryProvider from './components/InventoryProvider';

import StockLevels from './components/StockLevels';
import LowStockAlerts from './components/LowStockAlerts';
import RestockRecommendations from './components/RestockRecommendations';
import StockTable from './components/StockTable';
import StockMovementHistory from './components/StockMovementHistory';
import SupplierList from './components/SupplierList';

export default function InventoryPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inventory Management</h1>

      <InventoryProvider>
        <StockLevels />
        <LowStockAlerts threshold={5} limit={5} />
        <RestockRecommendations />
        <StockTable />
        <StockMovementHistory />
        <SupplierList />
      </InventoryProvider>
    </div>
  );
}