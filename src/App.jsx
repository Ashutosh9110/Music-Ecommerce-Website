import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
const Products = lazy(() => import("./components/Products"));
const Header = lazy(() => import("./components/Header"));
const About = lazy(() => import("./components/About"));
import { CartProvider } from "./context/CartContext";
import "./App.css";
const Home = lazy(() => import("./components/Home"));
const Movie = lazy(() => import("./components/Movie"));
const Contact = lazy(() => import("./components/Contact"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const AuthForm = lazy(() => import("./components/AuthForm"));
import { AuthProvider, AuthContext } from "./context/AuthContext";
const ChangePassword = lazy(() => import("./components/ChangePassword"));

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
          <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
            <Header />
          </Suspense>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <Home />
              </Suspense>
            } />
            <Route
              path="/products"
              element={
                <RequireAuth>
                  <Suspense fallback={<div className="p-6 text-center">Loading products...</div>}>
                    <>
                      <Movie />
                      <h2 className="text-center mt-4">Products</h2>
                      <Products />
                    </>
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/products/:id"
              element={
                <RequireAuth>
                  <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                    <ProductDetail />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route path="/about" element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <About />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <Contact />
              </Suspense>
            } />
            <Route path="/auth" element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <AuthForm />
              </Suspense>
            } />
            <Route path="/change-password" element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <ChangePassword />
              </Suspense>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
