import React, { createContext, useContext, useEffect, useReducer } from "react";

// Create a context for products
const ProductsContext = createContext();

// Define the products reducer and utility functions for fetching products
const productsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create a provider component for the products context
export const ProductsProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(productsReducer, {
    products: [],
    error: null,
  });

  const fetchProducts = (products) => {
    dispatch({ type: "ADD_ITEM", payload: products });
  };
  const fetchError = (error) => {
    productsDispatch({
      type: "FETCH_PRODUCTS_FAILURE",
      payload: error.message,
    });
  };

  return (
    <ProductsContext.Provider
      value={{ productsState, fetchProducts, fetchError }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to access the products context
export const useProducts = () => useContext(ProductsContext);
