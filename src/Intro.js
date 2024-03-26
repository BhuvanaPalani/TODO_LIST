import './Intro.css'; 

function Intro({ onStart }) {
  return (
    <div className="intro-container">
      <h1>TO-DO LIST</h1>
      <p>Welcome to Your To-Do List.
        Here you can organize your tasks and increase your productivity.</p>
      <button className="start-button" onClick={onStart}>Click Here to Log In</button>
    </div>
  );
}

export default Intro;
