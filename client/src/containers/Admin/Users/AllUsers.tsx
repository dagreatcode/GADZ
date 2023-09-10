import React from 'react'
import {Link} from 'react-router-dom'

const AllUsers = () => {
  return (
    <>
      <div>AllUsers</div>
     <Link to="/AdminUserProfile">Click to edit single user, change information, approve business to use the site + credit, or archive user.</Link><br/><br/>
     <a href="https://gadzconnect.com/api/user/AllUsers">Users API. This is Raw Data coming from the database. This will be user to apply tho this page for the admin to adit user or freeze user."</a>        
    </>
  )
}

export default AllUsers