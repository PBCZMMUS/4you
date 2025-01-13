// src/components/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1>About MyApp</h1>
      <p>MyApp is a comprehensive platform designed for all your media needs, including video and audio playback, content management, and more.</p>

      <section className="team">
        <div className="team-member">
          <img src="https://via.placeholder.com/200" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/200" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>CTO</p>
        </div>
      </section>
    </div>
  );
};

export default About;