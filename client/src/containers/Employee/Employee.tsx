import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./Employee.css";

const Employee = () => {
  const sections = [
    {
      name: "Call Center",
      path: "/CallCenter",
      icon: <Icon.TelephonePlusFill />,
    },
    { name: "Clock In", path: "/ClockIn", icon: <Icon.StopwatchFill /> },
    { name: "Meets", path: "/Meets", icon: <Icon.PersonSquare /> },
    {
      name: "SKP Console",
      path: "/SKPConsole",
      icon: <Icon.PcDisplayHorizontal />,
    },
    { name: "Tickets", path: "/Tickets", icon: <Icon.TicketFill /> },
    { name: "News Letter", path: "/NewsLetter", icon: <Icon.Newspaper /> },
    { name: "Off Days", path: "/OffDays", icon: <Icon.Calendar3 /> },
    {
      name: "Employee Profile",
      path: "/EmployeeProfile",
      icon: <Icon.PersonBadge />,
    },
  ];

  return (
    <div className="employee-container">
      <h1 className="page-title">Employee Dashboard</h1>
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

export default Employee;
