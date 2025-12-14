import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

const API_URL = "http://localhost:8081/todos";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

   useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task })
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTask("");
  };
 
  const toggleTodo = async (todo) => {
    const res = await fetch(`${API_URL}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: todo.text,
        completed: !todo.completed
      })
    });

    const updated = await res.json();
    setTodos(todos.map(t => (t._id === updated._id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method:"DELETE" });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="input-box"><input value={task} onChange={(e) => setTask(e.target.value)}  placeholder="Enter task" />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
