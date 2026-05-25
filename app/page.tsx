'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LeadCapture() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
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
          <p className="text-gray-400 mb-6">Your lead is being scored by AI right now. Check the dashboard to see where it lands.</p>
          <Link href="/dashboard" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            View Live Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-blue-400 text-xs font-medium">Live demo — real AI scoring</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Lead Intelligence</h1>
          <p className="text-gray-400">
            Submit a test lead. The AI scores it 0–100, classifies it as hot, warm, or cold,
            and triggers the right follow-up automatically.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name *" required
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input type="email" placeholder="Email *" required
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="tel" placeholder="Phone (optional)"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <input type="text" placeholder="Company (optional)"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
          </div>
          <textarea placeholder="Describe what you need. Be specific — budget, timeline, problem. The AI scores based on this. *"
            rows={5} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-colors">
            {loading ? 'Submitting...' : 'Submit Lead'}
          </button>
        </form>

        {/* Nav link */}
        <div className="flex justify-center mb-16">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">View dashboard →</Link>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="border-t border-gray-800 pt-10">

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span className="text-blue-400 text-sm font-medium">Live Demo — Real AI Scoring</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">How It Works — Plain English</h2>
          <p className="text-gray-400 mb-8">See how a real German company uses this system to stop wasting time on bad leads.</p>

          {/* Company intro */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">M</div>
              <div>
                <h3 className="text-lg font-semibold">Müllertech GmbH — München, Germany</h3>
                <p className="text-gray-500 text-sm">B2B marketing agency. 12 employees. Runs campaigns for mid-size German manufacturers.</p>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Before this system, Müllertech&apos;s team spent 3–4 hours every day manually reading contact form submissions and deciding who to call.
                  Hot prospects waited 24+ hours for a response. Cold leads got the same attention as real buyers. They were losing deals to faster agencies.
                </p>
              </div>
            </div>
          </div>

          {/* The Problem */}
          <h3 className="text-xl font-bold mb-4">The Problem</h3>
          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { icon: '⏱', title: '3–4 hours wasted daily', desc: 'Sales team reading every lead manually before deciding who to call first.' },
              { icon: '📉', title: 'Hot leads going cold', desc: 'Serious buyers waited 24+ hours because no one knew they were serious.' },
              { icon: '🔁', title: 'Same follow-up for everyone', desc: 'Cold leads and hot leads got the same email. No prioritization.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <h4 className="font-semibold text-red-400 text-sm mb-1">{title}</h4>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h3 className="text-xl font-bold mb-4">What Happens Step by Step</h3>
          <div className="space-y-4 mb-8">

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h4 className="font-semibold mb-2">A potential client fills in the contact form</h4>
                <p className="text-gray-400 text-sm mb-3">Thomas Wagner, Marketing Director at a Nürnberg manufacturer, fills in their contact form.</p>
                <div className="bg-gray-800 rounded-lg p-3 text-sm">
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Thomas writes:</p>
                  <p className="text-gray-300 italic">&ldquo;We need to completely automate our lead follow-up. We are losing deals every week because our sales team responds too slowly. Budget is €8,000. We need this running before our trade fair in 6 weeks.&rdquo;</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h4 className="font-semibold mb-2">The AI reads the message and scores it instantly</h4>
                <p className="text-gray-400 text-sm mb-3">In about 2 seconds, the AI analyses Thomas&apos;s message across 4 dimensions.</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Intent', score: 23, max: 25, note: '"Losing deals every week" — ready to buy now' },
                    { label: 'Budget', score: 25, max: 25, note: 'Exact budget stated: €8,000' },
                    { label: 'Urgency', score: 24, max: 25, note: 'Hard deadline: trade fair in 6 weeks' },
                    { label: 'Specificity', score: 20, max: 25, note: 'Clear problem, clear outcome needed' },
                  ].map(({ label, score, max, note }) => (
                    <div key={label} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{label}</span>
                        <span className="text-white font-bold">{score}/{max}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${(score / max) * 100}%` }} />
                      </div>
                      <p className="text-gray-500 text-xs">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 bg-red-500 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h4 className="font-semibold mb-2">The system classifies Thomas as a HOT lead</h4>
                <p className="text-gray-400 text-sm mb-3">Total score: <span className="text-red-400 font-bold">92/100</span>. Any lead scoring 70+ is automatically classified as HOT.</p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400">92</div>
                    <div className="text-xs text-gray-500 mt-1">out of 100</div>
                  </div>
                  <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="text-red-400 font-semibold text-sm mb-1">HOT LEAD — Call within 1 hour</div>
                    <p className="text-gray-400 text-xs">Defined budget, hard deadline, active pain. High probability of closing if contacted immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 bg-green-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h4 className="font-semibold mb-2">Müllertech&apos;s owner gets a WhatsApp alert — immediately</h4>
                <p className="text-gray-400 text-sm mb-3">Within 10 seconds of Thomas submitting the form, the owner&apos;s phone buzzes.</p>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">WA</div>
                    <div>
                      <div className="text-sm font-medium">Lead Intelligence System</div>
                      <div className="text-xs text-gray-500">just now</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm bg-gray-800 rounded-lg p-3">
                    New hot lead! Name is Thomas Wagner, score is 92 out of 100, phone number is +49 911 234567 and email is t.wagner@industriewerk-nb.de. Please follow up immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h4 className="font-semibold mb-2">Everything is stored in the live dashboard</h4>
                <p className="text-gray-400 text-sm">
                  Thomas&apos;s lead appears in the real-time dashboard with score, breakdown, recommended action, and full pipeline view. No spreadsheets, no manual sorting.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <h3 className="text-xl font-bold mb-4">Results for Müllertech after 30 days</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { value: '3h', label: 'Saved per day', sub: 'No more manual lead review' },
              { value: '< 10min', label: 'Response to hot leads', sub: 'Was 24+ hours before' },
              { value: '2x', label: 'Reply rate', sub: 'From contacting right leads first' },
              { value: '100%', label: 'Leads captured', sub: 'Nothing falls through the cracks' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{value}</div>
                <div className="text-sm font-medium mb-1">{label}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            ))}
          </div>

          {/* Warm/cold */}
          <h3 className="text-xl font-bold mb-4">What happens to warm and cold leads?</h3>
          <div className="space-y-3">
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">WARM — Score 40–69</span>
              <p className="text-gray-300 text-sm font-medium mt-3 mb-1">&ldquo;We&apos;re exploring options for automating our email follow-ups. Not sure about budget yet.&rdquo;</p>
              <p className="text-gray-400 text-sm">System action: Tagged warm, appears in dashboard, recommended action is &ldquo;Send case study.&rdquo; No urgent alert.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">COLD — Score below 40</span>
              <p className="text-gray-300 text-sm font-medium mt-3 mb-1">&ldquo;Hi, just curious what you do.&rdquo;</p>
              <p className="text-gray-400 text-sm">System action: Tagged cold, stored in dashboard, recommended action is &ldquo;Low priority — monitor.&rdquo; No time wasted.</p>
            </div>
          </div>
        </div>

        {/* ── TECH STACK ── */}
        <div className="border-t border-gray-800 pt-16 mt-16">

          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-purple-400 text-sm font-medium">Technical Architecture</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">Technical Stack & Architecture</h2>
          <p className="text-gray-400 mb-8">Every tool, language, and service used — and why each was chosen.</p>

          {/* System flow */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">System Flow</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                { label: 'Lead Form', color: 'bg-blue-600' },
                { label: '→', color: '' },
                { label: 'Next.js API', color: 'bg-blue-500' },
                { label: '→', color: '' },
                { label: 'Supabase', color: 'bg-green-600' },
                { label: '→', color: '' },
                { label: 'GPT-4o-mini', color: 'bg-purple-600' },
                { label: '→', color: '' },
                { label: 'Score + Stage', color: 'bg-gray-700' },
                { label: '→', color: '' },
                { label: 'n8n Webhook', color: 'bg-orange-600' },
                { label: '→', color: '' },
                { label: 'WhatsApp', color: 'bg-green-500' },
              ].map((item, i) => (
                item.color
                  ? <span key={i} className={`${item.color} text-white font-semibold px-2.5 py-1.5 rounded-lg`}>{item.label}</span>
                  : <span key={i} className="text-gray-600 font-bold">{item.label}</span>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-gray-800">
              Dashboard polls <code className="bg-gray-800 px-1 rounded">/api/leads</code> every 30 seconds — no WebSocket needed.
            </p>
          </div>

          {/* Frontend */}
          <h3 className="text-lg font-bold mb-3">Frontend</h3>
          <div className="space-y-3 mb-8">
            {[
              { name: 'Next.js 15 (App Router)', lang: 'TypeScript', color: 'bg-blue-500/20 text-blue-400', why: 'Full-stack React framework. App Router enables server components and co-located API routes — no separate backend server needed.', for: 'Lead capture form, dashboard UI, API routes' },
              { name: 'Tailwind CSS v4', lang: 'CSS', color: 'bg-blue-500/20 text-blue-400', why: 'Utility-first CSS. Zero custom CSS files — all styling done via class names. Fast to build, no specificity conflicts.', for: 'All UI components, responsive layout, dark theme' },
              { name: 'Recharts', lang: 'JavaScript', color: 'bg-blue-500/20 text-blue-400', why: 'Declarative charting on top of D3. Works natively with React state, no imperative DOM manipulation.', for: 'Lead distribution bar chart on dashboard' },
            ].map(({ name, lang, color, why, for: usedFor }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm">{name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${color}`}>{lang}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1"><span className="text-gray-500 font-medium">Why: </span>{why}</p>
                <p className="text-gray-400 text-xs"><span className="text-gray-500 font-medium">Used for: </span>{usedFor}</p>
              </div>
            ))}
          </div>

          {/* Backend */}
          <h3 className="text-lg font-bold mb-3">Backend & API Layer</h3>
          <div className="space-y-3 mb-8">
            {[
              { name: 'Next.js API Routes', lang: 'TypeScript', color: 'bg-purple-500/20 text-purple-400', why: 'Server-side endpoints as Vercel serverless functions. Same repo handles UI and API. Cold starts under 200ms.', for: 'POST /api/lead (scoring pipeline), GET /api/leads (dashboard)' },
              { name: 'OpenAI API — GPT-4o-mini', lang: 'REST / JSON', color: 'bg-purple-500/20 text-purple-400', why: 'GPT-4o-mini for speed and cost. Structured JSON output mode guarantees valid JSON — no parsing hacks. Full scoring in ~1.5 seconds.', for: '4-dimension scoring, 0–100 score, recommended action, summary' },
              { name: 'Supabase', lang: 'PostgreSQL / REST', color: 'bg-purple-500/20 text-purple-400', why: 'Managed Postgres with a REST API and typed JS client. Row Level Security enabled. No ORM setup, works out of the box.', for: 'Storing leads with score, stage, score_breakdown (JSONB), recommended_action' },
            ].map(({ name, lang, color, why, for: usedFor }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm">{name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${color}`}>{lang}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1"><span className="text-gray-500 font-medium">Why: </span>{why}</p>
                <p className="text-gray-400 text-xs"><span className="text-gray-500 font-medium">Used for: </span>{usedFor}</p>
              </div>
            ))}
          </div>

          {/* Automation */}
          <h3 className="text-lg font-bold mb-3">Automation Layer</h3>
          <div className="space-y-3 mb-8">
            {[
              { name: 'n8n (self-hosted)', lang: 'Node.js / JSON workflows', color: 'bg-orange-500/20 text-orange-400', why: 'Self-hosted on Hetzner via Coolify. No per-task pricing, full data control (GDPR-relevant), runs on own infrastructure.', for: 'Hot lead webhook → WhatsApp message sender' },
              { name: 'WhatsApp Business API (Meta Graph API v19)', lang: 'REST / JSON', color: 'bg-orange-500/20 text-orange-400', why: 'Official Meta Cloud API. Template messages used to comply with Meta messaging policy. Instant delivery, no app required.', for: 'WhatsApp notification to business owner when lead scores 70+' },
              { name: 'Vercel Serverless Functions', lang: 'TypeScript / Node.js', color: 'bg-orange-500/20 text-orange-400', why: 'Zero-config deployment from GitHub. Automatic HTTPS, global CDN, environment variable management, function logs.', for: 'Hosting the Next.js app and all API routes in production' },
            ].map(({ name, lang, color, why, for: usedFor }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm">{name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${color}`}>{lang}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1"><span className="text-gray-500 font-medium">Why: </span>{why}</p>
                <p className="text-gray-400 text-xs"><span className="text-gray-500 font-medium">Used for: </span>{usedFor}</p>
              </div>
            ))}
          </div>

          {/* AI Scoring */}
          <h3 className="text-lg font-bold mb-3">AI Scoring Logic</h3>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
            <p className="text-gray-400 text-sm mb-4">GPT-4o-mini receives lead details and returns a structured JSON object using <code className="bg-gray-800 px-1 rounded text-xs">response_format: json_object</code>.</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { dim: 'Intent Strength', max: 25, desc: 'Ready to buy, or just researching?' },
                { dim: 'Budget Signals', max: 25, desc: 'Budget, price range, or investment mentioned?' },
                { dim: 'Urgency', max: 25, desc: 'Deadline or timeline stated?' },
                { dim: 'Specificity', max: 25, desc: 'Problem clearly defined or vague?' },
              ].map(({ dim, max, desc }) => (
                <div key={dim} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-white">{dim}</span>
                    <span className="text-gray-500">0–{max} pts</span>
                  </div>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { stage: 'HOT', range: '70–100', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', action: 'Call within 1 hour' },
                { stage: 'WARM', range: '40–69', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', action: 'Send case study' },
                { stage: 'COLD', range: '0–39', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', action: 'Add to nurture' },
              ].map(({ stage, range, color, bg, action }) => (
                <div key={stage} className={`border rounded-lg p-3 ${bg}`}>
                  <div className={`font-bold text-sm ${color}`}>{stage}</div>
                  <div className="text-gray-400 text-xs">Score {range}</div>
                  <div className="text-gray-500 text-xs mt-1">{action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure */}
          <h3 className="text-lg font-bold mb-3">Infrastructure</h3>
          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { name: 'Hetzner VPS (CX23)', role: 'n8n self-hosting', detail: '2 vCPU, 4GB RAM, €4.75/month. Running Coolify for container management.' },
              { name: 'Coolify', role: 'Container orchestration', detail: 'Self-hosted PaaS. Manages n8n Docker container, SSL certificates, reverse proxy.' },
              { name: 'Vercel', role: 'Frontend + API hosting', detail: 'Next.js deployment. Automatic deploys from GitHub main branch. Global CDN.' },
              { name: 'Supabase Cloud', role: 'Managed database', detail: 'Free tier. Postgres 15. REST API auto-generated from schema. Row Level Security.' },
              { name: 'GitHub', role: 'Version control', detail: 'Source of truth. Vercel auto-deploys on every push to main.' },
              { name: 'Meta Cloud API', role: 'WhatsApp messaging', detail: 'Official API. Template messages for outbound. Webhook received via n8n.' },
            ].map(({ name, role, detail }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-sm">{name}</span>
                  <span className="text-blue-400 text-xs ml-2">{role}</span>
                  <p className="text-gray-500 text-xs mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Complete tech list */}
          <h3 className="text-lg font-bold mb-3">Complete Technology List</h3>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-3 text-gray-500 font-medium">Technology</th>
                  <th className="text-left p-3 text-gray-500 font-medium">Category</th>
                  <th className="text-left p-3 text-gray-500 font-medium">Version</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Next.js', 'Frontend Framework', '15 (App Router)'],
                  ['TypeScript', 'Language', '5.x'],
                  ['React', 'UI Library', '19'],
                  ['Tailwind CSS', 'Styling', 'v4'],
                  ['Recharts', 'Data Visualisation', '2.x'],
                  ['OpenAI API', 'AI / LLM', 'GPT-4o-mini'],
                  ['Supabase JS Client', 'Database SDK', '2.x'],
                  ['PostgreSQL', 'Database', '15 (via Supabase)'],
                  ['n8n', 'Workflow Automation', '2.4.8 self-hosted'],
                  ['WhatsApp Business API', 'Messaging', 'Graph API v19.0'],
                  ['Vercel', 'Hosting / Serverless', 'Hobby'],
                  ['Hetzner VPS', 'Cloud Infrastructure', 'CX23'],
                  ['Coolify', 'Container Management', 'v4'],
                  ['GitHub', 'Version Control', '—'],
                  ['Node.js', 'Runtime', '20.x (Vercel)'],
                ].map(([tech, category, version]) => (
                  <tr key={tech} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="p-3 font-medium text-white">{tech}</td>
                    <td className="p-3 text-gray-400">{category}</td>
                    <td className="p-3 text-gray-500 font-mono">{version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
