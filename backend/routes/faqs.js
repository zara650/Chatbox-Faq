const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const { validateFaq } = require('../middleware/validate');

// GET  /api/faqs          — list all FAQs (supports ?search=, ?cat=)
router.get('/', faqController.getAll);

// GET  /api/faqs/:id      — get single FAQ
router.get('/:id', faqController.getOne);

// POST /api/faqs          — create FAQ
router.post('/', validateFaq, faqController.create);

// PUT  /api/faqs/:id      — update FAQ
router.put('/:id', validateFaq, faqController.update);

// DELETE /api/faqs/:id   — delete FAQ
router.delete('/:id', faqController.remove);

// POST /api/faqs/:id/feedback  — submit helpful/not-helpful
router.post('/:id/feedback', faqController.feedback);

module.exports = router;
