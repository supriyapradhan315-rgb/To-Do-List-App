/* eslint-disable react-hooks/exhaustive-deps */

// src/pages/TodoList.js - Main To-Do List Page

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Message from '../components/Message';
import './TodoList.css';

const TodoList = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);

  // Backend API URL
  const API_URL =
    process.env.REACT_APP_API_URL ||
    'https://to-do-list-app-vhva.onrender.com';

  const TASKS_ENDPOINT = `${API_URL}/api/tasks`;

  // Function to show messages
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(TASKS_ENDPOINT);

      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showMessage('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(TASKS_ENDPOINT, {
        taskName: taskData.taskName,
        description: taskData.description,
      });

      if (response.data.success) {
        setTasks([response.data.data, ...tasks]);
        showMessage('Task added successfully!', 'success');
      } else {
        showMessage(response.data.message || 'Failed to add task', 'error');
      }
    } catch (error) {
      console.error('Error adding task:', error);

      const backendMessage =
        error.response?.data?.message || 'Failed to add task';

      showMessage(backendMessage, 'error');
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `${TASKS_ENDPOINT}/${taskId}`
      );

      if (response.data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));

        showMessage('Task deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      showMessage('Failed to delete task', 'error');
    }
  };

  // Complete task
  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);

      const response = await axios.put(
        `${TASKS_ENDPOINT}/${taskId}`,
        {
          completed: !task.completed,
        }
      );

      if (response.data.success) {
        setTasks(
          tasks.map((t) =>
            t._id === taskId ? response.data.data : t
          )
        );

        showMessage(
          response.data.data.completed
            ? 'Task marked as completed!'
            : 'Task marked as incomplete!',
          'success'
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
      showMessage('Failed to update task', 'error');
    }
  };

  // Edit task
  const handleEditTask = async (taskId, updateData) => {
    try {
      const response = await axios.put(
        `${TASKS_ENDPOINT}/${taskId}`,
        updateData
      );

      if (response.data.success) {
        setTasks(
          tasks.map((t) =>
            t._id === taskId ? response.data.data : t
          )
        );

        showMessage('Task updated successfully!', 'success');
      } else {
        showMessage(
          response.data.message || 'Failed to update task',
          'error'
        );
      }
    } catch (error) {
      console.error('Error editing task:', error);

      const backendMessage =
        error.response?.data?.message || 'Failed to update task';

      showMessage(backendMessage, 'error');
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <h1 className="todo-title">📝 My To-Do List</h1>

        {/* Messages */}
        {message && (
          <Message text={message} type={messageType} />
        )}

        {/* Add Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Task List */}
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
            onEditTask={handleEditTask}
          />
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="no-tasks">
            <p>No tasks yet. Add one to get started! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;