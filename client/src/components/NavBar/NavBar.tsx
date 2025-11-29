// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./NavBar.css";

// const NavBar: React.FC = () => {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const toggleNavbar = () => setIsCollapsed(!isCollapsed);

//   return (
//     <nav className="navbar-container">
//       <div className="navbar-inner">
//         <Link to="/" className="navbar-logo">
//           <img src="./favicon-32x32.png" alt="GADZ Up" className="logo-img" />
//           <span>GADZConnect</span>
//         </Link>

//         {/* Hamburger Button */}
//         <button className="navbar-toggler" onClick={toggleNavbar}>
//           <span className="hamburger-icon"></span>
//         </button>

//         {/* Collapsible Links */}
//         <div className={`navbar-links-container ${isCollapsed ? "collapsed" : ""}`}>
//           <ul className="navbar-links">
//             <li>
//               <NavLink to="/AboutUs" className="nav-link">
//                 About Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/Services" className="nav-link">
//                 Services
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/ContactUs" className="nav-link">
//                 Contact Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/Login" className="nav-link">
//                 Login
//               </NavLink>
//             </li>
//           </ul>

//           <div className="navbar-social">
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="https://facebook.com/global.asset.dispatching.service" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-youtube"></i>
//             </a>
//             <a href="https://instagram.com/Global_assetleader/" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-instagram"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/Login");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src="./favicon-32x32.png" alt="GADZ Up" className="logo-img" />
          <span>GADZConnect</span>
        </Link>

        {/* Hamburger */}
        <button className="navbar-toggler" onClick={toggleNavbar}>
          <span className="hamburger-icon"></span>
        </button>

        <div className={`navbar-links-container ${isCollapsed ? "collapsed" : ""}`}>
          <ul className="navbar-links">
            <li>
              <NavLink to="/AboutUs" className="nav-link">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/Services" className="nav-link">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/ContactUs" className="nav-link">
                Contact Us
              </NavLink>
            </li>

            {/* LOGIN OR LOGOUT BUTTON */}
            {!isLoggedIn ? (
              <li>
                <NavLink to="/Login" className="nav-link login-link">
                  Login
                </NavLink>
              </li>
            ) : (
              <li>
                <button onClick={handleLogout} className="nav-link login-link" style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                  Logout
                </button>
              </li>
            )}
          </ul>

          <div className="navbar-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com/global.asset.dispatching.service" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://instagram.com/Global_assetleader/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
