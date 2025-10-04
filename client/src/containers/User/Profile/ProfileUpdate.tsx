import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

type User = {
  id: string;
  email: string;
  password?: string;
  description: string;
  userType: string;
  experienceLevel: string;
  location: string;
  availableFrom: string;
  newPassword?: string;
  profileImage?: string;
  phoneNumber: string;
  driversLicense: string;
  comments: string;
  qrCode?: string; // ✅ added QR support
};

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// Cloudinary constants (replace with your Cloudinary cloud name & preset)
const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = "process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET";

const ProfileUpdate: React.FC = () => {
  const userId = localStorage.userId;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null); // ✅ QR state

  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
    description: "",
    userType: "",
    experienceLevel: "",
    location: "",
    availableFrom: "",
    newPassword: "",
    profileImage: "",
    phoneNumber: "",
    driversLicense: "",
    comments: "",
    qrCode: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/user/view/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const userData = response.data;
          const availableFromDate =
            typeof userData.availableFrom === "string"
              ? userData.availableFrom.split("T")[0]
              : "";

          setFormData({
            ...userData,
            availableFrom: availableFromDate,
            password: "",
            newPassword: "",
          });
          setImagePreview(userData.profileImage || null);
          setQrCodeImage(userData.qrCode || null); // ✅ pull QR code
        }
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_UPLOAD_URL, data);
      setFormData({ ...formData, profileImage: res.data.secure_url });
      setImagePreview(res.data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: any = {};
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.userType) errors.userType = "User Type is required";
    if (!formData.experienceLevel)
      errors.experienceLevel = "Experience Level is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.availableFrom)
      errors.availableFrom = "Available From date is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
    if (!formData.driversLicense)
      errors.driversLicense = "Drivers License is required";
    if (!formData.comments) errors.comments = "Comments are required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoading(true);
    const token = localStorage.getItem("token");
    setError(null);
    setSuccessMessage(null);

    const updatedData: Partial<User> = { ...formData };
    if (!formData.newPassword) delete updatedData.password;

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
      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully 🎉");
        setFormData({ ...formData, newPassword: "" });
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data.message || error.message);
    } else {
      setError("An unknown error occurred");
    }
  };

  return (
    <Card className="p-4 shadow-lg rounded-lg">
      <h2 className="mb-4">Update Your Profile</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleUserUpdate}>
        {/* Profile Image Upload */}
        <div className="mb-4 text-center">
          <img
            src={
              imagePreview ||
              "https://via.placeholder.com/150?text=Upload+Profile+Image"
            }
            alt="Profile Preview"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files?.[0]) {
                handleImageUpload(target.files[0]);
              }
            }}
            className="mt-2"
          />
        </div>

        {/* ✅ QR Code Section */}
        {qrCodeImage && (
          <div className="mb-4 text-center">
            <h5>Your QR Code</h5>
            <img
              src={qrCodeImage}
              alt="Generated QR Code"
              style={{ width: 150, height: 150 }}
            />
          </div>
        )}

        {/* Email + Description */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="email">
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
          <Form.Group as={Col} md="6" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
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

        {/* User Type + Experience */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="userType">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              type="text"
              value={formData.userType}
              onChange={(e) =>
                setFormData({ ...formData, userType: e.target.value })
              }
              isInvalid={!!formErrors.userType}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.userType}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="experienceLevel">
            <Form.Label>Experience Level</Form.Label>
            <Form.Control
              type="text"
              value={formData.experienceLevel}
              onChange={(e) =>
                setFormData({ ...formData, experienceLevel: e.target.value })
              }
              isInvalid={!!formErrors.experienceLevel}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.experienceLevel}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Location + Available From */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              isInvalid={!!formErrors.location}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="availableFrom">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={formData.availableFrom}
              onChange={(e) =>
                setFormData({ ...formData, availableFrom: e.target.value })
              }
              isInvalid={!!formErrors.availableFrom}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.availableFrom}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Phone Number + Drivers License */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              isInvalid={!!formErrors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="driversLicense">
            <Form.Label>Drivers License</Form.Label>
            <Form.Control
              type="text"
              value={formData.driversLicense}
              onChange={(e) =>
                setFormData({ ...formData, driversLicense: e.target.value })
              }
              isInvalid={!!formErrors.driversLicense}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.driversLicense}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Comments */}
        <Form.Group className="mb-3" controlId="comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.comments}
            onChange={(e) =>
              setFormData({ ...formData, comments: e.target.value })
            }
            isInvalid={!!formErrors.comments}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.comments}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password Update */}
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            disabled={isSubmitting || loading}
            variant="primary"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
          <Link to="/user">
            <Button variant="outline-secondary">Cancel</Button>
          </Link>
        </div>
      </Form>
    </Card>
  );
};

export default ProfileUpdate;
