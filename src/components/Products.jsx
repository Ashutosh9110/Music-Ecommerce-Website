import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const productsArr = [
  {
    id: "1",
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: "2",
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: "3",
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: "4",
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Products = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-[calc(100vh-64px)]  py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productsArr.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
            <Link to={`/products/${product.id}`} className="flex-1 flex flex-col items-center p-4 hover:bg-indigo-50 rounded-t-lg transition-colors">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <div className="w-full text-center">
                <h3 className="text-lg font-bold text-indigo-700 mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-2">Price: <span className="font-semibold">${product.price}</span></p>
              </div>
            </Link>
            <button
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-b-lg transition-colors"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
