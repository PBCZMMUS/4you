import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Forgot Password</h1>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;