import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  error: boolean;
  data: {
    token: string;
    user: {
      id: string; // Adjust this type based on your user model
      email: string; // Include any other fields you expect
    };
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>("/api/user/login", {
        email,
        password,
      });

      const { token, user } = response.data.data;

      // Save token and user ID to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id); // Adjust if your user object uses a different field for ID

      console.log("Login successful, token and user ID saved!");

      // Navigate to user page or home page
      navigate("/user");
    } catch (err) {
      console.error("Login error:", err);
      // Optionally, handle error display to the user
    }
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h2 className="display-4 fw-bold lh-1 mb-3 text-center">Login</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 p-md-5 border rounded-3 bg-light"
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <input
                id="email"
                className="form-control"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="w-10 btn btn-lg btn-primary" type="submit">
            Connect
          </button>
        </div>
      </form>
      {/* Sign Up Section */}
      {/* Your Sign Up section remains unchanged */}
    </div>
  );
};

export default Login;
