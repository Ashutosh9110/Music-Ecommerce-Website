import React from "react";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center">About Us</h2>
        <p className="mb-4 text-gray-700 text-center">
          Welcome to our E-Commerce Store! We are passionate about providing high-quality products at the best prices. Our goal is to make shopping simple and enjoyable for everyone.
        </p>
        <p className="text-gray-600 text-center">
          Share this page with your friends by copying the URL – they can visit it directly too!
        </p>
      </div>
    </div>
  );
};

export default About;
