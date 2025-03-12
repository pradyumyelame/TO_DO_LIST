import React, { useState, useEffect } from 'react';
import Task from './Task';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and Description can't be empty!");
      return;
    }

    const newTask = { id: Date.now(), title, description };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save immediately


    setTitle('');
    setDescription('');
  };


  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated list
    }
  };

  return (
    <div className="container">
      <h1>DAILY GOALS</h1>
      <form onSubmit={submitHandler} className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">ADD</button>
      </form>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task.id} task={task} deleteTask={deleteTask} />
          ))
        ) : (
          <p>No tasks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
