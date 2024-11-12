import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./Admin.css";

const Admin = () => {
  const sections = [
    { name: "B2B Messages", path: "/B2BMessages", icon: <Icon.ChatText /> },
    { name: "Dash Board", path: "/Dash", icon: <Icon.Speedometer /> },
    { name: "Print Out", path: "/PrintOut", icon: <Icon.PrinterFill /> },
    {
      name: "User IT Tickets",
      path: "/TicketsCreated",
      icon: <Icon.TicketDetailed />,
    },
    { name: "All Users", path: "/AdminAllUsers", icon: <Icon.PeopleFill /> },
    { name: "Agreements", path: "/Agreements", icon: <Icon.EmojiHeartEyes /> },
    // New section added
    { name: "Create A News Letter", path: "/Newsletters", icon: <Icon.Pencil /> },
  ];

  return (
    <div className="admin-container">
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="grid-container">
        {sections.map((section, index) => (
          <div key={index} className="grid-item">
            <Link to={section.path} className="link-item">
              <div className="icon-wrapper">
                {React.cloneElement(section.icon, {
                  width: "82",
                  height: "82",
                  fill: "#5F9DF7",
                })}
              </div>
              <div className="section-title">{section.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
