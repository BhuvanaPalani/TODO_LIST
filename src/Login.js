import { useState } from 'react';
import './FormStyles.css'; 

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="form-button" onClick={() => onLogin(username, password)}>Login</button>
        <p className="form-switch">Don't have an account? <span onClick={onShowRegister}>Register here</span>.</p>
      </div>
    </div>
  );
}

export default Login;
