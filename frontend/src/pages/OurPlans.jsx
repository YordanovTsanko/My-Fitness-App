import React, { useState } from "react";
import { Col, Row, Form, Card, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import { People, Shield, Star } from "react-bootstrap-icons";
import { useAuth } from "../utils/authContext";
import { toast } from "react-toastify";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  h2.label {
    font-size: 2rem;
    text-align: center;
  }
`;
const PlansWrapper = styled(Row)`
  width: 100%;
  margin: 0;
  justify-content: center;
`;
const PlansCol = styled(Col)`
  background: ${({ green, theme }) => (green ? theme.secondary : theme.white)};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  h6 {
    margin-right: 11px;
    margin-bottom: 3px;
    font-size: 1rem;
  }
  label {
    font-size: 1rem;
  }
  p {
    margin-left: 6px;
    margin-bottom: 0;
    font-size: 0.7rem;
  }
`;

const StyledCard = styled(Card)`
  background-color: transparent;
  border: none;
`;

const StyledTable = styled(Table)`
  border: none;
  td {
    background-color: transparent;
  }
`;

const ButtonPlans = styled(Button)`
  background: ${({ green, theme }) =>
    green ? theme.white : theme.text_secondary};
  color: ${({ green, theme }) => (green ? theme.bg : theme.bg)};
  transition: all 0.4s ease;

  &:hover {
    background: ${({ green, theme }) => (green ? theme.navbar : theme.orange)};
    color: ${({ green, theme }) => (green ? theme.secondary : theme.bg)};
  }
`;

const OurPlans = () => {
  const [checked, setChecked] = useState(true);

  const [cart, setCart] = useState("");

  const { user } = useAuth();

  const [plansPrices, setPlansPrices] = useState({
    basic: 15,
    premium: 25,
    vip: 30,
  });

  const handleSwitch = () => {
    if (checked) {
      setPlansPrices((prevPrices) =>
        Object.fromEntries(
          Object.entries(prevPrices).map(([key, value]) => [key, value * 10])
        )
      );
    } else {
      setPlansPrices((prevPrices) =>
        Object.fromEntries(
          Object.entries(prevPrices).map(([key, value]) => [key, value / 10])
        )
      );
    }
  };

  const handleAddtoBasket = (item) => {
    const name = Object.keys(item)[0];
    const price = Object.values(item)[0]
    if (user) {
      if (cart.length === 0) {
        setCart({name, price});
        toast.success(
          `${name.toUpperCase()} plan added successfully to the card. Price: £${price.toFixed(2)}`,
          {
            autoClose: 3000,
            theme: "colored",
          }
        );
      } else {
        toast.warning(
          `Already plan is added to the cart. Please check your cart`,
          {
            autoClose: 3000,
            theme: "colored",
          }
        );
      }
    } else {
      toast(`Please log in to proccesd`, { autoClose: 3000 });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="label">Choose your best plan.</h2>
      <Row>
        <Col>
          <StyledForm>
            <h6>Mountly</h6>
            <Form.Check
              type="switch"
              value={checked}
              onChange={() => {
                handleSwitch();
                setChecked(!checked);
              }}
              id="custom-switch"
              label="Yearly"
            />
            <p>Get 2 months free</p>
          </StyledForm>
        </Col>
      </Row>
      <PlansWrapper>
        <Col md={4}>
          <Row className="p-3">
            <PlansCol>
              <StyledCard>
                <Card.Body className="text-center">
                  <People size={48} className="mb-3" />
                  <Card.Title>Basic Plan</Card.Title>
                  <Card.Text>
                    Access to gym equipment, group classes, and our community
                    support.
                  </Card.Text>
                  <StyledTable className="text-start" striped hover responsive>
                    <tbody>
                      <tr>
                        <td>
                          <span className="fw-bold">Gym Access:</span> Standard
                          (staffed hours)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Group Classes:</span>{" "}
                          Limited (off-peak)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Towel Service:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Personal Training:</span>{" "}
                          Not included
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Locker:</span> Daily Use
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Sauna/Steam Room:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Nutritional Counseling:
                          </span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Spa Services:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Guest Passes:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Fitness Assessment:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Supplements/Post-Workout Shake:
                          </span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">VIP Lounge:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Priority Equipment Use:
                          </span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Events:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                    </tbody>
                  </StyledTable>
                  <h2>£{plansPrices.basic.toFixed(2)}</h2>
                  <ButtonPlans
                    className="border-0"
                    onClick={() => handleAddtoBasket({ basic: plansPrices.basic })}
                  >
                    Buy Now
                  </ButtonPlans>
                </Card.Body>
              </StyledCard>
            </PlansCol>
          </Row>
        </Col>
        <Col md={4}>
          <Row className="p-3">
            <PlansCol green>
              <StyledCard>
                <Card.Body className="text-center">
                  <Star size={48} className="mb-3" />
                  <Card.Title>Premium Plan</Card.Title>
                  <Card.Text>
                    Everything in the Basic Plan plus personal training sessions
                    and nutrition plans.
                  </Card.Text>
                  <StyledTable className="text-start" striped hover responsive>
                    <tbody>
                      <tr>
                        <td>
                          <span className="fw-bold">Gym Access:</span> 24/7
                          Access
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Group Classes:</span>{" "}
                          Unlimited (all classes)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Towel Service:</span>{" "}
                          <span className="text-success">Yes</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Personal Training:</span>{" "}
                          Discounted (10% off)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Locker:</span> Daily Use
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Sauna/Steam Room:</span>{" "}
                          <span className="text-success">Yes</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Nutritional Counseling:
                          </span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Spa Services:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Guest Passes:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Fitness Assessment:</span>{" "}
                          Annual Assessment
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Supplements/Post-Workout Shake:
                          </span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">VIP Lounge:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Priority Equipment Use:
                          </span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Events:</span>{" "}
                          <span className="text-danger">No</span>
                        </td>
                      </tr>
                    </tbody>
                  </StyledTable>
                  <h2>£{plansPrices.premium.toFixed(2)}</h2>
                  <ButtonPlans
                    green
                    className="border-0"
                    onClick={() => handleAddtoBasket({ premium: plansPrices.premium })}
                  >
                    Buy Now
                  </ButtonPlans>
                </Card.Body>
              </StyledCard>
            </PlansCol>
          </Row>
        </Col>
        <Col md={4}>
          <Row className="p-3">
            <PlansCol>
              <StyledCard>
                <Card.Body className="text-center">
                  <Shield size={48} className="mb-3" />
                  <Card.Title>VIP Plan</Card.Title>
                  <Card.Text>
                    Enjoy all Premium benefits plus exclusive access to special
                    events and workshops.
                  </Card.Text>
                  <StyledTable className="text-start" striped hover responsive>
                    <tbody>
                      <tr>
                        <td>
                          <span className="fw-bold">Gym Access:</span> 24/7
                          Access + Personal Locker
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Group Classes:</span>{" "}
                          Unlimited + VIP-Exclusive Classes
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Towel Service:</span>{" "}
                          <span className="text-success">
                            Premium Towels + Shower Products
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Personal Training:</span>{" "}
                          Discounted (20% off) or Unlimited
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Locker:</span> Permanent,
                          Personal Locker
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Sauna/Steam Room:</span>{" "}
                          <span className="text-success">Yes</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Nutritional Counseling:
                          </span>{" "}
                          Monthly/Quarterly Sessions
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Spa Services:</span> Free
                          Monthly Massage
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Guest Passes:</span> Yes (5
                          guests per month)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Fitness Assessment:</span>{" "}
                          Quarterly Assessment
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Supplements/Post-Workout Shake:
                          </span>{" "}
                          Free Smoothies/Shakes
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">VIP Lounge:</span> Exclusive
                          VIP Lounge Access
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">
                            Priority Equipment Use:
                          </span>{" "}
                          Priority Use (reservation for equipment)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="fw-bold">Events:</span> VIP-Only
                          Social and Fitness Events
                        </td>
                      </tr>
                    </tbody>
                  </StyledTable>
                  <h2>£{plansPrices.vip.toFixed(2)}</h2>
                  <ButtonPlans
                    className="border-0"
                    onClick={() => handleAddtoBasket({ vip: plansPrices.vip })}
                  >
                    Buy Now
                  </ButtonPlans>
                </Card.Body>
              </StyledCard>
            </PlansCol>
          </Row>
        </Col>
      </PlansWrapper>
    </Container>
  );
};

export default OurPlans;
