// src/components/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to MyApp</h1>
        <p>Your one-stop solution for media, entertainment, and more!</p>
        <button>Explore Now</button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Audio Player</h3>
          <p>Listen to your favorite tracks and create playlists.</p>
        </div>
        <div className="feature-card">
          <h3>Video Player</h3>
          <p>Watch your favorite videos in HD.</p>
        </div>
        <div className="feature-card">
          <h3>Admin Panel</h3>
          <p>Manage your content with ease.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;