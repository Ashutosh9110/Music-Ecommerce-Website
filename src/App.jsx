import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Header from "./components/Header";
import About from "./components/About";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Contact from "./components/Contact"; // ✅ import Contact

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <>
                <Movie />
                <h2 className="text-center mt-4">Products</h2>
                <Products />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> {/* ✅ New route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
