const express = require('express');
const router  = express.Router();
const axios   = require('axios');
const FAQ     = require('../models/FAQ');

const NLP_URL = process.env.NLP_SERVICE_URL || 'http://localhost:8000';
const feedbackStore = [];

const CAT_RELATED = {
  Account:  ['Account','Technical'],
  Orders:   ['Orders','Shipping'],
  Shipping: ['Shipping','Orders'],
  Payments: ['Payments','Orders'],
  Technical:['Technical','Account'],
  General:  ['General'],
};

const FALLBACK_FAQS = [
  { question:'What is your return policy?', answer:'We offer a 30-day hassle-free return policy.', category:'Orders' },
  { question:'How do I reset my password?', answer:'Click "Forgot Password" on the login page and enter your email.', category:'Account' },
  { question:'What if I forgot my email too?', answer:'Contact support with your phone number or order ID.', category:'Account' },
  { question:'What payment methods do you accept?', answer:'Visa, MasterCard, PayPal, UPI, and net banking.', category:'Payments' },
  { question:'How long does shipping take?', answer:'Standard: 5-7 days. Express: 1-2 days.', category:'Shipping' },
  { question:'Can I track my order?', answer:'Yes! You will receive a tracking number via email after shipping.', category:'Orders' },
  { question:'How do I contact customer support?', answer:'Email support@example.com or call +1-800-555-0199.', category:'General' },
  { question:'Is my personal data safe?', answer:'Yes. We comply with GDPR & CCPA. Your data is encrypted.', category:'Technical' },
  { question:'Do you offer student discounts?', answer:'20% off with a valid .edu email. Use code STUDENT20.', category:'General' },
  { question:'How do I cancel my order?', answer:'Cancel within 1 hour via "My Orders". After that, contact support.', category:'Orders' },
  { question:'What is the refund timeline?', answer:'Refunds process within 5-7 business days.', category:'Payments' },
];

// POST /api/chat
router.post('/', async (req, res) => {
  const { query, context = [] } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: 'Query is required.' });

  let faqs = FALLBACK_FAQS;
  try {
    const dbFaqs = await FAQ.find().select('question answer category');
    if (dbFaqs.length > 0) faqs = dbFaqs;
  } catch {}

  const wordCount = query.trim().split(/\s+/).length;
  let enrichedQuery = query;
  if (wordCount <= 5 && context.length > 0) {
    enrichedQuery = `${context[context.length-1].question} ${query}`;
  }
  const lastCategory = context.length > 0 ? context[context.length-1].category : null;

  try {
    const nlpRes = await axios.post(`${NLP_URL}/match`, {
      query: enrichedQuery,
      faqs: faqs.map(f => ({ question: f.question, answer: f.answer }))
    }, { timeout: 5000 });

    const { best_match, confidence, suggestions } = nlpRes.data;
    const matchedFaq = faqs.find(f => f.question === best_match.question);
    try { await FAQ.findOneAndUpdate({ question: best_match.question }, { $inc: { askCount: 1 } }); } catch {}

    return res.json({
      answer: best_match.answer, faq_question: best_match.question,
      category: matchedFaq?.category || 'General', confidence,
      matched: confidence > 0.1,
      suggestions: getContextualSuggestions(suggestions, lastCategory, faqs),
      context_used: wordCount <= 5 && context.length > 0,
    });
  } catch {
    const result = jsFallbackMatch(enrichedQuery, faqs, lastCategory);
    result.context_used = wordCount <= 5 && context.length > 0;
    return res.json(result);
  }
});

// POST /api/chat/feedback
router.post('/feedback', async (req, res) => {
  const { faq_question, helpful, query } = req.body;
  feedbackStore.push({ faq_question, helpful, query, timestamp: new Date() });
  try {
    if (helpful) await FAQ.findOneAndUpdate({ question: faq_question }, { $inc: { helpfulCount: 1 } });
    else         await FAQ.findOneAndUpdate({ question: faq_question }, { $inc: { notHelpfulCount: 1 } });
  } catch {}
  res.json({ success: true });
});

// GET /api/chat/feedback/stats
router.get('/feedback/stats', (req, res) => {
  const total   = feedbackStore.length;
  const helpful = feedbackStore.filter(f => f.helpful).length;
  res.json({ total, helpful, notHelpful: total - helpful, satisfactionRate: total ? Math.round((helpful/total)*100) : 0 });
});

// GET /api/chat/suggestions
router.get('/suggestions', async (req, res) => {
  let faqs = FALLBACK_FAQS;
  try {
    const db = await FAQ.find().select('question category askCount').sort({ askCount: -1 }).limit(6);
    if (db.length > 0) faqs = db;
  } catch {}
  res.json(faqs.slice(0,6).map(f => ({ question: f.question, category: f.category || 'General' })));
});

function getContextualSuggestions(nlpSugg, lastCat, faqs) {
  if (!lastCat) return nlpSugg || [];
  const related = CAT_RELATED[lastCat] || ['General'];
  const contextual = faqs.filter(f => related.includes(f.category || 'General')).slice(0,3).map(f => f.question);
  return [...new Set([...contextual, ...(nlpSugg || [])])].slice(0,4);
}

function tokenize(text) {
  const stop = new Set(['a','an','the','is','are','do','does','how','what','when','where','why','can','i','my','me','you','your','we','it','this','that','to','of','in','on','for','and','or','be','have','with','was','will','if','also']);
  return text.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(/\s+/).filter(w => w.length>1 && !stop.has(w));
}

function cosineSim(a, b) {
  const all = [...new Set([...a,...b])];
  const va = all.map(w => a.filter(x=>x===w).length);
  const vb = all.map(w => b.filter(x=>x===w).length);
  const dot = va.reduce((s,v,i)=>s+v*vb[i],0);
  const na  = Math.sqrt(va.reduce((s,v)=>s+v*v,0));
  const nb  = Math.sqrt(vb.reduce((s,v)=>s+v*v,0));
  return (na&&nb) ? dot/(na*nb) : 0;
}

function jsFallbackMatch(query, faqs, lastCat) {
  const qt = tokenize(query);
  const scores = faqs.map((f,i) => {
    let score = cosineSim(qt, tokenize(f.question+' '+f.answer));
    if (lastCat && (CAT_RELATED[lastCat]||[]).includes(f.category||'General')) score += 0.08;
    return { i, score };
  }).sort((a,b)=>b.score-a.score);

  const best = scores[0];
  if (best.score <= 0.1) return {
    answer: "I couldn't find a good match. Try rephrasing.",
    faq_question: null, category: null, confidence: best.score,
    matched: false, suggestions: faqs.slice(0,4).map(f=>f.question)
  };

  const relCats = CAT_RELATED[faqs[best.i]?.category||'General'] || ['General'];
  const suggestions = faqs.filter((_,i)=>i!==best.i && relCats.includes(faqs[i]?.category||'General')).slice(0,3).map(f=>f.question);

  return {
    answer: faqs[best.i].answer, faq_question: faqs[best.i].question,
    category: faqs[best.i].category || 'General',
    confidence: best.score, matched: true, suggestions
  };
}

module.exports = router;

