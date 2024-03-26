import { useState, useEffect } from 'react';
import './App.css';
import Intro from './Intro';
import Login from './Login';
import Register from './Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(currentUser + '_tasks')) || []);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter] = useState('all');

  useEffect(() => {
    if (currentUser) {
      const savedTasks = JSON.parse(localStorage.getItem(currentUser + '_tasks')) || [];
      setTasks(savedTasks);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(currentUser + '_tasks', JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  const handleLogin = (username) => {
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      setCurrentUser(username);
      setIsLoggedIn(true);
      setShowIntro(false);
      setShowRegister(false);
      const userTasks = JSON.parse(localStorage.getItem(username + '_tasks')) || [];
      setTasks(userTasks);
    } else {
      alert('Username not found. Please register.');
      setShowRegister(true);
    }
  };

  const handleRegister = (username, password) => {
    const isValid = /^[a-zA-Z0-9]+$/.test(username);
    if (!isValid) {
      alert('Invalid username. Only letters and numbers are allowed.');
      return;
    }
    const userExists = users.some(user => user.username === username);
    if (!userExists) {
      const newUser = { username, password };
      setUsers([...users, newUser]);
      setCurrentUser(username);
      setIsLoggedIn(true);
      setShowIntro(false);
      setShowRegister(false);
    } else {
      alert('Username already exists. Please login.');
      setShowRegister(false);
    }
  };

  const handleStart = () => {
    setShowIntro(false);
  };

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleEditChange = (e) => {
    setEditInput(e.target.value);
  };

  const saveTask = () => {
    setTasks(tasks.map((task) => (task.id === taskToEdit.id ? { ...task, text: editInput } : task)));
    setTaskToEdit(null);
    setEditInput('');
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setEditInput(task.text);
  };

  
  if (showIntro) {
    return <Intro onStart={handleStart} />;
  }

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
    );
  }

  
  return (
    <div className="App">
      <header className="header">
        <h1> To-Do List</h1>
        <p>Hi {currentUser}, here you can manage your tasks below:</p>
      </header>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="New Todo:"
        />
        <button onClick={addTask}>Add</button>
      </div>
      {taskToEdit && (
        <div className="edit-input-container">
          <input
            value={editInput}
            onChange={handleEditChange}
            placeholder="Edit:"
          />
          <button onClick={saveTask}>Save</button>
        </div>
      )}
      <ul className="task-list">
        {tasks.filter(task => {
          if (filter === 'completed') return task.completed;
          if (filter === 'active') return !task.completed;
          return true;
        }).map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span>{task.text}</span>
            <button className="task-btn edit-icon" onClick={() => editTask(task)}>✏️</button> 
            <button className="task-btn delete-icon" onClick={() => deleteTask(task.id)}>🗑️</button> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
