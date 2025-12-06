// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./TicketsCreated.css"; // Importing CSS for styling

// // Define the ticket type
// interface Ticket {
//   name?: string;
//   subject?: string;
//   description?: string;
// }

// const TicketsCreated: React.FC = () => {
//   const [itTickets, setItTickets] = useState<Ticket[]>([]);
//   const [userTickets, setUserTickets] = useState<Ticket[]>([]);

//   const fetchItTickets = async () => {
//     try {
//       const { data } = await axios.get(`/api/it-help/view`);
//       setItTickets(data);
//     } catch (error) {
//       console.error("Error fetching IT tickets:", error);
//     }
//   };

//   const fetchUserTickets = async () => {
//     try {
//       const { data } = await axios.get(`/api/employee-help/view`);
//       setUserTickets(data);
//     } catch (error) {
//       console.error("Error fetching user tickets:", error);
//     }
//   };

//   useEffect(() => {
//     fetchItTickets();
//     fetchUserTickets();
//   }, []);

//   const renderTickets = (tickets: Ticket[], title: string) => (
//     <div className="ticket-section">
//       <h1>{title}</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>View Ticket</th>
//             <th>Name</th>
//             <th>Subject</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets.length > 0 ? (
//             tickets.map((ticket, index) => (
//               <tr key={index}>
//                 <td>
//                   <Link to="/AdminUserProfile">View</Link>
//                 </td>
//                 <td>{ticket.name || "No Name"}</td>
//                 <td>{ticket.subject || "No Subject"}</td>
//                 <td>{ticket.description || "No Information"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4}>No tickets available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <>
//       <div className="tickets-header">
//         <h2>All Tickets</h2>
//       </div>
//       {renderTickets(itTickets, "View All Tickets Created for IT Issues")}
//       {renderTickets(userTickets, "View All Tickets Created for User Issues")}
//       <Link to="/Admin">Home</Link>
//     </>
//   );
// };

// export default TicketsCreated;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TicketsCreated.css";

interface Ticket {
  _id: string;
  name?: string;
  subject?: string;
  description?: string;
  createdAt?: string;
}

const ITEMS_PER_PAGE = 10;

const TicketsCreated: React.FC = () => {
  const [itTickets, setItTickets] = useState<Ticket[]>([]);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);

  // Fetch IT tickets
  const fetchItTickets = async () => {
    try {
      const { data } = await axios.get(`/api/it-help/view`);
      setItTickets(data);
    } catch (error) {
      console.error("Error fetching IT tickets:", error);
    }
  };

  // Fetch User tickets
  const fetchUserTickets = async () => {
    try {
      const { data } = await axios.get(`/api/employee-help/view`);
      setUserTickets(data);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    }
  };

  useEffect(() => {
    fetchItTickets();
    fetchUserTickets();
  }, []);

  // Combine both ticket sources
  useEffect(() => {
    const combined = [...itTickets, ...userTickets];

    const cleanSearch = search.toLowerCase();
    const filteredTickets = combined.filter((t) => {
      return (
        (t.name?.toLowerCase().includes(cleanSearch) ?? false) ||
        (t.subject?.toLowerCase().includes(cleanSearch) ?? false) ||
        (t.description?.toLowerCase().includes(cleanSearch) ?? false)
      );
    });

    setFiltered(filteredTickets);
    setPage(1); // reset to first page on search
  }, [search, itTickets, userTickets]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageTickets = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleArchive = async (id: string) => {
    try {
      await axios.put(`/api/tickets/archive/${id}`);
      setItTickets(itTickets.filter((t) => t._id !== id));
      setUserTickets(userTickets.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error archiving ticket:", error);
    }
  };

  return (
    <div className="tickets-wrapper">
      <h2 className="tickets-title">All Tickets</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, subject, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>View</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Created</th>
              <th>Archive</th>
            </tr>
          </thead>
          <tbody>
            {pageTickets.length > 0 ? (
              pageTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>
                    <Link to={`/AdminUserProfile/${ticket._id}`}>Open</Link>
                  </td>
                  <td>{ticket.name ?? "—"}</td>
                  <td>{ticket.subject ?? "—"}</td>
                  <td>{ticket.description ?? "—"}</td>
                  <td>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "—"}</td>
                  <td>
                    <button
                      className="archive-btn"
                      onClick={() => handleArchive(ticket._id)}
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {pages}
          </span>

          <button disabled={page === pages} onClick={() => setPage(page + 1)}>
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

export default TicketsCreated;
