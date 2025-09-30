import React from "react";
// import Video1 from "../../components/Banner/Banner";
import { Link } from "react-router-dom";
import "./RoadFreight.css";

function RoadFreight() {
  return (
    <div className="road-container">
      {/* Phone CTA */}
      <div className="road-phone">
        <a href="tel:(1)(9725978040)" className="road-phone-btn">
          📞 <span>972-597-8040</span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="road-hero">
        <h1 className="road-title">Road Freight</h1>
        <nav className="road-nav">
          <Link to="/Bio">Biography</Link>
          <Link to="/Consultation">Consultation</Link>
          <Link to="/DispatchAgreement">Dispatch Agreement</Link>
          <Link to="/RoadFreight">Road Freight</Link>
        </nav>
      </section>

      {/* Hero Image */}
      <div className="road-image">
        <img
          src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670845/GADZ/Semi-Truck-Photo-3707432807_zep99p.webp"
          alt="Road Freight Truck"
        />
      </div>

      {/* Main Content */}
      <section className="road-content">
        <div className="road-section">
          <p>
            <strong>Road Freight:</strong> Our Road Support Will Keep Your Business On The Move.
            LET US HELP YOU WITH YOUR CARGO PROBLEM. We focus on understanding your challenges, seeking
            to learn more about your business needs and objectives. We provide Land Freight Transport Services in the following areas:
            Dry, frozen, and refrigerated truckload. LTL service including online pricing, booking, and tracking.
            Local, regional, and long-haul drayage. Flatbed, drop-deck, and double-drop trailers.
            Over-dimensional, heavy haul, and expedited shipments.
          </p>
          <img
            src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/1911991-4227381452_ixgk8u.webp"
            alt="Freight Support"
            className="road-section-image"
          />
          <p>
            We Understand That Everything Is A Process. Asked Questions! What makes you different from others?
            Our passion for helping other businesses grow is what makes us different from your average dispatching company.
            We focus on excellent customer service and building a relationship which allows me to be of significant value to the industry.
            Do you have brokerage connections? We believe in unlimited resources, which allows us to expand our services across the country.
            Not only with freight brokers but state-to-state ports, private trucking companies, Amazon, JB Hunt and more.
            We desire to scale up with our business partners seeking exceptional growth.
          </p>
          <p>
            Do you help with documentation support? Documentation is key! It keeps us and our business partners in alignment with safety and regulation.
            We also enjoy being well organized. As the world evolves and continues to go digital, we encourage a digital documentation support system
            to help make your business run effectively and efficiently.
          </p>
          <p>
            Are you committed to your partners? Global Asset is built with integrity. We believe in loyalty, trust and transparency.
            The commitment is a mutual agreement and we desire to work with strong-minded individuals with the understanding
            in building up one's business with integrity and respect.
          </p>
          <p>
            Do you help find drivers for trucking companies? We work with a network of organizations and business owners,
            which are encouraged to support all small to large businesses. Helping your company grow by finding qualified drivers
            and dedicated lanes. Steady freight is what we take much pride in!
          </p>
          <p>
            What does a business-to-business partnership look like with GAD? We are here to help your business work smarter and not harder!
            We focus on helping you overcome barriers, find resources, grow your network and scale up your revenue goals!
          </p>
        </div>
      </section>

      {/* Video Section
      <section className="road-video">
        <Video1 />
      </section> */}
    </div>
  );
}

export default RoadFreight;
