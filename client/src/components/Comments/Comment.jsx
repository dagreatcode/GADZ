import React from "react";
import PropTypes from "prop-types";

export default function Comment({ image, title, comment }) {
  return (
    <>
      <h3>{title}</h3>
      <img
        src={image}
        alt="blog comment"
        width="350"
        // height="350"
        className="d-inline-block align-text-top"
      />
      <p>{comment}</p>
      <br />
    </>
  );
}

Comment.propTypes = {
  // _id: PropTypes.number.isRequired,
  // userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

//rfcp//
