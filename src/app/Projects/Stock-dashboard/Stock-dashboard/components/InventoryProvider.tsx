'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * NOTE on BIGINT ids:
 * PostgREST may return BIGINT as number or string depending on config.
 * We accept both: number | string to be safe across environments.
 */

export type Product = {
  id: number | string;
  slug: string;
  name: string;
  description?: string | null;
  price_cents?: number | null;
  main_image_url?: string | null;
  created_at?: string;
};

export type Supplier = {
  id: string; // uuid
  name: string;
  contact_email?: string | null;
  phone?: string | null;
  lead_time_days?: number | null;
  created_at?: string;
};

export type StockRow = {
  id: string; // uuid
  product_id: number | string;
  quantity: number;
  updated_at: string;
  // Supabase join returns ARRAY (Option A)
  products?: Product[];
};

export type StockMovement = {
  id: string; // uuid
  product_id: number | string;
  change: number;
  reason: 'restock' | 'sale' | 'adjustment' | (string & {});
  created_at: string;
};

export type PurchaseOrder = {
  id: string; // uuid
  product_id: number | string;
  supplier_id: string; // uuid
  quantity: number;
  status: 'pending' | 'ordered' | 'received' | (string & {});
  expected_date: string | null;
  created_at: string;
};

export type InventoryContextType = {
  products: Product[];
  stock: StockRow[];
  suppliers: Supplier[];
  movements: StockMovement[];
  purchaseOrders: PurchaseOrder[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

type ProviderProps = React.PropsWithChildren<{}>;

export function InventoryProvider({ children }: ProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [stock, setStock] = useState<StockRow[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    setLoading(true);
    try {
      const [prodRes, stockRes, suppRes, movRes, poRes] = await Promise.all([
        supabase
          .from('products')
          .select('id, slug, name, description, price_cents, main_image_url, created_at'),
        supabase
          .from('stock_levels')
          .select(`
            id,
            product_id,
            quantity,
            updated_at,
            products ( id, slug, name, description, price_cents, main_image_url, created_at )
          `),
        supabase
          .from('suppliers')
          .select('id, name, contact_email, phone, lead_time_days, created_at'),
        supabase
          .from('stock_movements')
          .select('id, product_id, change, reason, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('purchase_orders')
          .select('id, product_id, supplier_id, quantity, status, expected_date, created_at')
          .order('created_at', { ascending: false }),
      ]);

      if (prodRes.error) throw prodRes.error;
      if (stockRes.error) throw stockRes.error;
      if (suppRes.error) throw suppRes.error;
      if (movRes.error) throw movRes.error;
      if (poRes.error) throw poRes.error;

      setProducts((prodRes.data ?? []) as Product[]);
      setStock((stockRes.data ?? []) as StockRow[]);
      setSuppliers((suppRes.data ?? []) as Supplier[]);
      setMovements((movRes.data ?? []) as StockMovement[]);
      setPurchaseOrders((poRes.data ?? []) as PurchaseOrder[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const value: InventoryContextType = {
    products,
    stock,
    suppliers,
    movements,
    purchaseOrders,
    loading,
    refresh: load,
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory(): InventoryContextType {
  const ctx = useContext(InventoryContext);
  if (!ctx) {
    throw new Error('useInventory must be used within <InventoryProvider>');
  }
  return ctx;
}

export default InventoryProvider;