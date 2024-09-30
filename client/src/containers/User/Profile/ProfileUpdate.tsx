import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

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
  eye_style: string;
  text: string;
  domain: string;
  gps_tracking: boolean;
  logo_round: boolean;
};

type User = {
  id: string;
  email: string;
  password: string; // Handle this securely
  description: string;
  newPassword?: string; // New password field
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
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);

  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "", // Keep blank for security
    description: "",
    newPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    description: "",
    newPassword: "",
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
          const userData = response.data;
          setUser(userData);
          setFormData({
            id: userData.id || "",
            email: userData.email || "",
            password: "",
            description: userData.description || "",
            newPassword: "",
          });
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        handleApiError(error);
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
    if (formData.newPassword && formData.newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters long";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    setError(null);
    setSuccessMessage(null);

    const updatedData = { ...formData };
    if (formData.newPassword) {
      updatedData.password = formData.newPassword;
    }

    try {
      const response = await axios.put(
        `${ServerPort}/api/user/update/${userId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSuccessMessage("User updated successfully!");
        setUser((prevUser) => ({ ...prevUser, ...updatedData }));
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.data.message || "Failed to update user.");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const qrData: QRData = {
    workspace: "82140683-32bd-4422-9ff9-7ecec248c952",
    qr_data: "https://gadzconnect.com",
    primary_color: "#3b81f6",
    background_color: "#FFFFFF",
    dynamic: true,
    display_name: "GADZ User",
    frame: "swirl",
    pattern: "Diamonds",
    has_border: true,
    logo_url:
      "https://res.cloudinary.com/fashion-commit/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1726274331/GADZCo_ndr2y6.jpg",
    generate_png: true,
    eye_style: "Drop",
    text: "GADZ",
    domain: "GADZConnect.com",
    gps_tracking: true,
    logo_round: true,
  };

  const handleQrSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<ApiResponse>(
        `${ServerPort}/api/qr-create`,
        qrData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.results);
      setApiResponse(response.data);
      setQrCodeSvg(response.data.svg_file);
      setSuccessMessage("QR Code generated successfully!");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An error occurred on the server.";
      console.error("Error response:", error.response);
      setError(message);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error);
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  if (!user) {
    return <div>Loading user data... ID: {userId}</div>;
  }

  return (
    <>
      <Link to="/User">Home</Link>
      {loading && <div>Loading...</div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
          <Form.Group as={Col} md="4" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              isInvalid={!!formErrors.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.newPassword}
            </Form.Control.Feedback>
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
      </Form>

      <h2>QR Code Results</h2>
      <form onSubmit={handleQrSubmit}>
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate QR Code"}
        </Button>
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

      {qrCodeSvg && (
        <div>
          <h3>Generated QR Code</h3>
          <img src={qrCodeSvg} alt="Generated QR Code" />
        </div>
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
