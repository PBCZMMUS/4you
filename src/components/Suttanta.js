import React, { useState, useEffect } from 'react';
import './Suttanta.css';

const SuttantaPage = () => {
  const [expandedTitles, setExpandedTitles] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [notes, setNotes] = useState({}); // Store notes for all texts

  const coursesData = [
    {
      title: "Course 1",
      subTitles: [
        { id: 1, title: "Introduction", content: "This is the introduction of Course 1" },
        { id: 2, title: "Chapter 1", content: "This is the first chapter of Course 1" },
        { id: 3, title: "Chapter 2", content: "This is the second chapter of Course 1" },
      ]
    },
    {
      title: "Course 2",
      subTitles: [
        { id: 4, title: "Introduction", content: "This is the introduction of Course 2" },
        { id: 5, title: "Chapter 1", content: "This is the first chapter of Course 2" },
        { id: 6, title: "Chapter 2", content: "This is the second chapter of Course 2" },
      ]
    },
  ];

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const toggleTitle = (title) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleSection = (courseId, sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [`${courseId}-${sectionId}`]: !prev[`${courseId}-${sectionId}`],
    }));
  };

  const handleNoteChange = (id, newNote) => {
    setNotes((prev) => {
      const updatedNotes = { ...prev, [id]: newNote };
      localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save to localStorage
      return updatedNotes;
    });
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => {
      const updatedNotes = { ...prev };
      delete updatedNotes[id];
      localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save to localStorage
      return updatedNotes;
    });
  };

  const handleTextClick = (id) => {
    const note = prompt("Add or edit your note:");
    if (note !== null) {
      handleNoteChange(id, note);
    }
  };

  return (
    <div className="suttanta-page">
      <aside className="course-sidebar">
        {coursesData.map((course, courseIndex) => (
          <div key={courseIndex} className="course">
            <div className="course-title" onClick={() => toggleTitle(course.title)}>
              <h3>{course.title}</h3>
            </div>
            {expandedTitles[course.title] && (
              <div className="course-subtitles">
                {course.subTitles.map((subTitle) => (
                  <div
                    key={subTitle.id}
                    className="course-subtitle"
                    onClick={() => toggleSection(courseIndex, subTitle.id)}
                  >
                    <p>{subTitle.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      <main className="course-content">
        {coursesData.map((course, courseIndex) => (
          <div key={courseIndex}>
            {course.subTitles.map((subTitle) => (
              <div
                key={subTitle.id}
                className={`section-content ${expandedSections[`${courseIndex}-${subTitle.id}`] ? 'expanded' : ''}`}
              >
                {expandedSections[`${courseIndex}-${subTitle.id}`] && (
                  <p>
                    {subTitle.content.split(" ").map((word, index) => {
                      const wordId = `${subTitle.id}-${index}`;
                      return (
                        <span
                          key={wordId}
                          className="text-with-tooltip"
                          onClick={() => handleTextClick(wordId)}
                        >
                          {word}{" "}
                          {notes[wordId] && (
                            <div className="tooltip">
                              <p>{notes[wordId]}</p>
                              {/* <button
                                className="delete-note"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteNote(wordId);
                                }}
                              >
                                X
                              </button> */}
                            </div>
                          )}
                        </span>
                      );
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
};

export default SuttantaPage;