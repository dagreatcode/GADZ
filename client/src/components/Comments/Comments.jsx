import React from "react";
import PropTypes from "prop-types";
import Comment from "Comment";

export default function Comments({ comments, title }) {
  return (
    <>
      <div className="col-12" style={{ textAlign: "center" }}>
        <h1>{title}</h1>
        {comments.map((comment) => (
          <Comment {...comment} key={comment._id} />
        ))}
      </div>
    </>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};