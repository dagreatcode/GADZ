import React from "react";
import "./Home.css"; // Import your custom styles

const Home = () => {
  return (
    <div
      className="container text-center home-container"
      style={{ padding: "40px" }}
    >
      <div className="row jumbotron">
        <div className="col-12">
          <div className="display-4 welcome-text">Welcome To GADZConnect!</div>
          <img
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            src="https://res.cloudinary.com/fashion-commit/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1726274331/GADZCo_ndr2y6.jpg"
            alt="Big World of Connections"
          />
        </div>
        <div className="col-12 display-6" style={{ padding: "40px" }}>
          The innovative solution revolutionizing the transportation and
          logistics industry. We’re here to transform the way you manage your
          logistics operations, offering a seamless platform that connects
          buyers and sellers, carriers and shippers, and every player in
          between!
        </div>

        <div className="col-12 social-icons">
          <lord-icon
            src="https://cdn.lordicon.com/tltikfri.json"
            trigger="hover"
            state="loop-rotate"
            style={{ width: "100px", height: "100px", margin: "0 20px" }}
          ></lord-icon>

          <lord-icon
            src="https://cdn.lordicon.com/hsrrkevt.json"
            trigger="hover"
            state="loop-cycle"
            style={{ width: "100px", height: "100px", margin: "0 20px" }}
          ></lord-icon>
        </div>

        <div className="col-12 display-2">It's A New World</div>

        <div className="col-12">
          <img
            src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670837/GADZ/Free-Photo-700x860-1660911398_fvksf2.webp"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            alt="Big Town top view"
          />
          <h1 className="jumbotron display-4">What We Offer?</h1>
          <hr />
          <p className="display-6">
            You have the loads, we got the GADZ. Connect your assets and manage
            them easily. Make loads available to the public or make yourself
            assessable as a driver.
          </p>
        </div>

        <div className="col-12">
          <h1 className="jumbotron display-4">We are Global</h1>
          <hr />
          <div className="row">
            <div className="col-md-6 col-12">
              <p className="display-6">
                At GADZCONNECT, we’re redefining the way businesses manage their
                logistics operations. Say goodbye to the complexities and
                inefficiencies of traditional logistics processes- and hello to
                a world of seamless connectivity, real-time visibility, and
                unparalleled efficiency.
              </p>
            </div>
            <div className="col-md-6 col-12">
              <img
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670842/GADZ/Screenshot_2023-08-24_211718_hjhizt.webp"
                alt="Logistics"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
