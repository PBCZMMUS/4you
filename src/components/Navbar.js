import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Navbar.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img id="nav-logo" src="./images/pass.png" alt="plant-icon" />
        <h1 id='text-logo'>4u</h1>
      </div>
      {user ? (
        <>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/vinaya-page">Vinaya</Link>
            <Link to="/suttanta-page">Suttanta</Link>
            <Link to="/abhidhamma-page">Abhidhamma</Link>
            <Link to="/pali-page">Pali</Link>
            <Link to="/courses-page">Courses</Link>
            {/* <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link> */}
            <Link to="/about-contact-page">AboutUs</Link>
          </div>
          <div className="navbar-action">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <div className="navbar-action">
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;