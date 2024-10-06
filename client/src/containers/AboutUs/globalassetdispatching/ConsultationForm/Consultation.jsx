import React from "react";
import { Link } from "react-router-dom";
import "./Consultation.css"; // Import your CSS file for styling

const Consultation = () => {
  return (
    <>
      <div className="consultation-container">
        <div className="contact-section">
          <a
            href="tel:(1)(9725978040)"
            className="btn btn-dark contact-button"
            role="button"
          >
            <h1 className="contact-number">972-597-8040</h1>
          </a>
        </div>

        <div className="content-container animate__animated animate__fadeIn">
          <h1 className="page-title">Consultation</h1>

          <nav className="nav-links">
            <Link to="/Bio">Biography</Link> {" | "}
            <Link to="/Consultation">Consultation</Link> {" | "}
            <Link to="/DispatchAgreement">Dispatch Agreement</Link> {" | "}
            <Link to="/RoadFreight">Road Freight</Link>
          </nav>

          <img
            src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670839/GADZ/image0_y2uxz2.webp"
            alt="talks"
            className="consultation-image"
          />

          <h1 className="interest-title">Consultation Interest</h1>
          <p className="intro-text">
            Call us for a free consultation. See below..
          </p>

          <lord-icon
            src="https://cdn.lordicon.com/egmlnyku.json"
            trigger="hover"
            style={{ width: "250px", height: "250px" }}
          ></lord-icon>

          <p className="details-text">
            Managing logistics can be a complex and time-consuming process,
            often leading to inefficiencies, delays, and unnecessary costs.
            Traditional methods lack transparency, coordination, and real-time
            insights, hindering businesses from reaching their full potential.
          </p>

          <h1 className="concerns-title">Topics of Concern</h1>
          <hr />
          <ul className="topics-list">
            <li>Services Offered</li>
            <li>Customer Service Issues</li>
            <li>New Carrier Setup</li>
            <li>Rate Request</li>
            <li>Factoring</li>
            <li>Business Development</li>
            <li>Procurement</li>
            <li>Load Booking</li>
            <li>Driver Recruiting</li>
            <li>Roadside Safety and Support</li>
            <li>Carrier Service Issues</li>
            <li>etc...</li>
          </ul>

          <h1 className="final-message">
            If you have any other questions, feel free to ask! Contact us for a
            consultation on your specific needs, or simply want to ask questions
            about our services? We'll be happy to help! Please feel free to call
            or email us with any inquiries you may have. Don't forget to use the
            useful links below to contact us.
          </h1>
        </div>
      </div>
    </>
  );
};

export default Consultation;
