import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./components/Products";
import Header from "./components/Header";
import About from "./components/About";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";
import AuthForm from "./components/AuthForm";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ChangePassword from "./components/ChangePassword";

function App() {
  const RequireAuth = ({ children }) => {
    const { auth } = useContext(AuthContext);
    if (!auth?.isLoggedIn) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <RequireAuth>
                  <>
                    <Movie />
                    <h2 className="text-center mt-4">Products</h2>
                    <Products />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/products/:id"
              element={
                <RequireAuth>
                  <ProductDetail />
                </RequireAuth>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
