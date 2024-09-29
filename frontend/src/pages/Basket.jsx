import React, { useState } from "react";
import { Row, Col, Image, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;

  .btn-primary {
    --bs-btn-color: ${({ theme }) => theme.primary};
    --bs-btn-bg: ${({ theme }) => theme.secondary};
    --bs-btn-border-color: ${({ theme }) => theme.secondary};
    --bs-btn-hover-color: ${({ theme }) => theme.secondary};
    --bs-btn-hover-bg: ${({ theme }) => theme.primary};
    --bs-btn-hover-border-color: ${({ theme }) => theme.secondary};
    --bs-btn-active-bg: ${({ theme }) => theme.primary};
    --bs-btn-active-border-color: ${({ theme }) => theme.secondary};
    --bs-btn-active-color: ${({ theme }) => theme.secondary};
  }

  image {
    @media (max-width: 400px) {
      padding: 20px;
    }
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
`;

const StyledImage = styled(Image)`
  width: 400px;
  height: 350px;
  object-fit: cover;

  @media (max-width: 400px) {
    width: 100%;
    height: auto;
    padding: 0 20px;
    aspect-ratio: 1 / 1;
  }
`;

const GoToPlans = styled(Link)`
  color: ${({ theme }) => theme.navbar};
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.navbar};
    background-color: ${({ theme }) => theme.text_primary};
  }
`;

const CartContainer = styled(Row)`
  margin: 20px;
  padding: 20px;
  color: ${({ theme }) => theme.navbar};
  background: white;

  @media (max-width: 440px) {
    padding: 10px;
  }
`;

const TotalPrice = styled.h5`
  margin-top: 20px;
  text-align: right;
`;

const PromoCodeWrapper = styled.div`
  div.input-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;

    @media (min-width: 768px) and (max-width: 980px) {
      flex-direction: column;
      align-items: start;
    }

    @media (max-width: 383px) {
    gap: 7px;
      input {
      width: 170px;
        padding: 2px !important;
      }
      button {
        padding: 6px !important;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0;
`;

const Basket = () => {
  const initialCart = [{ id: 1, name: "Premium Plan", price: 25 }];

  const [cart, setCart] = useState(initialCart);

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };
  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  return (
    <Container className="mt-4">
      <Title>Basket</Title>
      {cart.length !== 0 ? (
        <CartContainer>
          <Col md={8}>
            <div className="d-flex align-items-start">
              <h3>{cart.lenght}3 items</h3>
            </div>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className=" bg-primary">
                {cart.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td className="pt-3">{index + 1}</td>
                      <td className="pt-3">{item.name}</td>
                      <td className="pt-3">${item.price.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <StyledButton
                          variant="danger"
                          className="button-remove"
                          onClick={() => removeFromCart(item)}
                        >
                          Remove
                        </StyledButton>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={4} className="d-flex flex-column h-100 border-start pb-3">
            <h3 className="text-start">Order Summary</h3>

            <PromoCodeWrapper className="d-flex flex-column align-items-start mt-4 mb-4 text-start">
              <h5>Promo code:</h5>
              <div className="input-wrapper">
                <input
                  className="p-1"
                  type="text"
                  placeholder="Enter promo code"
                  maxLength={20}
                />
                <StyledButton>Aplly</StyledButton>
              </div>
            </PromoCodeWrapper>

            <TotalPrice>Total: ${calculateTotal()}</TotalPrice>
            <div className="d-flex gap-3 justify-content-end align-items-center">
              <StyledButton
                variant="disabled"
                block
                disabled={cart.length === 0}
                onClick={clearCart}
              >
                Clear Cart
              </StyledButton>
              <StyledButton block disabled={cart.length === 0}>
                Checkout
              </StyledButton>
            </div>
          </Col>
        </CartContainer>
      ) : (
        <Row className="g-3">
          <Col sm={12}>
            <StyledImage alt="Error loading image" src="/basket.png" />
          </Col>
          <Col sm={12} className="mb-5">
            <h5 className="mb-4">Your card is empty </h5>
            <GoToPlans to="/plans">Check our plans</GoToPlans>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Basket;
