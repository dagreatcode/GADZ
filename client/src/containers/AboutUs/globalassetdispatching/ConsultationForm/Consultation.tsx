import React from "react";
import Image1 from "./images/realMeets.jpeg";
import { Link } from "react-router-dom";

const Consultation = () => {
  return (
    <>
      <div style={{ padding: "25px", textAlign: "center", top: "50%" }}>
        <a
          style={{ backgroundColor: "blue", borderRadius: "100px" }}
          href="tel:(1)(9725978040)"
          className="btn btn-dark btn-sm"
          // tabindex="-1"
          role="button"
          aria-disabled="true"
        >
          <h1 style={{ fontSize: "25px" }}>972-597-8040</h1>
        </a>
      </div>
      <div className="container2" style={{ textAlign: "center" }}>
        <div className="row jumbotron">
          <div className="display-4" style={{ padding: "40px" }}>
            Consultation
          </div>
          <div>
            <nav>
              <Link to="/Bio">Biography</Link> {"| "}
              <Link to="/Consultation">Consultation</Link> {"| "}
              <Link to="/DispatchAgreement">Dispatch Agreement</Link> {"| "}
              <Link to="/RoadFreight">Road Freight</Link>
            </nav>
          </div>
          <img src={Image1} style={{ width: "100%" }} alt="talks" />

        </div>
      </div>
    </>
  );
};

export default Consultation;
