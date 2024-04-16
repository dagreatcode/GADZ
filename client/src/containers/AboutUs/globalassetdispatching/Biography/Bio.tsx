import React from "react";
import { Link } from "react-router-dom";
// import Image1 from "./images/Connect.jpeg";

const Bio = () => {
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
              Bio
            </div>
            <div>
              <nav>
                <Link to="/Bio">Biography</Link> {"| "}
                <Link to="/Consultation">Consultation</Link> {"| "}
                <Link to="/DispatchAgreement">Dispatch Agreement</Link> {"| "}
                <Link to="/RoadFreight">Road Freight</Link>
              </nav>
            </div>
            <img src="https://res.cloudinary.com/fashion-commit/image/upload/v1713236853/extras/global-network-connection-world-map-point-and-line-composition-concept-of-global-business-illustration-free-vector-797581667_hypga3.png" alt="connecting dots" />
          </div>
          <hr />
          <h1 className="display-5">Effortless Connectivity:</h1>
          <div className="fs-3" style={{ padding: "40px" }}>
            Connect with a global network of buyers, sellers, carriers, and
            service providers - all within a single, intuitive platform.
          </div>
          <h1 className="display-5">Real-Time Visibility:</h1>
          <div className="fs-3" style={{ padding: "40px" }}>
            Gain unprecedented insights into your logistics operations with our
            advanced tracking and monitoring capabilities.
          </div>
          <h1 className="display-5">Smart Recommendations: </h1>
          <div className="fs-3" style={{ padding: "40px" }}>
            Harness the power of data-driven insights to optimize routes,
            minimize costs, and maximize efficiency.{" "}
          </div>
          <h1 className="display-5">Secure and Reliable: </h1>
          <div className="fs-3" style={{ padding: "40px" }}>
            Rest easy knowing that your data and transactions are safeguarded by
            industry-leading security measures.
          </div>
          <div id="biogrid" className="row">
            <div className="col-md-6 col-xs-12">
              <strong className="display-3" style={{ padding: "40px" }}>
                {" "}
                From Global Asset Dispatching
              </strong>
              <br />
              <br />
              <p className="fs-3" style={{ padding: "40px" }}>
                “I embrace being an asset in everything I do. My journey in life
                has installed a great belief in trusting the process. Life
                accomplishmemts will grant you the pleasure of what it looks
                like to be creative, resilient and significant”! Who Is Shamira
                Carter? Born in Philadephia, PA My career path has built the
                foundation of my lif. I consider myself an asset in everything I
                do. Every since I was a child, I always felt i can do anything
                that comes to mind. This allowed me to become boldly successful
                in climbing the latter across corporations I have worked for in
                the past. That mindset of becoming one of the best provided me
                the luxury of traveling abroad, applying the ability to scale up
                operations as a asset leader. My desire is to partner with
                businesses seeking to put a root cause to their challeges and
                produce a solution that fits! CONTACT Career Early work Early in
                2009 I started my corporate career in the records management,
                digital imaging, document perservation industry and operational
                development industry.
              </p>
            </div>
            <div className="col-md-6 col-xs-12">
              <strong className="display-3" style={{ padding: "40px" }}>
                To GADZ Connect
              </strong>
              <br />
              <br />
              <p className="fs-3" style={{ padding: "40px" }}>
                Eagerly learning those coporations from the ground up allowed me
                to develop the operational structure. My ability to observe
                process, determine a problem, analize a rootcause resolution
                into the opertation of great value to one's business objective.
                My gift of leadership has granted me leverage in helping people
                and operations grow in meeting its highest potential by
                implementing my exceptional customer servicer experienc,
                business consulting and people leader skills. Gracefully, I have
                been able to install this ability in everything I do and now I
                desire to provide this service in a partnerships from my
                business to your business! Breakthrough My breakthrough into
                this journey began in early 2020. I decided to take the leap of
                faith by implanting myself into the world of enterprenuership.
                My passion of being an asset of my own business and partnering
                with like minded people to build a healthy and wealthy business
                to business collaboration. Leading With Integrity! Our core
                values: 1. Trust 2. Resilence 3. Transparency 4. Reliable
                Leading With Integrity! Our core values: 1. Trust 2. Resilence
                3. Transparency 4. Reliable
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bio;
