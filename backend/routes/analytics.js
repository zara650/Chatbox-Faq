const express = require('express');
const router  = express.Router();
const FAQ     = require('../models/FAQ');

// GET /api/analytics/summary
router.get('/summary', async (req, res) => {
  try {
    const faqs = await FAQ.find().select('question askCount helpfulCount notHelpfulCount category');
    
    const totalAsks    = faqs.reduce((sum, f) => sum + (f.askCount || 0), 0);
    const totalHelpful = faqs.reduce((sum, f) => sum + (f.helpfulCount || 0), 0);
    const totalNotHelp = faqs.reduce((sum, f) => sum + (f.notHelpfulCount || 0), 0);
    const totalFeedback = totalHelpful + totalNotHelp;

    const topFaqs = [...faqs]
      .sort((a, b) => (b.askCount || 0) - (a.askCount || 0))
      .slice(0, 6)
      .map(f => ({ question: f.question, count: f.askCount || 0, category: f.category }));

    const byCategory = faqs.reduce((acc, f) => {
      const cat = f.category || 'General';
      acc[cat] = (acc[cat] || 0) + (f.askCount || 0);
      return acc;
    }, {});

    res.json({
      totalAsks,
      totalFaqs: faqs.length,
      totalFeedback,
      totalHelpful,
      totalNotHelpful: totalNotHelp,
      satisfactionRate: totalFeedback ? Math.round((totalHelpful / totalFeedback) * 100) : 0,
      topFaqs,
      byCategory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics/top-faqs
router.get('/top-faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find()
      .select('question askCount category')
      .sort({ askCount: -1 })
      .limit(10);
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
