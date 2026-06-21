# FAQ.ai API Reference

Base URL: `http://localhost:3001/api`

---

## Health

### GET /health
```json
{ "status": "ok", "timestamp": "2026-05-28T10:00:00.000Z" }
```

---

## FAQs

### GET /faqs
Query params: `search` (string), `cat` (Account|Orders|Shipping|Payments|Technical|General)

**Response**
```json
{
  "success": true,
  "count": 11,
  "data": [
    { "id": "1", "q": "What is your return policy?", "a": "...", "cat": "Orders", "asks": 0, "helpful": 0, "notHelpful": 0 }
  ]
}
```

---

### POST /faqs
**Body**
```json
{ "q": "Your question?", "a": "Your answer.", "cat": "General" }
```
**Response** `201`
```json
{ "success": true, "data": { "id": "abc123", "q": "...", ... } }
```

---

### PUT /faqs/:id
**Body** (all optional)
```json
{ "q": "Updated question?", "a": "Updated answer.", "cat": "Technical" }
```

---

### DELETE /faqs/:id
```json
{ "success": true, "message": "FAQ deleted" }
```

---

### POST /faqs/:id/feedback
**Body**
```json
{ "helpful": true }
```
**Response**
```json
{ "success": true, "data": { "helpful": 3, "notHelpful": 1 } }
```

---

## Chat

### POST /chat/query
**Body**
```json
{
  "question": "how do i return something",
  "context": [
    { "q": "What is your return policy?", "a": "We offer...", "cat": "Orders" }
  ]
}
```
**Response (matched)**
```json
{
  "success": true,
  "data": {
    "matched": true,
    "answer": "We offer a 30-day hassle-free return policy...",
    "confidence": 87,
    "faqId": "1",
    "faqQ": "What is your return policy?",
    "cat": "Orders",
    "ctxUsed": false,
    "suggestions": [
      { "id": "6", "q": "Can I track my order?" }
    ]
  }
}
```
**Response (no match)**
```json
{
  "success": true,
  "data": {
    "matched": false,
    "answer": "I couldn't find a good match...",
    "confidence": 0.04,
    "suggestions": [{ "id": "1", "q": "What is your return policy?" }]
  }
}
```

---

## Analytics

### GET /analytics
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 42, "matched": 38, "unmatched": 4,
      "matchRate": 90, "avgConf": 74,
      "feedbackTotal": 20, "feedbackHelpful": 17, "satisfRate": 85
    },
    "topQuestions": [
      { "q": "What is your return policy?", "count": 8 }
    ],
    "faqPerformance": [
      { "id": "1", "q": "...", "cat": "Orders", "asks": 8, "helpful": 5, "notHelpful": 1, "satisfRate": 83 }
    ],
    "sessionStart": "2026-05-28T10:00:00.000Z"
  }
}
```

### POST /analytics/reset
```json
{ "success": true, "message": "Analytics reset" }
```
