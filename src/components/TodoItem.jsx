import React from 'react';

function TodoItem({ todo, toggleTodo }) {
  const { id, task, completed } = todo;

  const handleToClick = () => {
    toggleTodo(id);
  };

  return (
    <li>
      <input
        className="form-check-input"
        type="checkbox"
        cheked={completed}
        onChange={handleToClick}
      />{' '}
      {task}
    </li>
  );
}

export default TodoItem;
