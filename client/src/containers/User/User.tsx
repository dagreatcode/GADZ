import React from "react";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

const User = () => {
  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>

      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>AvailableTable</div>
        <Link to="/AvailableTable" style={{ display: "flex", justifyContent: "center" }}><Icon.Table width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Checkout</div>
        <Link to="/Checkout" style={{ display: "flex", justifyContent: "center" }}><Icon.Cart width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>CreateTicket</div>
        <Link to="/CreateTicket" style={{ display: "flex", justifyContent: "center" }}><Icon.TicketPerforatedFill width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>Profile</div>
      <br />
      <Link to="/Profile" style={{ display: "flex", justifyContent: "center" }}><Icon.PersonBadge style={{}} width="82" height="82" fill="#5F9DF7" /></Link>
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>UserDash</div>
      <br />
      <Link to="/UserDash" style={{ display: "flex", justifyContent: "center" }}><Icon.Speedometer2 width="82" height="82" fill="#5F9DF7" /></Link>
      <br />
      <br />
      <br />
    </>
  );
};

export default User;
