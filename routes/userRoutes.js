const express = require('express');
const { addUser } = require('../controllers/userController');
const { validateUser } = require('../validators/userValidator');

const router = express.Router();

// POST route to add a user with validation middleware
router.post('/addUser', addUser);

module.exports = router;
