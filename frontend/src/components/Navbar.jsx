import React, { useState } from "react";
import styled from "styled-components";
import { Basket, ListTask, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.navbar};
  padding: 0.5rem 1rem;
  line-height: 40px;
`;

const NavbarBrand = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  text-decoration: none;
  margin-right: auto;
`;

const ButtonsWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const JoinUsButton = styled.button`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.text_secondary};
  padding: 0 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 7px;
  font-size: 1.2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;
const MobileJoinUsButton = styled.button`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.text_secondary};
  padding: 0 8px;
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 7px;
  font-size: 1.2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.8rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 99;

  @media (max-width: 768px) {
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(80px)"};
    transition: max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 56px;
    min-width: 60%;
    height: 100%;
    right: 0;
    background-color: ${({ theme }) => theme.navbar};
    pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
    overflow: hidden;
    max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  }
`;

const NavItem = styled.li`
  padding: 0 1rem;

  a {
    color: ${({ theme }) => theme.text_primary};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.text_secondary};
    transition: color 0.5s ease;

    &:hover {
      color: ${({ theme }) => theme.text_secondary};
    }
    &:active {
      color: ${({ theme }) => theme.text_secondary};
    }
  }
`;

const BasketContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  span {
    margin-left: 14px;
    font-size: 1rem;
    margin-bottom: -4px;
    margin-right: 17px;
    display:none;
    color: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 855px) {
    margin-right: 0px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    span{
    display:block;
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavbarBrand href="/">
        My Fitness <span style={{ color: "#8fce00" }}>App</span>
      </NavbarBrand>
      <ButtonsWrapper>
        {user === null && (
          <MobileJoinUsButton onClick={() => navigate("/register")}>
            Join Us
          </MobileJoinUsButton>
        )}
        <ToggleButton onClick={toggleNavbar}>
          {isOpen ? <X /> : <ListTask />}
        </ToggleButton>
      </ButtonsWrapper>
      <NavMenu isOpen={isOpen}>
        {user !== null && (
          <BasketContainer onClick={()=> navigate("/basket")}>
            <Basket size={26} />
            <span>Basket</span>
          </BasketContainer>
        )}
        {user !== null && (
          <NavItem>
            <a href="/profile">Profile</a>
          </NavItem>
        )}
        <NavItem>
          <a href="/">Home</a>
        </NavItem>
        <NavItem>
          <a href="/calculator">Calculator</a>
        </NavItem>
        <NavItem>
          <a href="/plans">Our Plans</a>
        </NavItem>
        <NavItem>
          <a href="/locations">Locations</a>
        </NavItem>
        <NavItem>
          {user !== null ? (
            <a href="/" onClick={logout} style={{ color: "#8fce00" }}>
              Log Out
            </a>
          ) : (
            <a href="/login">Sign In</a>
          )}
        </NavItem>
        {user === null && (
          <JoinUsButton onClick={() => navigate("/register")}>
            Join Us
          </JoinUsButton>
        )}
      </NavMenu>
    </NavbarContainer>
  );
};

export default Navbar;
