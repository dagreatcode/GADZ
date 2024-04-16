import React from "react";
import Image1 from "./images/realMeets.jpeg";
import { Link } from "react-router-dom";

const Consultation = () => {
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
            <div>
              <p className="fs-2" style={{ marginTop: "30px" }}> Managing logistics can be a complex and time-consuming process, often leading to inefficiencies, delays, and unnecessary costs. Traditional methods lack transparency, coordination, and real-time insights, hindering businesses from reaching their full potential. </p>
              <h1 className="display-3" style={{ padding: "40px" }}>
                Consultation interest
              </h1>
              <lord-icon
                src="https://cdn.lordicon.com/egmlnyku.json"
                trigger="loop"
                style={{ width: "250px", height: "250px" }}
              ></lord-icon>
              <p className="fs-5">
                Call us for a free consultation. See below..
              </p>
              <ul className="fs-2 list-unstyled" style={{ padding: "40px" }}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultation;
