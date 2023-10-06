// productsStore.js

import { create } from "zustand";

const useProductsStore = create((set) => ({
  products: [],
  error: null,
  loading: true,
  metadata: { hasNextPage: true, lastCursor: "" },
  fetchProducts: (products = [], metadata = {}) => {
    set((state) => ({
      products: [...state.products, ...products],
      metadata,
      error: null,
    }));
  },
  setError: (error) => {
    set((state) => ({ ...state, error: error?.message }));
  },
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
}));

export default useProductsStore;
