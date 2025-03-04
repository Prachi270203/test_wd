import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useCart } from "../CartContext/CartContext";

const CartItem = () => {
  const { cartItems } = useCart();

  return (
    <Container className="mt-4">
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>Price: ${item.price}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default CartItem;
