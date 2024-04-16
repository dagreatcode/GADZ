import React from "react";
import { Link, NavLink } from "react-router-dom";

//TODO: Add Checkout Button to NavBar

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            {/* GADZ Connet */}
            {/* <img width="130px" height="70px"src="{% static "series/images/logo.png"%}" style="position:relative;top:-10px">
          <img width="130px" height="70px"src="{% static "series/images/logo.png"%}" />
          <img width="130px" height="70px"src="{% static "series/images/logo.png"%}"/> */}
            {/* <!-- Logo Image --> */}
            <img
              src="./favicon-32x32.png"
              width="45"
              alt="Stay Safe Logo"
              className="d-inline-block align-middle mr-2"
            />
            {/* <!-- Logo Text --> */}
            {/* <span class="text-uppercase font-weight-bold">Travel Safe</span> */}
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
              {/* <li className="nav-item">
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>
							</li> */}
              <li className="nav-item">
                <NavLink to="/AboutUs" className="nav-link">
                  AboutUs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ContactUs" className="nav-link">
                  ContactUs
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
        </div>

        <span>
          <Link aria-label="Twitter Link" to="https://www.twitter.com">
            <i
              className="fab fa-twitter"
              style={{ fontSize: "30px", padding: "20px" }}
            ></i>
          </Link>
        </span>
        <span>
          <Link aria-label="Facebook Link" to="https://www.facebook.com/global.asset.dispatching.service">
            <i
              className="fab fa-facebook-f"
              style={{ fontSize: "30px", padding: "20px" }}
            ></i>
          </Link>
        </span>
        <span>
          <Link aria-label="Youtube Link" to="https://www.youtube.com">
            <i
              className="fab fa-youtube"
              style={{ fontSize: "30px", padding: "20px" }}
            ></i>
          </Link>
        </span>
        <span>
          <Link aria-label="Instagram Link" to="https://www.instagram.com/Global_assetleader/">
            <i
              className="fab fa-instagram"
              style={{ fontSize: "30px", padding: "20px" }}
            ></i>
          </Link>
        </span>
      </nav>
    </div>
  );
};

export default NavBar;
