import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { auth } = useContext(AuthContext);
  const isMountedRef = useRef(false);
  const saveTimeoutRef = useRef(null);
  const DB_URL = import.meta.env.VITE_DB_URL || "https://react-movie-base-185d9-default-rtdb.firebaseio.com";

  const getUserKey = (email) => {
    if (!email) return null;
    // Sanitize email to use as a Firebase RTDB key
    return email.replace(/[^a-zA-Z0-9]/g, "");
  };

  const fetchCartForUser = async (email) => {
    if (!DB_URL || !email) return;
    const userKey = getUserKey(email);
    try {
      const resp = await fetch(`${DB_URL}/carts/${userKey}.json`);
      if (!resp.ok) throw new Error("Failed to fetch cart");
      const data = await resp.json();
      setCartItems(Array.isArray(data) ? data : []);
    } catch {
      // On failure, start with empty cart for safety
      setCartItems([]);
    }
  };

  const saveCartForUser = async (email, items) => {
    if (!DB_URL || !email) return;
    const userKey = getUserKey(email);
    try {
      await fetch(`${DB_URL}/carts/${userKey}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });
    } catch {
      // Ignore save errors to avoid breaking UI
    }
  };

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

  // Load cart on login; clear cart on logout
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    }
    if (auth?.isLoggedIn && auth?.email) {
      fetchCartForUser(auth.email);
    } else {
      setCartItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isLoggedIn, auth?.email]);

  // Persist cart to backend whenever items change for a logged-in user
  useEffect(() => {
    if (!auth?.isLoggedIn || !auth?.email) return;
    // Debounce saves to avoid excessive network calls on rapid updates
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveCartForUser(auth.email, cartItems);
    }, 300);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, auth?.isLoggedIn, auth?.email]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
