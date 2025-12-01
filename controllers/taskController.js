const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

// POST /tasks - Új feladat létrehozása
router.post('/', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const newTask = await taskService.createTask(title, description, userId);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
});

// GET /tasks - Összes feladat lekérdezése
router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Hiba a feladatok lekérdezésekor.' });
  }
});

// GET /tasks/page/:page - Feladatok lekérdezése lapozással (max 10)
router.get('/page/:page', async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10);
    const result = await taskService.getTasksByPage(page);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
});

// DELETE /tasks/:id - Feladat törlése ID alapján
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
});

module.exports = router;
