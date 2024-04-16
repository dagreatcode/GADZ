import React from "react";
// import Image1 from "./images/realMeetsBW.jpeg";
import { Link } from "react-router-dom";

const DispatchAgreement = () => {
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
          <Link to="/Agreement">Our Agreement With You </Link>
          <div className="row jumbotron">
            <div className="display-4" style={{ padding: "40px" }}>
              DispatchAgreement
            </div>
            <div>
              <nav>
                <Link to="/Bio">Biography</Link> {"| "}
                <Link to="/Consultation">Consultation</Link> {"| "}
                <Link to="/DispatchAgreement">Dispatch Agreement</Link> {"| "}
                <Link to="/RoadFreight">Road Freight</Link>
              </nav>
            </div>
            <img src="https://res.cloudinary.com/fashion-commit/image/upload/v1713236879/extras/image1_vqnpw1.jpg" style={{ width: "100%" }} alt="talks" />
          </div>
          <div>
            {" "}
            <h3>
              Fancy display heading
              <small className="text-muted"> With faded secondary text</small>
            </h3>
            <blockquote className="blockquote">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
            </blockquote>
          </div>
          <dl className="row">
            <dt className="col-sm-3">Description lists</dt>
            <dd className="col-sm-9">
              A description list is perfect for defining terms.
            </dd>

            <dt className="col-sm-3">Euismod</dt>
            <dd className="col-sm-9">
              <p>
                Vestibulum id ligula porta felis euismod semper eget lacinia
                odio sem nec elit.
              </p>
              <p>Donec id elit non mi porta gravida at eget metus.</p>
            </dd>

            <dt className="col-sm-3">Malesuada porta</dt>
            <dd className="col-sm-9">
              Etiam porta sem malesuada magna mollis euismod.
            </dd>

            <dt className="col-sm-3 text-truncate">
              Truncated term is truncated
            </dt>
            <dd className="col-sm-9">
              Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
              nibh, ut fermentum massa justo sit amet risus.
            </dd>

            <dt className="col-sm-3">Nesting</dt>
            <dd className="col-sm-9">
              <dl className="row">
                <dt className="col-sm-4">Nested definition list</dt>
                <dd className="col-sm-8">
                  Aenean posuere, tortor sed cursus feugiat, nunc augue blandit
                  nunc.
                </dd>
              </dl>
            </dd>
          </dl>
          <Link to="/Agreement">Let's Agree</Link>
        </div>
      </div>
    </>
  );
};

export default DispatchAgreement;
