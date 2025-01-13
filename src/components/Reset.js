import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending email...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Reset;