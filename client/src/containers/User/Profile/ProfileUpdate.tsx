import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProfileUpdate.module.css";

interface User {
  id?: string;
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
  qrCode?: string;
  qrPNG?: string;
}

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const ProfileUpdate: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<User>({
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
    qrPNG: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userData = response.data;
          const availableFromDate =
            typeof userData.availableFrom === "string"
              ? userData.availableFrom.split("T")[0]
              : "";

          const profileImage =
            userData.profileImage || userData.image || userData.profileImg || "";
          const qr = userData.qrPNG || userData.qrCode || "";

          setFormData({
            ...formData,
            ...userData,
            availableFrom: availableFromDate,
            profileImage,
            qrCode: userData.qrCode || "",
            qrPNG: userData.qrPNG || "",
            password: "",
            newPassword: "",
          });

          setImagePreview(profileImage || null);
          setQrCodeImage(qr || null);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err: any) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Error helper
  const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message || error.message);
    } else {
      setError("An unknown error occurred.");
    }
  };

  // Validate form before sending
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.userType) errors.userType = "User type is required";
    if (!formData.experienceLevel)
      errors.experienceLevel = "Experience level is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.availableFrom) errors.availableFrom = "Available from is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!formData.driversLicense)
      errors.driversLicense = "Driver’s license is required";
    if (!formData.comments) errors.comments = "Comments are required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit (multipart/form-data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const updateForm = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          updateForm.append(key, value.toString());
        }
      });

      // Append file if selected
      if (selectedFile) {
        updateForm.append("profileImage", selectedFile);
      }

      const response = await axios.put(
        `${ServerPort}/api/user/update/${userId}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data?.user) {
        const updatedUser = response.data.user;
        const profileImage =
          updatedUser.profileImage || updatedUser.image || updatedUser.profileImg;
        const qr = updatedUser.qrPNG || updatedUser.qrCode || "";

        setFormData({
          ...formData,
          ...updatedUser,
          profileImage,
          qrCode: updatedUser.qrCode || "",
          qrPNG: updatedUser.qrPNG || "",
          password: "",
          newPassword: "",
        });

        setImagePreview(profileImage || null);
        setQrCodeImage(qr || null);
        setSuccessMessage("✅ Profile updated successfully!");
      } else {
        setError("Update failed — unexpected server response.");
      }
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <h2>Update Your Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p className={styles["error-text"]}>{error}</p>}
      {successMessage && <p className={styles["success-text"]}>{successMessage}</p>}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles["profile-form"]}
      >
        {/* Profile Image */}
        <div className={styles["image-section"]}>
          <img
            src={
              imagePreview ||
              formData.profileImage ||
              "https://via.placeholder.com/150?text=Upload+Profile"
            }
            alt="Profile"
            className={styles["profile-image"]}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles["file-input"]}
          />
        </div>

        {/* QR Code */}
        {qrCodeImage && (
          <div className={styles["qr-section"]}>
            <h4>Your QR Code</h4>
            <img src={qrCodeImage} alt="QR Code" className={styles["qr-image"]} />
          </div>
        )}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formErrors.email && <small className={styles["error"]}>{formErrors.email}</small>}

        {/* Description */}
        <label>Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {/* User Type */}
        <label>User Type</label>
        <input
          type="text"
          value={formData.userType}
          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
        />

        {/* Experience */}
        <label>Experience Level</label>
        <input
          type="text"
          value={formData.experienceLevel}
          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
        />

        {/* Location */}
        <label>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />

        {/* Available From */}
        <label>Available From</label>
        <input
          type="date"
          value={formData.availableFrom}
          onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
        />

        {/* Phone Number */}
        <label>Phone Number</label>
        <input
          type="text"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />

        {/* Driver’s License */}
        <label>Driver’s License</label>
        <input
          type="text"
          value={formData.driversLicense}
          onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
        />

        {/* Comments */}
        <label>Comments</label>
        <textarea
          rows={3}
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
        ></textarea>

        {/* New Password */}
        <label>New Password</label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
        />

        {/* Buttons */}
        <div className={styles["button-row"]}>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <Link to="/user" className={styles["cancel-link"]}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
