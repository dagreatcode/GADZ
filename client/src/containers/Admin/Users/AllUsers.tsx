// import React, { useEffect, useState } from 'react'
// // import { useParams } from "react-router-dom";
// import axios from "axios";
// import {Link} from 'react-router-dom'

// const AllUsers = () => {
//   const [data, setData] = useState([]);
//   // const { id } = useParams();

//   const getData = async () => {
//     const { data } = await axios.get(`/api/user/view`);
//     setData(data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);


//   return (
//     <>
//       <div>AllUsers</div>

//       <h1> I will create a login  with authorization and authentication for Admin's and User's momentarily</h1><br />

//       Users API. This is Raw Data coming from the database. This will be used to apply all Users Information to the page for the admin edit user or freeze user or even archive."<br/><br/> 

//       {/* {JSON.stringify(data)}<br /><br /> */}
//       <table>
//         <thead>
//           <tr>
//             <th></th>
//             <th>Edit</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>Description</th>
//             <th>Archived</th>
//             <th>Admin</th>
//             <th>Developer</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((r: any, id: any) => (
//             <tr key={id}>
//               <td>
//                 {" "}
//                 {/* <input onClick={handleID} type="submit" value={`${r.id}`} /> */}
//               </td>
//               <td><Link to="/AdminUserProfile">Edit  </Link></td>
//               <td>{r.email ? r.email : "No Email"}</td>
//               <td>{r.password ? r.password : "NoPassword"}</td>
//               <td>{r.description ? r.description : "No Information"}</td>
//               <td>{r.archived ? r.archived : "Active"}</td>
//               <td>{r.admin ? r.admin : "No"}</td>
//               <td>{r.developer? r.developer : "No"}</td>
//               {/* <td>{r}</td> */}  
//             </tr>
//           ))}
//         </tbody>
//       </table>
//      {/* <Link to="/AdminUserProfile">Click to edit single user, change information, approve business to use the site + credit, or archive user.</Link><br/><br/> */}

//     <br />
//      <Link to="/Admin">Home</Link>
//     </>
//   )
// }

// export default AllUsers

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AllUsers.css";

// interface User {
//   _id: string;
//   email: string;
//   password?: string;
//   description?: string;
//   archived?: boolean;
//   admin?: boolean;
//   developer?: boolean;
// }

// const ITEMS_PER_PAGE = 10;

// const AllUsers: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [search, setSearch] = useState("");
//   const [archivedFilter, setArchivedFilter] = useState("all");
//   const [page, setPage] = useState(1);
//   const navigate = useNavigate();

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get("/api/user/view");
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filtered users
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.email?.toLowerCase().includes(search.toLowerCase()) ||
//       user.description?.toLowerCase().includes(search.toLowerCase());
//     const matchesArchived =
//       archivedFilter === "all" ||
//       (archivedFilter === "archived" && user.archived) ||
//       (archivedFilter === "active" && !user.archived);
//     return matchesSearch && matchesArchived;
//   });

//   // Pagination
//   const startIndex = (page - 1) * ITEMS_PER_PAGE;
//   const pageUsers = filteredUsers.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );
//   const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

//   // Archive toggle
//   const toggleArchive = async (id: string, current: boolean) => {
//     try {
//       await axios.put(`/api/user/archive/${id}`, { archived: !current });
//       setUsers((prev) =>
//         prev.map((u) => (u._id === id ? { ...u, archived: !current } : u))
//       );
//     } catch (error) {
//       console.error("Error updating archive:", error);
//     }
//   };

//   return (
//     <div className="users-wrapper">
//       <div className="header-row">
//         <h2>All Users</h2>
//       </div>

//       {/* Search + Filter */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by email or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           value={archivedFilter}
//           onChange={(e) => setArchivedFilter(e.target.value)}
//         >
//           <option value="all">All Users</option>
//           <option value="active">Active</option>
//           <option value="archived">Archived</option>
//         </select>
//       </div>

//       {/* Scrollable table */}
//       <div className="table-scroll">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>Email (click to edit)</th>
//               <th>Password</th>
//               <th>Description</th>
//               <th>Archived</th>
//               <th>Admin</th>
//               <th>Developer</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageUsers.length > 0 ? (
//               pageUsers.map((user) => (
//                 <tr key={user._id}>
//                   <td>
//                     <Link to={`/AdminUserProfile/${user._id}`} className="email-link">
//                       {user.email}
//                     </Link>
//                   </td>
//                   <td>{user.password || "—"}</td>
//                   <td className="wrap">{user.description || "—"}</td>
//                   <td>
//                     <span
//                       className={`badge ${user.archived ? "archived" : "active"}`}
//                     >
//                       {user.archived ? "Archived" : "Active"}
//                     </span>
//                   </td>
//                   <td>
//                     <span className={`badge ${user.admin ? "yes" : "no"}`}>
//                       {user.admin ? "Yes" : "No"}
//                     </span>
//                   </td>
//                   <td>
//                     <span className={`badge ${user.developer ? "yes" : "no"}`}>
//                       {user.developer ? "Yes" : "No"}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="archive-btn"
//                       onClick={() => toggleArchive(user._id, !!user.archived)}
//                     >
//                       {user.archived ? "Unarchive" : "Archive"}
//                     </button>
//                     &nbsp;
//                     <Link
//                       to={`/AdminUserProfile/${user._id}`}
//                       className="edit-btn"
//                     >
//                       Edit
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="center">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//             Prev
//           </button>
//           <span>
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       <Link to="/Admin" className="home-link">
//         Back Home
//       </Link>
//     </div>
//   );
// };

// export default AllUsers;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllUsers.css";

interface User {
  _id: string;
  email: string;
  password?: string;
  description?: string;
  archived?: boolean;
  admin?: boolean;
  developer?: boolean;
}

const ITEMS_PER_PAGE = 10;

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [archivedFilter, setArchivedFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/user/view");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.description?.toLowerCase().includes(search.toLowerCase());
    const matchesArchived =
      archivedFilter === "all" ||
      (archivedFilter === "archived" && user.archived) ||
      (archivedFilter === "active" && !user.archived);
    return matchesSearch && matchesArchived;
  });

  // Pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  // Toggle archive status
  const toggleArchive = async (id: string, current: boolean) => {
    try {
      await axios.put(`/api/user/archive/${id}`, { archived: !current });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, archived: !current } : u))
      );
    } catch (error) {
      console.error("Error updating archive:", error);
    }
  };

  return (
    <div className="users-wrapper">
      <h2 className="header-row">All Users</h2>

      {/* Search + Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by email or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={archivedFilter}
          onChange={(e) => setArchivedFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Scrollable table */}
      <div className="table-scroll">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email (click to edit)</th>
              <th>Password</th>
              <th>Description</th>
              <th>Archived</th>
              <th>Admin</th>
              <th>Developer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.length ? (
              pageUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Link
                      to={`/AdminUserProfile/${user._id}`}
                      className="email-link"
                    >
                      {user.email}
                    </Link>
                  </td>
                  <td>{user.password || "—"}</td>
                  <td className="wrap">{user.description || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.archived ? "archived" : "active"
                      }`}
                    >
                      {user.archived ? "Archived" : "Active"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.admin ? "yes" : "no"}`}>
                      {user.admin ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.developer ? "yes" : "no"}`}>
                      {user.developer ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="archive-btn"
                      onClick={() =>
                        toggleArchive(user._id, !!user.archived)
                      }
                    >
                      {user.archived ? "Unarchive" : "Archive"}
                    </button>
                    &nbsp;
                    <Link
                      to={`/AdminUserProfile/${user._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      <Link to="/Admin" className="home-link">
        Back Home
      </Link>
    </div>
  );
};

export default AllUsers;
