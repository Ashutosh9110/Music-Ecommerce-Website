import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Products from "./components/Products";
import Cart from "./components/Cart";
import "./App.css"

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      {/* Navbar with Cart Icon */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">E-Commerce Store</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={() => setShowCart(true)}>
              🛒 Cart
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Product List */}
      <h2 className="text-center mt-4">Products</h2>
      <Products />

      {/* Cart Modal */}
      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </div>
  );
}

export default App;
