'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LeadCapture() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, channel: 'form' }),
      })

      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Lead received.</h2>
          <p className="text-gray-400 mb-6">
            Your lead is being scored by AI right now. Check the dashboard to see where it lands.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View Live Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Lead Intelligence</h1>
          <p className="text-gray-400">
            Submit a test lead below. The AI will score it 0–100, decide if it&apos;s hot, warm, or cold,
            and trigger the right follow-up automatically.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              required
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Company (optional)"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            />
          </div>

          <textarea
            placeholder="Describe what you need. Be specific — budget, timeline, problem. The AI scores based on this. *"
            rows={5}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Lead'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 transition-colors">
              View dashboard →
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
