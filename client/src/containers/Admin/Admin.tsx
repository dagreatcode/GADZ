import React from "react";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

const Admin = () => {
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>Admin</div>
      <div>
        <div style={{ textAlign: "center" }}>B2B Messages</div>
        <Link to="/B2BMessages" style={{ display: "flex", justifyContent: "center" }}><Icon.ChatText width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Dash Board</div>
        <Link to="/Dash" style={{ display: "flex", justifyContent: "center" }}><Icon.Speedometer width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Print Out</div>
        <Link to="/PrintOut" style={{ display: "flex", justifyContent: "center" }}><Icon.PrinterFill width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>User IT Tickets</div>
        <Link to="/TicketsCreated" style={{ display: "flex", justifyContent: "center" }}><Icon.TicketDetailed width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>All Users</div>
        <Link to="/AdminAllUsers" style={{ display: "flex", justifyContent: "center" }}><Icon.PeopleFill width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Agreements</div>
        <Link to="/Agreements" style={{ display: "flex", justifyContent: "center" }}><Icon.EmojiHeartEyes width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
    </>
  );
};

export default Admin;
