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

//       // if (response.status === 200) {
//       //   setSuccessMessage("✅ Profile updated successfully!");
//       //   setQrCodeImage(response.data.qrCode || qrCodeImage); // ✅ refresh QR code if regenerated
//       //   setFormData({ ...formData, newPassword: "" });
//       // }
//       if (response.status === 200) {
//         const updatedUser = response.data.user; // ✅ this comes from backend

//         // ✅ Update state with fresh user data
//         setFormData({
//           ...updatedUser,
//           password: "",
//           newPassword: "",
//         });

//         // ✅ Update any images or QR codes returned
//         setImagePreview(updatedUser.profileImage || imagePreview);
//         setQrCodeImage(updatedUser.qrCode || qrCodeImage);

//         // ✅ Show success message
//         setSuccessMessage("✅ Profile updated successfully!");
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
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Alert from "react-bootstrap/Alert";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import { Link } from "react-router-dom";

// type User = {
//   id?: string;
//   email: string;
//   password?: string;
//   description: string;
//   userType: string;
//   experienceLevel: string;
//   location: string;
//   availableFrom: string;
//   newPassword?: string;
//   profileImage?: string | null;
//   phoneNumber: string;
//   driversLicense: string;
//   comments: string;
//   qrCode?: string | null;
// };

// const ServerPort =
//   process.env.REACT_APP_API_URL || process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
// const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
// const CLOUDINARY_UPLOAD_URL = CLOUDINARY_CLOUD_NAME
//   ? `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
//   : "";

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.getItem("userId") || "";
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

//   const [formData, setFormData] = useState<User>({
//     id: userId || undefined,
//     email: "",
//     password: "",
//     description: "",
//     userType: "",
//     experienceLevel: "",
//     location: "",
//     availableFrom: "",
//     newPassword: "",
//     profileImage: null,
//     phoneNumber: "",
//     driversLicense: "",
//     comments: "",
//     qrCode: null,
//   });

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       if (!userId) {
//         setError("No userId found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`${ServerPort}/api/user/view/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.status === 200) {
//           const userData = response.data?.user || response.data || {};
//           const availableFromDate =
//             typeof userData.availableFrom === "string"
//               ? userData.availableFrom.split("T")[0]
//               : "";

//           setFormData((prev) => ({
//             ...prev,
//             ...userData,
//             availableFrom: availableFromDate,
//             password: "",
//             newPassword: "",
//           }));

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

//   const handleImageUpload = async (file: File) => {
//     setLoading(true);

//     if (!CLOUDINARY_UPLOAD_URL || !CLOUDINARY_UPLOAD_PRESET) {
//       setError("Cloudinary is not configured. Skipping upload.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//       const res = await axios.post(CLOUDINARY_UPLOAD_URL, data);
//       const imageUrl = res.data?.secure_url;

//       if (imageUrl) {
//         setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
//         setImagePreview(imageUrl);
//       } else {
//         setError("Unexpected response from image upload.");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError("Image upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     if (!formData.email) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
//     if (!formData.description) errors.description = "Description is required";
//     if (!formData.userType) errors.userType = "User Type is required";
//     if (!formData.experienceLevel) errors.experienceLevel = "Experience Level is required";
//     if (!formData.location) errors.location = "Location is required";
//     if (!formData.availableFrom) errors.availableFrom = "Available From date is required";
//     if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
//     if (!formData.driversLicense) errors.driversLicense = "Driver’s License is required";
//     if (!formData.comments) errors.comments = "Comments are required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleUserUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     const token = localStorage.getItem("token");

//     if (!userId) {
//       setError("No userId found. Please log in.");
//       setLoading(false);
//       setIsSubmitting(false);
//       return;
//     }

//     const updatedData: Partial<User> = { ...formData };

//     if (!formData.newPassword) delete updatedData.password;
//     else {
//       updatedData.password = formData.newPassword;
//       delete updatedData.newPassword;
//     }

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
//         const updatedUser = response.data?.user || response.data || {};

//         setFormData((prev) => ({
//           ...prev,
//           ...updatedUser,
//           password: "",
//           newPassword: "",
//         }));

//         setImagePreview(updatedUser.profileImage || imagePreview);
//         setQrCodeImage(updatedUser.qrCode || qrCodeImage);
//         setSuccessMessage("✅ Profile updated successfully!");
//       }
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//       setIsSubmitting(false);
//     }
//   };

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

//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={formData.email ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
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
//               value={formData.description ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, description: e.target.value }))
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
//               type="text"
//               value={formData.userType ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, userType: e.target.value }))
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
//               value={formData.experienceLevel ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, experienceLevel: e.target.value }))
//               }
//               isInvalid={!!formErrors.experienceLevel}
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
//               value={formData.location ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, location: e.target.value }))
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
//               value={formData.availableFrom ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, availableFrom: e.target.value }))
//               }
//               isInvalid={!!formErrors.availableFrom}
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
//               value={formData.phoneNumber ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
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
//               value={formData.driversLicense ?? ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, driversLicense: e.target.value }))
//               }
//               isInvalid={!!formErrors.driversLicense}
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
//             value={formData.comments ?? ""}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, comments: e.target.value }))
//             }
//             isInvalid={!!formErrors.comments}
//           />
//           <Form.Control.Feedback type="invalid">
//             {formErrors.comments}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-4" controlId="newPassword">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={formData.newPassword ?? ""}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
//             }
//           />
//         </Form.Group>

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

// // ProfileUpdate.tsx
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
//   id?: string;
//   email: string;
//   password?: string;
//   description: string;
//   userType: string;
//   experienceLevel: string;
//   location: string;
//   availableFrom: string;
//   newPassword?: string;
//   profileImage?: string; // front state uses profileImage
//   phoneNumber: string;
//   driversLicense: string;
//   comments: string;
//   qrCode?: string; // svg url maybe
//   qrPNG?: string; // png url maybe
// };

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// // Cloudinary config (optional)
// const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
//   ? `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
//   : "";
// const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "";

// const ProfileUpdate: React.FC = () => {
//   const userId = localStorage.getItem("userId");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null); // shows uploaded image
//   const [qrCodeImage, setQrCodeImage] = useState<string | null>(null); // prefer png if available

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

//   // Load user profile
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

//           // normalize values
//           const availableFromDate =
//             typeof userData.availableFrom === "string"
//               ? userData.availableFrom.split("T")[0]
//               : "";

//           const profileImage =
//             userData.profileImage || userData.image || userData.profileImg || "";

//           const qr = userData.qrPNG || userData.qrCode || userData.qr || "";

//           setFormData({
//             ...formData,
//             ...userData,
//             availableFrom: availableFromDate,
//             profileImage,
//             qrCode: userData.qrCode || userData.qr || "",
//             qrPNG: userData.qrPNG || "",
//             password: "",
//             newPassword: "",
//           });

//           setImagePreview(profileImage || null);
//           setQrCodeImage(qr || null);
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

//   // Upload image (Cloudinary direct OR fallback to backend)
//   const handleImageUpload = async (file: File) => {
//     setError(null);
//     setLoading(true);

//     try {
//       // If Cloudinary env is configured, upload straight to Cloudinary
//       if (CLOUDINARY_UPLOAD_URL && CLOUDINARY_UPLOAD_PRESET) {
//         const data = new FormData();
//         data.append("file", file);
//         data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//         const res = await axios.post(CLOUDINARY_UPLOAD_URL, data);
//         const imageUrl = res.data.secure_url;

//         setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
//         setImagePreview(imageUrl);
//         return;
//       }

//       // Otherwise fallback: send multipart/form-data to backend update endpoint (server must accept multipart and use multer/cloudinary)
//       const token = localStorage.getItem("token");
//       const form = new FormData();
//       form.append("image", file); // backend expects "image" field (upload.single("image"))
//       // include other fields if you want them updated at same time
//       form.append("email", formData.email || "");
//       // ... other fields can be appended if desired

//       const resp = await axios.put(`${ServerPort}/api/user/update/${userId}`, form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // server should return updated user with image location
//       if (resp.status === 200 && resp.data?.user) {
//         const updatedUser = resp.data.user;
//         const imageUrl = updatedUser.profileImage || updatedUser.image || updatedUser.profileImg;
//         setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
//         setImagePreview(imageUrl || null);
//       } else {
//         throw new Error("Upload failed (server didn't return updated user).");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError(
//         (axios.isAxiosError(err) && err.response?.data?.message) ||
//         (err as Error).message ||
//         "Image upload failed. Check console."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Validate before sending update
//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     if (!formData.email) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
//     if (!formData.description) errors.description = "Description is required";
//     if (!formData.userType) errors.userType = "User Type is required";
//     if (!formData.experienceLevel) errors.experienceLevel = "Experience Level is required";
//     if (!formData.location) errors.location = "Location is required";
//     if (!formData.availableFrom) errors.availableFrom = "Available From date is required";
//     if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
//     if (!formData.driversLicense) errors.driversLicense = "Drivers License is required";
//     if (!formData.comments) errors.comments = "Comments are required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Submit update to backend (JSON). If you uploaded an image directly to Cloudinary earlier, profileImage will be present.
//   const handleUserUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccessMessage(null);

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       // clone and prepare payload
//       const payload: Record<string, any> = { ...formData };

//       // if user didn't set new password, remove password
//       if (!payload.newPassword) delete payload.password;
//       else {
//         // send new password as "newPassword" or password depending on server expectation
//         payload.newPassword = payload.newPassword;
//       }

//       // server expects JSON by this route
//       const response = await axios.put(`${ServerPort}/api/user/update/${userId}`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 && response.data?.user) {
//         const updatedUser = response.data.user;

//         // prefer backend returned profileImage or image
//         const profileImage = updatedUser.profileImage || updatedUser.image || updatedUser.profileImg || formData.profileImage;
//         const qr = updatedUser.qrPNG || updatedUser.qrCode || updatedUser.qr || formData.qrCode || formData.qrPNG;

//         setFormData((prev) => ({
//           ...prev,
//           ...updatedUser,
//           profileImage,
//           qrCode: updatedUser.qrCode || prev.qrCode || "",
//           qrPNG: updatedUser.qrPNG || prev.qrPNG || "",
//           password: "",
//           newPassword: "",
//         }));

//         setImagePreview(profileImage || null);
//         setQrCodeImage(qr || null);
//         setSuccessMessage("✅ Profile updated successfully!");
//       } else {
//         setError("Update failed — unexpected server response.");
//       }
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//       setIsSubmitting(false);
//     }
//   };

//   // const handleUserUpdate = async (e) => {
//   //   e.preventDefault();
//   //   const token = localStorage.getItem("token");
//   //   const formDataToSend = new FormData();

//   //   Object.entries(formData).forEach(([key, value]) => {
//   //     if (value !== null && value !== undefined && value !== "") {
//   //       formDataToSend.append(key, value);
//   //     }
//   //   });

//   //   if (selectedFile) {
//   //     formDataToSend.append("profileImage", selectedFile);
//   //   }

//   //   try {
//   //     const response = await axios.put(
//   //       `${ServerPort}/api/user/update/${userId}`,
//   //       formDataToSend,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );

//   //     if (response.status === 200) {
//   //       setFormData({
//   //         ...response.data.user,
//   //         password: "",
//   //         newPassword: "",
//   //       });
//   //       setImagePreview(response.data.user.profileImage);
//   //       setQrCodeImage(response.data.user.qrCode);
//   //       setSuccessMessage("✅ Profile updated successfully!");
//   //     }
//   //   } catch (err) {
//   //     handleApiError(err);
//   //   }
//   // };

//   // API error helper
//   const handleApiError = (error: any) => {
//     if (axios.isAxiosError(error)) {
//       setError(error.response?.data?.message || error.response?.data || error.message);
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
//         {/* Profile image preview / upload */}
//         <div className="mb-4 text-center">
//           <img
//             src={
//               imagePreview ||
//               formData.profileImage ||
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

//           {/* file input */}
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
//           <div className="small text-muted mt-1">
//             {CLOUDINARY_UPLOAD_URL ? "Uploading directly to Cloudinary" : "Uploading via your backend"}
//           </div>
//         </div>

//         {/* QR Code */}
//         {qrCodeImage && (
//           <div className="mb-4 text-center">
//             <h5>Your QR Code</h5>
//             <img src={qrCodeImage} alt="QR Code" style={{ width: 150, height: 150 }} />
//           </div>
//         )}

//         {/* Email + Description */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} isInvalid={!!formErrors.email} />
//             <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control type="text" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} isInvalid={!!formErrors.description} />
//             <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         {/* User Type + Experience */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="userType">
//             <Form.Label>User Type</Form.Label>
//             <Form.Control type="text" value={formData.userType || ""} onChange={(e) => setFormData({ ...formData, userType: e.target.value })} isInvalid={!!formErrors.userType} />
//             <Form.Control.Feedback type="invalid">{formErrors.userType}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="experienceLevel">
//             <Form.Label>Experience Level</Form.Label>
//             <Form.Control type="text" value={formData.experienceLevel || ""} onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })} isInvalid={!!formErrors.experienceLevel} />
//             <Form.Control.Feedback type="invalid">{formErrors.experienceLevel}</Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         {/* Location + Available From */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="location">
//             <Form.Label>Location</Form.Label>
//             <Form.Control type="text" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} isInvalid={!!formErrors.location} />
//             <Form.Control.Feedback type="invalid">{formErrors.location}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="availableFrom">
//             <Form.Label>Available From</Form.Label>
//             <Form.Control type="date" value={formData.availableFrom || ""} onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })} isInvalid={!!formErrors.availableFrom} />
//             <Form.Control.Feedback type="invalid">{formErrors.availableFrom}</Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         {/* Phone + License */}
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="phoneNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control type="text" value={formData.phoneNumber || ""} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} isInvalid={!!formErrors.phoneNumber} />
//             <Form.Control.Feedback type="invalid">{formErrors.phoneNumber}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="driversLicense">
//             <Form.Label>Driver’s License</Form.Label>
//             <Form.Control type="text" value={formData.driversLicense || ""} onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })} isInvalid={!!formErrors.driversLicense} />
//             <Form.Control.Feedback type="invalid">{formErrors.driversLicense}</Form.Control.Feedback>
//           </Form.Group>
//         </Row>

//         {/* Comments */}
//         <Form.Group className="mb-3" controlId="comments">
//           <Form.Label>Comments</Form.Label>
//           <Form.Control as="textarea" rows={3} value={formData.comments || ""} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} isInvalid={!!formErrors.comments} />
//           <Form.Control.Feedback type="invalid">{formErrors.comments}</Form.Control.Feedback>
//         </Form.Group>

//         {/* New Password */}
//         <Form.Group className="mb-4" controlId="newPassword">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control type="password" value={formData.newPassword || ""} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} />
//         </Form.Group>

//         <div className="d-flex justify-content-between">
//           <Button type="submit" disabled={isSubmitting || loading} variant="primary">
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

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./ProfileUpdate.css"; // Optional CSS for styling

/**
 * ProfileUpdate Component
 * -----------------------
 * A self-contained profile update form using standard HTML form submission.
 * Handles text inputs, file upload (profile picture), and optional additional info.
 * This version avoids Cloudinary entirely — it sends form data (including images)
 * directly to your backend using multipart/form-data encoding.
 */

const ProfileUpdate: React.FC = () => {
  // -----------------------------
  // State Management
  // -----------------------------
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  // -----------------------------
  // Handle Input Changes
  // -----------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // Handle Image Selection
  // -----------------------------
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file)); // Show preview
    }
  };

  // -----------------------------
  // Handle Form Submission
  // -----------------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Prepare multipart form data
      const formData = new FormData();
      formData.append("firstName", profile.firstName);
      formData.append("lastName", profile.lastName);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("bio", profile.bio);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      // POST to backend (adjust your endpoint)
      const response = await axios.post("/api/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Profile updated successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Load Existing Profile Data (Optional)
  // -----------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setProfile(res.data);
      } catch (err) {
        console.warn("No profile data found yet.");
      }
    };
    fetchProfile();
  }, []);

  // -----------------------------
  // Component JSX
  // -----------------------------
  return (
    <div className="profile-update-container">
      <h1 className="profile-update-title">Update Your Profile</h1>

      <form className="profile-update-form" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Profile Image Upload */}
        <div className="form-section">
          <label htmlFor="profileImage">Profile Picture:</label>
          <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Preview Selected Image */}
        {previewURL && (
          <div className="preview-section">
            <img src={previewURL} alt="Preview" className="image-preview" />
          </div>
        )}

        {/* Text Fields */}
        <div className="form-section">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={profile.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={profile.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>

        <div className="form-section">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={profile.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself..."
          />
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update Profile"}
          </button>
        </div>

        {/* Feedback Message */}
        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  );
};

export default ProfileUpdate;
