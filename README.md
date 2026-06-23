<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=13&duration=3000&pause=1500&color=3B82F6&center=true&vCenter=true&width=600&lines=INITIALIZING+FAQ.AI+CORE...;LOADING+NLP+ENGINE...;CONNECTING+KNOWLEDGE+BASE...;CONTEXT+MEMORY+ONLINE...;SYSTEM+READY" alt="boot sequence" />

<br/>

<!-- FAQ.ai Logo — GitHub compatible -->
<img src="https://img.shields.io/badge/🤖_FAQ.ai-Intelligent_Support-3B82F6?style=for-the-badge&labelColor=0F172A" height="50"/>

<br/>

<img src="https://capsule-render.vercel.app/api?type=circle&color=0f172a,1e293b,3b82f6&height=150&text=FAQ.ai&fontColor=60a5fa&fontSize=36&fontAlignY=50&animation=fadeIn&desc=AI%20Chatbot&descAlignY=68&descSize=14&descColor=93c5fd" />

<br/>

# FAQ.ai — AI-Powered FAQ Chatbot Dashboard

**Production-level intelligent FAQ chatbot with context awareness, NLP matching,**  
**real-time feedback system, and analytics dashboard.**

<br/>

<!-- Tech stack badges -->
<img src="https://img.shields.io/badge/HTML5-Standalone-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-Poppins_Theme-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-Vanilla_ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/NLP-Cosine_Similarity-3B82F6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiMzYjgyZjYiIHJ4PSI0Ii8+PC9zdmc+&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-Flask_NLP-3776AB?style=for-the-badge&logo=python&logoColor=white"/>

<br/><br/>

<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/Context_Aware-Memory_System-8B5CF6?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Feedback_System-Analytics-10B981?style=for-the-badge"/>

<br/>

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [NLP Pipeline](#nlp-pipeline)
- [Context Awareness System](#context-awareness-system)
- [Feedback System](#feedback-system)
- [Analytics Dashboard](#analytics-dashboard)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [API Reference](#api-reference)
- [FAQ Dataset](#faq-dataset)
- [Screenshots](#screenshots)

---

## Project Overview

FAQ.ai is a production-level intelligent FAQ chatbot dashboard built as **Task 2** of the CodeAlpha AI Internship. It goes far beyond a basic chatbot — featuring NLP-powered matching, conversation context memory, smart pre-type suggestions, user feedback collection, and a full analytics dashboard.

```mermaid
mindmap
  root((FAQ.ai))
    Chat Engine
      NLP Preprocessing
      Cosine Similarity
      Context Memory
      Typing Animation
      Confidence Scores
    Smart UI
      Dark Blue Theme
      Poppins Font
      Category Tags
      Chat Bubbles
      Suggestions Chips
    FAQ Manager
      Add / Edit / Delete
      Category Filter
      Search
      Feedback Stats
    Analytics
      Match Rate Bar
      Satisfaction Score
      Top FAQs Chart
      Pie Breakdowns
    Backend
      Node.js Express
      MongoDB
      Python Flask
      NLTK NLP
```

---

## System Architecture

```mermaid
graph TB
    subgraph CLIENT["FRONTEND — React + Tailwind"]
        direction TB
        CHAT["ChatPage\nConversation UI"]
        FAQ["FAQManagerPage\nCRUD Interface"]
        ANA["AnalyticsPage\nRecharts Dashboards"]
        SIDE["Sidebar\nNavigation + History"]
        CHAT --> SIDE
        FAQ --> SIDE
        ANA --> SIDE
    end

    subgraph NODE["BACKEND — Node.js + Express"]
        direction TB
        CHATRT["POST /api/chat\nQuery Processing"]
        FAQRT["GET/POST/PUT/DELETE /api/faqs\nFAQ CRUD"]
        FBRT["POST /api/chat/feedback\nFeedback Store"]
        SUGG["GET /api/chat/suggestions\nPre-type Chips"]
        DB[("MongoDB\nFAQ Collection")]
        CHATRT --> DB
        FAQRT --> DB
        FBRT --> DB
    end

    subgraph PYTHON["NLP SERVICE — Python Flask"]
        direction TB
        MATCH["POST /match\nBest FAQ Finder"]
        PRE["Preprocessing\nNLTK Pipeline"]
        TF["TF-IDF Vectors\nCosine Similarity"]
        MATCH --> PRE --> TF
    end

    CLIENT <-->|"axios REST"| NODE
    NODE <-->|"axios timeout 5s"| PYTHON
    NODE -->|"JS fallback if Python down"| NODE

    style CLIENT fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#e2e8f0
    style NODE fill:#1e3a1e,stroke:#22c55e,stroke-width:2px,color:#e2e8f0
    style PYTHON fill:#3b1f00,stroke:#f59e0b,stroke-width:2px,color:#e2e8f0
```

---

## Tech Stack

<div align="center">

<!-- Tech stack SVG cards -->
<svg width="760" height="90" viewBox="0 0 760 90" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="blue3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="green3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="yellow3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="purple3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="teal3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <filter id="card-shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- React -->
  <rect x="4" y="8" width="134" height="74" rx="10" fill="url(#cardBg)" filter="url(#card-shadow)" stroke="#1d4ed8" stroke-width="1"/>
  <circle cx="34" cy="35" r="14" fill="url(#blue3d)"/>
  <text x="34" y="40" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="white">Re</text>
  <text x="58" y="33" font-family="monospace" font-size="11" font-weight="700" fill="#60a5fa">React 18</text>
  <text x="58" y="48" font-family="monospace" font-size="9" fill="#64748b">Tailwind CSS</text>
  <text x="58" y="63" font-family="monospace" font-size="8" fill="#475569">Recharts</text>

  <!-- Node.js -->
  <rect x="148" y="8" width="134" height="74" rx="10" fill="url(#cardBg)" filter="url(#card-shadow)" stroke="#15803d" stroke-width="1"/>
  <circle cx="178" cy="35" r="14" fill="url(#green3d)"/>
  <text x="178" y="40" text-anchor="middle" font-family="monospace" font-size="9" font-weight="bold" fill="white">Nd</text>
  <text x="202" y="33" font-family="monospace" font-size="11" font-weight="700" fill="#4ade80">Node.js</text>
  <text x="202" y="48" font-family="monospace" font-size="9" fill="#64748b">Express 4.18</text>
  <text x="202" y="63" font-family="monospace" font-size="8" fill="#475569">REST API</text>

  <!-- Python -->
  <rect x="292" y="8" width="134" height="74" rx="10" fill="url(#cardBg)" filter="url(#card-shadow)" stroke="#d97706" stroke-width="1"/>
  <circle cx="322" cy="35" r="14" fill="url(#yellow3d)"/>
  <text x="322" y="40" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="white">Py</text>
  <text x="346" y="33" font-family="monospace" font-size="11" font-weight="700" fill="#fde68a">Python Flask</text>
  <text x="346" y="48" font-family="monospace" font-size="9" fill="#64748b">NLTK 3.8</text>
  <text x="346" y="63" font-family="monospace" font-size="8" fill="#475569">NLP Service</text>

  <!-- MongoDB -->
  <rect x="436" y="8" width="134" height="74" rx="10" fill="url(#cardBg)" filter="url(#card-shadow)" stroke="#6d28d9" stroke-width="1"/>
  <circle cx="466" cy="35" r="14" fill="url(#purple3d)"/>
  <text x="466" y="40" text-anchor="middle" font-family="monospace" font-size="9" font-weight="bold" fill="white">Mg</text>
  <text x="490" y="33" font-family="monospace" font-size="11" font-weight="700" fill="#c4b5fd">MongoDB</text>
  <text x="490" y="48" font-family="monospace" font-size="9" fill="#64748b">Mongoose 7</text>
  <text x="490" y="63" font-family="monospace" font-size="8" fill="#475569">FAQ Storage</text>

  <!-- NLTK NLP -->
  <rect x="580" y="8" width="176" height="74" rx="10" fill="url(#cardBg)" filter="url(#card-shadow)" stroke="#0e7490" stroke-width="1"/>
  <circle cx="610" cy="35" r="14" fill="url(#teal3d)"/>
  <text x="610" y="40" text-anchor="middle" font-family="monospace" font-size="9" font-weight="bold" fill="white">NLP</text>
  <text x="634" y="33" font-family="monospace" font-size="11" font-weight="700" fill="#67e8f9">Cosine Sim</text>
  <text x="634" y="48" font-family="monospace" font-size="9" fill="#64748b">TF-IDF Vectors</text>
  <text x="634" y="63" font-family="monospace" font-size="8" fill="#475569">Lemmatization</text>
</svg>

</div>

| Layer | Technology | Version | Purpose |
|:---:|:---|:---:|:---|
| 🎨 **Frontend** | React + Tailwind CSS | 18.2 | Dashboard UI, chat interface |
| 🟢 **Backend** | Node.js + Express | 4.18 | REST API, FAQ CRUD, routing |
| 🐍 **NLP Service** | Python + Flask + NLTK | 3.8 | Text preprocessing + matching |
| 🗄️ **Database** | MongoDB + Mongoose | 7.4 | FAQ storage, feedback, history |
| 📊 **Charts** | Recharts | 2.7 | Analytics visualizations |
| 🧠 **Algorithm** | TF-IDF Cosine Similarity | — | FAQ matching engine |
| ✍️ **Font** | Poppins | — | Professional typography |
| 🎭 **Animations** | Framer Motion | 10.x | Smooth UI transitions |

---

## Features

```mermaid
flowchart LR
    subgraph CHAT["💬 Chat Features"]
        C1["NLP Query Matching"]
        C2["Typing Animation"]
        C3["Confidence Score %"]
        C4["Category Tags"]
        C5["Context Memory\n(last 3 exchanges)"]
        C6["Fallback Response"]
    end

    subgraph SMART["✨ Smart Features"]
        S1["Pre-type Suggestion\nChips"]
        S2["Context-aware\nFollow-ups"]
        S3["Did you mean?\nSuggestions"]
        S4["Auto-enriched\nShort Queries"]
        S5["Category Boosting"]
    end

    subgraph MANAGE["📋 FAQ Manager"]
        M1["Add / Edit / Delete"]
        M2["Category Labels"]
        M3["Real-time Search"]
        M4["Ask Count Display"]
        M5["Feedback Stats"]
    end

    subgraph ANALYTICS["📊 Analytics"]
        A1["Match Rate Bar"]
        A2["Satisfaction Score"]
        A3["Top FAQs Chart"]
        A4["Match Pie Chart"]
        A5["Feedback Pie Chart"]
    end

    style CHAT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style SMART fill:#3b1f5e,stroke:#8b5cf6,color:#e2e8f0
    style MANAGE fill:#14532d,stroke:#22c55e,color:#e2e8f0
    style ANALYTICS fill:#451a03,stroke:#f59e0b,color:#e2e8f0
```

---

## NLP Pipeline

```mermaid
flowchart TD
    A(["User Query\n'how to reset my password?'"]) --> B

    subgraph PIPELINE["🐍 Python NLTK Pipeline"]
        B["① Lowercase\n'how to reset my password?'"]
        B --> C["② Remove Special Characters\n'how to reset my password'"]
        C --> D["③ NLTK word_tokenize\n['how','to','reset','my','password']"]
        D --> E["④ Remove Stopwords\n['reset','password']"]
        E --> F["⑤ Lemmatize\nWordNetLemmatizer\n['reset','password']"]
        F --> G["⑥ Build TF Vector\n{reset:0.5, password:0.5}"]
    end

    G --> H["Cosine Similarity\nvs all FAQs"]
    H --> I{"Score > 0.1?"}
    I -->|"Yes ✅"| J["Return Best Match\n+ Confidence %\n+ Suggestions"]
    I -->|"No ❌"| K["Fallback Response\n+ Did You Mean?"]

    style PIPELINE fill:#1a1200,stroke:#f59e0b,color:#fde68a
    style A fill:#1e3a5f,stroke:#3b82f6,color:#60a5fa
    style J fill:#14532d,stroke:#22c55e,color:#4ade80
    style K fill:#4c0519,stroke:#be123c,color:#fca5a5
```

### Algorithm Detail

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant N as Node.js
    participant P as Python Flask
    participant DB as MongoDB

    U->>N: POST /api/chat { query, context }
    N->>DB: GET all FAQs
    DB-->>N: FAQ list
    N->>P: POST /match { query, faqs } timeout 5s
    P->>P: NLTK preprocess(query)
    P->>P: Build TF vectors for all FAQs
    P->>P: Compute cosine similarity
    P-->>N: { best_match, confidence, suggestions }
    N->>DB: INCREMENT askCount for matched FAQ
    N-->>U: { answer, confidence, category,\nmatched, suggestions, context_used }
```

---

## Context Awareness System

```mermaid
stateDiagram-v2
    direction LR

    [*] --> Empty : App starts
    Empty --> Active : User sends first message
    Active --> Enriched : Follow-up ≤ 5 words
    Enriched --> Active : Next message
    Active --> Active : New full question
    Active --> Empty : User clears chat

    note right of Enriched
        Short query auto-merged with
        last FAQ question before matching.
        "What if I forgot email?" →
        "How do I reset my password?
        What if I forgot email?"
    end note

    note right of Active
        Last 3 exchanges stored in
        context array. Same-category
        FAQs get +0.08 score boost.
        ✨ badge shown on reply.
    end note
```

**Example conversation flow:**

```
User:  "How do I reset my password?"
Bot:   [Matches password reset FAQ — 87% confidence] ✅

User:  "What if I forgot email?"          ← only 5 words
Bot:   ✨ Context-aware reply
       [Enriched to "reset password + forgot email"]
       [Finds "What if I forgot my email too?" FAQ]
```

---

## Feedback System

```mermaid
flowchart LR
    A["Bot Response"] --> B["👍 Yes / 👎 No\nButtons appear"]
    B --> C{"User clicks"}
    C -->|"👍 Helpful"| D["feedbackHelpful++\nhelpfulCount in DB++\nGreen toast"]
    C -->|"👎 Not Helpful"| E["notHelpful++\nnotHelpfulCount in DB++\nAmber toast"]
    D --> F["Analytics Updated"]
    E --> F
    F --> G["Satisfaction %\nRecalculated"]
    G --> H["Dashboard\nLive Update"]

    style A fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style D fill:#14532d,stroke:#22c55e,color:#4ade80
    style E fill:#451a03,stroke:#d97706,color:#fde68a
    style H fill:#3b1f5e,stroke:#8b5cf6,color:#c4b5fd
```

---

## Analytics Dashboard

```mermaid
xychart-beta
    title "Sample FAQ Usage — Most Asked Topics"
    x-axis ["Password Reset", "Return Policy", "Shipping Time", "Payment Methods", "Order Tracking"]
    y-axis "Ask Count" 0 --> 20
    bar [18, 14, 12, 9, 7]
```

| Metric | Description | Visual |
|:---:|:---|:---:|
| 📈 **Total Queries** | All chat messages sent this session | Stat card |
| ✅ **Matched** | Queries with confidence > 10% | Stat card |
| ⚡ **Avg Confidence** | Mean cosine similarity score | Stat card |
| 😊 **Satisfaction** | % of 👍 feedback out of total | Stat card + bar |
| 📊 **Match Rate** | Matched / Total × 100 | Progress bar |
| 🏆 **Top FAQs** | Most asked questions | Horizontal bar chart |
| 🥧 **Match Pie** | Matched vs Unmatched | Mini pie |
| 💬 **Feedback Pie** | Helpful vs Not Helpful | Mini pie |

---

## File Structure

```
faq-chatbot/
│
├── 📄 README.md
│
├── 🎨 frontend/                    ← React + Tailwind
│   ├── package.json
│   ├── tailwind.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── index.css               ← Poppins + animations
│       ├── App.js                  ← Router + state management
│       ├── components/
│       │   └── Sidebar.js          ← Navigation + history
│       └── pages/
│           ├── ChatPage.js         ← Chat UI + context memory
│           ├── FAQManagerPage.js   ← CRUD interface
│           └── AnalyticsPage.js    ← Recharts dashboard
│
├── 🟢 backend/                     ← Node.js + Express
│   ├── package.json
│   ├── .env                        ← MONGO_URI, PORT, NLP_URL
│   ├── server.js                   ← Express app entry
│   ├── models/
│   │   └── FAQ.js                  ← Mongoose schema
│   └── routes/
│       ├── faqs.js                 ← GET/POST/PUT/DELETE /api/faqs
│       └── chat.js                 ← POST /api/chat + feedback
│
├── 🐍 nlp/                         ← Python Flask NLP
│   ├── requirements.txt
│   └── app.py                      ← NLTK pipeline + /match endpoint
│
└── 📦 faq-chatbot-standalone.html  ← Zero-setup demo (open in browser)
```

---

## Setup Instructions

### Option A — Standalone (Zero Setup)

```bash
# Just double-click this file — opens in any browser instantly
faq-chatbot-standalone.html
```

> ✅ No Node, no Python, no MongoDB needed. Full NLP runs in-browser via JS cosine similarity.

---

### Option B — Full Stack

#### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB (optional — fallback data used if unavailable)

#### Step 1 — Python NLP Service

```bash
cd nlp
pip install -r requirements.txt
python app.py
# → http://localhost:8000
```

#### Step 2 — Node.js Backend

```bash
cd backend
npm install

# Edit .env
MONGO_URI=mongodb://localhost:27017/faqchatbot
PORT=5000
NLP_SERVICE_URL=http://localhost:8000

npm run dev
# → http://localhost:5000
```

#### Step 3 — React Frontend

```bash
cd frontend
npm install
npm start
# → http://localhost:3000
```

---

## API Reference

```mermaid
graph LR
    subgraph FAQ["📋 FAQ Endpoints — Node.js :5000"]
        F1["GET /api/faqs\nAll FAQs"]
        F2["POST /api/faqs\nCreate FAQ"]
        F3["PUT /api/faqs/:id\nUpdate FAQ"]
        F4["DELETE /api/faqs/:id\nDelete FAQ"]
    end

    subgraph CHAT["💬 Chat Endpoints — Node.js :5000"]
        C1["POST /api/chat\n{ query, context[] }\n→ answer, confidence, suggestions"]
        C2["POST /api/chat/feedback\n{ faq_question, helpful, query }"]
        C3["GET /api/chat/feedback/stats\n→ satisfactionRate, byFaq"]
        C4["GET /api/chat/suggestions\n→ top 6 popular questions"]
    end

    subgraph NLP["🐍 NLP Endpoints — Python :8000"]
        N1["GET /health\nService status"]
        N2["POST /match\n{ query, faqs[] }\n→ best_match, confidence"]
        N3["POST /preprocess\n{ text }\n→ tokens (debug)"]
    end

    style FAQ fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CHAT fill:#14532d,stroke:#22c55e,color:#e2e8f0
    style NLP fill:#451a03,stroke:#f59e0b,color:#e2e8f0
```

### Request / Response Examples

**POST /api/chat**
```json
// Request
{
  "query": "What if I forgot my email?",
  "context": [
    { "question": "How do I reset my password?", "answer": "...", "category": "Account" }
  ]
}

// Response
{
  "answer": "Contact support with your phone number or order ID...",
  "faq_question": "What if I forgot my email too?",
  "category": "Account",
  "confidence": 0.74,
  "matched": true,
  "suggestions": ["Is my personal data safe?", "How do I contact support?"],
  "context_used": true
}
```

---

## FAQ Dataset

Pre-loaded with **11 FAQs** across 6 categories:

| # | Question | Category | Color |
|:---:|:---|:---:|:---:|
| 1 | What is your return policy? | `Orders` | 🟢 |
| 2 | How do I reset my password? | `Account` | 🔵 |
| 3 | What if I forgot my email too? | `Account` | 🔵 |
| 4 | What payment methods do you accept? | `Payments` | 🟠 |
| 5 | How long does shipping take? | `Shipping` | 🟣 |
| 6 | Can I track my order? | `Orders` | 🟢 |
| 7 | How do I contact customer support? | `General` | ⚪ |
| 8 | Is my personal data safe? | `Technical` | 🔴 |
| 9 | Do you offer student discounts? | `General` | ⚪ |
| 10 | How do I cancel my order? | `Orders` | 🟢 |
| 11 | What is the refund timeline? | `Payments` | 🟠 |

---

## What Makes This Stand Out

```mermaid
quadrantChart
    title FAQ.ai vs Basic Chatbot
    x-axis "Basic Features" --> "Advanced Features"
    y-axis "Low Quality" --> "High Quality"
    quadrant-1 Production Grade
    quadrant-2 Overengineered
    quadrant-3 MVP
    quadrant-4 Feature Rich
    Basic Chatbot: [0.15, 0.2]
    FAQ.ai Standalone: [0.72, 0.78]
    FAQ.ai Full Stack: [0.9, 0.88]
```

| Feature | Basic Chatbot | FAQ.ai |
|:---|:---:|:---:|
| FAQ Matching | ✅ | ✅ |
| NLP Preprocessing | ❌ | ✅ NLTK |
| Context Memory | ❌ | ✅ Last 3 turns |
| Pre-type Suggestions | ❌ | ✅ 6 chips |
| Confidence Score | ❌ | ✅ % display |
| Category Tags | ❌ | ✅ Color coded |
| 👍 Feedback System | ❌ | ✅ With analytics |
| Analytics Dashboard | ❌ | ✅ Charts + stats |
| FAQ CRUD Manager | ❌ | ✅ Full |
| Fallback + Did You Mean? | ❌ | ✅ |
| Typing Animation | ❌ | ✅ |
| Professional UI | ❌ | ✅ Poppins + dark |

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&size=11&duration=4000&pause=2000&color=3B82F6&center=true&vCenter=true&width=500&lines=Built+with+React+%C2%B7+Node.js+%C2%B7+Python+%C2%B7+NLTK;NLP+Cosine+Similarity+%C2%B7+Context+Memory;Feedback+System+%C2%B7+Analytics+Dashboard" alt="footer" />

<br/>

**Made with 💙 by Zara Alam**  

<br/>

![HTML5](https://img.shields.io/badge/Standalone-Open_in_Browser-E34F26?style=flat-square&logo=html5)
![Node](https://img.shields.io/badge/Backend-Node.js_Express-339933?style=flat-square&logo=nodedotjs)
![Python](https://img.shields.io/badge/NLP-Python_Flask_NLTK-3776AB?style=flat-square&logo=python)
![MongoDB](https://img.shields.io/badge/DB-MongoDB-47A248?style=flat-square&logo=mongodb)

</div>
