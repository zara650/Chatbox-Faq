import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import FAQManagerPage from './pages/FAQManagerPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  const [activePage, setActivePage] = useState('chat');
  const [chatHistory, setChatHistory] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0, matched: 0, unmatched: 0,
    topQuestions: [], confScores: [],
    feedbackTotal: 0, feedbackHelpful: 0
  });

  return (
    <div className="flex h-screen overflow-hidden bg-surface-900">
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '13px', background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155' } }}/>
      <Sidebar activePage={activePage} setActivePage={setActivePage} chatHistory={chatHistory}/>
      <main className="flex-1 flex flex-col overflow-hidden">
        {activePage === 'chat' && (
          <ChatPage
            chatHistory={chatHistory} setChatHistory={setChatHistory}
            analytics={analytics} setAnalytics={setAnalytics}
          />
        )}
        {activePage === 'faqs'      && <FAQManagerPage />}
        {activePage === 'analytics' && <AnalyticsPage analytics={analytics} />}
      </main>
    </div>
  );
}
