// src/components/TaskForm.js - Task Input Form Component

import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  // State for form inputs
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Call parent function to add task
    onAddTask({
      taskName: taskName.trim(),
      description: description.trim(),
    });

    // Clear form fields
    setTaskName('');
    setDescription('');
    setErrors({});
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="taskName">Task Name *</label>
        <input
          type="text"
          id="taskName"
          className={`form-input ${errors.taskName ? 'input-error' : ''}`}
          placeholder="Enter task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          maxLength={100}
        />
        {errors.taskName && <span className="error-message">{errors.taskName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Enter task description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={500}
        />
      </div>

      <button type="submit" className="btn-add">
        ➕ Add Task
      </button>
    </form>
  );
};

export default TaskForm;
