require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const morgan   = require('morgan');

const faqRoutes  = require('./routes/faqs');
const chatRoutes = require('./routes/chat');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/faqs', faqRoutes);
app.use('/api/chat', chatRoutes);
app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.warn('⚠️  MongoDB not available:', err.message);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} (no DB)`));
  });