// controllers/taskController.js - Business logic for Task operations

const Task = require('../models/Task');

/**
 * GET /tasks
 * Fetch all tasks from the database
 */
const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks, sorted by creation date (newest first)
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message,
    });
  }
};

/**
 * POST /tasks
 * Create a new task
 */
const createTask = async (req, res) => {
  try {
    const { taskName, description } = req.body;

    // Validate required fields
    if (!taskName || taskName.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task name is required',
      });
    }

    // Create new task
    const newTask = new Task({
      taskName: taskName.trim(),
      description: description ? description.trim() : '',
      completed: false,
    });

    // Save to database
    await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message,
    });
  }
};

/**
 * DELETE /tasks/:id
 * Delete a task by ID
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message,
    });
  }
};

/**
 * PUT /tasks/:id
 * Mark a task as completed or update its status
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, taskName, description } = req.body;

    // Build update object with provided fields
    const updateData = {};
    if (completed !== undefined) updateData.completed = completed;
    if (taskName !== undefined) updateData.taskName = taskName.trim();
    if (description !== undefined) updateData.description = description.trim();

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
