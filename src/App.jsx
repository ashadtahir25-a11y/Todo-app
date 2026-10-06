import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("University");

  // Naya task add karna
  const addTask = () => {
    if (input.trim() === "") return; // khali input allow nahi
    const newTask = {
      id: Date.now(),
      text: input,
      category: category,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput(""); // input box clear karo
  };

  // Task ko complete/incomplete mark karna
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Task delete karna
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      <div className="category-section">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="University">University</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Naya task likho..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && <p className="empty-msg">Koi task nahi hai</p>}
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div className="task-left" onClick={() => toggleTask(task.id)}>
              <span className="category-badge">{task.category}</span>
              <span className="task-text">{task.text}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;