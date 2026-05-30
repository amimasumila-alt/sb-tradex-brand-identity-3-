import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Plus, Filter, Download, Calendar,
  PieChart, Target, ArrowUpRight, Wallet, Activity
} from 'lucide-react';
import { Counter } from '../components/Primitives';

interface Position {
  asset: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  current: number;
  qty: number;
  pnl: number;
  pnlPct: number;
}

interface TradeHistory {
  date: string;
  asset: string;
  type: 'LONG' | 'SHORT';
  result: string;
  pnl: number;
}

const positions: Position[] = [
  { asset: 'NIFTY 50', type: 'LONG', entry: 24750, current: 24812, qty: 150, pnl: 9300, pnlPct: 2.51 },
  { asset: 'EUR/USD', type: 'LONG', entry: 1.0824, current: 1.0847, qty: 50000, pnl: 11500, pnlPct: 2.12 },
  { asset: 'BTC/USDT', type: 'SHORT', entry: 68420, current: 67842, qty: 0.5, pnl: 2890, pnlPct: 0.85 },
  { asset: 'XAU/USD', type: 'LONG', entry: 2362, current: 2387.4, qty: 10, pnl: 25400, pnlPct: 1.08 },
  { asset: 'NVDA', type: 'LONG', entry: 908.2, current: 924.18, qty: 50, pnl: 7990, pnlPct: 1.76 },
];

const history: TradeHistory[] = [
  { date: '14 Jan 2025', asset: 'GBP/JPY', type: 'SHORT', result: 'SL', pnl: -18500 },
  { date: '13 Jan 2025', asset: 'EUR/USD', type: 'LONG', result: 'TP2', pnl: 42300 },
  { date: '12 Jan 2025', asset: 'NIFTY 50', type: 'LONG', result: 'TP1', pnl: 15600 },
  { date: '11 Jan 2025', asset: 'BTC/USDT', type: 'SHORT', result: 'TP3', pnl: 52100 },
  { date: '10 Jan 2025', asset: 'CRUDE OIL', type: 'LONG', result: 'SL', pnl: -12300 },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<'positions' | 'history' | 'analytics'>('positions');

  // Portfolio metrics calculated from positions

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-3">◆ PORTFOLIO ◆</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Your <span className="gold-shimmer italic font-light">Positions.</span></h1>
          <div className="flex gap-3">
            <button className="btn-outline-gold font-label text-[10px] tracking-[0.25em] px-4 py-2.5 rounded-sm flex items-center gap-2">
              <Plus className="w-3 h-3" /> NEW POSITION
            </button>
            <button className="border border-[#1F1F2E] text-[#6B6B7B] hover:border-[#C5A23E]/40 font-label text-[10px] tracking-[0.25em] px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2">
              <Download className="w-3 h-3" /> EXPORT
            </button>
          </div>
        </div>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: 'Total Value', value: 184720, prefix: '$', change: '+12.4%' },
          { icon: Activity, label: 'Day P&L', value: 28450, prefix: '$', change: '+18.2%', highlight: true },
          { icon: PieChart, label: 'Open Positions', value: positions.length, suffix: '' },
          { icon: Target, label: 'Win Rate (30D)', value: 78, suffix: '%' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-sm p-5 ${s.highlight ? 'gold-hairline' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon className="w-4 h-4 text-[#C5A23E]" strokeWidth={1.5} />
              {s.change && (
                <span className={`font-mono text-[10px] ${s.change.startsWith('+') ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>
                  {s.change}
                </span>
              )}
            </div>
            <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">{s.label.toUpperCase()}</div>
            <div className="font-display text-2xl md:text-3xl font-bold text-[#E8E6E3]">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} duration={1500} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-1 border-b border-[#1F1F2E]">
        {[
          { id: 'positions', label: 'Open Positions', count: positions.length },
          { id: 'history', label: 'Trade History', count: 47 },
          { id: 'analytics', label: 'Analytics' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-5 py-3 font-label text-[11px] tracking-[0.2em] transition-all relative ${
              activeTab === t.id ? 'text-[#C5A23E]' : 'text-[#6B6B7B] hover:text-[#E8E6E3]'
            }`}
          >
            {t.label.toUpperCase()}
            {t.count !== undefined && (
              <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-[#1A1A25] rounded-sm">{t.count}</span>
            )}
            {activeTab === t.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient" />
            )}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      {activeTab === 'positions' && <PositionsTable positions={positions} />}
      {activeTab === 'history' && <HistoryTable trades={history} />}
      {activeTab === 'analytics' && <AnalyticsView />}
    </div>
  );
}

function PositionsTable({ positions }: { positions: Position[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-sm overflow-hidden">
      <div className="p-4 border-b border-[#1F1F2E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#6B6B7B]" />
          <span className="font-label text-[10px] tracking-[0.2em] text-[#6B6B7B]">FILTER BY MARKET</span>
        </div>
        <div className="flex gap-2">
          {['ALL', 'FOREX', 'STOCKS', 'CRYPTO'].map((f, i) => (
            <button
              key={f}
              className={`font-label text-[9px] tracking-[0.2em] px-3 py-1.5 border rounded-sm transition-colors ${
                i === 0 ? 'border-[#C5A23E] text-[#C5A23E] bg-[#C5A23E]/5' : 'border-[#1F1F2E] text-[#6B6B7B] hover:border-[#C5A23E]/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1F1F2E] text-left">
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6">ASSET</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6">TYPE</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6 text-right">ENTRY</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6 text-right">CURRENT</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6 text-right">QTY</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6 text-right">P&L</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p, i) => (
              <tr key={i} className="border-b border-[#1F1F2E]/50 hover:bg-[#0A0A12]/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-display font-semibold text-[#E8E6E3]">{p.asset}</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`font-label text-[9px] tracking-[0.2em] px-2 py-1 rounded-sm ${
                    p.type === 'LONG' ? 'bg-[#00FF9F]/10 text-[#00FF9F]' : 'bg-[#FF0A3E]/10 text-[#FF0A3E]'
                  }`}>
                    {p.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-mono text-sm text-[#6B6B7B]">{p.entry.toLocaleString()}</td>
                <td className="py-4 px-6 text-right font-mono text-sm text-[#E8E6E3]">{p.current.toLocaleString()}</td>
                <td className="py-4 px-6 text-right font-mono text-sm text-[#E8E6E3]">{p.qty.toLocaleString()}</td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-mono text-sm font-semibold ${p.pnl >= 0 ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>
                    {p.pnl >= 0 ? '+' : ''}${p.pnl.toLocaleString()}
                  </div>
                  <div className={`font-mono text-[10px] ${p.pnlPct >= 0 ? 'text-[#00FF9F]/70' : 'text-[#FF0A3E]/70'}`}>
                    {p.pnlPct >= 0 ? '+' : ''}{p.pnlPct}%
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-[#C5A23E] hover:text-[#E8E6E3] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function HistoryTable({ trades }: { trades: TradeHistory[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-sm overflow-hidden">
      <div className="p-4 border-b border-[#1F1F2E] flex items-center gap-3">
        <Calendar className="w-4 h-4 text-[#6B6B7B]" />
        <span className="font-label text-[10px] tracking-[0.2em] text-[#6B6B7B]">LAST 30 DAYS</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1F1F2E] text-left">
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6">DATE</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6">ASSET</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6">TYPE</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6">RESULT</th>
              <th className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] py-4 px-6 text-right">P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((h, i) => (
              <tr key={i} className="border-b border-[#1F1F2E]/50 hover:bg-[#0A0A12]/50 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-[#6B6B7B]">{h.date}</td>
                <td className="py-4 px-6 font-display font-semibold text-[#E8E6E3]">{h.asset}</td>
                <td className="py-4 px-6">
                  <span className={`font-label text-[9px] tracking-[0.2em] px-2 py-1 rounded-sm ${
                    h.type === 'LONG' ? 'bg-[#00FF9F]/10 text-[#00FF9F]' : 'bg-[#FF0A3E]/10 text-[#FF0A3E]'
                  }`}>
                    {h.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`font-label text-[9px] tracking-[0.2em] px-2 py-1 rounded-sm ${
                    h.result.startsWith('TP') ? 'bg-[#00FF9F]/10 text-[#00FF9F] border border-[#00FF9F]/30' :
                    h.result === 'SL' ? 'bg-[#FF0A3E]/10 text-[#FF0A3E] border border-[#FF0A3E]/30' :
                    'bg-[#6B6B7B]/10 text-[#6B6B7B]'
                  }`}>
                    {h.result}
                  </span>
                </td>
                <td className={`py-4 px-6 text-right font-mono text-sm font-semibold ${h.pnl >= 0 ? 'text-[#00FF9F]' : 'text-[#FF0A3E]'}`}>
                  {h.pnl >= 0 ? '+' : ''}${h.pnl.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function AnalyticsView() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-6">
      {/* Performance Chart */}
      <div className="glass rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-[#C5A23E] mb-1">◆ PERFORMANCE ◆</div>
            <h3 className="font-display text-xl font-bold">Equity Curve</h3>
          </div>
          <div className="flex gap-2">
            {['1W', '1M', '3M', 'YTD', 'ALL'].map((t, i) => (
              <button
                key={t}
                className={`font-mono text-[10px] px-2 py-1 border rounded-sm ${
                  i === 2 ? 'border-[#C5A23E] text-[#C5A23E]' : 'border-[#1F1F2E] text-[#6B6B7B]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px] relative">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <defs>
              <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C5A23E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C5A23E" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#1F1F2E" strokeWidth="0.5" />
            ))}
            {/* Equity line */}
            <path
              d="M 0 180 Q 50 170 100 150 T 200 120 T 300 80 T 400 30"
              fill="none"
              stroke="#C5A23E"
              strokeWidth="2"
            />
            <path
              d="M 0 180 Q 50 170 100 150 T 200 120 T 300 80 T 400 30 V 200 H 0 Z"
              fill="url(#equityGrad)"
            />
          </svg>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4">
        {[
          { label: 'Best Trade', value: '+$52,100', sub: 'BTC/USDT Short', color: 'text-[#00FF9F]' },
          { label: 'Worst Trade', value: '-$18,500', sub: 'GBP/JPY Short', color: 'text-[#FF0A3E]' },
          { label: 'Average Win', value: '$28,450', sub: '1.8% avg return', color: 'text-[#00FF9F]' },
          { label: 'Average Loss', value: '$8,200', sub: '0.6% avg risk', color: 'text-[#FF0A3E]' },
          { label: 'Profit Factor', value: '2.34', sub: 'Gross profit / Gross loss', color: 'text-[#C5A23E]' },
          { label: 'Sharpe Ratio', value: '1.87', sub: 'Risk-adjusted return', color: 'text-[#C5A23E]' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-sm p-5 flex items-center justify-between"
          >
            <div>
              <div className="font-label text-[9px] tracking-[0.25em] text-[#6B6B7B] mb-1">{s.label.toUpperCase()}</div>
              <div className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="font-mono text-[10px] text-[#6B6B7B] mt-1">{s.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
