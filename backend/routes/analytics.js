const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET  /api/analytics         — get all analytics data
router.get('/', analyticsController.getAll);

// POST /api/analytics/reset   — reset session analytics
router.post('/reset', analyticsController.reset);

module.exports = router;
