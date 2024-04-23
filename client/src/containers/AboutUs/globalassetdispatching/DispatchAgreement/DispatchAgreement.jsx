import React from "react";
// import Image1 from "./images/realMeetsBW.jpeg";
import { Link } from "react-router-dom";

const DispatchAgreement = () => {
  return (
    <>
      <div className="container">
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
          <Link to="/Agreement">Our Agreement With You </Link>
          <div className="row jumbotron">
            <div className="display-4" style={{ padding: "40px" }}>
              DispatchAgreement
            </div>
            <div>
              <nav>
                <Link to="/Bio">Biography</Link> {"| "}
                <Link to="/Consultation">Consultation</Link> {"| "}
                <Link to="/DispatchAgreement">Dispatch Agreement</Link> {"| "}
                <Link to="/RoadFreight">Road Freight</Link>
              </nav>
            </div>
            <img
              src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670840/GADZ/image1_la62ck.webp"
              style={{ width: "100%" }}
              alt="talks"
            />
          </div>
          
          <Link to="/Agreement">Let's Agree</Link>
        </div>
      </div>
    </>
  );
};

export default DispatchAgreement;
