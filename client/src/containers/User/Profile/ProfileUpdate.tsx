// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Alert from "react-bootstrap/Alert";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import { Link } from "react-router-dom";

// type User = {
//   id: string;
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
//   qrCode?: string; // ✅ added QR support
// };

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// // ✅ Replace these with your actual Cloudinary credentials
// // const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload`;
// // const CLOUDINARY_UPLOAD_PRESET = "<your-upload-preset>";
// const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
// const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.getItem("userId");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null); // ✅ QR code state

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
//     profileImage: "",
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//     qrCode: "",
//   });

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

//   // ✅ Load user profile
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
//         const response = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.status === 200) {
//           const userData = response.data;
//           const availableFromDate =
//             typeof userData.availableFrom === "string"
//               ? userData.availableFrom.split("T")[0]
//               : "";

//           setFormData({
//             ...userData,
//             availableFrom: availableFromDate,
//             password: "",
//             newPassword: "",
//           });

//           setImagePreview(userData.profileImage || null);
//           setQrCodeImage(userData.qrCode || null);
//         }
//       } catch (err) {
//         handleApiError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchUserData();
//   }, [userId]);

//   // ✅ Upload image to Cloudinary
//   const handleImageUpload = async (file: File) => {
//     setLoading(true);
//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET!);

//       const res = await axios.post(CLOUDINARY_UPLOAD_URL, data);
//       const imageUrl = res.data.secure_url;

//       setFormData({ ...formData, profileImage: imageUrl });
//       setImagePreview(imageUrl);
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError("Image upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Validate before sending update
//   const validateForm = () => {
//     const errors: any = {};
//     if (!formData.email) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = "Invalid email format";
//     if (!formData.description) errors.description = "Description is required";
//     if (!formData.userType) errors.userType = "User Type is required";
//     if (!formData.experienceLevel)
//       errors.experienceLevel = "Experience Level is required";
//     if (!formData.location) errors.location = "Location is required";
//     if (!formData.availableFrom)
//       errors.availableFrom = "Available From date is required";
//     if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
//     if (!formData.driversLicense)
//       errors.driversLicense = "Drivers License is required";
//     if (!formData.comments) errors.comments = "Comments are required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // ✅ Submit update to backend
//   const handleUserUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     const token = localStorage.getItem("token");

//     // Remove password if not updating it
//     const updatedData: Partial<User> = { ...formData };
//     if (!formData.newPassword) delete updatedData.password;

//     try {
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
//         setSuccessMessage("✅ Profile updated successfully!");
//         setQrCodeImage(response.data.qrCode || qrCodeImage); // ✅ refresh QR code if regenerated
//         setFormData({ ...formData, newPassword: "" });
//       }
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ Handle API errors
//   const handleApiError = (error: any) => {
//     if (axios.isAxiosError(error)) {
//       setError(error.response?.data?.message || error.message);
//     } else {
//       setError("An unknown error occurred");
//     }
//   };

//   return (
//     <Card className="p-4 shadow-lg rounded-lg">
//       <h2 className="mb-4 text-center">Update Your Profile</h2>
//       {loading && <Spinner animation="border" className="d-block mx-auto mb-3" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {successMessage && <Alert variant="success">{successMessage}</Alert>}

//       <Form onSubmit={handleUserUpdate}>
//         {/* Profile Image Upload */}
//         <div className="mb-4 text-center">
//           <img
//             src={
//               imagePreview ||
//               "https://via.placeholder.com/150?text=Upload+Profile+Image"
//             }
//             alt="Profile"
//             style={{
//               width: 120,
//               height: 120,
//               borderRadius: "50%",
//               objectFit: "cover",
//               border: "2px solid #ddd",
//             }}
//           />
//           <Form.Control
//             type="file"
//             accept="image/*"
//             className="mt-2"
//             onChange={(e) => {
//               const target = e.target as HTMLInputElement;
//               if (target.files?.[0]) {
//                 handleImageUpload(target.files[0]);
//               }
//             }}
//           />
//         </div>

//         {/* ✅ QR Code Section */}
//         {qrCodeImage && (
//           <div className="mb-4 text-center">
//             <h5>Your QR Code</h5>
//             <img
//               src={qrCodeImage}
//               alt="QR Code"
//               style={{ width: 150, height: 150 }}
//             />
//           </div>
//         )}

//         {/* Email + Description */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={formData.email}
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
//               value={formData.description}
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

//         {/* User Type + Experience */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="userType">
//             <Form.Label>User Type</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.userType}
//               onChange={(e) =>
//                 setFormData({ ...formData, userType: e.target.value })
//               }
//               isInvalid={!!formErrors.userType}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.userType}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="experienceLevel">
//             <Form.Label>Experience Level</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.experienceLevel}
//               onChange={(e) =>
//                 setFormData({ ...formData, experienceLevel: e.target.value })
//               }
//               isInvalid={!!formErrors.experienceLevel}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.experienceLevel}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         {/* Location + Available From */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="location">
//             <Form.Label>Location</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.location}
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
//               value={formData.availableFrom}
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

//         {/* Phone + License */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="phoneNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.phoneNumber}
//               onChange={(e) =>
//                 setFormData({ ...formData, phoneNumber: e.target.value })
//               }
//               isInvalid={!!formErrors.phoneNumber}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.phoneNumber}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="driversLicense">
//             <Form.Label>Driver’s License</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.driversLicense}
//               onChange={(e) =>
//                 setFormData({ ...formData, driversLicense: e.target.value })
//               }
//               isInvalid={!!formErrors.driversLicense}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.driversLicense}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         {/* Comments */}
//         <Form.Group className="mb-3" controlId="comments">
//           <Form.Label>Comments</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={formData.comments}
//             onChange={(e) =>
//               setFormData({ ...formData, comments: e.target.value })
//             }
//             isInvalid={!!formErrors.comments}
//           />
//           <Form.Control.Feedback type="invalid">
//             {formErrors.comments}
//           </Form.Control.Feedback>
//         </Form.Group>

//         {/* Password Update */}
//         <Form.Group className="mb-4" controlId="newPassword">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={formData.newPassword}
//             onChange={(e) =>
//               setFormData({ ...formData, newPassword: e.target.value })
//             }
//           />
//         </Form.Group>

//         {/* Buttons */}
//         <div className="d-flex justify-content-between">
//           <Button
//             type="submit"
//             disabled={isSubmitting || loading}
//             variant="primary"
//           >
//             {isSubmitting ? "Updating..." : "Update Profile"}
//           </Button>
//           <Link to="/user">
//             <Button variant="outline-secondary">Cancel</Button>
//           </Link>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default ProfileUpdate;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   Col,
//   Form,
//   Row,
//   Alert,
//   Card,
//   Spinner,
// } from "react-bootstrap";

// type User = {
//   id: string;
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
// };

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
// const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.getItem("userId");

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
//     profileImage: "",
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//     qrCode: "",
//   });

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // -------------------------
//   // LOAD USER PROFILE
//   // -------------------------
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return setError("No token found.");

//         const response = await axios.get(
//           `${ServerPort}/api/user/view/${userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const user = response.data;

//         setFormData({
//           ...user,
//           availableFrom: user.availableFrom?.split("T")[0] || "",
//           password: "",
//           newPassword: "",
//         });

//         setImagePreview(user.profileImage || null);
//         setQrCodeImage(user.qrCode || null);
//       } catch (err) {
//         handleApiError(err);
//       }

//       setLoading(false);
//     };

//     if (userId) fetchUserData();
//   }, [userId]);

//   // -------------------------
//   // IMAGE UPLOAD TO CLOUDINARY
//   // -------------------------
//   const handleImageUpload = async (file: File) => {
//     setLoading(true);

//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET!);

//       const uploadRes = await axios.post(CLOUDINARY_UPLOAD_URL, data);
//       const secureUrl = uploadRes.data.secure_url;

//       setFormData((prev) => ({ ...prev, profileImage: secureUrl }));
//       setImagePreview(secureUrl);
//     } catch (err) {
//       setError("Image upload failed. Try again.");
//     }

//     setLoading(false);
//   };

//   // -------------------------
//   // FORM VALIDATION
//   // -------------------------
//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     const required = [
//       "email",
//       "description",
//       "userType",
//       "experienceLevel",
//       "location",
//       "availableFrom",
//       "phoneNumber",
//       "driversLicense",
//       "comments",
//     ];

//     required.forEach((field) => {
//       // @ts-ignore
//       if (!formData[field]) errors[field] = "This field is required";
//     });

//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = "Invalid email";

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   // -------------------------
//   // UPDATE USER
//   // -------------------------
//   const handleUserUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);

//     try {
//       const token = localStorage.getItem("token");

//       const payload = { ...formData };
//       if (!formData.newPassword) delete payload.password;

//       const res = await axios.put(
//         `${ServerPort}/api/user/update/${userId}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.status === 200) {
//         setSuccessMessage("Profile successfully updated!");
//         setQrCodeImage(res.data.qrCode || qrCodeImage);
//         setFormData((prev) => ({ ...prev, newPassword: "" }));
//       }
//     } catch (err) {
//       handleApiError(err);
//     }

//     setIsSubmitting(false);
//     setLoading(false);
//   };

//   // -------------------------
//   // ERROR HANDLER
//   // -------------------------
//   const handleApiError = (error: any) => {
//     if (axios.isAxiosError(error)) {
//       setError(error.response?.data?.message || "Something went wrong.");
//     } else {
//       setError("An unexpected error occurred.");
//     }
//   };

//   // -------------------------
//   // UI RENDER
//   // -------------------------
//   return (
//     <Card className="p-4 shadow-lg rounded-4">
//       <h2 className="text-center mb-3">Update Profile</h2>

//       {loading && (
//         <Spinner animation="border" className="d-block mx-auto my-2" />
//       )}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {successMessage && <Alert variant="success">{successMessage}</Alert>}

//       <Form onSubmit={handleUserUpdate}>
//         {/* PROFILE IMAGE UPLOAD */}
//         <div className="text-center mb-4">
//           <img
//             src={
//               imagePreview ||
//               "https://via.placeholder.com/150?text=Upload+Profile+Image"
//             }
//             alt="Profile"
//             style={{
//               width: 130,
//               height: 130,
//               objectFit: "cover",
//               borderRadius: "50%",
//               border: "3px solid #ddd",
//             }}
//           />

//           <Form.Control
//             type="file"
//             accept="image/*"
//             className="mt-2"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               const file = e.target.files?.[0];
//               if (file) handleImageUpload(file);
//             }}
//           />
//         </div>

//         {/* QR CODE */}
//         {qrCodeImage && (
//           <div className="text-center mb-4">
//             <h5>Your QR Code</h5>
//             <img src={qrCodeImage} alt="QR Code" width={150} height={150} />
//           </div>
//         )}

//         {/* FORM ROWS */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={formData.email}
//               isInvalid={!!formErrors.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.email}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.description}
//               isInvalid={!!formErrors.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.description}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         <Row className="mb-3">
//           <Form.Group as={Col} md="6">
//             <Form.Label>User Type</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.userType}
//               isInvalid={!!formErrors.userType}
//               onChange={(e) =>
//                 setFormData({ ...formData, userType: e.target.value })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.userType}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6">
//             <Form.Label>Experience Level</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.experienceLevel}
//               isInvalid={!!formErrors.experienceLevel}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   experienceLevel: e.target.value,
//                 })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.experienceLevel}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         <Row className="mb-3">
//           <Form.Group as={Col} md="6">
//             <Form.Label>Location</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.location}
//               isInvalid={!!formErrors.location}
//               onChange={(e) =>
//                 setFormData({ ...formData, location: e.target.value })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.location}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6">
//             <Form.Label>Available From</Form.Label>
//             <Form.Control
//               type="date"
//               value={formData.availableFrom}
//               isInvalid={!!formErrors.availableFrom}
//               onChange={(e) =>
//                 setFormData({ ...formData, availableFrom: e.target.value })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.availableFrom}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         <Row className="mb-3">
//           <Form.Group as={Col} md="6">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.phoneNumber}
//               isInvalid={!!formErrors.phoneNumber}
//               onChange={(e) =>
//                 setFormData({ ...formData, phoneNumber: e.target.value })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.phoneNumber}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6">
//             <Form.Label>Driver’s License</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.driversLicense}
//               isInvalid={!!formErrors.driversLicense}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   driversLicense: e.target.value,
//                 })
//               }
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.driversLicense}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         <Form.Group className="mb-3">
//           <Form.Label>Comments</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={formData.comments}
//             isInvalid={!!formErrors.comments}
//             onChange={(e) =>
//               setFormData({ ...formData, comments: e.target.value })
//             }
//           />
//           <Form.Control.Feedback type="invalid">
//             {formErrors.comments}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={formData.newPassword}
//             onChange={(e) =>
//               setFormData({ ...formData, newPassword: e.target.value })
//             }
//           />
//         </Form.Group>

//         <div className="d-flex justify-content-center">
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-5 py-2"
//             variant="primary"
//           >
//             {isSubmitting ? "Updating..." : "Update Profile"}
//           </Button>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default ProfileUpdate;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Col,
//   Form,
//   Row,
//   Alert,
//   Card,
//   Spinner,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";

// type User = {
//   id: string;
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
// };

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.getItem("userId") || "";

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
//     profileImage: "",
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//     qrCode: "",
//   });

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // load user profile
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("No token found.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.status === 200) {
//           const user = res.data;
//           setFormData({
//             ...user,
//             availableFrom: user.availableFrom?.split("T")[0] || "",
//             password: "",
//             newPassword: "",
//           });
//           setImagePreview(user.profileImage || null);
//           setQrCodeImage(user.qrPNG || user.qrCode || null);
//         } else {
//           setError("Failed to fetch user data.");
//         }
//       } catch (err) {
//         handleApiError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchUserData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // cleanup object URL when component unmounts / file changes
//   useEffect(() => {
//     return () => {
//       if (imagePreview && imagePreview.startsWith("blob:")) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   // handle native file input change (use plain input to avoid bootstrap issues)
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null;
//     if (file) {
//       // revoke previous blob url if any
//       if (imagePreview && imagePreview.startsWith("blob:")) {
//         URL.revokeObjectURL(imagePreview);
//       }
//       setSelectedFile(file);
//       setImagePreview(URL.createObjectURL(file));
//       // don't mutate formData.profileImage here — backend will return permanent URL
//     } else {
//       setSelectedFile(null);
//     }
//   };

//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     const required = [
//       "email",
//       "description",
//       "userType",
//       "experienceLevel",
//       "location",
//       "availableFrom",
//       "phoneNumber",
//       "driversLicense",
//       "comments",
//     ] as const;

//     for (const field of required) {
//       // @ts-ignore
//       if (!formData[field]) errors[field] = "This field is required";
//     }

//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Invalid email";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Submit: if selectedFile exists -> send multipart/form-data to backend,
//   // otherwise send JSON. Backend should accept multipart and handle saving to Cloudinary.
//   const handleUserUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccessMessage(null);

//     if (!validateForm()) return;

//     setLoading(true);
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token - please sign in.");

//       if (selectedFile) {
//         // send multipart to backend; backend must use multer to accept `profileImage`
//         const form = new FormData();

//         // append scalar fields
//         Object.entries(formData).forEach(([k, v]) => {
//           if (v !== undefined && v !== null) form.append(k, String(v));
//         });

//         form.append("profileImage", selectedFile);

//         const res = await axios.put(
//           `${ServerPort}/api/user/update/${userId}`,
//           form,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         if (res.status === 200) {
//           const updatedUser = res.data.user ?? res.data;
//           setFormData((prev) => ({
//             ...prev,
//             ...updatedUser,
//             newPassword: "",
//           }));
//           // server should return permanent image URL (profileImage)
//           setImagePreview(updatedUser.profileImage || imagePreview);
//           setQrCodeImage(updatedUser.qrPNG || updatedUser.qrCode || qrCodeImage);
//           setSuccessMessage("Profile updated and image uploaded.");
//           setSelectedFile(null);
//         } else {
//           setError("Unexpected server response when uploading image.");
//         }
//       } else {
//         // no file selected — send JSON update
//         const payload: Partial<User> = { ...formData };
//         if (!formData.newPassword) delete payload.password;

//         const res = await axios.put(
//           `${ServerPort}/api/user/update/${userId}`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (res.status === 200) {
//           const updatedUser = res.data.user ?? res.data;
//           setFormData((prev) => ({
//             ...prev,
//             ...updatedUser,
//             newPassword: "",
//           }));
//           setImagePreview(updatedUser.profileImage || imagePreview);
//           setQrCodeImage(updatedUser.qrPNG || updatedUser.qrCode || qrCodeImage);
//           setSuccessMessage("Profile updated.");
//         } else {
//           setError("Unexpected server response when updating profile.");
//         }
//       }
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setIsSubmitting(false);
//       setLoading(false);
//     }
//   };

//   const handleApiError = (err: any) => {
//     if (axios.isAxiosError(err)) {
//       const msg =
//         (err.response && (err.response.data?.message || err.response.data)) ||
//         err.message ||
//         "Server error";
//       setError(String(msg));
//     } else {
//       setError(String(err || "Unknown error"));
//     }
//   };

//   return (
//     <Card className="p-4 shadow-lg rounded-4">
//       <h2 className="text-center mb-3">Update Profile</h2>

//       {loading && (
//         <Spinner animation="border" className="d-block mx-auto my-2" />
//       )}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {successMessage && <Alert variant="success">{successMessage}</Alert>}

//       <Form onSubmit={handleUserUpdate} encType="multipart/form-data">
//         {/* IMAGE PREVIEW + NATIVE FILE INPUT (avoid Form.Control for file) */}
//         <div className="text-center mb-4">
//           <img
//             src={
//               imagePreview ||
//               formData.profileImage ||
//               "https://via.placeholder.com/150?text=Upload+Profile+Image"
//             }
//             alt="Profile"
//             style={{
//               width: 130,
//               height: 130,
//               objectFit: "cover",
//               borderRadius: "50%",
//               border: "3px solid #ddd",
//             }}
//           />
//           <div style={{ marginTop: 8 }}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: "inline-block" }}
//             />
//             {selectedFile && (
//               <div style={{ marginTop: 6, fontSize: 13, color: "#555" }}>
//                 Selected: {selectedFile.name}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* QR CODE */}
//         {qrCodeImage && (
//           <div className="text-center mb-4">
//             <h5>Your QR Code</h5>
//             <img
//               src={qrCodeImage}
//               alt="QR Code"
//               width={150}
//               height={150}
//               style={{ objectFit: "contain" }}
//             />
//           </div>
//         )}

//         {/* FORM FIELDS */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={formData.email}
//               isInvalid={!!formErrors.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.email}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.description}
//               isInvalid={!!formErrors.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
//               type="text"
//               value={formData.userType}
//               isInvalid={!!formErrors.userType}
//               onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.userType}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="experienceLevel">
//             <Form.Label>Experience Level</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.experienceLevel}
//               isInvalid={!!formErrors.experienceLevel}
//               onChange={(e) =>
//                 setFormData({ ...formData, experienceLevel: e.target.value })
//               }
//             />
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
//               value={formData.location}
//               isInvalid={!!formErrors.location}
//               onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.location}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="availableFrom">
//             <Form.Label>Available From</Form.Label>
//             <Form.Control
//               type="date"
//               value={formData.availableFrom}
//               isInvalid={!!formErrors.availableFrom}
//               onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.availableFrom}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="phoneNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.phoneNumber}
//               isInvalid={!!formErrors.phoneNumber}
//               onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.phoneNumber}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="driversLicense">
//             <Form.Label>Driver’s License</Form.Label>
//             <Form.Control
//               type="text"
//               value={formData.driversLicense}
//               isInvalid={!!formErrors.driversLicense}
//               onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
//             />
//             <Form.Control.Feedback type="invalid">
//               {formErrors.driversLicense}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         <Form.Group className="mb-3" controlId="comments">
//           <Form.Label>Comments</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={formData.comments}
//             isInvalid={!!formErrors.comments}
//             onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
//           />
//           <Form.Control.Feedback type="invalid">
//             {formErrors.comments}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-4" controlId="newPassword">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={formData.newPassword}
//             onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//           />
//         </Form.Group>

//         <div className="d-flex justify-content-between">
//           <Button type="submit" disabled={isSubmitting} variant="primary">
//             {isSubmitting ? "Updating..." : "Update Profile"}
//           </Button>
//           <Link to="/user">
//             <Button variant="outline-secondary">Cancel</Button>
//           </Link>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default ProfileUpdate;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row, Alert, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

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

const ServerPort = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

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

  // Load user profile
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
  }, [userId]);

  // Handle file input change and convert to preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
    }
  };

  // Convert image file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

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

  // Submit handler
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

      const payload: any = { ...formData };

      // Remove password field if no new password
      if (!formData.newPassword) delete payload.password;

      // Convert selected file to base64
      if (selectedFile) {
        payload.profileImage = await fileToBase64(selectedFile);
      }

      const res = await axios.put(
        `${ServerPort}/api/user/update/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
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
            src={imagePreview || formData.profileImage || "https://via.placeholder.com/150?text=Profile"}
            alt="Profile"
            style={{ width: 130, height: 130, borderRadius: "50%", objectFit: "cover", border: "3px solid #ddd" }}
          />
          <div style={{ marginTop: 8 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {selectedFile && <div style={{ marginTop: 6, fontSize: 13 }}>{selectedFile.name}</div>}
          </div>
        </div>

        {/* Form Fields */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              isInvalid={!!formErrors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={formData.description}
              isInvalid={!!formErrors.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Add other fields similarly... */}
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </Form>
    </Card>
  );
};

export default ProfileUpdate;
