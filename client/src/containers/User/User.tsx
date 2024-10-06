import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./User.css"; // Assuming you create a CSS file for styles

const User = () => {
  return (
    <div className="user-container">
      <header className="user-header">
        <h1>Welcome to the User Dashboard</h1>
        <p>Navigate through the options below to manage your tasks.</p>
      </header>

      <div className="user-options">
        <div className="user-option">
          <h2>Available Table</h2>
          <Link to="/AvailableTable">
            <Icon.Table width="82" height="82" fill="#5F9DF7" />
          </Link>
          <p>View available options for your needs.</p>
        </div>

        <div className="user-option">
          <h2>Checkout</h2>
          <Link to="/Checkout">
            <Icon.Cart width="82" height="82" fill="#5F9DF7" />
          </Link>
          <p>Proceed to checkout and complete your purchases.</p>
        </div>

        <div className="user-option">
          <h2>Create Ticket</h2>
          <Link to="/CreateTicket">
            <Icon.TicketPerforatedFill width="82" height="82" fill="#5F9DF7" />
          </Link>
          <p>Create a support ticket for any issues.</p>
        </div>

        <div className="user-option">
          <h2>Profile</h2>
          <Link to="/Profile">
            <Icon.PersonBadge width="82" height="82" fill="#5F9DF7" />
          </Link>
          <p>View and edit your user profile.</p>
        </div>

        <div className="user-option">
          <h2>User Dashboard</h2>
          <Link to="/UserDash">
            <Icon.Speedometer2 width="82" height="82" fill="#5F9DF7" />
          </Link>
          <p>Access your dashboard for an overview of your activity.</p>
        </div>
      </div>

      <footer className="user-footer">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default User;
