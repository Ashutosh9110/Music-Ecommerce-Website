import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
    <Container className="mt-5">
      <Row>
        {productsArr.map((product) => (
          <Col key={product.id} md={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                </Card.Body>
              </Link>
              <Button variant="primary" className="mt-auto" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
