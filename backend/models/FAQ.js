const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question:        { type: String, required: true, trim: true },
  answer:          { type: String, required: true, trim: true },
  category:        { type: String, default: 'General' },
  askCount:        { type: Number, default: 0 },
  helpfulCount:    { type: Number, default: 0 },
  notHelpfulCount: { type: Number, default: 0 },
  createdAt:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('FAQ', faqSchema);