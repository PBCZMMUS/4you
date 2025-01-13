import React, { useState } from 'react';
import './Quiz.css';

const quizQuestions = [
  {
    type: 'multipleChoice',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    correctAnswer: '4'
  },
  {
    type: 'checkbox',
    question: 'Which are programming languages?',
    options: ['JavaScript', 'HTML', 'CSS', 'Python'],
    correctAnswers: ['JavaScript', 'Python']
  },
  {
    type: 'multipleChoice',
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin'],
    correctAnswer: 'Paris'
  }
];

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState({});

  // Handle answer change
  const handleAnswerChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAnswers((prev) => ({
        ...prev,
        [name]: checked ? [...(prev[name] || []), value] : prev[name].filter(item => item !== value),
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let totalScore = 0;
    quizQuestions.forEach((question, index) => {
      if (question.type === 'multipleChoice' && answers[`question-${index}`] === question.correctAnswer) {
        totalScore++;
      } else if (question.type === 'checkbox' && answers[`question-${index}`]?.sort().join(',') === question.correctAnswers.sort().join(',')) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizFinished(true);
  };

  // Send email function (mocked for demo purposes)
  const sendResults = () => {
    console.log(`Sending results to: ${userEmail}`);
    console.log(`Score: ${score}`);
    // Logic to send results via email (use Nodemailer or an API)
  };

  return (
    <div className="quiz-app">
      <aside className="sidebar">
        <button className="toggle-btn">Toggle Sidebar</button>
        <div className="course-list">
          <div className="course-item">
            <h3>Course 1</h3>
            <p>Intro to Programming</p>
          </div>
          <div className="course-item">
            <h3>Course 2</h3>
            <p>Advanced JavaScript</p>
          </div>
          <div className="course-item">
            <h3>Course 3</h3>
            <p>Web Development Fundamentals</p>
          </div>
        </div>
      </aside>

      <main className="quiz-main">
        <h2>Quiz Time</h2>
        {!quizFinished ? (
          <div className="quiz-container">
            <label>
              Enter your name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </label>
            {quizQuestions.map((question, index) => (
              <div key={index} className="quiz-question">
                <p>{question.question}</p>
                {question.type === 'multipleChoice' &&
                  question.options.map((option, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(e, index)}
                      />
                      {option}
                    </label>
                  ))
                }
                {question.type === 'checkbox' &&
                  question.options.map((option, i) => (
                    <label key={i}>
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(e, index)}
                      />
                      {option}
                    </label>
                  ))
                }
              </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
          </div>
        ) : (
          <div className="result-container">
            <h3>Congratulations, {userName}!</h3>
            <p>Your score: {score}</p>
            <label>
              Enter your email:
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </label>
            <button onClick={sendResults}>Send Results</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;