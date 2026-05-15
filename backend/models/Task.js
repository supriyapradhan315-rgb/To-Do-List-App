// models/Task.js - MongoDB Schema and Model for Tasks

const mongoose = require('mongoose');

// Define the Task Schema
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Please provide a task name'],
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds updatedAt field automatically
  }
);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
