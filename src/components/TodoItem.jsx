import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="bg-white flex justify-between items-center px-4 py-2 mb-2 rounded shadow">
      <span onClick={() => onToggle(todo.id)} className={`flex-grow cursor-pointer ${todo.completed ? "line-through text-gray-500" : "" }`} >{todo.text} </span>
      <button onClick={() => onDelete(todo.id)} className="ml-4 text-red-500 hover:text-red-700" >
        ❌
      </button>
    </li>
  );
};

export default TodoItem;
