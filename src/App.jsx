import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { CartProvider, CartContext } from "./context/CartContext";
import "./App.css";

function AppContent() {
  const [showCart, setShowCart] = useState(false);
  const { cartCount } = useContext(CartContext);

  return (
    <>
      {/* Navbar with Cart Icon */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">E-Commerce Store</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={() => setShowCart(true)}>
              🛒 Cart <Badge bg="light" text="dark">{cartCount}</Badge>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Product List */}
      <h2 className="text-center mt-4">Products</h2>
      <Products />

      {/* Cart Modal */}
      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
