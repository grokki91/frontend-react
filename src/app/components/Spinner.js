import React from "react";

const Spinner = ({className}) => {
  return (
    <div className={`spinner-overlay flex-center ${className}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
