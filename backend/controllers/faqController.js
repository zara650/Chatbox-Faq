const { faqs, analytics } = require('../data/store');
const { nanoid } = require('../utils/nanoid');

// GET /api/faqs
exports.getAll = (req, res) => {
  const { search = '', cat = '' } = req.query;
  let result = faqs;

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(f =>
      f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s)
    );
  }

  if (cat) {
    result = result.filter(f => f.cat === cat);
  }

  res.json({ success: true, count: result.length, data: result });
};

// GET /api/faqs/:id
exports.getOne = (req, res) => {
  const faq = faqs.find(f => f.id === req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
  res.json({ success: true, data: faq });
};

// POST /api/faqs
exports.create = (req, res) => {
  const { q, a, cat = 'General' } = req.body;
  const newFaq = {
    id: nanoid(),
    q,
    a,
    cat,
    asks: 0,
    helpful: 0,
    notHelpful: 0,
    createdAt: new Date().toISOString(),
  };
  faqs.push(newFaq);
  res.status(201).json({ success: true, data: newFaq });
};

// PUT /api/faqs/:id
exports.update = (req, res) => {
  const idx = faqs.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'FAQ not found' });

  const { q, a, cat } = req.body;
  if (q) faqs[idx].q = q;
  if (a) faqs[idx].a = a;
  if (cat) faqs[idx].cat = cat;
  faqs[idx].updatedAt = new Date().toISOString();

  res.json({ success: true, data: faqs[idx] });
};

// DELETE /api/faqs/:id
exports.remove = (req, res) => {
  const idx = faqs.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'FAQ not found' });
  faqs.splice(idx, 1);
  res.json({ success: true, message: 'FAQ deleted' });
};

// POST /api/faqs/:id/feedback
exports.feedback = (req, res) => {
  const { helpful } = req.body;
  if (typeof helpful !== 'boolean') {
    return res.status(400).json({ success: false, message: '`helpful` (boolean) is required' });
  }

  const faq = faqs.find(f => f.id === req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });

  analytics.feedbackTotal++;
  if (helpful) {
    faq.helpful++;
    analytics.feedbackHelpful++;
  } else {
    faq.notHelpful++;
  }

  res.json({ success: true, data: { helpful: faq.helpful, notHelpful: faq.notHelpful } });
};
