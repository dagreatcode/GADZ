import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome To <span>GADZConnect</span>
          </h1>
          <p className="hero-subtitle">
            The innovative solution revolutionizing the transportation and
            logistics industry. Connecting shippers, carriers, and businesses
            worldwide on one seamless platform.
          </p>
          <div className="hero-buttons">
            {localStorage.getItem("userId") && (
              <Link to="/User">
                <button className="home-btn-secondary">Reconnect</button>
              </Link>
            )}
            {/* <button className="home-btn-primary">Get Started</button> */}
            {/* <button className="home-btn-secondary">Learn More</button> */}
            <Link to="/Login">
              <button className="home-btn-secondary">Get Started</button>
            </Link>
            <Link to="/AboutUs">
              <button className="home-btn-secondary">Learn More</button>
            </Link>
          </div>
        </div>
        {/* <div className="hero-image">
          <img
            src="https://res.cloudinary.com/fashion-commit/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1726274331/GADZCo_ndr2y6.jpg"
            alt="Global Logistics"
          />
        </div> */}
      </section>

      {/* Social Section */}
      <section className="social-icons">
        <lord-icon
          src="https://cdn.lordicon.com/hsrrkevt.json"
          trigger="hover"
          state="loop-cycle"
          style={{ width: "80px", height: "80px" }}
        ></lord-icon>
      </section>

      {/* What We Offer */}
      <section className="offer-section">
        <div className="offer-card">
          <img
            src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670837/GADZ/Free-Photo-700x860-1660911398_fvksf2.webp"
            alt="Big Town top view"
          />
          <div className="offer-content">
            <h2>What We Offer</h2>
            <p>
              You have the loads, we got the GADZ. Connect your assets and manage
              them effortlessly. Make loads available to the public or make
              yourself accessible as a driver. Efficiency, connectivity, and
              simplicity—all in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="social-icons">
        <lord-icon
          src="https://cdn.lordicon.com/tltikfri.json"
          trigger="hover"
          state="loop-rotate"
          style={{ width: "80px", height: "80px" }}
        ></lord-icon>
      </section>

      {/* Global Section */}
      <section className="global-section">
        <h2>We Are Global 🌍</h2>
        <div className="global-content">
          <div className="global-text">
            <p>
              At GADZCONNECT, we’re redefining the way businesses manage their
              logistics operations. Say goodbye to complexity and inefficiency,
              and hello to seamless connectivity, real-time visibility, and
              unparalleled efficiency—anywhere in the world.
            </p>
          </div>
          <div className="global-image">
            <img
              src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670842/GADZ/Screenshot_2023-08-24_211718_hjhizt.webp"
              alt="Global Logistics Map"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>It’s A New World with GADZConnect</h2>
        <p>
          Join thousands of logistics professionals already transforming the way
          they manage operations. The future of logistics is here.
        </p>
        {/* <button className="home-btn-primary cta-btn">Connect Now</button> */}
        <Link to="/Agreement">
          <button className="home-btn-secondary">Connect Now</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
