"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cloneDeep } from "lodash";

const initialCartState = {
  items: [],
  total: 0,
};

// cart context
const CartContext = createContext({
  cartState: initialCartState,
  addItem: () => {},
  removeItem: (productId) => {},
  increaseQuantity: (productId) => {},
  decreaseQuantity: (productId) => {},
  clearCart: () => {},
});

// cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return addItemToCart(state, action.payload);
    case "REMOVE_ITEM":
      return removeItemFromCart(state, action.payload);
    case "INCREASE_QUANTITY":
      return increaseQuantity(state, action.payload);
    case "DECREASE_QUANTITY":
      return decreaseQuantity(state, action.payload);
    case "CLEAR_CART":
      return clearCart();
    case "SET_CART":
      return action.payload;
    default:
      return state;
  }
};

// dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
// reducer methods
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const addItemToCart = (state, item) => {
  const updatedCart = cloneDeep(state);
  const existingItemIndex = updatedCart.items.findIndex(
    (i) => i.id === item.id
  );

  if (existingItemIndex !== -1) {
    updatedCart.items[existingItemIndex].quantity += item.quantity;
  } else {
    updatedCart.items.push(item);
  }

  updatedCart.total = calculateTotal(updatedCart.items);
  return updatedCart;
};

const removeItemFromCart = (state, itemId) => {
  const updatedCart = cloneDeep(state);
  const itemIndex = updatedCart.items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    updatedCart.items.splice(itemIndex, 1);
    updatedCart.total = calculateTotal(updatedCart.items);
  }

  return updatedCart;
};

const increaseQuantity = (state, itemId) => {
  const updatedCart = cloneDeep(state);
  const item = updatedCart.items.find((item) => item.id === itemId);

  if (item) {
    item.quantity++;
    updatedCart.total = calculateTotal(updatedCart.items);
  }

  return updatedCart;
};

const decreaseQuantity = (state, itemId) => {
  const updatedCart = cloneDeep(state);
  const item = updatedCart.items.find((item) => item.id === itemId);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
      updatedCart.total = calculateTotal(updatedCart.items);
    } else {
      const itemIndex = updatedCart.items.findIndex(
        (item) => item.id === itemId
      );
      updatedCart.items.splice(itemIndex, 1);
      updatedCart.total = calculateTotal(updatedCart.items);
    }
  }

  return updatedCart;
};

// cart context provider
const clearCart = () => {
  return cloneDeep(initialCartState);
};

const Cart = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  const increaseQuantity = (itemId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: itemId });
  };

  const decreaseQuantity = (itemId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {/* Render your cart components */}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default Cart;
