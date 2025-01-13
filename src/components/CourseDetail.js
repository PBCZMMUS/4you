import React from "react";
import HTMLCourse from "./HTMLCourse";
import CSSCourse from "./CSSCourse";
import JavaScriptCourse from "./JavaScriptCourse";
import ReactCourse from "./ReactCourse";

const CourseDetail = ({ currentCourse, onBack }) => {
  switch (currentCourse) {
    case "HTML":
      return <HTMLCourse onBack={onBack} />;
    case "CSS":
      return <CSSCourse onBack={onBack} />;
    case "JavaScript":
      return <JavaScriptCourse onBack={onBack} />;
    case "React":
      return <ReactCourse onBack={onBack} />;
    default:
      return null;
  }
};

export default CourseDetail;