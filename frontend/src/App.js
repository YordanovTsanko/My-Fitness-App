import Navbar from "./components/Navbar.jsx";
import { lightTheme } from "./utils/Theme.js";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Footer from "./components/Footer.jsx";
import CaloriesCalc from "./pages/CaloriesCalc.jsx";
import OurPlans from "./pages/OurPlans.jsx";
import Locations from "./pages/Locations.jsx";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;
const Wrapper = styled.div`
margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  max-width: 1400px;

`;

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/calculator" element={<CaloriesCalc />} exact />
              <Route path="/plans" element={<OurPlans />} exact />
              <Route path="/locations" element={<Locations />} exact />
              <Route path="/contact" element={<ContactUs />} exact />
              <Route path="/register" element={<Register />} exact />
              <Route path="/login" element={<Login />} exact />
            </Routes>
          </Wrapper>
          <Footer />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
