import React from "react";

const ReactCourse = ({ onBack }) => {
  return (
    <div>
      <h1>React Course</h1>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ReactCourse;