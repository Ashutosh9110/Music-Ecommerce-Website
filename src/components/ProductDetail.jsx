import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// 📦 Temporary static data for demo – could later come from Firebase or API
const productsArr = [
  {
    id: "1",
    title: "Colors",
    price: 100,
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      "https://via.placeholder.com/200/ff0000",
      "https://via.placeholder.com/200/00ff00",
    ],
    reviews: [
      { user: "Alice", text: "Amazing colors! Very vibrant." },
      { user: "Bob", text: "Good quality for the price." },
    ],
  },
  {
    id: "2",
    title: "Black and white Colors",
    price: 50,
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      "https://via.placeholder.com/200/000000",
      "https://via.placeholder.com/200/ffffff",
    ],
    reviews: [
      { user: "Eve", text: "Classic shades, loved them!" },
      { user: "John", text: "Great contrast and quality." },
    ],
  },
  {
    id: "3",
    title: "Yellow and Black Colors",
    price: 70,
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      "https://via.placeholder.com/200/ffff00",
      "https://via.placeholder.com/200/000000",
    ],
    reviews: [
      { user: "Mike", text: "Stunning mix of colors!" },
      { user: "Sara", text: "Perfect for my design work." },
    ],
  },
  {
    id: "4",
    title: "Blue Color",
    price: 100,
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      "https://via.placeholder.com/200/0000ff",
      "https://via.placeholder.com/200/87ceeb",
    ],
    reviews: [
      { user: "Liam", text: "Deep blue tone, exactly what I wanted!" },
      { user: "Emma", text: "Worth the money." },
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productsArr.find((p) => p.id === id);

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h2>Product not found</h2>
        <Button onClick={() => navigate("/products")} className="mt-3">
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate("/products")}>
        ← Back to Products
      </Button>

      <Row className="mt-4">
        <Col md={6}>
          {/* 🖼️ Product Image Gallery */}
          <div>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title}-${index}`}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-muted">Price: ${product.price}</h4>

          {/* 📝 Reviews */}
          <h5 className="mt-4">Customer Reviews:</h5>
          {product.reviews.map((review, i) => (
            <Card key={i} className="mb-2 p-2">
              <strong>{review.user}</strong>
              <p className="mb-0">{review.text}</p>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
