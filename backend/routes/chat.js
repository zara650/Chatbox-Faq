const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat/query   — send a question, get best matching FAQ answer
router.post('/query', chatController.query);

module.exports = router;
