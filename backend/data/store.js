// In-memory data store (replace with a real DB like MongoDB/PostgreSQL in production)

let faqs = [
  { id: '1', q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Contact support to initiate a return.', cat: 'Orders', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '2', q: 'How do I reset my password?', a: "Go to the login page and click \"Forgot Password\". Enter your registered email — we'll send a reset link within 2 minutes.", cat: 'Account', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '3', q: 'What if I forgot my email too?', a: "Contact our support team with your registered phone number or order ID for identity verification and we'll help you recover access.", cat: 'Account', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '4', q: 'What payment methods do you accept?', a: 'We accept Visa, MasterCard, American Express, PayPal, UPI, and net banking. All transactions are SSL-encrypted.', cat: 'Payments', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '5', q: 'How long does shipping take?', a: 'Standard shipping: 5–7 business days. Express shipping (1–2 days) is available at checkout for an additional fee.', cat: 'Shipping', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '6', q: 'Can I track my order?', a: "Yes! Once your order ships you'll receive a tracking number via email. Also check \"My Orders\" in your account dashboard.", cat: 'Orders', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '7', q: 'How do I contact customer support?', a: 'Live chat (Mon–Fri 9am–6pm), email support@example.com, or call +1-800-555-0199.', cat: 'General', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '8', q: 'Is my personal data safe?', a: 'Yes. We comply with GDPR & CCPA. Your data is encrypted at rest and in transit and is never sold to third parties.', cat: 'Technical', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '9', q: 'Do you offer student discounts?', a: 'Yes! Students get 20% off with a valid .edu email. Apply code STUDENT20 at checkout after email verification.', cat: 'General', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '10', q: 'How do I cancel my order?', a: "Orders can be cancelled within 1 hour of placement via \"My Orders\". After that, contact support — we'll do our best to help.", cat: 'Orders', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
  { id: '11', q: 'What is the refund timeline?', a: 'Refund timeline: Refunds and money back process within 5–7 business days after we receive the return. Credit card refunds may take an additional 2–3 days.', cat: 'Payments', asks: 0, helpful: 0, notHelpful: 0, createdAt: new Date().toISOString() },
];

let analytics = {
  total: 0,
  matched: 0,
  unmatched: 0,
  confScores: [],
  topQ: {},
  feedbackTotal: 0,
  feedbackHelpful: 0,
  sessionStart: new Date().toISOString(),
};

module.exports = { faqs, analytics };
