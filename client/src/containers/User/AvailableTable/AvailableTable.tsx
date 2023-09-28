import React from "react";
import { Link } from "react-router-dom";

const AvailableTable = () => {
  return (
    <>
      <div>AvailableTable/ Load Board</div>
      <h5>
        This is where we can see the Load Board and click on a company to to
        business with or add to cart.
      </h5>
      <Link to="/UserProfile">UserProfile</Link>
      <br />
    </>
  );
};

export default AvailableTable;
