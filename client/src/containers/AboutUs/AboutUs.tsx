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
          <table className="data">
            <tr>
              <td>
                <Link to="/Bio">{"Biography"}</Link>
              </td>
              <td>
                <Link to="/Consultation">{"Consultation"}</Link>
              </td>          
            </tr>
            <tr>
              <td>
                <Link to="/DispatchAgreement">Dispatch Agreement</Link>
              </td>
              <td>
                <Link to="/RoadFreight">Road Freight</Link>
              </td>
            </tr>
          </table>
          <Video1 />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
