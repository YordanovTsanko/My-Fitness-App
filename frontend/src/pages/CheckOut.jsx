import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  padding-top: 0;
  h2 {
    text-align: center;
    font-size: 2rem;
  }
  h4 {
    font-size: 1.7rem;
    font-weight: 700;
    border-bottom: 2px solid ${({ theme }) => theme.secondary};
  }
  label {
    font-weight: 600;
    margin-top: 5px;
    font-size: 1.2rem;
  }

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

  .form-control {
    border: 1px solid ${({ theme }) => theme.text_primary};
    border-color: ${({ theme }) => theme.primary};

    &:focus {
      box-shadow: none;
      border-color: ${({ theme }) => theme.secondary};
    }
  }
`;

const CheckoutPage = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  const [billingData, setBillingData] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setBillingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(billingData);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Checkout</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>Billing Information</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter your address"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter your city"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    name="zipCode"
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter your zip code"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    name="cardNumber"
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter your card number"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formExpiry">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    name="expiryDate"
                    onChange={handleInput}
                    type="text"
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    name="cvv"
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter your CVV"
                    required
                  />
                </Form.Group>
                <div className="d-flex flex-column flex-lg-row gap-2 align-items-center justify-content-between mt-4">
                  <h5 className="mb-0"> PREMIUM Plan - £250.00</h5>
                  <Button type="submit">Submit Payment</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
