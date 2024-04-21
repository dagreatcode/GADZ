import React from "react";
import Video1 from "../../components/Banner/Banner";
import { Link } from "react-router-dom";
// import Image1 from "./images/Semi-Truck.jpeg";

function AboutUs() {
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
          <div className="row jumbotron">
            <div className="display-4" style={{ padding: "40px" }}>
              About Us
            </div>
            <div>
              <nav>
                <Link to="/Bio">Biography</Link> {"| "}
                <Link to="/Consultation">Consultation</Link> {"| "}
                <Link to="/DispatchAgreement">Dispatch Agreement</Link> {"| "}
                <Link to="/RoadFreight">Road Freight</Link>
              </nav>
              <img
                src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670844/GADZ/Semi-Truck-Background-HD-2902259868_s4tccu.webp"
                style={{ width: "100%" }}
                alt="Big Green Truck"
              />
            </div>
            <Video1 />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
