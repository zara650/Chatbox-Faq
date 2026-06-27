const express = require('express');
const router  = express.Router();
const FAQ     = require('../models/FAQ');

const SEED_FAQS = [
  { question:'What is your return policy?', answer:'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging.', category:'Orders' },
  { question:'How do I reset my password?', answer:'Go to the login page and click "Forgot Password". Enter your email — we\'ll send a reset link within 2 minutes.', category:'Account' },
  { question:'What if I forgot my email too?', answer:'Contact our support team with your registered phone number or order ID for identity verification.', category:'Account' },
  { question:'What payment methods do you accept?', answer:'We accept Visa, MasterCard, American Express, PayPal, UPI, and net banking. All transactions are SSL-encrypted.', category:'Payments' },
  { question:'How long does shipping take?', answer:'Standard: 5–7 business days. Express: 1–2 days (extra fee).', category:'Shipping' },
  { question:'Can I track my order?', answer:'Yes! Once your order ships you\'ll receive a tracking number via email.', category:'Orders' },
  { question:'How do I contact customer support?', answer:'Live chat (Mon–Fri 9am–6pm), email support@example.com, or call +1-800-555-0199.', category:'General' },
  { question:'Is my personal data safe?', answer:'Yes. We comply with GDPR & CCPA. Your data is encrypted and never sold.', category:'Technical' },
  { question:'Do you offer student discounts?', answer:'Yes! 20% off with a valid .edu email. Use code STUDENT20 at checkout.', category:'General' },
  { question:'How do I cancel my order?', answer:'Orders can be cancelled within 1 hour via "My Orders". After that, contact support.', category:'Orders' },
  { question:'What is the refund timeline?', answer:'Refunds process within 5–7 business days after we receive the return.', category:'Payments' },
];

// GET all FAQs
router.get('/', async (req, res) => {
  try {
    let faqs = await FAQ.find().sort({ createdAt: -1 });
    if (faqs.length === 0) {
      await FAQ.insertMany(SEED_FAQS);
      faqs = await FAQ.find();
    }
    res.json(faqs);
  } catch { res.json(SEED_FAQS); }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faq);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;