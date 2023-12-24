import React from "react";
import Image1 from "./images/flyer.png";

const Services = () => {
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row jumbotron">
          <div className="display-4" style={{ padding: "40px" }}>
            Services
          </div>
          <img src={Image1} style={{ width: "100%" }} alt="flyer" />
        </div>
      </div>
    </>
  );
};

export default Services;
