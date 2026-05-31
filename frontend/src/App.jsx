import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error("Failed to load tasks");
      setTasks(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      setTitle("");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTask(id, completed) {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) throw new Error("Failed to update task");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>DevOps Task App</h1>
        <p>3-tier app: React + Node.js + MongoDB</p>
      </header>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading tasks...</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id, task.completed)}
              />
              <span>{task.title}</span>
            </label>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {!loading && tasks.length === 0 && (
        <p className="empty">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}
