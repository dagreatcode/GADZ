// import React from "react";
// import { Link } from "react-router-dom";
// import "./DiapatchingAgreement.css"; // Import your CSS file for styling

// const DispatchAgreement = () => {
//   return (
//     <>
//       <div className="dispatch-agreement-container">
//         <div className="contact-section">
//           <a
//             href="tel:(1)(9725978040)"
//             className="btn btn-dark contact-button"
//             role="button"
//           >
//             <h1 className="contact-number">972-597-8040</h1>
//           </a>
//         </div>

//         <div className="content-container animate__animated animate__fadeIn">
//           <h1 className="page-title">Dispatch Agreement</h1>

//           <nav className="nav-links">
//             <Link to="/Bio">Biography</Link> {" | "}
//             <Link to="/Consultation">Consultation</Link> {" | "}
//             <Link to="/DispatchAgreement">Dispatch Agreement</Link> {" | "}
//             <Link to="/RoadFreight">Road Freight</Link>
//           </nav>

//           <img
//             src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670840/GADZ/image1_la62ck.webp"
//             alt="Dispatch Agreement"
//             className="agreement-image"
//           />

//           <h2 className="agreement-intro">Our Commitment to You</h2>
//           <p className="intro-text">
//             At GADZ CONNECT, we take our agreements seriously. We prioritize
//             transparency and reliability in our services. Here’s what you can
//             expect from our partnership:
//           </p>

//           <ul className="agreement-list">
//             <li>
//               <strong>Transparent Pricing:</strong> We believe in clear pricing
//               with no hidden fees. You'll know exactly what you're paying for
//               and why.
//             </li>
//             <li>
//               <strong>Reliable Communication:</strong> Our team is always here
//               to answer your questions. Expect timely responses and regular
//               updates throughout our partnership.
//             </li>
//             <li>
//               <strong>Timely Updates:</strong> You will receive regular updates
//               on your shipments, ensuring you are never left in the dark about
//               your logistics.
//             </li>
//             <li>
//               <strong>Dedicated Support:</strong> Our customer support team is
//               available 24/7, ready to assist you with any inquiries or concerns
//               you may have.
//             </li>
//             <li>
//               <strong>Customized Solutions:</strong> We understand that every
//               business is unique. We tailor our services to meet your specific
//               logistics needs and challenges.
//             </li>
//           </ul>

//           <h2 className="importance-title">
//             Why a Dispatch Agreement is Essential
//           </h2>
//           <p className="importance-text">
//             A dispatch agreement is not just a formality; it’s a crucial
//             document that outlines the expectations and responsibilities of both
//             parties. It ensures that:
//           </p>
//           <ul className="importance-list">
//             <li>
//               All parties are on the same page regarding service expectations.
//             </li>
//             <li>
//               You are protected in case of discrepancies or misunderstandings.
//             </li>
//             <li>
//               There’s a clear outline of the logistics processes involved.
//             </li>
//             <li>It fosters a relationship built on trust and reliability.</li>
//           </ul>

//           <h1 className="jumbotron display-6" style={{ padding: "50px" }}>
//             Ready to move forward? If you have any questions or would like to
//             discuss the specifics of our Dispatch Agreement, please don’t
//             hesitate to contact us. We're excited to embark on this journey with
//             you!
//           </h1>

//           <Link to="/Agreement" className="cta-button">
//             Let's Agree
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DispatchAgreement;
import React from "react";
import { Link } from "react-router-dom";
import "./DispatchingAgreement.css";

const DispatchAgreement = () => {
  return (
    <div className="dispatch-container">
      {/* Contact Section */}
      <div className="dispatch-contact">
        <a href="tel:19725978040" className="dispatch-contact-btn">
          📞 <span>972-597-8040</span>
        </a>
      </div>

      {/* Page Header */}
      <section className="dispatch-hero">
        <h1 className="dispatch-title">Dispatch Agreement</h1>
        <nav className="dispatch-nav">
          <Link to="/Bio">Biography</Link>
          <Link to="/Consultation">Consultation</Link>
          <Link to="/DispatchAgreement">Dispatch Agreement</Link>
          <Link to="/RoadFreight">Road Freight</Link>
        </nav>
      </section>

      {/* Hero Image */}
      <div className="dispatch-image">
        <img
          src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670840/GADZ/image1_la62ck.webp"
          alt="Dispatch Agreement"
        />
      </div>

      {/* Intro Section */}
      <section className="dispatch-intro">
        <h2>Our Commitment to You</h2>
        <p>
          At <strong>GADZ CONNECT</strong>, we take our agreements seriously.
          Transparency and reliability are at the heart of our services. Here’s
          what you can expect from our partnership:
        </p>
      </section>

      {/* Agreement Details */}
      <section className="dispatch-agreement-details">
        <ul>
          <li>
            <strong>Transparent Pricing:</strong> Clear pricing with no hidden
            fees. You’ll always know what you’re paying for.
          </li>
          <li>
            <strong>Reliable Communication:</strong> Timely responses and
            regular updates throughout our partnership.
          </li>
          <li>
            <strong>Timely Updates:</strong> Stay informed with real-time
            shipment updates.
          </li>
          <li>
            <strong>Dedicated Support:</strong> Our support team is available
            24/7.
          </li>
          <li>
            <strong>Customized Solutions:</strong> Services tailored to your
            business needs.
          </li>
        </ul>
      </section>

      {/* Importance Section */}
      <section className="dispatch-importance">
        <h2>Why a Dispatch Agreement is Essential</h2>
        <p>
          A dispatch agreement is more than a formality — it ensures alignment,
          clarity, and trust between all parties.
        </p>
        <ul>
          <li>All parties are aligned on expectations.</li>
          <li>Protection against discrepancies or misunderstandings.</li>
          <li>Clear outline of logistics processes involved.</li>
          <li>A foundation of trust and reliability.</li>
        </ul>
      </section>

      {/* Closing Section */}
      <section className="dispatch-closing">
        <h2>
          Ready to move forward? <br />
          Let’s make your logistics seamless, secure, and successful.
        </h2>
        <Link to="/Agreement" className="dispatch-cta-btn">
          Let’s Agree
        </Link>
      </section>
    </div>
  );
};

export default DispatchAgreement;

