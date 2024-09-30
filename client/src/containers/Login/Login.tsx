import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";

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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        `${ServerPort}/api/user/login`,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data.data;

      // Save token and user ID to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);

      console.log("Login successful, token and user ID saved!");
      navigate("/user");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${ServerPort}/api/user/signup`, {
        email: signupEmail,
        password: signupPassword,
      });

      if (response.data.success) {
        setSuccessMessage("You have successfully signed up! Please log in.");
        setShowSignupModal(false); // Close modal on success
        // Clear signup fields
        setSignupEmail("");
        setSignupPassword("");
      } else {
        console.error("Signup error:", response.data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h2 className="display-4 fw-bold lh-1 mb-3 text-center">Login</h2>
      </div>

      {/* Success Message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="p-4 p-md-5 border rounded-3 bg-light"
      >
        <h3 className="text-center">Login</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Connect
          </button>
        </div>
      </form>

      {/* Button to trigger Signup Modal */}
      <div className="text-center mt-3">
        <Button variant="link" onClick={() => setShowSignupModal(true)}>
          Sign Up
        </Button>
      </div>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>After sign up, please close this window and login. </h5>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <input
                id="signup-email"
                className="form-control"
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                id="signup-password"
                className="form-control"
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
