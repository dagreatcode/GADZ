import React from "react";
import Image1 from "./images/flyer.png";
// import Image2 from "./images/ATC.jpeg";

const Services = () => {
  return (
    <>
      <img src="https://res.cloudinary.com/fashion-commit/image/upload/v1713237058/extras/ATC_featured_automotive_dispatch-2344121195_nrko2d.jpg" style={{ width: "100%" }} alt="flyer" />
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row jumbotron">
          <div className="display-4" style={{ padding: "40px" }}>
            Services
          </div>
          <br />
            <h1 className="display-6" style={{ padding: "40px" }}>
            “At GADZ CONNECT, we’re committed to empowering businesses of all sizes to thrive in today’s dynamic marketplace. Let us be your partner in success-together, we’ll reshape the future of logistics.”
        </h1>
          <img src={Image1} style={{ width: "100%" }} alt="flyer" />
        </div>
      </div>
    </>
  );
};

export default Services;
