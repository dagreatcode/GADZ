import React from 'react'
import {Link} from 'react-router-dom';
import LiveChat from '../../components/LiveChat/LiveChat'
// import { useSelector } from 'react-redux';

const Home = () => {
  // const myPosts = useSelector((state) => state.myArticles);
  return (
    <>
      <div>Home</div>
      <Link to="/Admin">Admin Pages After login</Link><br/>
      <Link to="/User">User Pages After Login</Link>
      <LiveChat />
      {/* <Posts posts={myPosts} title="🥳New Post Every Week✒️" /> */}
    </>
  )
}

export default Home