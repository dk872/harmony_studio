import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useAuth } from "../../context/AuthContext";
import { LoginFormContainer, LinkText } from "./LoginPage.styles";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole, setUserId } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", formData);

      console.log("Login successful:", response.data);

      // Save role and email to localStorage
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("email", response.data.user.email);

      // Update AuthContext
      setIsAuthenticated(true);
      setRole(response.data.user.role);
      setUserId(response.data.user.id);

      navigate(response.data.redirect || "/");
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      setError(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginFormContainer>
      <h2>Log in</h2>
      <Input
        type="email"
        width="100%"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={(e) => handleInputChange(e)}
      />
      <Input
        type="password"
        width="100%"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don’t have an account?{" "}
        <LinkText href="/register">Register here.</LinkText>
      </p>
      <Button
        variant="filled"
        color="accent"
        width="100%"
        borderRadius="16"
        height="50"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </LoginFormContainer>
  );
};

export default LoginPage;
