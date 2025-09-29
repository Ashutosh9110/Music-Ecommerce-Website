import React, { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, idToken: null, email: null });

  // Login: store token and user info
  const login = useCallback((idToken, email) => {
    setAuth({ isLoggedIn: true, idToken, email });
  }, []);

  // Logout: clear token and user info
  const logout = useCallback(() => {
    setAuth({ isLoggedIn: false, idToken: null, email: null });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
