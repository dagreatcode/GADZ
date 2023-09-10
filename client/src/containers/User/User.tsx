import React from 'react'
import {Link} from 'react-router-dom'

const User = () => {
  return (
    <>
      <div>User</div>
      <Link to="/AvailableTable">Available Table</Link><br/>
      <Link to="/Checkout">Checkout</Link><br/>
      <Link to="/CreateTicket">Create Ticket</Link><br/>
      <Link to="/Profile">Profile</Link><br/>
      <Link to="/UserDash">UserDash</Link><br/>
    </>
  )
}

export default User