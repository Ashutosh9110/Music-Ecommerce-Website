import React, { createContext, useState, useCallback, useEffect, useRef } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const logoutTimerRef = useRef(null);
  const [auth, setAuth] = useState(() => {
    try {
      const storedToken = localStorage.getItem("idToken");
      const storedEmail = localStorage.getItem("email");
      const storedExpiresAt = localStorage.getItem("expiresAt");
      const now = Date.now();
      if (storedToken) {
        if (storedExpiresAt && Number(storedExpiresAt) > now) {
          return { isLoggedIn: true, idToken: storedToken, email: storedEmail };
        }
      }
    } catch {
      // If localStorage is unavailable, fall back to default auth state
    }
    return { isLoggedIn: false, idToken: null, email: null };
  });


  // Logout: clear token and user info
  const logout = useCallback(() => {
    setAuth({ isLoggedIn: false, idToken: null, email: null });
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    try {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      localStorage.removeItem("expiresAt");
    } catch {
      // Ignore storage errors to avoid breaking logout flow
    }
  }, []);


  // Login: store token and user info
  const login = useCallback((idToken, email) => {
    setAuth({ isLoggedIn: true, idToken, email });
    try {
      localStorage.setItem("idToken", idToken);
      if (email) localStorage.setItem("email", email);
      // Set 5-minute expiration from now
      const expiresAt = Date.now() + 5 * 60 * 1000;
      localStorage.setItem("expiresAt", String(expiresAt));
      // Clear any existing timer then start a new auto-logout timer
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, 5 * 60 * 1000);
    } catch {
      // Ignore storage errors to avoid breaking login flow
    }
  }, [logout]);



  // Validate token with Firebase accounts:lookup to ensure it hasn't expired
  useEffect(() => {
    const validateToken = async () => {
      if (!auth?.idToken || !API_KEY) return;
      // Enforce 5-minute token lifetime
      const storedExpiresAt = Number(localStorage.getItem("expiresAt") || 0);
      const now = Date.now();
      if (!storedExpiresAt || storedExpiresAt <= now) {
        logout();
        return;
      }
      // Align auto-logout timer with remaining lifetime if needed
      const remainingMs = storedExpiresAt - now;
      if (!logoutTimerRef.current) {
        logoutTimerRef.current = setTimeout(() => {
          logout();
        }, remainingMs);
      }
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: auth.idToken }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          // Token invalid/expired → force logout and clear storage
          logout();
          return;
        }
        // Optionally refresh email from Firebase response if present
        const fetchedEmail = data?.users?.[0]?.email;
        if (fetchedEmail && fetchedEmail !== auth.email) {
          setAuth((prev) => ({ ...prev, email: fetchedEmail }));
          try {
            localStorage.setItem("email", fetchedEmail);
          } catch {
            // Ignore storage errors
          }
        }
      } catch {
        // On network or other errors, be conservative and logout to avoid using invalid token
        logout();
      }
    };

    validateToken();
    // Only re-run when idToken changes or API key updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.idToken, API_KEY]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
