import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./CaloriesCalc.css";
import CalcResult from "./CalcResult";
import { calculatorLogic } from "../utils/calculatorLogic";

const Container = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.primary};
`;

const SectionHeader = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_secondary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  small {
    color: ${({ theme }) => theme.text_secondary};
  }
  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const NumFormControl = styled(Form.Control)`
  -moz-appearance: textfield;
  appearance: none;
  background: inherit;
  border: 1px solid ${({ theme }) => theme.text_primary};
  color: ${({ theme }) => theme.text_primary};

  &:focus {
    outline: none;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.orange};
    background: inherit;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DropdownFormControl = styled(DropdownButton)`
  width: 100%;

  &:focus {
    border: 1px solid ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.orange};
  }

  .dropdown-item {
    color: ${({ theme }) => theme.text_primary};
    white-space: normal;
    word-wrap: break-word;
    border-bottom: 1px solid ${({ theme }) => theme.text_primary};

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: ${({ theme }) => theme.orange};
    }
  }
`;

const SubmitButton = styled(Button)`
  border: none;
  background-color: ${({ theme }) => theme.orange};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  transition: all 0.7s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.text_primary};
  }
`;

const CaloriesCalcComp = () => {
  const [formData, setFormData] = useState({
    age: 25,
    gender: "male",
    height: 180,
    weight: 65,
    activity: "Moderate: exercise 4-5 times/week",
  });
  const [result, setResult] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { age, gender, height, weight, activity } = formData;

    const result = calculatorLogic(age, gender, height, weight, activity);

    setResult(result);
  };

  return (
    <Container>
      {Object.keys(result).length !== 0 ? (
        <CalcResult result={result} setResult={setResult} />
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <SectionHeader>Calorie Calculator</SectionHeader>
          <Form.Group
            as={Row}
            className="mb-sm-3 align-items-center"
            controlId="formAge"
          >
            <Form.Label column className="fs-6">
              Age:
            </Form.Label>
            <Col sm={10}>
              <NumFormControl
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="15"
                max="115"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-sm-3 align-items-center"
            controlId="formGender"
          >
            <Form.Label column className="fs-6">
              Gender:
            </Form.Label>
            <Col sm={10}>
              <DropdownFormControl
                id="genderDropdown"
                title={formData.gender || "Select Gender"}
                onSelect={(value) => handleSelect("gender", value)}
              >
                <Dropdown.Item eventKey="male">Male</Dropdown.Item>
                <Dropdown.Item eventKey="female">Female</Dropdown.Item>
                <Dropdown.Item eventKey="other">Other</Dropdown.Item>
              </DropdownFormControl>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-sm-3 align-items-center"
            controlId="formHeight"
          >
            <Form.Label column className="fs-6">
              Height:
            </Form.Label>
            <Col sm={9}>
              <NumFormControl
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="100"
                max="250"
                required
              />
            </Col>
            <Col sm={1}>
              <Form.Text className="fs-6">cm</Form.Text>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-sm-3 align-items-center"
            controlId="formWeight"
          >
            <Form.Label column className="fs-6">
              Weight:
            </Form.Label>
            <Col sm={9}>
              <NumFormControl
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="30"
                max="200"
                required
              />
            </Col>
            <Col sm={1}>
              <Form.Text className="fs-6">kg</Form.Text>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-sm-3 align-items-center"
            controlId="formActivity"
          >
            <Form.Label column className="fs-6">
              Activity:
            </Form.Label>
            <Col sm={10}>
              <DropdownFormControl
                id="activityDropdown"
                title={formData.activity || "Select Activity Level"}
                onSelect={(value) => handleSelect("activity", value)}
              >
                <Dropdown.Item eventKey="Sedentary: little or no exercise">
                  Sedentary: little or no exercise
                </Dropdown.Item>
                <Dropdown.Item eventKey="Light: exercise 1-3 times/week">
                  Light: exercise 1-3 times/week
                </Dropdown.Item>
                <Dropdown.Item eventKey="Active: daily exercise or intense exercise 3-4 times/week">
                  Active: daily exercise or intense exercise 3-4 times/week
                </Dropdown.Item>
                <Dropdown.Item eventKey="Moderate: exercise 4-5 times/week">
                  Moderate: exercise 4-5 times/week
                </Dropdown.Item>
                <Dropdown.Item eventKey="Very Active: intense exercise 6-7 times/week">
                  Very Active: intense exercise 6-7 times/week
                </Dropdown.Item>
              </DropdownFormControl>
            </Col>
          </Form.Group>
          <Row className="mt-3">
            <Col className="text-center">
              <SubmitButton type="submit">Calculate</SubmitButton>
            </Col>
          </Row>
        </StyledForm>
      )}
    </Container>
  );
};

export default CaloriesCalcComp;
