import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

const ProfilePageWrapper = styled.div`
  background-color: #343a40;
  padding: 25px;
  border-radius: 8px;
  margin: 25px auto;
  max-width: 800px;
`;

const ProfileCard = styled(Card)`
  border: none;
  background-color: ${({ theme }) => theme.text_primary};
  color: #343a40;
  margin-bottom: 25px;
  padding-top: 20px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
  border: 5px solid ${({ theme }) => theme.secondary};
`;

const UserName = styled.h2`
  color: ${({ theme }) => theme.secondary};
`;

const EmailInfo = styled.p`
  color: ${({ theme }) => theme.bg};
  opacity: 0.9;
`;

const ChangePasswordSection = styled.section`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;

  input {
    &:focus {
      box-shadow: none;
      outline: none;
      border: 1px solid ${({ theme }) => theme.secondary};
    }
  }

  label {
    color: ${({ theme }) => theme.secondary};
  }
`;

const PlanSection = styled.section`
  margin-top: 25px;
`;

const PlanInfo = styled.p`
  color: ${({ theme }) => theme.secondary};
`;

const StyledButton = styled(Button)`
  border: none;
  color: ${({ theme }) => theme.navbar} !important;
  background-color: ${({ theme }) => theme.secondary} !important;
  transition: all 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.secondary} !important;
    background-color: ${({ theme }) => theme.navbar} !important;
  }
`;

const ProfilePage = () => {
  const userProfile = {
    name: "",
    email: "someemail@abv.bg",
    password: "*******ENCRYPTED CONTENT",
    plan: "2131",
    image: "https://via.placeholder.com/150",
  };

  const [email] = useState(userProfile.email);
  const [name, setName] = useState(userProfile.name);
  const [image, setImage] = useState(userProfile.image);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log("Password changed to:", password);
    setPassword("");
  };

  const handleImageUpload = () => {
    console.log("Upload new image");
  };

  return (
    <ProfilePageWrapper>
      <Row className="justify-content-center">
        <Col md={12}>
          <ProfileCard className="text-center">
            <ProfilePicture src={image} alt="Profile" />
            <Card.Body>
              <UserName>{name ? name : email}</UserName>

              <EmailInfo>Email: {email}</EmailInfo>
              <StyledButton onClick={() => setName(prompt("Enter new name:"))}>
                Add Name
              </StyledButton>
              <StyledButton
                style={{ marginLeft: "10px" }}
                onClick={handleImageUpload}
              >
                Add Image
              </StyledButton>
            </Card.Body>
          </ProfileCard>
        </Col>
      </Row>

      <PlanSection>
        <h3>Your Current Plan</h3>
        <PlanInfo>
          {userProfile.plan
            ? `Plan ID: ${userProfile.plan}`
            : "No plan available. Please upgrade to enjoy more features."}
        </PlanInfo>
      </PlanSection>

      <ChangePasswordSection>
        <h3>Change Password</h3>
        <Form onSubmit={handlePasswordChange}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <StyledButton className="mt-2" type="submit">
            Change Password
          </StyledButton>
        </Form>
      </ChangePasswordSection>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
