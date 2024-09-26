import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";

// Define types
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
  password: string;
  description: string;
};

const ServerPort = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT;

const ProfileUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [user, setUser] = useState<User>({
    id: id || "",
    email: "",
    password: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${ServerPort}/api/user/view/${id}`
        );
        setUser(response.data); // Assuming your API returns the user object directly
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const qrData: QRData = {
    workspace: "82140683-32bd-4422-9ff9-7ecec248c952",
    qr_data: "https://twitter.com/hovercodeHQ",
    primary_color: "#3b81f6",
    background_color: "#FFFFFF",
    dynamic: true,
    display_name: "Vincent Kendrick",
    frame: "circle-viewfinder",
    pattern: "Diamonds",
    has_border: true,
    logo_url: "https://hovercode.com/static/website/images/logo.png",
    generate_png: true,
  };

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    description: yup.string().required("Description is required"),
  });

  const handleQrSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<ApiResponse>(
        `${ServerPort}/api/qr-create`,
        qrData
      );
      setMessages(response.data.results);
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to fetch messages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async (values: User) => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.put(
        `/api/user/update/${id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        setSuccessMessage("User updated successfully!");
        setUser(values);
      } else {
        setError(response.data.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("An error occurred while updating the user.");
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}

      <Formik
        validationSchema={schema}
        onSubmit={handleUserUpdate}
        initialValues={user}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik101">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik102">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik103">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  isValid={touched.description && !errors.description}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Update User</Button>
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </Form>
        )}
      </Formik>

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
