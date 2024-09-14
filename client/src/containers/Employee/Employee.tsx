import React from 'react'
import { Link } from "react-router-dom";


function Employee() {
  return (
    <div>
      <>
      <h1>Employee</h1>
      <Link to="/CallCenter">Call Center</Link>
      <br />
      <Link to="/ClockIn">Clock In</Link>
      <br />
      <Link to="/Meets">Meets</Link>
      <br />
      <Link to="/SKPConsole">SKP Console</Link>
      <br />
      <Link to="/Tickets">All Users</Link>
    </>
    </div>
  )
}

export default Employee
