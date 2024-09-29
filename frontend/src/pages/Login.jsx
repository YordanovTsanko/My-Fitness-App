import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Row, Col, Form, Image } from "react-bootstrap";
import { useAuth } from '../utils/authContext';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const RowDiv = styled(Row)`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const ColDiv = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(Form)`
  background: ${({ theme }) => theme.text_primary};
  width: 100%;
  border-radius: 30px;
  box-shadow: 10px 10px 64px -10px rgba(0, 0, 0, 0.58);
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  gap: 35px;
`;
const Button = styled.button`
  border: none;
  transition: all 0.5s ease;
  font-size: 1.5rem;
  color: ${({ gray, theme }) =>
    gray ? `${theme.disabled}` : `${theme.black}`};
  border-bottom: ${({ underlined, theme }) =>
    underlined ? `3px solid ${theme.secondary}` : "none"};

  &:hover {
    color: ${({ disabled, theme }) => (disabled ? "none" : theme.secondary)};
  }
`;

const ChildWrapper = styled.div`
  padding: 20px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1rem;
`;

const StyledFormLabel = styled(Form.Label)`
  color: ${({ theme }) => theme.secondary};
`;

const StyledFormControl = styled(Form.Control)`
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-color: ${({ theme }) => theme.primary};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme.secondary};
  }
`;

const StyledFormText = styled(Form.Text)`
  color: ${({ theme }) => theme.primary};
`;

const StyledFormCheck = styled(Form.Check)`
  label {
    color: ${({ theme }) => theme.primary};
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault()
    login({name: "hasan", password:"123"})
  }

  return (
    <Container>
      <RowDiv>
        <ColDiv md={6} lg={6} className="order-2 order-md-1">
          <Image
            fluid
            width="400px"
            height="400px"
            src="https://apluscomputertrainingtech.com.ng/wp-content/themes/zilom/images/register.png"
          />
        </ColDiv>
        <ColDiv md={6} lg={4} className="order-md-2">
          <FormWrapper>
            <ButtonWrapper>
              <Button underlined disabled>
                Sign In
              </Button>
              <Button gray onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </ButtonWrapper>
            <ChildWrapper>
              <StyledFormGroup controlId="formBasicEmail">
                <StyledFormLabel>Email address</StyledFormLabel>
                <StyledFormControl
                  type="email"
                  placeholder="example@example.com"
                />
                <StyledFormText>
                  We'll never share your email with anyone else.
                </StyledFormText>
              </StyledFormGroup>

              <StyledFormGroup controlId="formBasicPassword">
                <StyledFormLabel>Password</StyledFormLabel>
                <StyledFormControl type="password" placeholder="Password" />
              </StyledFormGroup>

              <StyledFormGroup controlId="formBasicCheckbox">
                <StyledFormCheck type="checkbox" label="Save Password" />
              </StyledFormGroup>
              <div className="d-flex flex-column gap-4 align-items-start">
                <Link to="/">Forgot Password ? </Link>

                <Button type="submit" className="w-100" onClick={handleLogin}>Submit</Button>
              </div>
            </ChildWrapper>
          </FormWrapper>
        </ColDiv>
      </RowDiv>
    </Container>
  );
};

export default Login;
