import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const { cartCount } = useContext(CartContext);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <NavLink to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-400 transition-colors">E-Commerce Store</NavLink>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold underline" : "hover:text-indigo-300 transition-colors"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "font-semibold underline" : "hover:text-indigo-300 transition-colors"}>About</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "font-semibold underline" : "hover:text-indigo-300 transition-colors"}>Products</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "font-semibold underline" : "hover:text-indigo-300 transition-colors"}>Contact</NavLink>
          <button
            className="relative flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition-colors"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart
            <span className="ml-2 bg-white text-indigo-700 rounded-full px-2 py-0.5 text-xs font-bold">{cartCount}</span>
          </button>
          {!auth.isLoggedIn ? (
            <NavLink
              to="/auth"
              className="ml-2 px-4 py-1.5 bg-white text-indigo-700 rounded hover:bg-indigo-100 font-semibold transition-colors"
            >
              Sign Up / Sign In
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 font-semibold transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
      {/* Cart Modal */}
      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </header>
  );
};

export default Header;
