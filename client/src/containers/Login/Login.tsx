import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      // Navigate to user page or home page
      navigate("/user");
    } catch (err) {
      console.error("Login error:", err);
      // Optionally, handle error display to the user
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
        console.log("Signup successful! Please log in.");
        // Optionally, redirect to login page or show success message
      } else {
        console.error("Signup error:", response.data.message);
        // Optionally, handle error display to the user
      }
    } catch (err) {
      console.error("Signup error:", err);
      // Optionally, handle error display to the user
    }
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h2 className="display-4 fw-bold lh-1 mb-3 text-center">Login</h2>
      </div>

      {/* Signup Form */}
      <form
        onSubmit={handleSignup}
        className="p-4 p-md-5 border rounded-3 bg-light mb-4"
      >
        <h3 className="text-center">Sign Up</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
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
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
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
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>

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
    </div>
  );
};

export default Login;
