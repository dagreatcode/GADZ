import React from 'react'
import {Link} from 'react-router-dom'

const AllUsers = () => {
  return (
    <>
      <div>AllUsers</div>
      <h1>These links are to make sure we can navigate to all of the pages created through out the site. </h1>
      <h5> I will create a login  with authorization and authentication for Admin's and User's momentarily</h5>
     <Link to="/AdminUserProfile">Click to edit single user, change information, approve business to use the site + credit, or archive user.</Link><br/><br/>
     <a href="https://gadzconnect.com/api/user/view">Users API. This is Raw Data coming from the database. This will be user to apply all Users Information to the page for the admin edit user or freeze user or even archive."</a>        
    </>
  )
}

export default AllUsers