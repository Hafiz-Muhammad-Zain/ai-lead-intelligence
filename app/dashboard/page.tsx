'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

type Lead = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  company: string
  channel: string
  message: string
  score: number | null
  recommended_action: string | null
  stage: string
  follow_up_sent: boolean
  score_breakdown: {
    intent: number
    budget: number
    urgency: number
    specificity: number
    summary: string
  } | null
}

function stageBadge(stage: string) {
  const map: Record<string, string> = {
    hot: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warm: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    cold: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    new: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  }
  return map[stage] || map['new']
}

function scoreColor(score: number | null) {
  if (!score) return 'text-gray-500'
  if (score >= 70) return 'text-red-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-blue-400'
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Lead | null>(null)

  async function fetchLeads() {
    const res = await fetch('/api/leads')
    const data = await res.json()
    setLeads(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchLeads()
    const interval = setInterval(fetchLeads, 30000)
    return () => clearInterval(interval)
  }, [])

  const hot = leads.filter(l => l.stage === 'hot').length
  const warm = leads.filter(l => l.stage === 'warm').length
  const cold = leads.filter(l => l.stage === 'cold').length
  const avgScore = leads.length
    ? Math.round(leads.reduce((a, l) => a + (l.score || 0), 0) / leads.length)
    : 0

  const chartData = [
    { name: 'Hot', value: hot, color: '#f87171' },
    { name: 'Warm', value: warm, color: '#fbbf24' },
    { name: 'Cold', value: cold, color: '#60a5fa' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Lead Intelligence Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Auto-refreshes every 30 seconds</p>
          </div>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Submit Lead
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length, color: 'text-white' },
            { label: 'Hot Leads', value: hot, color: 'text-red-400' },
            { label: 'Warm Leads', value: warm, color: 'text-yellow-400' },
            { label: 'Avg Score', value: avgScore, color: 'text-blue-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-400 mb-4">Lead Distribution</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#f9fafb' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pipeline stages */}
          <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-400 mb-4">Pipeline Stage</h2>
            <div className="space-y-3">
              {[
                { label: 'Hot (Score 70+)', count: hot, color: 'bg-red-500', total: leads.length },
                { label: 'Warm (Score 40–69)', count: warm, color: 'bg-yellow-500', total: leads.length },
                { label: 'Cold (Score <40)', count: cold, color: 'bg-blue-500', total: leads.length },
              ].map(({ label, count, color, total }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`${color} h-2 rounded-full transition-all`}
                      style={{ width: total ? `${(count / total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-semibold">All Leads</h2>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leads yet. <Link href="/" className="text-blue-400 underline">Submit one</Link>.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Company</th>
                    <th className="text-left p-4 font-medium">Channel</th>
                    <th className="text-left p-4 font-medium">Score</th>
                    <th className="text-left p-4 font-medium">Stage</th>
                    <th className="text-left p-4 font-medium">Action</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-white">{lead.name}</p>
                        <p className="text-gray-500 text-xs">{lead.email}</p>
                      </td>
                      <td className="p-4 text-gray-400">{lead.company || '—'}</td>
                      <td className="p-4 text-gray-400 capitalize">{lead.channel}</td>
                      <td className="p-4">
                        <span className={`text-lg font-bold ${scoreColor(lead.score)}`}>
                          {lead.score ?? '—'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${stageBadge(lead.stage)}`}>
                          {lead.stage}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-xs max-w-[180px] truncate">
                        {lead.recommended_action || '—'}
                      </td>
                      <td className="p-4 text-gray-500 text-xs">
                        {new Date(lead.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelected(lead)}
                          className="text-blue-400 hover:text-blue-300 text-xs"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{selected.name}</h3>
                <p className="text-gray-500 text-sm">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl leading-none">×</button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className={`text-4xl font-bold ${scoreColor(selected.score)}`}>{selected.score ?? '—'}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${stageBadge(selected.stage)}`}>{selected.stage}</span>
            </div>

            {selected.score_breakdown && (
              <div className="space-y-2 mb-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Score Breakdown</p>
                {[
                  { label: 'Intent', value: selected.score_breakdown.intent, max: 25 },
                  { label: 'Budget', value: selected.score_breakdown.budget, max: 25 },
                  { label: 'Urgency', value: selected.score_breakdown.urgency, max: 25 },
                  { label: 'Specificity', value: selected.score_breakdown.specificity, max: 25 },
                ].map(({ label, value, max }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-white">{value}/{max}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(value / max) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <p className="text-gray-400 text-sm mt-3 italic">&quot;{selected.score_breakdown.summary}&quot;</p>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-3 mb-4">
              <p className="text-gray-500 text-xs mb-1">Message</p>
              <p className="text-gray-300 text-sm">{selected.message}</p>
            </div>

            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">Recommended Action</p>
              <p className="text-white text-sm">{selected.recommended_action}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
