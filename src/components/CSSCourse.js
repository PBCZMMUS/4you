import React from "react";

const CSSCourse = ({ onBack }) => {
  return (
    <div>
      <h1>CSS Course</h1>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default CSSCourse;