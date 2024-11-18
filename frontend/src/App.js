import Navbar from "./components/Navbar.jsx";
import { lightTheme } from "./utils/Theme.js";
import { AuthProvider } from "./utils/authContext.js";
import { Flip, ToastContainer } from "react-toastify";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import CaloriesCalc from "./pages/CaloriesCalc.jsx";
import OurPlans from "./pages/OurPlans.jsx";
import Locations from "./pages/Locations.jsx";
import Basket from "./pages/Basket.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import CheckOut from "./pages/CheckOut.jsx";
import Cv from "./components/Cv.jsx";

const Container = styled.div`
  width: 100%;
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
  max-width: 1400px;
`;

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={lightTheme}>
          <Container>
            <ToastContainer
              toastClassName="toastContainerBox"
              transition={Flip}
              position="top-center"
            />
            {/* <Navbar /> */}
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/calculator" element={<CaloriesCalc />} exact />
                <Route path="/plans" element={<OurPlans />} exact />
                <Route path="/locations" element={<Locations />} exact />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute>
                      <Register />
                    </ProtectedRoute>
                  }
                  exact
                />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute>
                      <Login />
                    </ProtectedRoute>
                  }
                  exact
                />
                <Route path="/profile" element={<Profile />} exact />
                <Route path="/basket" element={<Basket />} exact />
                <Route path="/checkout/:id" element={<CheckOut />} exact />
                <Route path="/cv" element={<Cv />} exact />
              </Routes>
            </Wrapper>
            {/* <Footer /> */}
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
