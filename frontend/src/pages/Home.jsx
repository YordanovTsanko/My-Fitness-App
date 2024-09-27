import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  Award,
  ClockHistory,
  People,
  Shield,
  Star,
  Tags,
} from "react-bootstrap-icons";
import CaloriesClacComp from "../components/CaloriesCalcComp";

const HomeContainer = styled.div`
  color: ${({ theme }) => theme.text_primary};
`;

const Banner = styled.section`
  background: url("/banner.jpg") center / cover no-repeat;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
`;
const BannerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 80px;
  text-align: center;
  z-index: 1;
  box-shadow: 0px 4px 31px 5px rgba(0, 0, 0, 0.75);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.black};
    opacity: 0.7;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 30px 44px;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
    color: ${({ theme }) => theme.text_primary};
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin: 20px 0;
    max-width: 600px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  button {
    padding: 12px 24px;
    background-color: ${({ theme }) => theme.text_secondary};
    color: ${({ theme }) => theme.navbar};
    border: none;
    border-radius: 50px;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin-top: 20px;

    &:hover {
      background-color: ${({ theme }) => theme.text_primary};
      transform: scale(1.05);
    }
  }
`;

const WhyUsWrapper = styled.section`
  color: ${({ theme }) => theme.text_primary};

  h2 {
    margin-top: 10px;
    font-size: 2rem;
  }
  h6 {
    font-size: 0.9rem;
    font-weight: 200;
    color: ${({ theme }) => theme.disabled};
  }
`;

const RoundedWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const RoundedDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  box-shadow: 26px 26px 52px -20px rgba(0, 0, 0, 0.51);
  position: ${({ position }) => position || "relative"};
  z-index: ${({ index }) => index || "50"};
  left: ${({ left }) => left || "auto"};
  right: ${({ right }) => right || "auto"};
  top: ${({ top }) => top || "auto"};
  bottom: ${({ bottom }) => bottom || "auto"};
  background: ${({ background }) =>
    `linear-gradient(
      120deg,
      rgba(2, 0, 36, 0.1) 0%,
      ${background} 30%,
      ${background} 70%,
      rgba(2, 0, 36, 0.1) 100%
    )`};
  color: ${({ color, theme }) => color || theme.text_primary};
  width: ${({ size }) => size || "50px"};
  height: ${({ size }) => size || "50px"};
  font-size: ${({ fontSize }) => fontSize || "1.5rem"};

  p {
    font-size: 1.3rem;
    width: 50%;
  }

  &.resp_circle {
    @media (max-width: 1050px) {
      width: 120px;
      height: 120px;
      left: 220px;
      top: -30px;

      h2 {
        font-size: 2rem;
      }

      h5 {
        margin-top: -7px;
        font-size: 0.8rem;
      }
    }
  }
  &.resp_circle_s {
    @media (max-width: 1050px) {
      width: 300px;
      height: 300px;

      p {
        font-size: 1.1rem;
      }
    }
  }
`;

const ParentRoundedDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 26px 26px 52px -20px rgba(0, 0, 0, 0.51);
  position: absolute;
  width: 340px;
  height: auto;
  z-index: 99;
  left: ${({ left }) => left || "auto"};
  right: ${({ right }) => right || "auto"};
  top: ${({ top }) => top || "auto"};
  bottom: ${({ bottom }) => bottom || "auto"};

  @media (max-width: 1050px) {
    position: relative;
    left: auto;
    top: auto;
    bottom: auto;
    right: auto;
  }
`;

const OurPlansWrapper = styled.section`
  color: ${({ theme }) => theme.text_primary};

  h2 {
    font-size: 2rem;
  }
`;

const ButtonPlans = styled(Button)`
  background: ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.bg};
  transition: all 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.text_primary};
    color: ${({ theme }) => theme.bg};
  }
`;

const Home = () => {
  const theme = useContext(ThemeContext);

  return (
    <HomeContainer>
      <Banner>
        <BannerContent>
          <h1>
            My Fitness <span style={{ color: "#8fce00" }}>App</span>
          </h1>
          <p>
            Your fitness journey starts here! Transform your body and health
            with our personalized training plans and guidance.
          </p>
          <button>Our Plans</button>
        </BannerContent>
      </Banner>

      <WhyUsWrapper>
        <Row>
          <Col xs={12} className="text-center pt-3 ps-5 pe-5  p-md-3">
            <h2>Why Choose Us ?</h2>
          </Col>
          <Col className="text-center ps-5 pe-5">
            <h6>
              Choose us for tailored workouts, state-of-the-art facilities, and
              a supportive network committed to your success.
            </h6>
          </Col>
        </Row>
        <Row>
          <Col
            sx={12}
            className="d-flex align-items-center justify-content-center pt-4 pb-4 pe-md-5"
          >
            <RoundedWrapper>
              <RoundedDiv
                background={theme.white}
                color={theme.bg}
                size="350px"
                className="resp_circle_s"
              >
                <p style={{ textShadow: "1px 1px 10px rgba(0, 0, 0, 0.7)" }}>
                  Experience a community that motivates you to achieve your
                  goals and celebrate your progress!
                </p>
              </RoundedDiv>
              <RoundedDiv
                background={theme.secondary}
                color={theme.primary}
                size="200px"
                position="absolute"
                left="-120px"
                className="resp_circle"
              >
                <h2 style={{ textShadow: "1px 1px 10px rgba(0, 0, 0, 0.7)" }}>
                  50%
                </h2>
                <h5 style={{ textShadow: "1px 1px 7px rgba(0, 0, 0, 0.7)" }}>
                  ON NEW USERS
                </h5>
              </RoundedDiv>
              <ParentRoundedDiv top="10px" right="-270px">
                <RoundedDiv background={theme.orange} size="100px">
                  <Tags size={40} />
                </RoundedDiv>
                <div style={{ width: "220px" }}>
                  <h5>Best Prices</h5>
                  <h6>Unbeatable rates for top-notch fitness services.</h6>
                </div>
              </ParentRoundedDiv>
              <ParentRoundedDiv right="-300px">
                <RoundedDiv background={theme.orange} size="100px">
                  <ClockHistory size={40} />
                </RoundedDiv>
                <div style={{ width: "220px" }}>
                  <h5>24/7 Open</h5>
                  <h6>Access your workouts anytime, day or night.</h6>
                </div>
              </ParentRoundedDiv>
              <ParentRoundedDiv bottom="10px" right="-270px">
                <RoundedDiv background={theme.orange} size="100px">
                  <Award size={40} />
                </RoundedDiv>
                <div style={{ width: "220px" }}>
                  <h5>Awards</h5>
                  <h6>Honored for exceptional service.</h6>
                </div>
              </ParentRoundedDiv>
            </RoundedWrapper>
          </Col>
        </Row>
      </WhyUsWrapper>

      <OurPlansWrapper>
        <Row>
          <Col xs={12} className="text-center pt-3 pb-3 ps-5 pe-5  p-md-3">
            <h2>Explore Our Membership Plans</h2>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center pt-4 pb-3">
          <Col md={3} xs={12} className="d-flex justify-content-center mb-4">
            <Card
              style={{
                width: "18rem",
                backgroundColor: "transparent",
                border: `1px solid ${theme.text_secondary}`,
                color: theme.text_primary,
              }}
            >
              <Card.Body className="text-center">
                <People size={48} className="mb-3" />
                <Card.Title style={{ color: theme.text_secondary }}>
                  Basic Plan
                </Card.Title>
                <Card.Text>
                  Access to gym equipment, group classes, and our community
                  support.
                </Card.Text>
                <ButtonPlans variant="primary" className="border-0">
                  See More
                </ButtonPlans>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} xs={12} className="d-flex justify-content-center mb-4">
            <Card
              style={{
                width: "18rem",
                backgroundColor: "transparent",
                border: `1px solid ${theme.text_secondary}`,
                color: theme.text_primary,
              }}
            >
              <Card.Body className="text-center">
                <Star size={48} className="mb-3" />
                <Card.Title style={{ color: theme.text_secondary }}>
                  Premium Plan
                </Card.Title>
                <Card.Text>
                  Everything in the Basic Plan plus personal training sessions
                  and nutrition plans.
                </Card.Text>
                <ButtonPlans variant="primary" className="border-0">
                  See more
                </ButtonPlans>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} xs={12} className="d-flex justify-content-center mb-4">
            <Card
              style={{
                width: "18rem",
                backgroundColor: "transparent",
                border: `1px solid ${theme.text_secondary}`,
                color: theme.text_primary,
              }}
            >
              <Card.Body className="text-center">
                <Shield size={48} className="mb-3" />
                <Card.Title style={{ color: theme.text_secondary }}>
                  VIP Plan
                </Card.Title>
                <Card.Text>
                  Enjoy all Premium benefits plus exclusive access to special
                  events and workshops.
                </Card.Text>
                <ButtonPlans variant="primary" className="border-0">
                  See More
                </ButtonPlans>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </OurPlansWrapper>

      <CaloriesClacComp />

    </HomeContainer>
  );
};

export default Home;
