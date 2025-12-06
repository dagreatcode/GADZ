// // import React from "react";
// // import Button from "react-bootstrap/Button"
// // import { Link } from "react-router-dom";

// // const UserProfile = () => {
// //   return (
// //     <>
// //       <div className="container" style={{ textAlign: "center" }}>
// //         <div className="row jumbotron">
// //           <div className="display-4" style={{ padding: "40px" }}>
// //             Profile Update
// //           </div>

// //           <form style={{ margin: "0 auto" }}>
// //             <div className="form-group">
// //               <div className="form-group">
// //                 <label htmlFor="exampleFormControlFile1">
// //                   Example file input
// //                 </label>
// //                 <input
// //                   type="file"
// //                   className="form-control-file"
// //                   id="exampleFormControlFile1"
// //                 />
// //               </div>
// //               <label htmlFor="exampleInputEmail1">Email address</label>
// //               <input
// //                 type="email"
// //                 className="form-control"
// //                 id="exampleInputEmail1"
// //                 aria-describedby="emailHelp"
// //                 placeholder="Enter email"
// //               />
// //               <small id="emailHelp" className="form-text text-muted">
// //                 We'll never share your email with anyone else.
// //               </small>
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="exampleInputPassword1">Password</label>
// //               <input
// //                 type="password"
// //                 className="form-control"
// //                 id="exampleInputPassword1"
// //                 placeholder="Password"
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="exampleFormControlInput1">Email address</label>
// //               <input
// //                 type="email"
// //                 className="form-control"
// //                 id="exampleFormControlInput1"
// //                 placeholder="name@example.com"
// //               />
// //             </div>
// //             <div className="form-row">
// //               <div className="form-group col-md-6">
// //                 <label htmlFor="inputEmail4">Email</label>
// //                 <input
// //                   type="email"
// //                   className="form-control"
// //                   id="inputEmail4"
// //                   placeholder="Email"
// //                 />
// //               </div>
// //               <div className="form-group col-md-6">
// //                 <label htmlFor="inputPassword4">Password</label>
// //                 <input
// //                   type="password"
// //                   className="form-control"
// //                   id="inputPassword4"
// //                   placeholder="Password"
// //                 />
// //               </div>
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="inputAddress">Address</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="inputAddress"
// //                 placeholder="1234 Main St"
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="inputAddress2">Address 2</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 id="inputAddress2"
// //                 placeholder="Apartment, studio, or floor"
// //               />
// //             </div>
// //             <div className="form-row">
// //               <div className="form-group col-md-6">
// //                 <label htmlFor="inputCity">City</label>
// //                 <input type="text" className="form-control" id="inputCity" />
// //               </div>
// //               <div className="form-group col-md-4">
// //                 <label htmlFor="inputState">State</label>
// //                 <select id="inputState" className="form-control">
// //                   <option selected>Choose...</option>
// //                   <option>...</option>
// //                 </select>
// //               </div>
// //               <div className="form-group col-md-2">
// //                 <label htmlFor="inputZip">Zip</label>
// //                 <input type="text" className="form-control" id="inputZip" />
// //               </div>
// //             </div>
// //             <div className="form-group">
// //               <div className="form-check">
// //                 <input
// //                   className="form-check-input"
// //                   type="checkbox"
// //                   id="gridCheck"
// //                 />
// //                 <label className="form-check-label" htmlFor="gridCheck">
// //                   Check me out
// //                 </label>
// //               </div>
// //             </div>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="exampleCheck1"
// //               />
// //               <label className="form-check-label" htmlFor="exampleCheck1">
// //                 Check me out
// //               </label>
// //             </div>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="exampleCheck1"
// //               />
// //               <label className="form-check-label" htmlFor="exampleCheck1">
// //                 Check me out
// //               </label>
// //             </div>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="exampleCheck1"
// //               />
// //               <label className="form-check-label" htmlFor="exampleCheck1">
// //                 Check me out
// //               </label>
// //             </div>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="exampleCheck1"
// //               />
// //               <label className="form-check-label" htmlFor="exampleCheck1">
// //                 Check me out
// //               </label>
// //             </div>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="exampleCheck1"
// //               />
// //               <label className="form-check-label" htmlFor="exampleCheck1">
// //                 Check me out
// //               </label>
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="exampleFormControlSelect1">Example select</label>
// //               <select className="form-control" id="exampleFormControlSelect1">
// //                 <option>1</option>
// //                 <option>2</option>
// //                 <option>3</option>
// //                 <option>4</option>
// //                 <option>5</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="exampleFormControlSelect2">
// //                 Example multiple select
// //               </label>
// //               <select
// //                 multiple
// //                 className="form-control"
// //                 id="exampleFormControlSelect2"
// //               >
// //                 <option>1</option>
// //                 <option>2</option>
// //                 <option>3</option>
// //                 <option>4</option>
// //                 <option>5</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="exampleFormControlTextarea1">
// //                 Example textarea
// //               </label>
// //               <textarea
// //                 className="form-control"
// //                 id="exampleFormControlTextarea1"
// //                 rows={3}
// //               ></textarea>
// //             </div>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="exampleCheck1"
// //               />
// //               <label className="form-check-label" htmlFor="exampleCheck1">
// //                 Check me out
// //               </label>
// //             </div>
// //             <Button type="submit" className="btn btn-primary">
// //               Submit
// //             </Button>
// //           </form>
// //         </div>
// //       </div>
// //       <Link to="/Admin">Home</Link>
// //     </>
// //   );
// // };

// // export default UserProfile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import { Button, Spinner, Alert, Form, Row, Col } from "react-bootstrap";

// interface User {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   password?: string;
//   // Add any other fields you have in your DB
// }

// const UserProfile: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // get user ID from route params
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // Fetch user info
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get<User>(`/api/users/${id}`);
//         setUser(res.data);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     if (!user) return;
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setSaving(true);
//     setSuccess(null);
//     setError(null);

//     try {
//       await axios.put(`/api/users/${id}`, user);
//       setSuccess("User updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update user. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" /> Loading user info…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="danger" className="mt-3 text-center">
//         {error}
//       </Alert>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Admin: Edit User Profile</h2>
//       {success && <Alert variant="success">{success}</Alert>}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={user?.email || ""}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={user?.firstName || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={user?.lastName || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             value={user?.password || ""}
//             onChange={handleChange}
//             placeholder="Enter new password"
//           />
//           <Form.Text className="text-muted">
//             Leave blank if you do not want to change the password.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             type="text"
//             name="address"
//             value={user?.address || ""}
//             onChange={handleChange}
//             placeholder="1234 Main St"
//           />
//         </Form.Group>

//         <Row>
//           <Col md={4}>
//             <Form.Group className="mb-3">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="city"
//                 value={user?.city || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4}>
//             <Form.Group className="mb-3">
//               <Form.Label>State</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="state"
//                 value={user?.state || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4}>
//             <Form.Group className="mb-3">
//               <Form.Label>Zip</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="zip"
//                 value={user?.zip || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <div className="d-flex justify-content-between">
//           <Button variant="primary" type="submit" disabled={saving}>
//             {saving ? "Saving..." : "Update User"}
//           </Button>
//           <Link to="/Admin" className="btn btn-secondary">
//             Back to Admin
//           </Link>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default UserProfile;

// src/pages/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Spinner, Alert, Form, Row, Col } from "react-bootstrap";

type UserModel = {
  id?: number;
  email?: string;
  password?: string;
  qrCode?: string;
  qrCodeId?: string;
  qrData?: any;
  qrPNG?: string;
  description?: string;
  profileImage?: string;
  userType?: string;
  preferredLoadType?: string;
  experienceLevel?: string;
  availableFrom?: string | Date | null;
  location?: string;
  admin?: boolean;
  developer?: boolean;
  archived?: boolean;
  contractor?: string | boolean;
  company?: string;
  loadReferences?: string;
  drivers?: string;
  entrepreneur?: string | boolean;
  subscribed?: boolean;
  address?: string;
  phoneNumber?: string;
  driversLicense?: string;
  comments?: string;
  rating?: number;
  loadDetails?: any;
  paymentTerms?: string;
  loadStatus?: string;
  driverID?: string;
  driverExperience?: string;
  driverAvailability?: string | Date | null;
  driverRating?: number;
  companyID?: string;
  companyProfile?: any;
  partnershipStatus?: string;
  sessionId?: string;
  createdAt?: string;
  updatedAt?: string;
};

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/admin/users/${id}`, {
          // add auth header if needed:
          // headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!user) return;
    const name = e.target.name;
    let value: any = (e.target as HTMLInputElement).value;

    // handle checkbox separately
    if ((e.target as HTMLInputElement).type === "checkbox") {
      value = (e.target as HTMLInputElement).checked;
    }

    setUser({ ...user, [name]: value });
  };

  const handleJSONChange = (field: string, value: string) => {
    if (!user) return;
    try {
      const parsed = JSON.parse(value);
      setUser({ ...user, [field]: parsed });
    } catch {
      // store as string when invalid JSON — the backend tries to parse if needed
      setUser({ ...user, [field]: value });
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user || !id) return;
    setSaving(true);
    setSuccess(null);
    setError(null);

    // build payload; exclude createdAt/updatedAt
    const payload: any = { ...user };
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.id;

    // If password is empty or undefined, remove it so it won't be overwritten
    if (!payload.password) {
      delete payload.password;
    }

    try {
      const res = await axios.put(`/api/admin/users/${id}`, payload, {
        // headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Saved successfully");
      // update local user with returned data
      setUser(res.data.data || user);
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err?.response?.data?.message || "Failed to save user");
    } finally {
      setSaving(false);
      // auto clear success after a short delay
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleArchive = async () => {
    if (!id) return;
    try {
      await axios.put(`/api/admin/users/${id}/archive`);
      setUser(prev => prev ? { ...prev, archived: true } : prev);
      setSuccess("User archived");
      setTimeout(() => setSuccess(null), 2500);
    } catch (err: any) {
      console.error(err);
      setError("Failed to archive user");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ padding: 40 }}>
        <Spinner animation="border" /> <span className="ms-2">Loading user...</span>
      </div>
    );
  }

  if (!user) {
    return <Alert variant="warning">User not found</Alert>;
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin — Edit User</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant={user.archived ? "outline-warning" : "warning"} onClick={handleArchive}>Archive</Button>
        </div>
      </div>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      <Form onSubmit={handleSave} style={{ marginTop: 12 }}>
        <section style={cardStyle}>
          <h5>Account</h5>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" value={user.email || ""} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>User Type</Form.Label>
                <Form.Control name="userType" value={user.userType || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Password (leave blank to keep existing)</Form.Label>
                <Form.Control name="password" type="password" value={user.password || ""} onChange={handleChange} placeholder="New password" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Profile Image (URL)</Form.Label>
                <Form.Control name="profileImage" value={user.profileImage || ""} onChange={handleChange} placeholder="https://..." />
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section style={cardStyle}>
          <h5>Contact & Location</h5>
          <Row className="g-2">
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phoneNumber" value={user.phoneNumber || ""} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={user.address || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2">
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>City</Form.Label>
                <Form.Control name="location" value={user.location || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Available From</Form.Label>
                <Form.Control name="availableFrom" type="date" value={user.availableFrom ? new Date(user.availableFrom).toISOString().slice(0,10) : ""} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Drivers License</Form.Label>
                <Form.Control name="driversLicense" value={user.driversLicense || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section style={cardStyle}>
          <h5>Company & Role</h5>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Company</Form.Label>
                <Form.Control name="company" value={user.company || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Company ID</Form.Label>
                <Form.Control name="companyID" value={user.companyID || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2">
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Payment Terms</Form.Label>
                <Form.Control name="paymentTerms" value={user.paymentTerms || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Preferred Load Type</Form.Label>
                <Form.Control name="preferredLoadType" value={user.preferredLoadType || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Experience Level</Form.Label>
                <Form.Control name="experienceLevel" value={user.experienceLevel || ""} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section style={cardStyle}>
          <h5>Permissions & Flags</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="checkbox"
                label="Admin"
                name="admin"
                checked={!!user.admin}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="checkbox"
                label="Developer"
                name="developer"
                checked={!!user.developer}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="checkbox"
                label="Subscribed"
                name="subscribed"
                checked={!!user.subscribed}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="checkbox"
                label="Archived"
                name="archived"
                checked={!!user.archived}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </section>

        <section style={cardStyle}>
          <h5>Freeform / JSON Fields (edit carefully)</h5>
          <Form.Group className="mb-2">
            <Form.Label>QR Data (JSON)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={typeof user.qrData === "object" ? JSON.stringify(user.qrData, null, 2) : user.qrData || ""}
              onBlur={(e) => handleJSONChange("qrData", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Load Details (JSON)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={typeof user.loadDetails === "object" ? JSON.stringify(user.loadDetails, null, 2) : user.loadDetails || ""}
              onBlur={(e) => handleJSONChange("loadDetails", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Company Profile (JSON)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={typeof user.companyProfile === "object" ? JSON.stringify(user.companyProfile, null, 2) : user.companyProfile || ""}
              onBlur={(e) => handleJSONChange("companyProfile", e.target.value)}
            />
          </Form.Group>
        </section>

        <div className="d-flex gap-2" style={{ marginTop: 12 }}>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? (<><Spinner animation="border" size="sm" /> Saving...</>) : "Save"}
          </Button>

          <Button variant="outline-secondary" onClick={() => navigate(-1)}>Cancel</Button>
        </div>

        <div style={{ marginTop: 18 }}>
          <small className="text-muted">Last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "—"}</small>
        </div>
      </Form>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e9ecef",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
  boxShadow: "0 1px 4px rgba(16,24,32,0.04)",
};

export default UserProfile;
