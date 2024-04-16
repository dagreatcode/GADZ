import React from "react";
// import {Link} from 'react-router-dom';
// import LiveChat from '../../components/LiveChat/LiveChat';
// import Comments from '../../components/Comments/Comments';
// import { useSelector } from 'react-redux';
import Truck from "./images/truck.png";
import Logistics from "./images/logistics.png";
import Town from "./images/town.jpeg";

// import realMeetsBW from "./images/realMeetsBW.jpeg"

const Home = () => {
  // const comments = useSelector((state) => state.comments);
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="row jumbotron">
        <div className="display-4" style={{ padding: "40px" }}>
          Welcome To GADZConnect!
        </div>

        {/* <Link to="/Admin">Admin Pages After login</Link><br/>
      <Link to="/User">User Pages After Login</Link> */}
        {/* <LiveChat /> */}
        {/* <Comments comments={comments} title="🥳Show All Comments Here✒️" /> */}
        <img src={Truck} alt="Big Truck" />
        {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
        <div className="display-6" style={{ padding: "40px" }}>
          The innovative solution revolutionizing the transportation and
          logistics industry. We’re here to transform the way you manage your
          logistics operations, offering a seamless platform that connects
          buyers and sellers, carriers and shippers, and every player in
          between!
        </div>
        {/* <script src="https://cdn.lordicon.com/lordicon.js"></script> */}
        <div>
          <lord-icon
            src="https://cdn.lordicon.com/tltikfri.json"
            // trigger="hover"
            trigger="loop"
            state="loop-rotate"
            // delay="2000"
            style={{ width: "250px", height: "250px" }}
          ></lord-icon>
        </div>
        <div className="display-2">It's A New World</div>
        <div style={{ textAlign: "center" }}>
          <div className="row">
            <div className="col-md-12">
              <img
                src={Town}
                style={{ width: "100%", height: "75%" }}
                alt="Big Town top view"
              />

              {/* <img
                src="https://placehold.co/600x400/gray/white"
                style={{ width: "100%" }}
                alt=""
              /> */}
              <br />
              <br />
              <br />
              <br />
              <h1 className="jumbotron display-4">What We Offer?</h1>
              <hr />
              <br />
              <br />
              <p className="display-6">
                You have the loads, we got the GADZ. Connect your assets and
                manage them easily. Make loads available to the public or make
                yourself assessable as a driver.
              </p>
            </div>
          </div>
          <br />
          <br />
          <br />
          <lord-icon
            src="https://cdn.lordicon.com/hsrrkevt.json"
            trigger="loop"
            state="loop-cycle"
            style={{ width: "250px", height: "250px" }}
          ></lord-icon>
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h1 className="jumbotron display-4">We are Global</h1>
            <hr />

            <br />
            <br />
            <div className="col-md-6">
              <p className="display-6">
                “At GADZCONNECT, we’re redefining the way businesses manage
                their logistics operations. Say goodbye to the complexities and
                inefficiencies of traditional logistics processes- and hello to
                a world of seamless connectivity, real-time visibility, and
                unparalleled efficiency.
              </p>
            </div>
            <div className="col-md-6">
              <img src={Logistics} style={{ width: "100%" }} alt="Logistics" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
