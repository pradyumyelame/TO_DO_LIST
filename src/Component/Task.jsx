import React from 'react';

const Task = ({ task, deleteTask }) => {
  return (
    <div className="task">
      <div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      <button onClick={() => deleteTask(task.id)}>-</button>
    </div>
  );
};

export default Task;
