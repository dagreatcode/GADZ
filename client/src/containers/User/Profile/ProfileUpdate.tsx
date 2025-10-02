import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
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
  profileImage?: string; // Added profile image field
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

  // 🆕 State for image upload
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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
    profileImage: "", // added
  });

  const [
    // formErrors
    , setFormErrors] = useState({
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
          setQrCodeImage(userData.qrCode || null);
          setProfileImagePreview(userData.profileImage || null); // 🆕 Show existing image
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

    const updatedData: Partial<User> = { ...formData };

    if (formData.newPassword && formData.newPassword.trim() !== "") {
      updatedData.password = formData.newPassword;
    } else {
      delete updatedData.password;
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
      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully.");
        setFormData({ ...formData, newPassword: "" });
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // 🆕 Handle Cloudinary upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // 🔑 Replace
    data.append("cloud_name", "YOUR_CLOUDINARY_CLOUD_NAME"); // 🔑 Replace

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload", // 🔑 Replace
        {
          method: "POST",
          body: data,
        }
      );
      const uploadResponse = await res.json();
      setFormData({ ...formData, profileImage: uploadResponse.secure_url });
      setProfileImagePreview(uploadResponse.secure_url);
      setSuccessMessage("Profile image uploaded successfully.");
    } catch (err) {
      setError("Image upload failed.");
    } finally {
      setUploading(false);
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

      {/* 🆕 Show profile image */}
      {profileImagePreview && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Profile Image</h3>
          <img
            src={profileImagePreview}
            alt="Profile"
            style={{ maxWidth: "200px", borderRadius: "8px" }}
          />
        </div>
      )}

      {/* 🆕 Upload input */}
      <Form.Group controlId="profileImageUpload" className="mb-3">
        <Form.Label>Update Profile Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p>Uploading...</p>}
      </Form.Group>

      {loading && <p>Loading...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {/* ✅ Existing form untouched */}
      <Form onSubmit={handleUserUpdate}>
        {/* ... your existing fields remain exactly as is ... */}
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
