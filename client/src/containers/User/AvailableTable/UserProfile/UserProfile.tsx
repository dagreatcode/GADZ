import React from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  // TODO: Add the api call to pull selected user profile

  // FIXME: Fix this page to seem like its loading until the user profile data comes in.

  return (
    <>
      <div>UserProfile</div>
      <h1>Available Status</h1>
      <h1>Images</h1>
      <h1>First an Last Name</h1>
      <h1>Customer since</h1>
      <h1>Type of Owner</h1>
      <h1>All Services Available</h1>
      <h1>Add Business Button to save</h1>
      <h1>Locations</h1>
      <h1> Message Customer</h1>
      <Link to="/MessageUser">Message user</Link>
      <br />
    </>
  );
};

export default UserProfile;
