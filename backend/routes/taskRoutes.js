// routes/taskRoutes.js - API Routes for Task operations

const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');

/**
 * GET /tasks
 * Fetch all tasks
 */
router.get('/', getAllTasks);

/**
 * POST /tasks
 * Create a new task
 */
router.post('/', createTask);

/**
 * DELETE /tasks/:id
 * Delete a task by ID
 */
router.delete('/:id', deleteTask);

/**
 * PUT /tasks/:id
 * Update a task (mark as completed or update details)
 */
router.put('/:id', updateTask);

module.exports = router;
