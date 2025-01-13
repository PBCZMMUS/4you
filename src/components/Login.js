import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load saved email from localStorage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setLoading(false);
        setError('Please verify your email before logging in.');
        return;
      }

      // Save email to localStorage on successful login
      localStorage.setItem('userEmail', email);

      setLoading(false);
      navigate('/home'); // Redirect after login
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {error && <p>{error}</p>}

      {/* Register Link */}
      <div className="auth-links">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>

      {/* Forgot Password Link */}
      <div className="auth-links">
        <p><a href="/reset">Forgot Password?</a></p>
      </div>
    </div>
  );
};

export default Login;