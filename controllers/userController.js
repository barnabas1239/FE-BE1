const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// POST /users - Új felhasználó létrehozása
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    const newUser = await userService.createUser(email, name);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
});

// POST /users/register - Új felhasználó regisztrációja
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await userService.register(email, password, name);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
});

// GET /users - Összes felhasználó lekérdezése
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Hiba a felhasználók lekérdezésekor.' });
  }
});

// DELETE /users/:id - Felhasználó és a hozzá tartozó feladatok törlése
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
});

module.exports = router;
