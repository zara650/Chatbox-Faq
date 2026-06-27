import React from 'react';
import { MessageSquare, List, BarChart2, Bot, Clock, ChevronRight } from 'lucide-react';

const nav = [
  { id: 'chat',      icon: MessageSquare, label: 'Chat' },
  { id: 'faqs',      icon: List,          label: 'FAQ Manager' },
  { id: 'analytics', icon: BarChart2,     label: 'Analytics' },
];

export default function Sidebar({ activePage, setActivePage, chatHistory }) {
  const h = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <aside className="w-56 bg-surface-800 border-r border-surface-700 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-surface-700 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Bot size={16} color="white"/>
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-none">FAQ.ai</p>
          <p className="text-xs text-surface-400 mt-0.5">Intelligent support</p>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-4 py-3 border-b border-surface-700 bg-surface-900/50">
        <p className="text-xs text-surface-500">{greeting}</p>
        <p className="text-sm font-medium text-surface-200 mt-0.5">Welcome back 👋</p>
      </div>

      {/* Nav */}
      <nav className="px-2 pt-3">
        <p className="text-[10px] text-surface-500 uppercase tracking-widest px-2 mb-2">Menu</p>
        {nav.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setActivePage(id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-all
              ${activePage === id
                ? 'bg-brand-500/10 text-brand-400 font-medium border-l-2 border-brand-500'
                : 'text-surface-400 hover:bg-surface-700 hover:text-brand-400'}`}>
            <Icon size={15}/>
            {label}
            {activePage === id && <ChevronRight size={12} className="ml-auto text-brand-400"/>}
          </button>
        ))}
      </nav>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-2 pt-4">
        <p className="text-[10px] text-surface-500 uppercase tracking-widest px-2 mb-2">Recent chats</p>
        {chatHistory.length === 0
          ? <p className="text-xs text-surface-500 px-3 py-2">No chats yet</p>
          : chatHistory.slice(-10).reverse().map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-700 cursor-pointer group">
              <Clock size={10} className="text-surface-600 shrink-0"/>
              <p className="text-xs text-surface-500 truncate group-hover:text-surface-300">{s}</p>
            </div>
          ))
        }
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-semibold text-brand-400">Z</div>
          <div>
            <p className="text-xs font-medium text-surface-200">Zara Alam</p>
            <p className="text-[10px] text-surface-500">AI Intern · CodeAlpha</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
