// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Alert from "react-bootstrap/Alert";
// import { Link } from "react-router-dom";

// type User = {
//   id: string;
//   email: string;
//   password?: string; // Handle this securely
//   description: string;
//   userType: string;
//   experienceLevel: string;
//   location: string;
//   availableFrom: string;
//   newPassword?: string;
//   qrCode?: string;
//   qrCodeId?: string;
//   qrData?: object;
//   preferredLoadType?: string;
//   admin: boolean;
//   developer: boolean;
//   archived: boolean;
//   contractor: string;
//   company?: string;
//   loads?: string;
//   drivers?: string;
//   entrepreneur: string;
//   subscribed?: boolean;
//   address?: string;
//   phoneNumber: string;
//   driversLicense: string;
//   comments: string;
//   rating?: number;
//   loadDetails?: object;
//   paymentTerms?: string;
//   loadStatus?: string;
//   driverID?: string;
//   driverExperience?: string;
//   driverAvailability?: string;
//   driverRating?: number;
//   companyID?: string;
//   companyProfile?: object;
//   partnershipStatus?: string;
// };

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.userId;
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

//   const [formData, setFormData] = useState<User>({
//     id: "",
//     email: "",
//     password: "",
//     description: "",
//     userType: "",
//     experienceLevel: "",
//     location: "",
//     availableFrom: "",
//     newPassword: "",
//     qrCode: "",
//     qrCodeId: "",
//     qrData: {},
//     preferredLoadType: "",
//     admin: false,
//     developer: false,
//     archived: false,
//     contractor: "",
//     company: "",
//     loads: "",
//     drivers: "",
//     entrepreneur: "",
//     subscribed: false,
//     address: "",
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//     rating: undefined,
//     loadDetails: {},
//     paymentTerms: "",
//     loadStatus: "",
//     driverID: "",
//     driverExperience: "",
//     driverAvailability: "",
//     driverRating: undefined,
//     companyID: "",
//     companyProfile: {},
//     partnershipStatus: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     email: "",
//     description: "",
//     userType: "",
//     experienceLevel: "",
//     location: "",
//     availableFrom: "",
//     newPassword: "",
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No token found. Please log in.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.get(`/api/user/view/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.status === 200) {
//           const userData = response.data;

//           // Check if availableFrom exists and is a string before splitting
//           const availableFromDate =
//             typeof userData.availableFrom === "string"
//               ? userData.availableFrom.split("T")[0]
//               : ""; // Default to an empty string if not a valid string

//           setFormData({
//             ...userData,
//             availableFrom: availableFromDate, // Use the checked variable
//             password: "",
//             newPassword: "",
//           });
//           setQrCodeImage(userData.qrCode || null);
//         } else {
//           setError("Failed to fetch user data.");
//         }
//       } catch (error) {
//         handleApiError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchUserData();
//   }, [userId]);

//   const validateForm = () => {
//     const errors: any = {};
//     if (!formData.email) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = "Email is invalid";
//     if (!formData.description) errors.description = "Description is required";
//     if (!formData.userType) errors.userType = "User Type is required";
//     if (!formData.experienceLevel)
//       errors.experienceLevel = "Experience Level is required";
//     if (!formData.location) errors.location = "Location is required";
//     if (!formData.availableFrom)
//       errors.availableFrom = "Available From date is required";
//     if (formData.newPassword && formData.newPassword.length < 6)
//       errors.newPassword = "New password must be at least 6 characters long";
//     if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
//     if (!formData.driversLicense)
//       errors.driversLicense = "Drivers License is required";
//     if (!formData.comments) errors.comments = "Comments are required";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleUserUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     setError(null);
//     setSuccessMessage(null);

//     const updatedData: Partial<User> = { ...formData };

//     // Only set password if newPassword is provided
//     if (formData.newPassword && formData.newPassword.trim() !== "") {
//       updatedData.password = formData.newPassword;
//     } else {
//       delete updatedData.password; // Remove password field if newPassword is not provided
//     }

//     try {
//       console.log("Updating user with data:", updatedData); // Log data being sent
//       const response = await axios.put(
//         `${ServerPort}/api/user/update/${userId}`,
//         updatedData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setSuccessMessage("Profile updated successfully.");
//         setFormData({ ...formData, newPassword: "" }); // Reset new password field
//       }
//     } catch (error) {
//       console.error("Error updating user:", error); // Log the error
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//       setIsSubmitting(false);
//     }
//   };

//   const handleApiError = (error: any) => {
//     if (axios.isAxiosError(error)) {
//       console.error("API Error:", error.response?.data); // Log full error details
//       setError(error.response?.data.message || error.message);
//     } else {
//       console.error("Unknown Error:", error);
//       setError("An unknown error occurred");
//     }
//   };

//   return (
//     <div>
//       <h1>Profile Update</h1>
//       {loading && <p>Loading...</p>}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {successMessage && <Alert variant="success">{successMessage}</Alert>}
//       <Form onSubmit={handleUserUpdate}>
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={formData.email || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               isInvalid={!!formErrors.email}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.email}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="6" controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.description || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               isInvalid={!!formErrors.description}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.description}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="userType">
//             <Form.Label>User Type</Form.Label>
//             <Form.Control
//               as="select"
//               value={formData.userType || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, userType: e.target.value })
//               }
//               isInvalid={!!formErrors.userType}
//             >
//               <option value="">Select User Type</option>
//               <option value="shipper">Shipper</option>
//               <option value="carrier">Carrier</option>
//               <option value="broker">Broker</option>
//               <option value="contractor">Contractor</option>
//             </Form.Control>
//             <Form.Control.Feedback type="invalid">
//               {formErrors.userType}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="6" controlId="experienceLevel">
//             <Form.Label>Experience Level</Form.Label>
//             <Form.Control
//               as="select"
//               value={formData.experienceLevel || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, experienceLevel: e.target.value })
//               }
//               isInvalid={!!formErrors.experienceLevel}
//             >
//               <option value="">Select Experience Level</option>
//               <option value="beginner">Beginner</option>
//               <option value="intermediate">Intermediate</option>
//               <option value="expert">Expert</option>
//             </Form.Control>
//             <Form.Control.Feedback type="invalid">
//               {formErrors.experienceLevel}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="location">
//             <Form.Label>Location</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.location || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, location: e.target.value })
//               }
//               isInvalid={!!formErrors.location}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.location}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="6" controlId="availableFrom">
//             <Form.Label>Available From</Form.Label>
//             <Form.Control
//               type="date"
//               value={formData.availableFrom || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, availableFrom: e.target.value })
//               }
//               isInvalid={!!formErrors.availableFrom}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.availableFrom}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="newPassword">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={formData.newPassword || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, newPassword: e.target.value })
//               }
//               isInvalid={!!formErrors.newPassword}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.newPassword}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="6" controlId="phoneNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.phoneNumber || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, phoneNumber: e.target.value })
//               }
//               isInvalid={!!formErrors.phoneNumber}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.phoneNumber}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="driversLicense">
//             <Form.Label>Drivers License</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.driversLicense || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, driversLicense: e.target.value })
//               }
//               isInvalid={!!formErrors.driversLicense}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.driversLicense}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="6" controlId="comments">
//             <Form.Label>Comments</Form.Label>
//             <Form.Control
//               as="textarea"
//               value={formData.comments || ""} // Ensure value is never null
//               onChange={(e) =>
//                 setFormData({ ...formData, comments: e.target.value })
//               }
//               isInvalid={!!formErrors.comments}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.comments}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>
//         <Button type="submit" disabled={isSubmitting || loading}>
//           {isSubmitting ? "Updating..." : "Update Profile"}
//         </Button>
//       </Form>
//       {qrCodeImage && (
//         <div>
//           <h3>Your QR Code</h3>
//           <img src={qrCodeImage} alt="Generated QR Code" />
//         </div>
//       )}
//       <Link to="/user">Back to Profile</Link>
//     </div>
//   );
// };

// export default ProfileUpdate;

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
  profileImage?: string; // <-- added field for image URL
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
  const [profileImage, setProfileImage] = useState<string | null>(null); // <-- image state

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
    profileImage: "", // <-- default empty
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
          setProfileImage(userData.profileImage || null); // <-- set profile image
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // <-- replace with your preset

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload", // <-- replace with your cloud name
        formDataCloud
      );
      setProfileImage(res.data.secure_url);
      setFormData({ ...formData, profileImage: res.data.secure_url });
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image.");
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
      console.error("Error updating user:", error);
      handleApiError(error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      setError(error.response?.data.message || error.message);
    } else {
      console.error("Unknown Error:", error);
      setError("An unknown error occurred");
    }
  };

  return (
    <div>
      <h1>Profile Update</h1>
      {loading && <p>Loading...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      {/* Profile Image Upload */}
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="profileImage">
          <Form.Label>Company / Profile Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {profileImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          )}
        </Form.Group>
      </Row>

      <Form onSubmit={handleUserUpdate}>
        {/* ... your existing form fields ... */}
        {/* Keep all your existing rows here */}
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
