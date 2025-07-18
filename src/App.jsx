import React, { useState } from "react";
import TodoItem from "./components/TodoItem";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos,{ id: Date.now(), text: task, completed: false },]);
      setTask("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

      <div className="flex w-full max-w-md">
        <input
          className="flex-grow px-4 py-2 border rounded-l-md"
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md mt-6">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggleComplete} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default App;
