import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/checkuser");
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/register", userData);
      if (response?.data?.message) {
        toast.success(response?.data?.message || "Registration successful!", {
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/login");
      }
    } catch (error) {
      error?.response?.data?.errors.forEach((err) => {
        toast.error(err?.msg || "Registration failed", {
          autoClose: 3000,
          theme: "colored",
        });
      });
      console.error(error);
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post("/api/login", userData);
      setUser(response.data.user);
      toast.success("Login successful", {
        autoClose: 5000,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        autoClose: 5000,
        theme: "colored",
      });
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      setUser(null);
      toast.success("Logout successful", {
        autoClose: 5000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
