// src/components/TaskList.js - Task List Container Component

import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onDeleteTask, onCompleteTask, onEditTask }) => {
  // Separate completed and incomplete tasks
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-list-container">
      {/* Incomplete Tasks Section */}
      {incompleteTasks.length > 0 && (
        <div className="task-section">
          <h2 className="section-title">
            📋 Active Tasks ({incompleteTasks.length})
          </h2>
          <div className="task-list">
            {incompleteTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={onDeleteTask}
                onComplete={onCompleteTask}
                onEdit={onEditTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="task-section">
          <h2 className="section-title">
            ✅ Completed Tasks ({completedTasks.length})
          </h2>
          <div className="task-list">
            {completedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={onDeleteTask}
                onComplete={onCompleteTask}
                onEdit={onEditTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
