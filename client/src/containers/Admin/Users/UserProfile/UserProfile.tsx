// import React from "react";
// import Button from "react-bootstrap/Button"
// import { Link } from "react-router-dom";

// const UserProfile = () => {
//   return (
//     <>
//       <div className="container" style={{ textAlign: "center" }}>
//         <div className="row jumbotron">
//           <div className="display-4" style={{ padding: "40px" }}>
//             Profile Update
//           </div>

//           <form style={{ margin: "0 auto" }}>
//             <div className="form-group">
//               <div className="form-group">
//                 <label htmlFor="exampleFormControlFile1">
//                   Example file input
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control-file"
//                   id="exampleFormControlFile1"
//                 />
//               </div>
//               <label htmlFor="exampleInputEmail1">Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="exampleInputEmail1"
//                 aria-describedby="emailHelp"
//                 placeholder="Enter email"
//               />
//               <small id="emailHelp" className="form-text text-muted">
//                 We'll never share your email with anyone else.
//               </small>
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleInputPassword1">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="exampleInputPassword1"
//                 placeholder="Password"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleFormControlInput1">Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="exampleFormControlInput1"
//                 placeholder="name@example.com"
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label htmlFor="inputEmail4">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="inputEmail4"
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="form-group col-md-6">
//                 <label htmlFor="inputPassword4">Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="inputPassword4"
//                   placeholder="Password"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress">Address</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputAddress"
//                 placeholder="1234 Main St"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress2">Address 2</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputAddress2"
//                 placeholder="Apartment, studio, or floor"
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label htmlFor="inputCity">City</label>
//                 <input type="text" className="form-control" id="inputCity" />
//               </div>
//               <div className="form-group col-md-4">
//                 <label htmlFor="inputState">State</label>
//                 <select id="inputState" className="form-control">
//                   <option selected>Choose...</option>
//                   <option>...</option>
//                 </select>
//               </div>
//               <div className="form-group col-md-2">
//                 <label htmlFor="inputZip">Zip</label>
//                 <input type="text" className="form-control" id="inputZip" />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="gridCheck"
//                 />
//                 <label className="form-check-label" htmlFor="gridCheck">
//                   Check me out
//                 </label>
//               </div>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label className="form-check-label" htmlFor="exampleCheck1">
//                 Check me out
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label className="form-check-label" htmlFor="exampleCheck1">
//                 Check me out
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label className="form-check-label" htmlFor="exampleCheck1">
//                 Check me out
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label className="form-check-label" htmlFor="exampleCheck1">
//                 Check me out
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label className="form-check-label" htmlFor="exampleCheck1">
//                 Check me out
//               </label>
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleFormControlSelect1">Example select</label>
//               <select className="form-control" id="exampleFormControlSelect1">
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>5</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleFormControlSelect2">
//                 Example multiple select
//               </label>
//               <select
//                 multiple
//                 className="form-control"
//                 id="exampleFormControlSelect2"
//               >
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>5</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleFormControlTextarea1">
//                 Example textarea
//               </label>
//               <textarea
//                 className="form-control"
//                 id="exampleFormControlTextarea1"
//                 rows={3}
//               ></textarea>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label className="form-check-label" htmlFor="exampleCheck1">
//                 Check me out
//               </label>
//             </div>
//             <Button type="submit" className="btn btn-primary">
//               Submit
//             </Button>
//           </form>
//         </div>
//       </div>
//       <Link to="/Admin">Home</Link>
//     </>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Button, Spinner, Alert, Form, Row, Col } from "react-bootstrap";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  password?: string;
  // Add any other fields you have in your DB
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // get user ID from route params
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>(`/api/users/${id}`);
        setUser(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSuccess(null);
    setError(null);

    try {
      await axios.put(`/api/users/${id}`, user);
      setSuccess("User updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update user. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading user info…
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin: Edit User Profile</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user?.email || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user?.firstName || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user?.lastName || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user?.password || ""}
            onChange={handleChange}
            placeholder="Enter new password"
          />
          <Form.Text className="text-muted">
            Leave blank if you do not want to change the password.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={user?.address || ""}
            onChange={handleChange}
            placeholder="1234 Main St"
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={user?.city || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={user?.state || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={user?.zip || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update User"}
          </Button>
          <Link to="/Admin" className="btn btn-secondary">
            Back to Admin
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
