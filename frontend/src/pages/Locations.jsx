import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col, Image } from "react-bootstrap";
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
`;

const ImageContainer = styled.div`
  margin-bottom: 50px;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
`;

const ImgContainer = styled.div`
margin: 0 auto;
  max-width: 600px;
  width: 100%;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.orange};
  color: ${({ theme }) => `${theme.arrow}80`};
  border-radius: 20px;
  position: relative;
  aspect-ratio: 1 / 1;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const cities = {
  Sofia:
    "http://www.visittobulgaria.com/_data/_visittobulgaria.com/c2_visit/maps/detailed_map_sofia.png",
  Varna:
    "http://www.visittobulgaria.com/_data/_visittobulgaria.com/c2_visit/maps/detailed_map_varna.png",
  Razgrad:
    "http://www.visittobulgaria.com/_data/_visittobulgaria.com/c2_visit/maps/detailed_map_razgrad.gif",
};

const Locations = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleSelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <Container className="mt-4">
      <Title>Select Your Location</Title>
      <Row>
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title="Select City"
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="Sofia">Sofia</Dropdown.Item>
            <Dropdown.Item eventKey="Varna">Varna</Dropdown.Item>
            <Dropdown.Item eventKey="Razgrad">Razgrad</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <ImageContainer>
        {selectedCity ? (
          <Image
            height="600px"
            width="600px"
            className="mt-4"
            src={cities[selectedCity]}
            alt={selectedCity}
          />
        ) : (
          <ImgContainer className="mt-4">Select Location</ImgContainer>
        )}
      </ImageContainer>
    </Container>
  );
};

export default Locations;
