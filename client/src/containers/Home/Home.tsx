import React from 'react'
import {Link} from 'react-router-dom';
import LiveChat from '../../components/LiveChat/LiveChat'

const Home = () => {

  return (
    <>
      <div>Home</div>
      <Link to="/Admin">Admin Pages After login</Link><br/>
      <Link to="/User">User Pages After Login</Link>
      <LiveChat />
    </>
  )
}

export default Home