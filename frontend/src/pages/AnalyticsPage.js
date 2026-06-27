import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, CheckCircle, XCircle, Zap, ThumbsUp, ThumbsDown, Smile } from 'lucide-react';

function StatCard({ icon: Icon, label, value, iconBg, sub }) {
  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl p-4 hover:border-surface-600 transition-all">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${iconBg}`}>
        <Icon size={15}/>
      </div>
      <p className="text-xs text-surface-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {sub && <p className="text-[11px] text-surface-500 mt-0.5">{sub}</p>}
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) return (
    <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-xs text-surface-200">
      {payload[0].value} queries
    </div>
  );
  return null;
};

export default function AnalyticsPage({ analytics }) {
  const { total=0, matched=0, unmatched=0, topQuestions=[], confScores=[], feedbackTotal=0, feedbackHelpful=0 } = analytics;
  const avgConf   = confScores.length ? Math.round(confScores.reduce((a,b)=>a+b,0)/confScores.length) : 0;
  const matchRate = total ? Math.round((matched/total)*100) : 0;
  const satisfRate= feedbackTotal ? Math.round((feedbackHelpful/feedbackTotal)*100) : 0;

  const topData = [...topQuestions].sort((a,b)=>b.count-a.count).slice(0,6)
    .map(q=>({ name: q.q.length>24?q.q.slice(0,24)+'…':q.q, count: q.count }));

  const matchPie    = total>0 ? [{name:'Matched',value:matched},{name:'Unmatched',value:unmatched}] : [{name:'No data',value:1}];
  const feedbackPie = feedbackTotal>0 ? [{name:'Helpful',value:feedbackHelpful},{name:'Not helpful',value:feedbackTotal-feedbackHelpful}] : [{name:'No data',value:1}];

  return (
    <div className="flex flex-col h-full bg-surface-900">
      <div className="px-6 py-4 bg-surface-800 border-b border-surface-700">
        <h1 className="text-base font-semibold text-white">Analytics</h1>
        <p className="text-xs text-surface-500 mt-0.5">Session insights, FAQ performance & user feedback</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 mb-5 lg:grid-cols-4">
          <StatCard icon={TrendingUp}  label="Total queries"  value={total}   iconBg="bg-brand-500/20 text-brand-400"/>
          <StatCard icon={CheckCircle} label="Matched"        value={matched} iconBg="bg-green-900/40 text-green-400"/>
          <StatCard icon={Zap}         label="Avg confidence" value={avgConf?`${avgConf}%`:'—'} iconBg="bg-amber-900/40 text-amber-400"/>
          <StatCard icon={Smile}       label="Satisfaction"   value={satisfRate?`${satisfRate}%`:'—'} iconBg="bg-purple-900/40 text-purple-400" sub={feedbackTotal?`${feedbackTotal} ratings`:'No ratings yet'}/>
        </div>

        {/* Match rate */}
        {total>0 && (
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-surface-200">Match rate</p>
              <span className="text-sm font-semibold text-brand-400">{matchRate}%</span>
            </div>
            <div className="h-2 bg-surface-900 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all duration-700" style={{width:`${matchRate}%`}}/>
            </div>
            <p className="text-xs text-surface-500 mt-1.5">{matched} of {total} queries matched an FAQ</p>
          </div>
        )}

        {/* Satisfaction */}
        {feedbackTotal>0 && (
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-surface-200">User satisfaction</p>
              <span className="text-sm font-semibold text-green-400">{satisfRate}%</span>
            </div>
            <div className="h-2 bg-surface-900 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{width:`${satisfRate}%`}}/>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5"><ThumbsUp size={12} className="text-green-400"/><span className="text-xs text-surface-400">{feedbackHelpful} helpful</span></div>
              <div className="flex items-center gap-1.5"><ThumbsDown size={12} className="text-rose-400"/><span className="text-xs text-surface-400">{feedbackTotal-feedbackHelpful} not helpful</span></div>
            </div>
          </div>
        )}

        {/* Top FAQs bar chart */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium text-surface-200 mb-4">Most asked FAQs</p>
          {topData.length===0
            ? <p className="text-xs text-surface-500 py-6 text-center">Start chatting to see data here.</p>
            : <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topData} layout="vertical" margin={{left:8,right:16}}>
                  <XAxis type="number" tick={{fontSize:11,fill:'#64748b'}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" tick={{fontSize:11,fill:'#94a3b8'}} width={140} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>} cursor={{fill:'#1e293b'}}/>
                  <Bar dataKey="count" fill="#3b82f6" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
          }
        </div>

        {/* Pie charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-4">
            <p className="text-sm font-medium text-surface-200 mb-2">Match vs unmatched</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={matchPie} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                  {matchPie.map((_,i)=><Cell key={i} fill={total===0?'#334155':i===0?'#3b82f6':'#f87171'}/>)}
                </Pie>
                {total>0 && <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11,color:'#94a3b8'}}/>}
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-4">
            <p className="text-sm font-medium text-surface-200 mb-2">Feedback breakdown</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={feedbackPie} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                  {feedbackPie.map((_,i)=><Cell key={i} fill={feedbackTotal===0?'#334155':i===0?'#22c55e':'#64748b'}/>)}
                </Pie>
                {feedbackTotal>0 && <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11,color:'#94a3b8'}}/>}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}