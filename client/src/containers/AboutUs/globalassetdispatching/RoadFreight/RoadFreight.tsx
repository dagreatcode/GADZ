import React from "react";
import { Link } from "react-router-dom";
// import Image1 from "./images/shipping.jpeg";
// import Image2 from "./images/Semi-Truck-Photo-3707432807.jpeg";

const RoadFreight = () => {
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
              Road Freight
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
              src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670845/GADZ/Semi-Truck-Photo-3707432807_zep99p.webp"
              style={{ width: "100%" }}
              alt="talks"
            />
          </div>
          <div className="row">
            <div className="fs-3" style={{ padding: "40px" }}>
              Road Freight Our Road Support Will Keep Your Business On The Move
              LET US HELP YOU WITH YOUR CARGO PROBLEM We focus on understanding
              your challeges, seeking to learn more about your business needs
              and objectives. We Provide Land Freight Transport Services In The
              Following Areas: Dry, frozen, and refrigerated truckload. LTL
              service including online pricing, booking, and tracking. Local,
              regional, and long-haul drayage. Flatbed, drop-deck, and
              double-drop trailers. Over-dimensional, heavy haul, and expedited
              shipments
            </div>
            <img
              src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/1911991-4227381452_ixgk8u.webp"
              style={{ width: "100%" }}
              alt="talks"
            />
            <div className="fs-3" style={{ padding: "40px" }}>
              We Understand That Everything Is A Process. Asked Questions! What
              makes you different from others? Our passion for helping other
              businesses grow is what makes us different from your average
              dispatching company. We focus on excellent customer service and
              building a relationship which allows me to be of significant value
              to the industry. Do you have brokerage connections? We believe in
              unlimited resource, which allows us to expand our services across
              country. Not only with freight brokers but state to state ports,
              private trucking company's, amazon, JB Hunt and more. We desire to
              scale up with our business partners seeking exceptional growth. Do
              you help with documentation support? Documentation is key! It
              keeps us and our business partners in alignment with safety and
              regulation. We also enjoy being well organized. As the world
              evolves and continue to go digital, we encourage a digital
              documentation support system to help make your business run
              effectively and efficiently. Are you committed to your partners?
              Global Asset is built with integrity We believe in loyalty, trust
              and transparency. The committment is a mutual agreement and we
              desire to work with strong minded individuals with the
              understanding in building up ones business with integrity and
              respect. Do you help find drivers for trucking companies? We work
              with a network of organizations and business owners. Which are
              encouraged to support all small to large businesses. Helping your
              company grow by finding qualified drivers and dedicated lanes.
              Steady freight is what we take much pride in! What does a business
              to business partnership look like with GAD? We are here to help
              your business work smarter and not harder! We focus on helping you
              to overcome barriers, find resource, grow your network and scale
              up your revenue goals!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadFreight;
