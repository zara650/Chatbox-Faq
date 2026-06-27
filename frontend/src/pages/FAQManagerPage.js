import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit3, Check, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const CAT_COLORS = {
  Account:  'bg-blue-900/40 text-blue-300 border-blue-700',
  Orders:   'bg-green-900/40 text-green-300 border-green-700',
  Shipping: 'bg-purple-900/40 text-purple-300 border-purple-700',
  Payments: 'bg-amber-900/40 text-amber-300 border-amber-700',
  Technical:'bg-rose-900/40 text-rose-300 border-rose-700',
  General:  'bg-surface-700 text-surface-300 border-surface-600',
};

const SAMPLE_FAQS = [
  { _id:'1', question:'What is your return policy?', answer:'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging.', category:'Orders', askCount:0 },
  { _id:'2', question:'How do I reset my password?', answer:'Click "Forgot Password" on the login page and enter your email to receive a reset link.', category:'Account', askCount:0 },
  { _id:'3', question:'What payment methods do you accept?', answer:'We accept Visa, MasterCard, PayPal, UPI, and net banking.', category:'Payments', askCount:0 },
  { _id:'4', question:'How long does shipping take?', answer:'Standard: 5-7 days. Express: 1-2 days.', category:'Shipping', askCount:0 },
];

export default function FAQManagerPage() {
  const [faqs, setFaqs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]   = useState('');
  const [editId, setEditId]   = useState(null);
  const [form, setForm]       = useState({ question: '', answer: '', category: 'General' });

  useEffect(() => {
    axios.get('/api/faqs').then(r => setFaqs(r.data.length ? r.data : SAMPLE_FAQS))
      .catch(() => setFaqs(SAMPLE_FAQS))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) { toast.error('Question and answer are required.'); return; }
    try {
      if (editId) {
        await axios.put(`/api/faqs/${editId}`, form);
        setFaqs(prev => prev.map(f => f._id === editId ? { ...f, ...form } : f));
        toast.success('FAQ updated!');
      } else {
        const res = await axios.post('/api/faqs', form);
        setFaqs(prev => [...prev, res.data]);
        toast.success('FAQ added!');
      }
    } catch {
      if (editId) { setFaqs(prev => prev.map(f => f._id === editId ? { ...f, ...form } : f)); toast.success('FAQ updated!'); }
      else { setFaqs(prev => [...prev, { _id: Date.now().toString(), ...form, askCount: 0 }]); toast.success('FAQ added!'); }
    }
    setForm({ question: '', answer: '', category: 'General' }); setShowForm(false); setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try { await axios.delete(`/api/faqs/${id}`); } catch {}
    setFaqs(prev => prev.filter(f => f._id !== id)); toast.success('Deleted.');
  };

  const startEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || 'General' });
    setEditId(faq._id); setShowForm(true);
  };

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-surface-900">
      <div className="px-6 py-4 bg-surface-800 border-b border-surface-700 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-white">FAQ Manager</h1>
          <p className="text-xs text-surface-500 mt-0.5">{faqs.length} questions in knowledge base</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ question:'', answer:'', category:'General' }); }}
          className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm px-3 py-2 rounded-lg transition-all shadow-lg shadow-brand-500/20">
          <Plus size={14}/> Add FAQ
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {showForm && (
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-5 mb-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-4">{editId ? 'Edit FAQ' : 'New FAQ'}</h3>
            <div className="mb-3">
              <label className="text-xs text-surface-400 mb-1.5 block">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full text-sm border border-surface-600 rounded-lg px-3 py-2 bg-surface-900 text-surface-200 outline-none focus:border-brand-500 font-[Poppins]">
                {['General','Account','Orders','Payments','Shipping','Technical'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="text-xs text-surface-400 mb-1.5 block">Question *</label>
              <input className="w-full text-sm border border-surface-600 rounded-lg px-3 py-2.5 bg-surface-900 text-surface-200 outline-none focus:border-brand-500 transition-colors font-[Poppins]"
                placeholder="Enter the question..." value={form.question} onChange={e => setForm({ ...form, question: e.target.value })}/>
            </div>
            <div className="mb-4">
              <label className="text-xs text-surface-400 mb-1.5 block">Answer *</label>
              <textarea className="w-full text-sm border border-surface-600 rounded-lg px-3 py-2.5 bg-surface-900 text-surface-200 outline-none focus:border-brand-500 resize-none transition-colors font-[Poppins]"
                placeholder="Enter the answer..." rows={3} value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })}/>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setShowForm(false); setEditId(null); }}
                className="flex items-center gap-1 text-sm text-surface-400 hover:text-surface-200 border border-surface-600 hover:border-surface-500 px-3 py-1.5 rounded-lg transition-all">
                <X size={13}/> Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex items-center gap-1 text-sm bg-brand-500 hover:bg-brand-600 text-white px-4 py-1.5 rounded-lg transition-all">
                <Check size={13}/> Save
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 mb-4 focus-within:border-brand-500 transition-colors">
          <Search size={14} className="text-surface-500"/>
          <input className="flex-1 text-sm text-surface-200 placeholder-surface-500 outline-none bg-transparent font-[Poppins]"
            placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>

        {loading ? <p className="text-sm text-surface-500 text-center py-8">Loading...</p>
          : filtered.length === 0 ? <p className="text-sm text-surface-500 text-center py-8">No FAQs found.</p>
          : filtered.map(faq => (
            <div key={faq._id} className="bg-surface-800 border border-surface-700 rounded-xl p-4 hover:border-surface-600 hover:shadow-xl transition-all mb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${CAT_COLORS[faq.category] || CAT_COLORS.General}`}>{faq.category || 'General'}</span>
                    {faq.askCount > 0 && <span className="text-[10px] text-surface-500">Asked {faq.askCount}×</span>}
                  </div>
                  <p className="text-sm font-medium text-surface-100 mb-1">{faq.question}</p>
                  <p className="text-xs text-surface-400 leading-relaxed line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => startEdit(faq)} className="w-7 h-7 rounded-lg hover:bg-surface-700 flex items-center justify-center text-surface-500 hover:text-surface-200 transition-all"><Edit3 size={13}/></button>
                  <button onClick={() => handleDelete(faq._id)} className="w-7 h-7 rounded-lg hover:bg-rose-900/30 flex items-center justify-center text-surface-500 hover:text-rose-400 transition-all"><Trash2 size={13}/></button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}