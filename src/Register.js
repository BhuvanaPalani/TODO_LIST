import { useState } from 'react';
import './FormStyles.css'; 

function Register({ onRegister, onShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 

  const isValidUsername = (username) => {
    return /^[a-zA-Z0-9]+$/.test(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    
    setError('');

    if (!isValidUsername(username)) {
      setError('Invalid username. Only letters and numbers are allowed.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    
    onRegister(username, password, confirmPassword);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Register</h2>
        {error && <div className="form-error">{error}</div>}
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a Username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="form-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button className="form-button" onClick={handleRegister}>Register</button>
        <p className="form-switch">Already have an account? <span onClick={onShowLogin}>Login here</span>.</p>
      </div>
    </div>
  );
}

export default Register;
