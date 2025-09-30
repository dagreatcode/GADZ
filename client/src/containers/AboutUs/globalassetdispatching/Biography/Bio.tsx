// import React from "react";
// import { Link } from "react-router-dom";
// import "./Bio.css"; // Import your CSS file

// const Bio = () => {
//   return (
//     <>
//       <div className="bio-container">
//         <div className="contact-section">
//           <a href="tel:(1)(9725978040)" className="btn btn-dark" role="button">
//             <h1 className="contact-number">972-597-8040</h1>
//           </a>
//         </div>

//         <div className="content-container">
//           <h1 className="bio-title">Bio</h1>
//           <nav className="nav-links">
//             <Link to="/Bio">Biography</Link> {" | "}
//             <Link to="/Consultation">Consultation</Link> {" | "}
//             <Link to="/DispatchAgreement">Dispatch Agreement</Link> {" | "}
//             <Link to="/RoadFreight">Road Freight</Link>
//           </nav>

//           <img
//             src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670838/GADZ/global-network-connection-world-map-point-and-line-composition-concept-of-global-business-illustration-free-vector-797581667_vyvoqu.webp"
//             alt="connecting dots"
//             className="bio-image"
//           />

//           <section className="about-section">
//             <h1>
//               A little about us{" "}
//               <small className="text-muted">GADZConnect</small>
//             </h1>
//             <blockquote className="blockquote">
//               <p className="mb-0">Don't miss out on the early discounts.</p>
//             </blockquote>
//           </section>

//           <hr />

//           <dl className="service-list">
//             <dt>Effortless Connectivity:</dt>
//             <dd>
//               Connect with a global network of buyers, sellers, carriers, and
//               service providers—all within a single, intuitive platform.
//             </dd>

//             <dt>Real-Time Visibility:</dt>
//             <dd>
//               Gain unprecedented insights into your logistics operations with
//               our advanced tracking and monitoring capabilities.
//             </dd>

//             <dt>Smart Recommendations:</dt>
//             <dd>
//               Harness the power of data-driven insights to optimize routes,
//               minimize costs, and maximize efficiency.
//             </dd>

//             <dt>Secure and Reliable:</dt>
//             <dd>
//               Rest easy knowing that your data and transactions are safeguarded
//               by industry-leading security measures.
//             </dd>
//           </dl>

//           <hr />

//           <div className="bio-details">
//             <div className="bio-column">
//               <strong className="display-3">
//                 From Global Asset Dispatching To GADZ Connect
//               </strong>
//               <p>
//                 I embrace being an asset in everything I do. My journey in life
//                 has instilled a great belief in trusting the process. Life
//                 accomplishments will grant you the pleasure of what it looks
//                 like to be creative, resilient, and significant! Who Is Shamira
//                 Carter? Born in Philadelphia, PA. My career path has built the
//                 foundation of my life. I consider myself an asset in everything
//                 I do...
//               </p>
//             </div>
//             <div className="bio-column">
//               <p>
//                 Eagerly learning those corporations from the ground up allowed
//                 me to develop the operational structure. My ability to observe
//                 processes, determine a problem, and analyze a root cause
//                 resolution is of great value to one's business objectives...
//               </p>
//               <p>
//                 Leading with Integrity! Our core values: Trust, Resilience,
//                 Transparency, and Reliability.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Bio;

import React from "react";
// import Video1 from "../../components/Banner/Banner";
import { Link } from "react-router-dom";
import "./Bio.css";

function Bio() {
  return (
    <div className="about-container">
      {/* Phone CTA */}
      <div className="about-phone">
        <a href="tel:(1)(9725978040)" className="about-phone-btn">
          📞 <span>972-597-8040</span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-title">Biography</h1>
        <nav className="about-nav">
          <Link to="/Bio">Biography</Link>
          <Link to="/Consultation">Consultation</Link>
          <Link to="/DispatchAgreement">Dispatch Agreement</Link>
          <Link to="/RoadFreight">Road Freight</Link>
        </nav>
      </section>

      {/* Hero Image */}
      <div className="about-image">
        <img
          src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670838/GADZ/global-network-connection-world-map-point-and-line-composition-concept-of-global-business-illustration-free-vector-797581667_vyvoqu.webp"
          alt="Global network illustration"
        />
      </div>

      {/* Biography Content */}
      <section className="about-video" style={{ flexDirection: "column", gap: "30px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "justify" }}>
          <p>
            I embrace being an asset in everything I do. My journey in life has instilled a great belief in trusting the process.
            Life accomplishments have granted me the pleasure of what it looks like to be creative, resilient, and significant!
          </p>
          <p>
            <strong>Who is Shamira Carter?</strong> Born in Philadelphia, PA.
            My career path has built the foundation of my life. I consider myself an asset in everything I do.
          </p>
          <p>
            Eagerly learning corporations from the ground up allowed me to develop operational structure.
            My ability to observe processes, identify problems, and analyze root cause resolutions is of great value to any business objective.
          </p>
          <p>
            <strong>Leading with Integrity:</strong> Our core values: Trust, Resilience, Transparency, and Reliability.
          </p>

          <hr style={{ borderTop: "2px solid #eee", margin: "40px 0" }} />

          <p>
            🌐 <strong>Effortless Connectivity:</strong> Connect with a global network of buyers, sellers, carriers, and service providers—all within a single, intuitive platform.
          </p>
          <p>
            📡 <strong>Real-Time Visibility:</strong> Gain unprecedented insights into your logistics operations with advanced tracking and monitoring capabilities.
          </p>
          <p>
            ⚡ <strong>Smart Recommendations:</strong> Harness data-driven insights to optimize routes, minimize costs, and maximize efficiency.
          </p>
          <p>
            🔒 <strong>Secure and Reliable:</strong> Rest easy knowing your data and transactions are safeguarded by industry-leading security measures.
          </p>
        </div>

        {/* Video Section
        <Video1 /> */}
      </section>
    </div>
  );
}

export default Bio;
