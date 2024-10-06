import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="./favicon-32x32.png"
            width="45"
            alt="GADZ Up"
            className="d-inline-block align-middle mr-2"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/AboutUs" className="nav-link">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ContactUs" className="nav-link">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Services" className="nav-link">
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Login" className="nav-link">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="social-links">
          <span>
            <a
              aria-label="Twitter Link"
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab fa-twitter"
                style={{ fontSize: "30px", padding: "20px" }}
              ></i>
            </a>
          </span>
          <span>
            <a
              aria-label="Facebook Link"
              href="https://www.facebook.com/global.asset.dispatching.service"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab fa-facebook-f"
                style={{ fontSize: "30px", padding: "20px" }}
              ></i>
            </a>
          </span>
          <span>
            <a
              aria-label="YouTube Link"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab fa-youtube"
                style={{ fontSize: "30px", padding: "20px" }}
              ></i>
            </a>
          </span>
          <span>
            <a
              aria-label="Instagram Link"
              href="https://www.instagram.com/Global_assetleader/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab fa-instagram"
                style={{ fontSize: "30px", padding: "20px" }}
              ></i>
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
