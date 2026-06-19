'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ticker = [
  { symbol: 'AMP.MC', value: '+2.4%', positive: true },
  { symbol: 'IBEX 35', value: '-0.3%', positive: false },
  { symbol: 'EURIBOR', value: '3.12%', positive: true },
  { symbol: 'BTC/USD', value: '+1.8%', positive: true },
  { symbol: 'GOLD', value: '+0.6%', positive: true },
  { symbol: 'EUR/USD', value: '-0.2%', positive: false },
  { symbol: 'AMP.MC', value: '+2.4%', positive: true },
  { symbol: 'IBEX 35', value: '-0.3%', positive: false },
]

const metrics = [
  { label: 'EV/EBITDA', value: '8.2x', delta: '+0.4x', positive: true },
  { label: 'Volatility', value: '24.1%', delta: '-1.2%', positive: true },
  { label: 'Risk Score', value: 'B+', delta: '→ stable', positive: true },
  { label: 'Watchlist', value: '5 names', delta: '+2', positive: true },
]

// Fake sparkline points
const sparklinePoints = [30, 42, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85]

function Sparkline() {
  const w = 200
  const h = 60
  const max = Math.max(...sparklinePoints)
  const min = Math.min(...sparklinePoints)
  const range = max - min || 1

  const points = sparklinePoints.map((v, i) => {
    const x = (i / (sparklinePoints.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 8) - 4
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const fillD = `M 0,${h} L ${points.join(' L ')} L ${w},${h} Z`

  return (
    <svg width={w} height={h} className="w-full">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#sparkGrad)" />
      <path d={pathD} fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function DashboardMockup() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative animate-float">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-[#00D4AA]/5 rounded-2xl blur-2xl" />

      {/* Card */}
      <div className="relative rounded-xl border border-white/10 bg-[#080F1E]/80 backdrop-blur-sm overflow-hidden shadow-card">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00D4AA]" />
            <span className="font-mono text-xs text-slate-400">market.monitor</span>
          </div>
          <span className="font-mono text-xs text-slate-600">
            {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Ticker strip */}
        <div className="overflow-hidden border-b border-white/5 py-2 px-0 bg-[#050A14]/40">
          <div className="animate-ticker flex gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
            {[...ticker, ...ticker].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <span className="font-mono text-xs text-slate-400">{item.symbol}</span>
                <span className={`font-mono text-xs font-semibold ${item.positive ? 'text-[#00D4AA]' : 'text-rose-400'}`}>
                  {item.value}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Sparkline */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">AMP.MC · Performance</span>
            <span className="font-mono text-xs text-[#00D4AA]">+18.4% YTD</span>
          </div>
          <Sparkline />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-[#00D4AA]/20 transition-colors"
            >
              <div className="font-mono text-xs text-slate-500 mb-1">{m.label}</div>
              <div className="text-white font-semibold text-sm">{m.value}</div>
              <div className={`font-mono text-xs mt-0.5 ${m.positive ? 'text-[#00D4AA]' : 'text-rose-400'}`}>
                {m.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
          <span className="font-mono text-xs text-slate-600">mock data · for illustration only</span>
        </div>
      </div>
    </div>
  )
}
