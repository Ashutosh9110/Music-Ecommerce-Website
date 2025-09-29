import React from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Our E-Commerce Store 🛍️</h1>
      <p className="mt-3">
        Discover high-quality products at the best prices. Shop now and enjoy a seamless online shopping experience!
      </p>
      <Button as={NavLink} to="/products" variant="primary" className="mt-3">
        Browse Products
      </Button>
    </Container>
  );
};

export default Home;
