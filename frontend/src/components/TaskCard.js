// src/components/TaskCard.js - Individual Task Card Component

import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onDelete, onComplete, onEdit }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.taskName);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (!editName.trim()) {
      return;
    }
    onEdit(task._id, {
      taskName: editName.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(task.taskName);
    setEditDescription(task.description || '');
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        {isEditing ? (
          <>
            <input
              type="text"
              className="edit-input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Task name"
              maxLength={100}
            />
            <textarea
              className="edit-textarea"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
              maxLength={500}
            />
          </>
        ) : (
          <>
            <h3 className="task-name">{task.taskName}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <span className="task-date">📅 {formatDate(task.createdAt)}</span>
          </>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn-action btn-save" onClick={handleSave}>
              💾 Save
            </button>
            <button className="btn-action btn-cancel" onClick={handleCancel}>
              ✖️ Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={`btn-action btn-complete ${task.completed ? 'completed' : ''}`}
              onClick={() => onComplete(task._id)}
              title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed ? '↩️ Undo' : '✓'}
            </button>
            <button
              className="btn-action btn-edit"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              ✏️
            </button>
            <button
              className="btn-action btn-delete"
              onClick={() => onDelete(task._id)}
              title="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
