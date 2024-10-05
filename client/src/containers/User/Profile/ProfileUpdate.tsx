import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

type User = {
  id: string;
  email: string;
  password?: string; // Handle this securely
  description: string;
  userType: string;
  experienceLevel: string;
  location: string;
  availableFrom: string;
  newPassword?: string;
  qrCode?: string;
  qrCodeId?: string;
  qrData?: object;
  preferredLoadType?: string;
  admin: boolean;
  developer: boolean;
  archived: boolean;
  contractor: string;
  company?: string;
  loads?: string;
  drivers?: string;
  entrepreneur: string;
  subscribed?: boolean;
  address?: string;
  phoneNumber: string;
  driversLicense: string;
  comments: string;
  rating?: number;
  loadDetails?: object;
  paymentTerms?: string;
  loadStatus?: string;
  driverID?: string;
  driverExperience?: string;
  driverAvailability?: string;
  driverRating?: number;
  companyID?: string;
  companyProfile?: object;
  partnershipStatus?: string;
};

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const ProfileUpdate: React.FC = () => {
  const userId = localStorage.userId;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

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
    qrCode: "",
    qrCodeId: "",
    qrData: {},
    preferredLoadType: "",
    admin: false,
    developer: false,
    archived: false,
    contractor: "",
    company: "",
    loads: "",
    drivers: "",
    entrepreneur: "",
    subscribed: false,
    address: "",
    phoneNumber: "",
    driversLicense: "",
    comments: "",
    rating: undefined,
    loadDetails: {},
    paymentTerms: "",
    loadStatus: "",
    driverID: "",
    driverExperience: "",
    driverAvailability: "",
    driverRating: undefined,
    companyID: "",
    companyProfile: {},
    partnershipStatus: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    description: "",
    userType: "",
    experienceLevel: "",
    location: "",
    availableFrom: "",
    newPassword: "",
    phoneNumber: "",
    driversLicense: "",
    comments: "",
  });

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
          setFormData({
            ...userData,
            availableFrom: userData.availableFrom.split("T")[0], // Format to "yyyy-MM-dd"
            password: "",
            newPassword: "",
          });
          setQrCodeImage(userData.qrCode || null);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

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
    if (formData.newPassword && formData.newPassword.length < 6)
      errors.newPassword = "New password must be at least 6 characters long";
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

    const updatedData = { ...formData };
    if (formData.newPassword) updatedData.password = formData.newPassword;

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
        setSuccessMessage("Profile updated successfully.");
        setFormData({ ...formData, newPassword: "" }); // Reset new password field
      }
    } catch (error) {
      handleApiError(error);
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
    <div>
      <h1>Profile Update</h1>
      {loading && <p>Loading...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleUserUpdate}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email || ""} // Ensure value is never null
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
              value={formData.description || ""} // Ensure value is never null
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
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="userType">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              as="select"
              value={formData.userType || ""} // Ensure value is never null
              onChange={(e) =>
                setFormData({ ...formData, userType: e.target.value })
              }
              isInvalid={!!formErrors.userType}
            >
              <option value="">Select User Type</option>
              <option value="shipper">Shipper</option>
              <option value="carrier">Carrier</option>
              <option value="broker">Broker</option>
              <option value="contractor">Contractor</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.userType}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="experienceLevel">
            <Form.Label>Experience Level</Form.Label>
            <Form.Control
              as="select"
              value={formData.experienceLevel || ""} // Ensure value is never null
              onChange={(e) =>
                setFormData({ ...formData, experienceLevel: e.target.value })
              }
              isInvalid={!!formErrors.experienceLevel}
            >
              <option value="">Select Experience Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.experienceLevel}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={formData.location || ""} // Ensure value is never null
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
              value={formData.availableFrom || ""} // Ensure value is never null
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
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.newPassword || ""} // Ensure value is never null
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              isInvalid={!!formErrors.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={formData.phoneNumber || ""} // Ensure value is never null
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              isInvalid={!!formErrors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="driversLicense">
            <Form.Label>Drivers License</Form.Label>
            <Form.Control
              type="text"
              value={formData.driversLicense || ""} // Ensure value is never null
              onChange={(e) =>
                setFormData({ ...formData, driversLicense: e.target.value })
              }
              isInvalid={!!formErrors.driversLicense}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.driversLicense}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.comments || ""} // Ensure value is never null
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              isInvalid={!!formErrors.comments}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.comments}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </Form>
      {qrCodeImage && (
        <div>
          <h3>Your QR Code</h3>
          <img src={qrCodeImage} alt="Generated QR Code" />
        </div>
      )}
      <Link to="/user">Back to Profile</Link>
    </div>
  );
};

export default ProfileUpdate;
