import React from "react";
import Snake from "./Snake";
// import PropTypes from 'prop-types'

const NotFound = () => {
  return (
    <>
      <div>Page Not Found, Let's Play Snake until you find your page.</div>
      <Snake /> {/* Include the Snake game */}
    </>
  );
};

// NotFound.propTypes = {}

export default NotFound;
