import React from "react";
// import {Link} from 'react-router-dom';
// import LiveChat from '../../components/LiveChat/LiveChat';
// import Comments from '../../components/Comments/Comments';
// import { useSelector } from 'react-redux';
import Truck from "./images/truck.png";
import Logistics from "./images/logistics.png";
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
        <div>It's A New World</div>
        <div style={{ textAlign: "center" }}>
          <div className="row">
            <div className="col-md-12">
              <img
                src="https://placehold.co/600x400/gray/white"
                style={{ width: "100%" }}
                alt=""
              />

              <h1 className="jumbotron display-4">What We Offer?</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="jumbotron display-4">We are Global</h1>
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
