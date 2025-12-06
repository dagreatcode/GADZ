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
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

interface User {
  email: string;
  password?: string;
  description?: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ email: "", password: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch user by ID
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      setUser(data);
    } catch (err) {
      setError("Failed to fetch user.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/update/${id}`, {
        email: user.email,
        password: user.password,
        description: user.description,
      });
      setSuccess(true);
      setTimeout(() => navigate("/AllUsers"), 1000);
    } catch (err) {
      setError("Failed to update user.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading user data...</p>;

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
      <h2>Update User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>User updated successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={user.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <Button type="submit" className="btn btn-primary">
          Update User
        </Button>
      </form>

      <Link to="/AllUsers" style={{ display: "block", marginTop: 20 }}>
        Back to All Users
      </Link>
    </div>
  );
};

export default UserProfile;
