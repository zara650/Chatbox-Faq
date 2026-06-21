const { faqs, analytics } = require('../data/store');

// GET /api/analytics
exports.getAll = (req, res) => {
  const { total, matched, unmatched, confScores, topQ, feedbackTotal, feedbackHelpful, sessionStart } = analytics;

  const avgConf = confScores.length
    ? Math.round(confScores.reduce((a, b) => a + b, 0) / confScores.length)
    : 0;

  const matchRate = total ? Math.round((matched / total) * 100) : 0;
  const satisfRate = feedbackTotal ? Math.round((feedbackHelpful / feedbackTotal) * 100) : 0;

  const topQuestions = Object.entries(topQ)
    .map(([q, count]) => ({ q, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const faqPerformance = faqs.map(f => ({
    id: f.id,
    q: f.q,
    cat: f.cat,
    asks: f.asks,
    helpful: f.helpful,
    notHelpful: f.notHelpful,
    satisfRate: (f.helpful + f.notHelpful) > 0
      ? Math.round((f.helpful / (f.helpful + f.notHelpful)) * 100)
      : null,
  }));

  res.json({
    success: true,
    data: {
      summary: { total, matched, unmatched, matchRate, avgConf, feedbackTotal, feedbackHelpful, satisfRate },
      topQuestions,
      faqPerformance,
      sessionStart,
    },
  });
};

// POST /api/analytics/reset
exports.reset = (req, res) => {
  analytics.total = 0;
  analytics.matched = 0;
  analytics.unmatched = 0;
  analytics.confScores = [];
  analytics.topQ = {};
  analytics.feedbackTotal = 0;
  analytics.feedbackHelpful = 0;
  analytics.sessionStart = new Date().toISOString();
  res.json({ success: true, message: 'Analytics reset' });
};
