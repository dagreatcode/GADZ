import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TicketsCreated.css"; // Importing CSS for styling

// Define the ticket type
interface Ticket {
  name?: string;
  subject?: string;
  description?: string;
}

const TicketsCreated: React.FC = () => {
  const [itTickets, setItTickets] = useState<Ticket[]>([]);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);

  const fetchItTickets = async () => {
    try {
      const { data } = await axios.get(`/api/it-help/view`);
      setItTickets(data);
    } catch (error) {
      console.error("Error fetching IT tickets:", error);
    }
  };

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

  const renderTickets = (tickets: Ticket[], title: string) => (
    <div className="ticket-section">
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>View Ticket</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <tr key={index}>
                <td>
                  <Link to="/AdminUserProfile">View</Link>
                </td>
                <td>{ticket.name || "No Name"}</td>
                <td>{ticket.subject || "No Subject"}</td>
                <td>{ticket.description || "No Information"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No tickets available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div className="tickets-header">
        <h2>All Tickets</h2>
      </div>
      {renderTickets(itTickets, "View All Tickets Created for IT Issues")}
      {renderTickets(userTickets, "View All Tickets Created for User Issues")}
      <Link to="/Admin">Home</Link>
    </>
  );
};

export default TicketsCreated;
