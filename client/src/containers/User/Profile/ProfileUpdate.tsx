import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row, Alert, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Full ProfileUpdate component (CRA + TypeScript)
 * - Converts selected image to base64 (data URI)
 * - Sends JSON payload to PUT /api/user/update/:id
 * - Expects backend to accept profileImage as base64 or URL and return updated user
 *
 * Update ServerPort if your API host/port differs.
 */

type User = {
  id: string;
  email: string;
  password?: string;
  newPassword?: string;
  description: string;
  userType: string;
  experienceLevel: string;
  location: string;
  availableFrom: string;
  profileImage?: string;
  phoneNumber: string;
  driversLicense: string;
  comments: string;
  qrCode?: string;
};

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const ProfileUpdate: React.FC = () => {
  const userId = localStorage.getItem("userId") || "";

  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
    newPassword: "",
    description: "",
    userType: "",
    experienceLevel: "",
    location: "",
    availableFrom: "",
    profileImage: "",
    phoneNumber: "",
    driversLicense: "",
    comments: "",
    qrCode: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load user profile on mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          const user = res.data;
          setFormData({
            ...user,
            availableFrom: user.availableFrom?.split("T")[0] || "",
            password: "",
            newPassword: "",
          });
          setImagePreview(user.profileImage || null);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle native file input change — show preview and keep file for conversion.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      // revoke previous blob url if any
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
    }
  };

  // Convert File -> base64 data URI (e.g. "data:image/png;base64,....")
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

  // Basic validation for required fields
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields: (keyof User)[] = [
      "email",
      "description",
      "userType",
      "experienceLevel",
      "location",
      "availableFrom",
      "phoneNumber",
      "driversLicense",
      "comments",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) errors[field] = "This field is required";
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handler: converts file to base64 (if provided) and sends JSON
  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    setLoading(true);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // prepare payload as JSON (matches your backend expectation)
      const payload: any = { ...formData };

      // remove 'password' if user didn't enter newPassword
      if (!formData.newPassword) delete payload.password;

      // If a file was selected, convert to base64 data URI and include in payload
      if (selectedFile) {
        const base64 = await fileToBase64(selectedFile);
        // base64 is already a data URI (FileReader gives data URI), include directly
        payload.profileImage = base64;
      }

      // Send JSON payload (profileImage as base64 or profileImage can be existing URL)
      const res = await axios.put(
        `${ServerPort}/api/user/update/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const updatedUser = res.data.user ?? res.data;
        setFormData((prev) => ({ ...prev, ...updatedUser, newPassword: "" }));
        setImagePreview(updatedUser.profileImage || imagePreview);
        setSelectedFile(null);
        setSuccessMessage("Profile updated and image uploaded.");
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleApiError = (err: any) => {
    if (axios.isAxiosError(err)) {
      // backend might return { message } or raw text
      const msg =
        (err.response && (err.response.data?.message || err.response.data)) ||
        err.message ||
        "Server error";
      setError(String(msg));
    } else {
      setError(String(err || "Unknown error"));
    }
  };

  return (
    <Card className="p-4 shadow-lg rounded-4">
      <h2 className="text-center mb-3">Update Profile</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto my-2" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleUserUpdate}>
        {/* Profile Image */}
        <div className="text-center mb-4">
          <img
            src={
              imagePreview ||
              formData.profileImage ||
              "https://via.placeholder.com/150?text=Profile"
            }
            alt="Profile"
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #ddd",
            }}
          />
          <div style={{ marginTop: 8 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {selectedFile && (
              <div style={{ marginTop: 6, fontSize: 13 }}>{selectedFile.name}</div>
            )}
          </div>
        </div>

        {/* ALL FORM FIELDS */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              isInvalid={!!formErrors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              isInvalid={!!formErrors.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              type="text"
              value={formData.userType}
              isInvalid={!!formErrors.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
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
              isInvalid={!!formErrors.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
            />
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
              value={formData.location}
              isInvalid={!!formErrors.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              isInvalid={!!formErrors.availableFrom}
              onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.availableFrom}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={formData.phoneNumber}
              isInvalid={!!formErrors.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="driversLicense">
            <Form.Label>Driver’s License</Form.Label>
            <Form.Control
              type="text"
              value={formData.driversLicense}
              isInvalid={!!formErrors.driversLicense}
              onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.driversLicense}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.comments}
            isInvalid={!!formErrors.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.comments}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button type="submit" disabled={isSubmitting} variant="primary">
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
