// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import styles from "./ProfileUpdate.module.css";

// interface User {
//   id?: string;
//   email: string;
//   password?: string;
//   description: string;
//   userType: string;
//   experienceLevel: string;
//   location: string;
//   availableFrom: string;
//   newPassword?: string;
//   profileImage?: string;
//   phoneNumber: string;
//   driversLicense: string;
//   comments: string;
//   qrCode?: string;
//   qrPNG?: string;
// }

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.getItem("userId");
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const [formData, setFormData] = useState<User>({
//     email: "",
//     password: "",
//     description: "",
//     userType: "",
//     experienceLevel: "",
//     location: "",
//     availableFrom: "",
//     newPassword: "",
//     profileImage: "",
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//     qrCode: "",
//     qrPNG: "",
//   });

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

//   // Fetch user data on mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("No token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.status === 200) {
//           const userData = response.data;
//           const availableFromDate =
//             typeof userData.availableFrom === "string"
//               ? userData.availableFrom.split("T")[0]
//               : "";

//           const profileImage =
//             userData.profileImage || userData.image || userData.profileImg || "";
//           const qr = userData.qrPNG || userData.qrCode || "";

//           setFormData({
//             ...formData,
//             ...userData,
//             availableFrom: availableFromDate,
//             profileImage,
//             qrCode: userData.qrCode || "",
//             qrPNG: userData.qrPNG || "",
//             password: "",
//             newPassword: "",
//           });

//           setImagePreview(profileImage || null);
//           setQrCodeImage(qr || null);
//         } else {
//           setError("Failed to fetch user data.");
//         }
//       } catch (err: any) {
//         handleApiError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchUserData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // Error helper
//   const handleApiError = (error: any) => {
//     if (axios.isAxiosError(error)) {
//       setError(error.response?.data?.message || error.message);
//     } else {
//       setError("An unknown error occurred.");
//     }
//   };

//   // Validate form before sending
//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     if (!formData.email) errors.email = "Email is required";
//     if (!formData.description) errors.description = "Description is required";
//     if (!formData.userType) errors.userType = "User type is required";
//     if (!formData.experienceLevel)
//       errors.experienceLevel = "Experience level is required";
//     if (!formData.location) errors.location = "Location is required";
//     if (!formData.availableFrom) errors.availableFrom = "Available from is required";
//     if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
//     if (!formData.driversLicense)
//       errors.driversLicense = "Driver’s license is required";
//     if (!formData.comments) errors.comments = "Comments are required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle file change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // Handle form submit (multipart/form-data)
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccessMessage(null);

//     if (!validateForm()) return;

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("No token found. Please log in.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const updateForm = new FormData();

//       // Append all form fields
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           updateForm.append(key, value.toString());
//         }
//       });

//       // Append file if selected
//       if (selectedFile) {
//         updateForm.append("profileImage", selectedFile);
//       }

//       const response = await axios.put(
//         `${ServerPort}/api/user/update/${userId}`,
//         updateForm,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200 && response.data?.user) {
//         const updatedUser = response.data.user;
//         const profileImage =
//           updatedUser.profileImage || updatedUser.image || updatedUser.profileImg;
//         const qr = updatedUser.qrPNG || updatedUser.qrCode || "";

//         setFormData({
//           ...formData,
//           ...updatedUser,
//           profileImage,
//           qrCode: updatedUser.qrCode || "",
//           qrPNG: updatedUser.qrPNG || "",
//           password: "",
//           newPassword: "",
//         });

//         setImagePreview(profileImage || null);
//         setQrCodeImage(qr || null);
//         setSuccessMessage("✅ Profile updated successfully!");
//       } else {
//         setError("Update failed — unexpected server response.");
//       }
//     } catch (err: any) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles["profile-container"]}>
//       <h2>Update Your Profile</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p className={styles["error-text"]}>{error}</p>}
//       {successMessage && <p className={styles["success-text"]}>{successMessage}</p>}

//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className={styles["profile-form"]}
//       >
//         {/* Profile Image */}
//         <div className={styles["image-section"]}>
//           <img
//             src={
//               imagePreview ||
//               formData.profileImage ||
//               "https://via.placeholder.com/150?text=Upload+Profile"
//             }
//             alt="Profile"
//             className={styles["profile-image"]}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={styles["file-input"]}
//           />
//         </div>

//         {/* QR Code */}
//         {qrCodeImage && (
//           <div className={styles["qr-section"]}>
//             <h4>Your QR Code</h4>
//             <img src={qrCodeImage} alt="QR Code" className={styles["qr-image"]} />
//           </div>
//         )}

//         {/* Email */}
//         <label>Email</label>
//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         {formErrors.email && <small className={styles["error"]}>{formErrors.email}</small>}

//         {/* Description */}
//         <label>Description</label>
//         <input
//           type="text"
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         />

//         {/* User Type */}
//         <label>User Type</label>
//         <input
//           type="text"
//           value={formData.userType}
//           onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
//         />

//         {/* Experience */}
//         <label>Experience Level</label>
//         <input
//           type="text"
//           value={formData.experienceLevel}
//           onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
//         />

//         {/* Location */}
//         <label>Location</label>
//         <input
//           type="text"
//           value={formData.location}
//           onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//         />

//         {/* Available From */}
//         <label>Available From</label>
//         <input
//           type="date"
//           value={formData.availableFrom}
//           onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
//         />

//         {/* Phone Number */}
//         <label>Phone Number</label>
//         <input
//           type="text"
//           value={formData.phoneNumber}
//           onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//         />

//         {/* Driver’s License */}
//         <label>Driver’s License</label>
//         <input
//           type="text"
//           value={formData.driversLicense}
//           onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
//         />

//         {/* Comments */}
//         <label>Comments</label>
//         <textarea
//           rows={3}
//           value={formData.comments}
//           onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
//         ></textarea>

//         {/* New Password */}
//         <label>New Password</label>
//         <input
//           type="password"
//           value={formData.newPassword}
//           onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//         />

//         {/* Buttons */}
//         <div className={styles["button-row"]}>
//           <button type="submit" disabled={loading}>
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//           <Link to="/user" className={styles["cancel-link"]}>
//             Cancel
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileUpdate;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProfileUpdate.module.css";

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

interface User {
  email: string;
  description: string;
  userType: string;
  experienceLevel: string;
  location: string;
  availableFrom: string;
  phoneNumber: string;
  driversLicense: string;
  comments: string;
  profileImage?: string;
  qrPNG?: string;
  qrCode?: string;
  newPassword?: string;
}

const ProfileUpdate: React.FC = () => {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState<User>({
    email: "",
    description: "",
    userType: "",
    experienceLevel: "",
    location: "",
    availableFrom: "",
    phoneNumber: "",
    driversLicense: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // IMAGES
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          const u = res.data;

          const availableDate =
            typeof u.availableFrom === "string"
              ? u.availableFrom.split("T")[0]
              : "";

          const profileImg =
            u.profileImage || u.profileImg || u.image || null;

          const qr = u.qrPNG || u.qrCode || null;

          setFormData({
            email: u.email || "",
            description: u.description || "",
            userType: u.userType || "",
            experienceLevel: u.experienceLevel || "",
            location: u.location || "",
            availableFrom: availableDate || "",
            phoneNumber: u.phoneNumber || "",
            driversLicense: u.driversLicense || "",
            comments: u.comments || "",
            profileImage: profileImg || "",
            qrPNG: u.qrPNG || "",
            qrCode: u.qrCode || "",
          });

          setImagePreview(profileImg);
          setQrPreview(qr);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load user.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) loadUser();
  }, [userId]);

  // Handle file select
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    if (!token) return setError("Not logged in.");

    try {
      setLoading(true);

      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          fd.append(key, value.toString());
        }
      });

      if (selectedFile) {
        fd.append("profileImage", selectedFile);
      }

      const res = await axios.put(
        `${ServerPort}/api/user/update/${userId}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        const updated = res.data.user;

        const profileImg =
          updated.profileImage || updated.profileImg || updated.image;

        const qrUpdated = updated.qrPNG || updated.qrCode;

        setFormData({
          ...formData,
          profileImage: profileImg,
          qrPNG: updated.qrPNG,
          qrCode: updated.qrCode,
          newPassword: "",
        });

        setImagePreview(profileImg || null);
        setQrPreview(qrUpdated || null);

        setSuccess("Profile updated successfully!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <h2>Update Your Profile</h2>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles["profile-form"]}>
        
        {/* IMAGE UPLOAD */}
        <div className={styles["image-section"]}>
          <img
            src={
              imagePreview ||
              formData.profileImage ||
              "https://via.placeholder.com/150?text=Upload"
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

        {/* QR */}
        {qrPreview && (
          <div className={styles["qr-section"]}>
            <h4>Your QR Code</h4>
            <img src={qrPreview} className={styles["qr-image"]} alt="QR Code" />
          </div>
        )}

        {/* FORM FIELDS */}
        <label>Email</label>
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label>Description</label>
        <input
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label>User Type</label>
        <input
          value={formData.userType}
          onChange={(e) =>
            setFormData({ ...formData, userType: e.target.value })
          }
        />

        <label>Experience Level</label>
        <input
          value={formData.experienceLevel}
          onChange={(e) =>
            setFormData({ ...formData, experienceLevel: e.target.value })
          }
        />

        <label>Location</label>
        <input
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <label>Available From</label>
        <input
          type="date"
          value={formData.availableFrom}
          onChange={(e) =>
            setFormData({ ...formData, availableFrom: e.target.value })
          }
        />

        <label>Phone Number</label>
        <input
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />

        <label>Driver’s License</label>
        <input
          value={formData.driversLicense}
          onChange={(e) =>
            setFormData({ ...formData, driversLicense: e.target.value })
          }
        />

        <label>Comments</label>
        <textarea
          value={formData.comments}
          onChange={(e) =>
            setFormData({ ...formData, comments: e.target.value })
          }
        ></textarea>

        <label>New Password</label>
        <input
          type="password"
          value={formData.newPassword || ""}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />

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
