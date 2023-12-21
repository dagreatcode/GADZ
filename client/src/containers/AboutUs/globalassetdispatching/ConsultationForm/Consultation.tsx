import React from "react";
import Image1 from "./images/realMeets.jpeg";

const Consultation = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="row jumbotron">
        <div className="display-4" style={{ padding: "40px" }}>
          Consultation
        </div>
        <img src={Image1} style={{ width: "100%" }} alt="talks" />
      </div>
    </div>
  );
};

export default Consultation;
