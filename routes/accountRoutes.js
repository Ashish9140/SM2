const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

// Route for message authorization check
router.post('/sendtext', accountController.handleMessageRequest);

module.exports = router;
