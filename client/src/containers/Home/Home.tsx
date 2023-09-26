import React from 'react'
import {Link} from 'react-router-dom';
import LiveChat from '../../components/LiveChat/LiveChat';
import Comments from '../../components/Comments/Comments';
// import { useSelector } from 'react-redux';

const Home = () => {
  // const comments = useSelector((state) => state.comments);
  return (
    <div className="container">
    <div className="row">
      <div>Home</div>
      <Link to="/Admin">Admin Pages After login</Link><br/>
      <Link to="/User">User Pages After Login</Link>
      <LiveChat />
      {/* <Comments comments={comments} title="🥳Show All Comments Here✒️" /> */}
    </div>
    </div>
  );
}

export default Home