import React from 'react';
import './SocialLinks.css';

const SocialLinks = ({ socialLinks = [] }) => { // Set a default value for socialLinks
  return (
    <div className="social-links-page">
      <h3>My Social Links</h3>

      <div className="social-links-cards">
        {socialLinks.length > 0 ? (
          socialLinks.map((link, index) => (
            <div key={index} className="social-card">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
          ))
        ) : (
          <p>No social links added yet!</p>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;