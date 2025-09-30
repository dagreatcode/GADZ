import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";

interface LoginResponse {
  error: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
    };
  };
}

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Signup state
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);

  // Login handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setInfoMessage(null);
    setLoadingLogin(true);

    try {
      const response = await axios.post<LoginResponse>(
        `${ServerPort}/api/user/login`,
        { email, password }
      );

      if (response.data.error) {
        setInfoMessage("Invalid email or password.");
        return;
      }

      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/user"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setInfoMessage("An error occurred during login.");
    } finally {
      setLoadingLogin(false);
    }
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setInfoMessage(null);
    setLoadingSignup(true);

    try {
      const response = await axios.post(`${ServerPort}/api/user/signup`, {
        email: signupEmail,
        password: signupPassword,
      });

      if (!response.data.success) {
        setInfoMessage(response.data.message || "Signup failed.");
        return;
      }

      setSuccessMessage("Signup successful! You can now log in.");
      setSignupEmail("");
      setSignupPassword("");
      setTimeout(() => setShowSignupModal(false), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setInfoMessage("An error occurred during signup.");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="login-page d-flex flex-column align-items-center justify-content-center py-5">
      <h2 className="display-4 fw-bold mb-3 text-center">Welcome Back</h2>

      {/* Messages */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {infoMessage && <Alert variant="warning">{infoMessage}</Alert>}

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="login-form p-4 p-md-5 bg-white rounded-4 shadow-sm border border-light"
      >
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-100 btn-lg"
          variant="primary"
          disabled={loadingLogin}
        >
          {loadingLogin ? <Spinner animation="border" size="sm" /> : "Connect"}
        </Button>
      </form>

      {/* Signup Trigger */}
      <div className="mt-3 text-center">
        <Button variant="link" onClick={() => setShowSignupModal(true)}>
          Don't have an account? Sign Up
        </Button>
      </div>

      {/* Signup Modal */}
      <Modal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>

            {infoMessage && <Alert variant="warning">{infoMessage}</Alert>}

            <Button
              type="submit"
              className="w-100"
              variant="primary"
              disabled={loadingSignup}
            >
              {loadingSignup ? <Spinner animation="border" size="sm" /> : "Sign Up"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
