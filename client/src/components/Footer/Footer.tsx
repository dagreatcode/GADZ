import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-white text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <Link
            aria-label="Facebook Link"
              to="https://www.facebook.com/global.asset.dispatching.service"
              className="me-4 link-secondary"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link aria-label="Twitter Link" to="" className="me-4 link-secondary">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link aria-label="Google Link" to="" className="me-4 link-secondary">
              <i className="fab fa-google"></i>
            </Link>
            <Link
            aria-label="Instagram Link"
              to="https://www.instagram.com/Global_assetleader/"
              className="me-4 link-secondary"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link aria-label="LinkedIn Link" to="" className="me-4 link-secondary">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link aria-label="GitHub Link" to="" className="me-4 link-secondary">
              <i className="fab fa-github"></i>
            </Link>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <p className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>GADZCONNECT
                </p>
                <p>
                  You have the loads, we got the GADZ. Connect your assets and manage them easily. Make loads available to the public or make yourself assessable as a driver. 
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <p className="text-uppercase fw-bold mb-4">Products</p>
                <p>
                  <Link to="/RoadFreight" className="text-reset">
                    Road Freight
                  </Link>
                </p>
                <p>
                  <Link to="/Bio" className="text-reset">
                    Biography
                  </Link>
                </p>
                <p>
                  <Link to="/Consultation" className="text-reset">
                    Consultation
                  </Link>
                </p>
                <p>
                  <Link to="/DispatchAgreement " className="text-reset">
                    Dispatch Agreement
                  </Link>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <p className="text-uppercase fw-bold mb-4">Useful links</p>
                <p>
                  <Link to="/AboutUs" className="text-reset">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link to="/ContactUs" className="text-reset">
                    Contact Us
                  </Link>
                </p>
                <p>
                  <Link to="/Services" className="text-reset">
                    Services
                  </Link>
                </p>
                {/* <p>
                  <Link to="/DispatchAgreement " className="text-reset">
                  Dispatch Agreement 
                  </Link>
                </p> */}
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <p className="text-uppercase fw-bold mb-4">Contact</p>
                <p>
                  <i className="fas fa-home me-3 text-secondary"></i>Dallas, TX
                  508 suite 826 commerce st  75203, USA
                </p>
                <p>
                  <i className="fas fa-envelope me-3 text-secondary"></i>
                  info@gadzconnect.com
                </p>
                <p>
                  <i className="fas fa-phone me-3 text-secondary"></i> + 01 972
                  597 8040
                </p>
                <p>
                  <i className="fas fa-print me-3 text-secondary"></i> + 01 234
                  567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
        >
          {
            "© 2023 Copyright Global Asset Dispatching, LLC All Rights Reserved. n\
             All other registered trademarks herein are the property of their respective owners. and "
          }
          <Link className="text-reset fw-bold" to="http://vincentkendrick.com/">
            {"Powered By"}
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
