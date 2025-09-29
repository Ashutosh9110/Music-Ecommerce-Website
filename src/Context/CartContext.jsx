import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.title === product.title
      );

      if (existingIndex !== -1) {
        // increase quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      } else {
        // add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
