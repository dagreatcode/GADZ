import React from 'react'
import {Link} from 'react-router-dom'

const AllUsers = () => {
  return (
    <>
      <div>AllUsers</div>
     <Link to="/AdminUserProfile">Click to edit single user, change information, approve business to user the site + credit, or archive user.</Link><br/>
    </>
  )
}

export default AllUsers