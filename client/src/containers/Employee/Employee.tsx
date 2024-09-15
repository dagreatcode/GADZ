import React from 'react'
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

function Employee() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <>
      <h1>Employee</h1>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Call Center</div>
        <Link to="/CallCenter" style={{ display: "flex", justifyContent: "center" }}><Icon.TelephonePlusFill width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Clock In</div>
        <Link to="/ClockIn" style={{ display: "flex", justifyContent: "center" }}><Icon.StopwatchFill width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Meets</div>
        <Link to="/Meets" style={{ display: "flex", justifyContent: "center" }}><Icon.PersonSquare width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>SKP Console</div>
        <Link to="/SKPConsole" style={{ display: "flex", justifyContent: "center" }}><Icon.PcDisplayHorizontal width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Tickets</div>
        <Link to="/Tickets" style={{ display: "flex", justifyContent: "center" }}><Icon.TicketFill width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>News Letter</div>
        <Link to="/NewsLetter" style={{ display: "flex", justifyContent: "center" }}><Icon.Newspaper width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Off Days</div>
        <Link to="/CallOffDaysCenter" style={{ display: "flex", justifyContent: "center" }}><Icon.Calendar3 width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div style={{ textAlign: "center" }}>Employee Profile</div>
        <Link to="/EmployeeProfile" style={{ display: "flex", justifyContent: "center" }}><Icon.PersonBadge width="82" height="82" fill="#5F9DF7" /></Link>
      </div>
    </>
    </div>
  )
}

export default Employee
