import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <Link to="/B2BMessages">B2B Messages</Link>
      <br />
      <Link to="/Dash">DashBoard</Link>
      <br />
      <Link to="/PrintOut">Print Outs</Link>
      <br />
      <Link to="/TicketsCreated">User IT Tickets</Link>
      <br />
      <Link to="/AdminAllUsers">All Users</Link>
      <br />
    </>
  );
};

export default Admin;
