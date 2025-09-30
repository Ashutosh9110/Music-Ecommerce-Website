import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4 text-center drop-shadow">Welcome to Our E-Commerce Store 🛍️</h1>
      <p className="mt-3 text-lg text-gray-700 text-center max-w-xl">
        Discover high-quality products at the best prices. Shop now and enjoy a seamless online shopping experience!
      </p>
      <NavLink
        to="/products"
        className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded shadow transition-colors"
      >
        Browse Products
      </NavLink>
    </div>
  );
};

export default Home;
