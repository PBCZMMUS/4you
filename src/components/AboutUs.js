// src/components/AboutAndContact.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './AboutUs.css';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        'service_z9tkmvr',  // Replace with your service ID
        'template_q5q471f',  // Replace with your template ID
        formData,
        'WT0GOYrL9HnDKvLUf'      // Replace with your user ID (from EmailJS)
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
          setSuccessMessage('Your message has been sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('Failed to send email:', error);
          setErrorMessage('There was an error sending your message. Please try again later.');
        }
      );
  };

  return (
    <div className="about-contact-page">
      {/* About Section */}
      <div className="about">
        <h1>About MyApp</h1>
        <p>MyApp is a comprehensive platform designed for all your media needs, including video and audio playback, content management, and more.</p>

        <section className="team">
          <div className="team-member">
            <img src="/images/nerdNote.png" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="/images/git.png" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AboutUs;