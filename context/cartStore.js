// cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      cartOpen: false,
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (i) => i.id === item.id
          );

          if (existingItemIndex !== -1) {
            state.cart[existingItemIndex].quantity += item.quantity;
          } else {
            state.cart.push(item);
          }

          state.total = state.cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        }),
      removeItem: (itemId) =>
        set((state) => {
          const itemIndex = state.cart.findIndex((item) => item.id === itemId);

          if (itemIndex !== -1) {
            state.cart.splice(itemIndex, 1);
            state.total = state.cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
          }
        }),
      increaseQuantity: (itemId) =>
        set((state) => {
          const item = state.cart.find((item) => item.id === itemId);

          if (item) {
            item.quantity++;
            state.total = state.cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
          }
        }),
      decreaseQuantity: (itemId) =>
        set((state) => {
          const item = state.cart.find((item) => item.id === itemId);

          if (item) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              const itemIndex = state.cart.findIndex(
                (item) => item.id === itemId
              );
              state.cart.splice(itemIndex, 1);
            }

            state.total = state.cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
          }
        }),
      clearCart: () =>
        set((state) => {
          state.cart = [];
          state.total = 0;
          state.cartOpen = false;
        }),
      toggleCart: () =>
        set((state) => {
          state.cartOpen = !state.cartOpen;
        }),
    }),
    {
      name: "cart-storage", // Store name for persistence
    }
  )
);

export default useCartStore;
