import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">E-Commerce Store</Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            
            <Button variant="outline-light" onClick={() => setShowCart(true)}>
              🛒 Cart <Badge bg="light" text="dark">{cartCount}</Badge>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Cart Modal */}
      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </>
  );
};

export default Header;
