import React from "react";

const JavaScriptCourse = ({ onBack }) => {
  return (
    <div>
      <h1>JavaScript Course</h1>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default JavaScriptCourse;