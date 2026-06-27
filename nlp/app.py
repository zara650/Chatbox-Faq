"""
FAQ NLP Service — Flask + NLTK
Endpoints:
  GET  /health       — health check
  POST /match        — match query to best FAQ
  POST /preprocess   — debug tokenization
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk, math, re
from collections import Counter

# Download NLTK data on first run
for pkg in ['punkt', 'stopwords', 'wordnet', 'punkt_tab']:
    try: nltk.download(pkg, quiet=True)
    except: pass

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)

lemmatizer = WordNetLemmatizer()
STOPWORDS  = set(stopwords.words('english'))


# ── NLP Pipeline ─────────────────────────────────────────────────────────────

def preprocess(text: str) -> list:
    """
    Full NLP pipeline:
    1. Lowercase
    2. Remove special characters
    3. Tokenize (NLTK)
    4. Remove stopwords
    5. Lemmatize
    """
    text   = text.lower()
    text   = re.sub(r'[^a-z0-9\s]', '', text)
    tokens = word_tokenize(text)
    tokens = [t for t in tokens if t not in STOPWORDS and len(t) > 1]
    tokens = [lemmatizer.lemmatize(t) for t in tokens]
    return tokens


def build_tf(tokens: list) -> dict:
    """Term frequency vector."""
    freq  = Counter(tokens)
    total = len(tokens) if tokens else 1
    return {w: c/total for w, c in freq.items()}


def cosine_similarity(tf_a: dict, tf_b: dict) -> float:
    """Cosine similarity between two TF vectors."""
    all_words = set(tf_a) | set(tf_b)
    va = [tf_a.get(w, 0) for w in all_words]
    vb = [tf_b.get(w, 0) for w in all_words]
    dot    = sum(a*b for a, b in zip(va, vb))
    norm_a = math.sqrt(sum(a*a for a in va))
    norm_b = math.sqrt(sum(b*b for b in vb))
    return dot / (norm_a * norm_b) if norm_a and norm_b else 0.0


def find_best_match(query: str, faqs: list):
    """Match query to best FAQ using cosine similarity."""
    qt   = preprocess(query)
    tf_q = build_tf(qt)

    scored = []
    for faq in faqs:
        faq_tokens = preprocess(faq['question'] + ' ' + faq['answer'])
        tf_f       = build_tf(faq_tokens)
        score      = cosine_similarity(tf_q, tf_f)
        scored.append((faq, score))

    scored.sort(key=lambda x: x[1], reverse=True)
    best_faq, best_score = scored[0]
    suggestions = [f['question'] for f, _ in scored[1:4]]

    return best_faq, best_score, suggestions


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route('/health', methods=['GET'])
def health():
    return jsonify({ 'status': 'ok', 'service': 'FAQ NLP Service — NLTK' })


@app.route('/match', methods=['POST'])
def match():
    """
    Body: { "query": "...", "faqs": [{"question": "...", "answer": "..."}, ...] }
    Returns: { "best_match": {...}, "confidence": 0.82, "matched": true, "suggestions": [...] }
    """
    data  = request.get_json()
    query = data.get('query', '').strip()
    faqs  = data.get('faqs', [])

    if not query: return jsonify({ 'error': 'query is required' }), 400
    if not faqs:  return jsonify({ 'error': 'faqs list is required' }), 400

    best, score, suggestions = find_best_match(query, faqs)
    matched = score > 0.1

    if not matched:
        return jsonify({
            'best_match': { 'question': '', 'answer': "I couldn't find a good match. Try rephrasing your question." },
            'confidence': round(score, 4), 'matched': False, 'suggestions': suggestions
        })

    return jsonify({
        'best_match': best,
        'confidence': round(score, 4),
        'matched': True,
        'suggestions': suggestions
    })


@app.route('/preprocess', methods=['POST'])
def preprocess_route():
    """Debug: see how text gets tokenized."""
    data   = request.get_json()
    text   = data.get('text', '')
    tokens = preprocess(text)
    return jsonify({ 'original': text, 'tokens': tokens })


if __name__ == '__main__':
    print("🐍 FAQ NLP Service starting on http://localhost:8000")
    app.run(host='0.0.0.0', port=8000, debug=True)
