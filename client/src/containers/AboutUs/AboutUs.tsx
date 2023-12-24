import React from "react";
import Video1 from "../../components/Banner/Banner";
import { Link } from "react-router-dom";

function AboutUs() {
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
            About Us
          </div>
          <div>
            <nav>
              <Link to="/Bio">Biography</Link> {"| "}
              <Link to="/Consultation">Consultation</Link> {"| "}
              <Link to="/DispatchAgreement">Dispatch Agreement</Link> {"| "}
              <Link to="/RoadFreight">Road Freight</Link>
            </nav>
          </div>
          <Video1 />
          {/* <iframe 
        width={1222} height={887}
        src="https://www.youtube.com/embed/ErOMbspikNg" 
        title="4K 3D Earth Globe Spinning" 
        //   frameBorder="0" 
        allow="accelerometer; autoPlay=true; clipboard-write; encrypted-media; gyroscope; picture-in-picture full" 
        allowFullScreen
      ></iframe> */}
        </div>
      </div>
    </>
  );
}

export default AboutUs;
