import React, { useContext } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import {
  Briefcase,
  Envelope,
  FileText,
  InfoCircle,
  QuestionCircle,
  Shield,
  Tools,
} from "react-bootstrap-icons";
import styled, { ThemeContext } from "styled-components";

const FooterWrapper = styled.div`
background : ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
`;

const Footer = () => {
  const theme = useContext(ThemeContext);

  return (
    <FooterWrapper>
      <Row>
        <Col md={6} className="p-md-5 ps-5 pt-4 pe-5">
          <h1 className="mb-4">
            My Fitness <span style={{ color: theme.text_secondary }}>App</span>
          </h1>{" "}
          <p>
            Transform your body, boost your confidence, and unleash your full
            potential. Every rep, every step gets you closer to your goals.
            Start today, push your limits, and see the change you’ve been
            waiting for!
          </p>
        </Col>
        <Col md={6} className="p-md-5 ps-5 pb-4 pe-5">
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item
                  action
                  href="/about"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <InfoCircle
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  About Us
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/contact"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <Envelope
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  Contact
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/faq"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <QuestionCircle
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  FAQ
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item
                  action
                  href="/plans"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <Tools
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  Our Plans
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/privacy"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <Shield
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  Privacy Policy
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/terms"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <FileText
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  Terms & Conditions
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/careers"
                  className="bg-transparent text-white"
                  style={{ border: "none" }}
                >
                  <Briefcase
                    style={{ color: theme.text_secondary, marginRight: "8px" }}
                  />{" "}
                  Careers
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </FooterWrapper>
  );
};

export default Footer;
