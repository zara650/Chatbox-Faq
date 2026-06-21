const { faqs, analytics } = require('../data/store');

const STOP_WORDS = new Set([
  'a','an','the','is','are','do','does','how','what','when','where','why',
  'can','i','my','me','you','your','we','it','this','that','to','of','in',
  'on','for','and','or','be','have','with','was','will','if','also','get',
  'got','did','has'
]);

const CAT_RELATED = {
  Account:   ['Account', 'Technical'],
  Orders:    ['Orders', 'Shipping'],
  Shipping:  ['Shipping', 'Orders'],
  Payments:  ['Payments', 'Orders'],
  Technical: ['Technical', 'Account'],
  General:   ['General'],
};

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

function cosineSimilarity(a, b) {
  const all = [...new Set([...a, ...b])];
  const va = all.map(w => a.filter(x => x === w).length);
  const vb = all.map(w => b.filter(x => x === w).length);
  const dot = va.reduce((s, v, i) => s + v * vb[i], 0);
  const na = Math.sqrt(va.reduce((s, v) => s + v * v, 0));
  const nb = Math.sqrt(vb.reduce((s, v) => s + v * v, 0));
  return na && nb ? dot / (na * nb) : 0;
}

function findBestMatch(query, context = []) {
  const qt_raw = tokenize(query);

  // Only use context expansion for genuine short follow-ups (<=2 tokens)
  // e.g. "how long?" or "and refunds?" — NOT full questions
  const isFollowUp = qt_raw.length <= 1 && context.length > 0;
  const qt = isFollowUp
    ? tokenize(context[context.length - 1].q + ' ' + query)
    : qt_raw;

  const lastCat = context.length > 0 ? context[context.length - 1].cat : null;

  const scores = faqs.map((f, i) => {
    let score = cosineSimilarity(qt, tokenize(f.q + ' ' + f.a));
    // Category boost only applies to genuine follow-up queries
    if (isFollowUp && lastCat && CAT_RELATED[lastCat]?.includes(f.cat)) {
      score += 0.08;
    }
    return { i, score };
  });

  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];
  const matched = best.score > 0.1;

  if (!matched) {
    return {
      matched: false,
      answer: "I couldn't find a good match for your question. Try rephrasing or browse the suggestions.",
      confidence: best.score,
      suggestions: faqs.slice(0, 4).map(f => ({ id: f.id, q: f.q })),
      ctxUsed: false,
      cat: null,
      faqId: null,
    };
  }

  const matchedFaq = faqs[best.i];
  matchedFaq.asks++;

  analytics.total++;
  analytics.matched++;
  analytics.confScores.push(Math.round(best.score * 100));
  analytics.topQ[matchedFaq.q] = (analytics.topQ[matchedFaq.q] || 0) + 1;

  const relCats = CAT_RELATED[matchedFaq.cat] || ['General'];
  const suggestions = faqs
    .filter((f, i) => i !== best.i && relCats.includes(f.cat))
    .slice(0, 3)
    .map(f => ({ id: f.id, q: f.q }));

  return {
    matched: true,
    answer: matchedFaq.a,
    confidence: Math.round(best.score * 100),
    faqId: matchedFaq.id,
    faqQ: matchedFaq.q,
    cat: matchedFaq.cat,
    suggestions,
    ctxUsed: isFollowUp,
  };
}

// POST /api/chat/query
exports.query = (req, res) => {
  const { question, context = [] } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ success: false, message: '`question` is required' });
  }

  const result = findBestMatch(question.trim(), context);
  if (!result.matched) {
    analytics.total++;
    analytics.unmatched++;
  }

  res.json({ success: true, data: result });
};
