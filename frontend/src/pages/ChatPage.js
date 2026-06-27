import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Send, Bot, User, Zap, MessageSquare, CheckCircle, HelpCircle, ThumbsUp, ThumbsDown, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const CAT_COLORS = {
  Account:  'bg-blue-900/40 text-blue-300 border-blue-700',
  Orders:   'bg-green-900/40 text-green-300 border-green-700',
  Shipping: 'bg-purple-900/40 text-purple-300 border-purple-700',
  Payments: 'bg-amber-900/40 text-amber-300 border-amber-700',
  Technical:'bg-rose-900/40 text-rose-300 border-rose-700',
  General:  'bg-surface-700 text-surface-300 border-surface-600',
};

function TypingDots() {
  return (
    <div className="flex items-end gap-2 msg-enter">
      <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0">
        <Bot size={13} className="text-brand-400"/>
      </div>
      <div className="bg-surface-800 border border-surface-700 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          <span className="w-1.5 h-1.5 rounded-full bg-surface-500 dot-1 inline-block"/>
          <span className="w-1.5 h-1.5 rounded-full bg-surface-500 dot-2 inline-block"/>
          <span className="w-1.5 h-1.5 rounded-full bg-surface-500 dot-3 inline-block"/>
        </div>
      </div>
    </div>
  );
}

function FeedbackRow({ msgId, faqQuestion, query, onFeedback }) {
  const [given, setGiven] = useState(null);
  const submit = async (helpful) => {
    setGiven(helpful ? 'up' : 'down');
    onFeedback(msgId, helpful);
    try { await axios.post('/api/chat/feedback', { faq_question: faqQuestion, helpful, query }); } catch {}
    toast(helpful ? '👍 Thanks!' : '👎 Got it!', { duration: 2000 });
  };
  if (given) return <div className="flex items-center gap-1 mt-1 px-2"><span className="text-[10px] text-surface-500">{given === 'up' ? '👍 Marked helpful' : '👎 Marked not helpful'}</span></div>;
  return (
    <div className="flex items-center gap-2 mt-1 px-2">
      <span className="text-[10px] text-surface-500">Was this helpful?</span>
      <button onClick={() => submit(true)} className="flex items-center gap-1 text-[11px] text-surface-400 border border-surface-700 bg-surface-800 px-2 py-0.5 rounded-full hover:border-green-700 hover:text-green-400 hover:bg-green-900/20 transition-all"><ThumbsUp size={10}/> Yes</button>
      <button onClick={() => submit(false)} className="flex items-center gap-1 text-[11px] text-surface-400 border border-surface-700 bg-surface-800 px-2 py-0.5 rounded-full hover:border-rose-700 hover:text-rose-400 hover:bg-rose-900/20 transition-all"><ThumbsDown size={10}/> No</button>
    </div>
  );
}

function MessageBubble({ msg, onFeedback }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-2 msg-enter ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${isUser ? 'bg-brand-500' : 'bg-brand-500/20 border border-brand-500/30'}`}>
        {isUser ? <User size={13} color="white"/> : <Bot size={13} className="text-brand-400"/>}
      </div>
      <div className={`max-w-[74%] flex flex-col gap-0.5 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && msg.context_used && (
          <div className="flex items-center gap-1 px-2 mb-0.5">
            <Sparkles size={9} className="text-amber-400"/>
            <span className="text-[10px] text-amber-400 font-medium">Context-aware reply</span>
          </div>
        )}
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-lg
          ${isUser
            ? 'bg-brand-500 text-white rounded-br-sm shadow-brand-500/20'
            : 'bg-surface-800 border border-surface-700 text-surface-200 rounded-bl-sm'}`}>
          {msg.text}
        </div>
        {!isUser && msg.confidence !== undefined && (
          <div className="flex items-center gap-2 px-2 flex-wrap">
            <div className="flex items-center gap-1">
              {msg.confidence >= 30 ? <CheckCircle size={10} className="text-green-400"/> : <HelpCircle size={10} className="text-amber-400"/>}
              <span className="text-[10px] text-surface-500">{msg.confidence}% match</span>
            </div>
            {msg.category && <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${CAT_COLORS[msg.category] || CAT_COLORS.General}`}>{msg.category}</span>}
          </div>
        )}
        {!isUser && msg.showFeedback && msg.faqQuestion && (
          <FeedbackRow msgId={msg.id} faqQuestion={msg.faqQuestion} query={msg.userQuery} onFeedback={onFeedback}/>
        )}
      </div>
    </div>
  );
}

function QuickChips({ chips, onPick }) {
  if (!chips.length) return null;
  return (
    <div className="px-5 py-4 border-t border-surface-700 bg-surface-900/50">
      <p className="text-[11px] text-surface-500 mb-2 flex items-center gap-1"><Sparkles size={10} className="text-brand-400"/> Popular questions:</p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c, i) => (
          <button key={i} onClick={() => onPick(c.question)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:border-brand-500 hover:text-brand-400 hover:bg-brand-500/10 ${CAT_COLORS[c.category] || 'bg-surface-800 text-surface-400 border-surface-700'}`}>
            {c.question.length > 34 ? c.question.slice(0, 34) + '…' : c.question}
          </button>
        ))}
      </div>
    </div>
  );
}

function SuggestionChips({ suggestions, onPick }) {
  if (!suggestions.length) return null;
  return (
    <div className="px-5 pb-3">
      <p className="text-[11px] text-surface-500 mb-1.5 flex items-center gap-1"><RefreshCw size={9}/> Related:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => onPick(s)}
            className="text-xs bg-surface-800 hover:bg-brand-500/10 border border-surface-700 hover:border-brand-500 hover:text-brand-400 text-surface-400 px-3 py-1.5 rounded-full transition-all">
            {s.length > 36 ? s.slice(0, 36) + '…' : s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatPage({ chatHistory, setChatHistory, analytics, setAnalytics }) {
  const [messages, setMessages] = useState([{
    id: 0, role: 'bot',
    text: "Hi! I'm your FAQ assistant powered by NLP. I remember our conversation — ask follow-up questions naturally! 😊",
    showFeedback: false
  }]);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [quickChips, setQuickChips]   = useState([]);
  const [showQuick, setShowQuick]     = useState(true);
  const [context, setContext]         = useState([]);
  const msgIdRef  = useRef(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    axios.get('/api/chat/suggestions').then(r => setQuickChips(r.data)).catch(() => setQuickChips([
      { question: 'How do I reset my password?', category: 'Account' },
      { question: 'What is your return policy?', category: 'Orders' },
      { question: 'What payment methods do you accept?', category: 'Payments' },
      { question: 'How long does shipping take?', category: 'Shipping' },
      { question: 'How do I contact customer support?', category: 'General' },
      { question: 'Do you offer student discounts?', category: 'General' },
    ]));
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const handleFeedback = useCallback((msgId, helpful) => {
    setAnalytics(prev => ({
      ...prev,
      feedbackTotal:   (prev.feedbackTotal   || 0) + 1,
      feedbackHelpful: (prev.feedbackHelpful || 0) + (helpful ? 1 : 0),
    }));
  }, [setAnalytics]);

  const sendMessage = async (text) => {
    const q = (text || input).trim();
    if (!q || isTyping) return;
    setInput(''); setSuggestions([]); setShowQuick(false);
    setMessages(prev => [...prev, { id: msgIdRef.current++, role: 'user', text: q }]);
    setChatHistory(prev => [...prev, q]);
    setIsTyping(true);
    try {
      const res = await axios.post('/api/chat', { query: q, context });
      const { answer, faq_question, category, confidence, suggestions: sugg, matched, context_used } = res.data;
      setMessages(prev => [...prev, {
        id: msgIdRef.current++, role: 'bot', text: answer,
        confidence: Math.round(confidence * 100),
        faqQuestion: faq_question, userQuery: q,
        category, context_used, showFeedback: matched,
      }]);
      setSuggestions(sugg || []);
      if (matched && faq_question) setContext(prev => [...prev.slice(-2), { question: faq_question, answer, category: category || 'General' }]);
      setAnalytics(prev => ({
        ...prev,
        total: (prev.total || 0) + 1,
        matched: matched ? (prev.matched || 0) + 1 : (prev.matched || 0),
        unmatched: !matched ? (prev.unmatched || 0) + 1 : (prev.unmatched || 0),
        topQuestions: (() => { const e = (prev.topQuestions || []).find(x => x.q === faq_question); if (e) return prev.topQuestions.map(x => x.q === faq_question ? { ...x, count: x.count + 1 } : x); return [...(prev.topQuestions || []), { q: faq_question, count: 1 }]; })(),
        confScores: [...(prev.confScores || []), Math.round(confidence * 100)],
      }));
    } catch {
      toast.error('Server not reachable. Is the backend running?');
      setMessages(prev => [...prev, { id: msgIdRef.current++, role: 'bot', text: "Couldn't reach the server. Please start the backend.", showFeedback: false }]);
    } finally { setIsTyping(false); }
  };

  const avgConf = analytics.confScores?.length ? Math.round(analytics.confScores.reduce((a, b) => a + b, 0) / analytics.confScores.length) : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-surface-700 bg-surface-800">
        <div>
          <h1 className="text-base font-semibold text-white">Chat</h1>
          <p className="text-xs text-surface-500 mt-0.5">NLP-powered · Context-aware · Feedback system</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-surface-500">
            <span className="flex items-center gap-1"><MessageSquare size={11}/>{analytics.total || 0} queries</span>
            {avgConf !== null && <span className="flex items-center gap-1"><Zap size={11} className="text-brand-400"/>{avgConf}% avg</span>}
            {context.length > 0 && <span className="flex items-center gap-1 text-amber-400"><Sparkles size={11}/>{context.length} context</span>}
          </div>
          <button onClick={() => { setMessages([{ id: 0, role: 'bot', text: "Chat cleared! Ask me anything 😊", showFeedback: false }]); setContext([]); setSuggestions([]); setShowQuick(true); }}
            className="text-xs text-surface-500 hover:text-brand-400 border border-surface-700 hover:border-brand-500 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all">
            <RefreshCw size={11}/> Clear
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{ animation: 'pulse 2s infinite' }}/>
            <span className="text-xs text-green-400 font-medium">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 bg-surface-900">
        {messages.map(msg => <MessageBubble key={msg.id} msg={msg} onFeedback={handleFeedback}/>)}
        {isTyping && <TypingDots/>}
        <div ref={bottomRef}/>
      </div>

      {showQuick && !isTyping && messages.length <= 1 && <QuickChips chips={quickChips} onPick={sendMessage}/>}
      {!showQuick && <SuggestionChips suggestions={suggestions} onPick={sendMessage}/>}

      <div className="px-5 pb-5 pt-2 border-t border-surface-700 bg-surface-800">
        <div className="flex items-center gap-2 bg-surface-900 border border-surface-700 rounded-xl px-3 py-2 focus-within:border-brand-500 focus-within:shadow-lg focus-within:shadow-brand-500/10 transition-all">
          <input className="flex-1 bg-transparent text-sm text-surface-200 placeholder-surface-500 outline-none font-[Poppins]"
            placeholder={context.length > 0 ? "Ask a follow-up question…" : "Type your question…"}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()} disabled={isTyping}/>
          <button onClick={() => sendMessage()} disabled={isTyping || !input.trim()}
            className="w-8 h-8 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-40 flex items-center justify-center transition-all shadow-lg shadow-brand-500/20">
            <Send size={13} color="white"/>
          </button>
        </div>
        {context.length > 0 && (
          <p className="text-[10px] text-amber-400 mt-1.5 flex items-center gap-1 px-1">
            <Sparkles size={9}/> Remembering context from last {context.length} exchange{context.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}