import React from "react";
import Video1 from "../../components/Banner/Banner";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row jumbotron">
          <div className="display-4" style={{ padding: "40px" }}>
            About Us
          </div>
          <div>
            <div>
              <Link to="/Bio">Biography</Link>
            </div>
            <div>
              <Link to="/Consultation">Consultation</Link>
            </div>
          </div>
          <div>
            <Link to="/DispatchAgreement">Dispatch Agreement</Link>
            <br />
            <Link to="/RoadFreight">Road Freight</Link>
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
