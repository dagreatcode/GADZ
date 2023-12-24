import React from 'react'
import {Link} from 'react-router-dom'

const UserProfile = () => {
  return (
    <>
      <div>UserProfile</div>
      {/* 
      * First an Last Name
      * Customer since
      * Type of Owner
      * Available Status
      * All Services Available
      * Add Business Button to save
      * Locations      
      * * Message Customer
      */}
       <Link to="/MessageUser">Message user</Link><br/>
    </>
  )
}

export default UserProfile