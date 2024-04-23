import React from "react";
import PropTypes from "prop-types";

const Input = ({
  value,
  id,
  className,
  placeholder,
  name,
  type,
  handleInputChange,
}) => {
  return (
    <div>
      <input
        type={type}
        className={className}
        id={id}
        // rows={rows}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  // onChange: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  // row: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // rows: PropTypes.string.isRequired,
};

export default Input;
