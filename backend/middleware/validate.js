const VALID_CATS = ['General', 'Account', 'Orders', 'Payments', 'Shipping', 'Technical'];

exports.validateFaq = (req, res, next) => {
  const { q, a, cat } = req.body;

  const errors = [];

  if (!q || typeof q !== 'string' || !q.trim()) {
    errors.push('`q` (question) is required and must be a non-empty string');
  }

  if (!a || typeof a !== 'string' || !a.trim()) {
    errors.push('`a` (answer) is required and must be a non-empty string');
  }

  if (cat && !VALID_CATS.includes(cat)) {
    errors.push(`\`cat\` must be one of: ${VALID_CATS.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};
