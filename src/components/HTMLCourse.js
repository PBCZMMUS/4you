import React from "react";

const HTMLCourse = ({ onBack }) => {
  const courseData = {
    title: "HTML Course",
    description: "Learn the basics of HTML and build beautiful web pages.",
    subTitles: [
      { id: 1, title: "Introduction", content: "This is the introduction of HTML course" },
      { id: 2, title: "Chapter 1", content: "This is the first chapter of HTML" },
      { id: 3, title: "Chapter 2", content: "This is the second chapter of HTML" },
    ],
  };

  return (
    <div className="course-detail">
      <h1 className="course-title">{courseData.title}</h1>
      <p>{courseData.description}</p>
      <div className="course-content">
        {courseData.subTitles.map((subTitle) => (
          <div key={subTitle.id}>
            <h4>{subTitle.title}</h4>
            <p>{subTitle.content}</p>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="back-to-main-button">
        Back to Main
      </button>
    </div>
  );
};

export default HTMLCourse;