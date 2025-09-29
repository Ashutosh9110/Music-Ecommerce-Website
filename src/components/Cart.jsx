import React, { useContext } from "react";
import { Modal, Button, Table, Image } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const Cart = ({ show, handleClose }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      rounded
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success">Proceed to Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
