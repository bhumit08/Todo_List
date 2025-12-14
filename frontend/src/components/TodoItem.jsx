import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className="todo-item">
    <span
      onClick={() => onToggle(todo)}
      className={todo.completed ? "done" : ""}
    >
      {todo.text}
    </span>
    <button onClick={() => onDelete(todo._id)}>❌</button>
  </li>
);

export default TodoItem;
