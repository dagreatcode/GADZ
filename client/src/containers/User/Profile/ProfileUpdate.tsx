import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import * as yup from "yup";

type Message = {
  svg_file: string;
  created: string;
  display_name?: string;
};

type ApiResponse = {
  results: Message[];
  svg_file: string;
};

type QRData = {
  workspace: string;
  qr_data: string;
  primary_color: string;
  background_color: string;
  dynamic: boolean;
  display_name: string;
  frame: string;
  pattern: string;
  has_border: boolean;
  logo_url: string;
  generate_png: boolean;
};

type User = {
  id: string;
  email: string;
  password: string; // Handle this securely
  description: string;
};

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const ProfileUpdate: React.FC = () => {
  const userId = localStorage.userId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }
      try {
        const response = await axios.get(`/api/user/view/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setUser(response.data);
          setFormData(response.data); // Initialize form data with user data
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || "An error occurred.");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const validateForm = () => {
    const errors: any = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before submission

    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.put(
        `${ServerPort}/api/user/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSuccessMessage("User updated successfully!");
        setUser((prevUser) => ({ ...prevUser, ...formData })); // Update state with new values
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.data.message || "Failed to update user.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQrSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<ApiResponse>(
        `${ServerPort}/api/qr-create`,
        {
          // Your QR data here
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.results);
      setApiResponse(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Failed to fetch messages.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading user data... ID: {userId}</div>;
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      <h2>Update Profile</h2>
      <Form noValidate onSubmit={handleUserUpdate}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              isInvalid={!!formErrors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.description}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update User"}
        </Button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </Form>

      <h2>QR Code Results</h2>
      <form onSubmit={handleQrSubmit}>
        <Button type="submit">Generate QR Code</Button>
      </form>

      {Array.isArray(messages) && messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <p>
                SVG File:{" "}
                <a
                  href={message.svg_file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {message.svg_file}
                </a>
              </p>
              <p>Created: {new Date(message.created).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No messages available.</div>
      )}

      {apiResponse && (
        <div>
          <h3>API Response</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default ProfileUpdate;
