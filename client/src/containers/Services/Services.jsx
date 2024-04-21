import React from "react";
// import Image2 from "./images/ATC.jpeg";

const Services = () => {
  return (
    <>
      <img
        src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/ATC_featured_automotive_dispatch-2344121195_1_oc2xyz.jpg"
        style={{ width: "100%" }}
        alt="flyer"
      />
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row jumbotron">
          <div className="display-4" style={{ padding: "40px" }}>
            Services
          </div>
          <br />
          <h1 className="display-6" style={{ padding: "40px" }}>
            At GADZ CONNECT, we’re committed to empowering businesses of all
            sizes to thrive in today’s dynamic marketplace. Let us be your
            partner in success-together, we’ll reshape the future of logistics.”
          </h1>
          <img
            src="https://res.cloudinary.com/fashion-commit/image/upload/v1713672704/GADZ/F10A0D7D-EF2E-4BEE-AEC3-7F3DACB93C23_bx58nm.png"
            style={{ width: "100%" }}
            alt="flyer"
          />
        </div>
      </div>
    </>
  );
};

export default Services;
