import React from "react";
import "./Service.css"; // Import your CSS file

const Services = () => {
  return (
    <div className="services-container">
      <img
        src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/ATC_featured_automotive_dispatch-2344121195_1_oc2xyz.jpg"
        className="header-image"
        alt="flyer"
      />
      <div className="content-container">
        <h1 className="services-title">Services</h1>
        <p className="services-description">
          At GADZ CONNECT, we’re committed to empowering businesses of all sizes
          to thrive in today’s dynamic marketplace. Let us be your partner in
          success—together, we’ll reshape the future of logistics.
        </p>
        <img
          src="https://res.cloudinary.com/fashion-commit/image/upload/v1713672704/GADZ/F10A0D7D-EF2E-4BEE-AEC3-7F3DACB93C23_bx58nm.png"
          className="secondary-image"
          alt="flyer"
        />
      </div>
    </div>
  );
};

export default Services;
