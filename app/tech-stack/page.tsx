'use client'
import Link from 'next/link'

export default function TechStack() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">← Back</Link>
          </div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-purple-400 text-sm font-medium">Technical Architecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Technical Stack & Architecture</h1>
          <p className="text-gray-400 text-lg">
            Full breakdown of every tool, language, and service used to build this system — and why each was chosen.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">System Flow</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {[
              { label: 'Lead Form', color: 'bg-blue-600' },
              { label: '→', color: '' },
              { label: 'Next.js API', color: 'bg-blue-500' },
              { label: '→', color: '' },
              { label: 'Supabase', color: 'bg-green-600' },
              { label: '→', color: '' },
              { label: 'OpenAI GPT-4o-mini', color: 'bg-purple-600' },
              { label: '→', color: '' },
              { label: 'Score + Stage', color: 'bg-gray-700' },
              { label: '→', color: '' },
              { label: 'Supabase Update', color: 'bg-green-600' },
              { label: '→', color: '' },
              { label: 'n8n Webhook', color: 'bg-orange-600' },
              { label: '→', color: '' },
              { label: 'WhatsApp API', color: 'bg-green-500' },
            ].map((item, i) => (
              item.color ? (
                <span key={i} className={`${item.color} text-white text-xs font-semibold px-3 py-1.5 rounded-lg`}>{item.label}</span>
              ) : (
                <span key={i} className="text-gray-600 font-bold">{item.label}</span>
              )
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm">Dashboard polls <code className="bg-gray-800 px-1 rounded text-xs">/api/leads</code> every 30 seconds — no WebSocket, no external real-time service needed.</p>
          </div>
        </div>

        {/* Frontend */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Frontend</h2>
          <div className="space-y-3">
            {[
              {
                name: 'Next.js 15 (App Router)',
                language: 'TypeScript',
                why: 'Full-stack React framework. App Router enables server components and co-located API routes — no separate backend server needed. TypeScript for type safety across the entire codebase.',
                used_for: 'Lead capture form, dashboard UI, API routes',
              },
              {
                name: 'Tailwind CSS v4',
                language: 'CSS',
                why: 'Utility-first CSS. Zero custom CSS files — all styling done via class names directly in JSX. Fast to build, easy to maintain, no specificity conflicts.',
                used_for: 'All UI components, responsive layout, dark theme',
              },
              {
                name: 'Recharts',
                language: 'JavaScript',
                why: 'Declarative charting library built on top of D3. Composable, works natively with React state, no imperative DOM manipulation required.',
                used_for: 'Lead distribution bar chart on dashboard',
              },
            ].map(({ name, language, why, used_for }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{name}</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded mt-1 inline-block">{language}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2"><span className="text-gray-500 font-medium">Why:</span> {why}</p>
                <p className="text-gray-400 text-sm"><span className="text-gray-500 font-medium">Used for:</span> {used_for}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backend / API */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Backend & API Layer</h2>
          <div className="space-y-3">
            {[
              {
                name: 'Next.js API Routes',
                language: 'TypeScript',
                why: 'Server-side endpoints running as Vercel serverless functions. No separate Express/FastAPI server — the same repo handles both UI and API. Cold starts are under 200ms.',
                used_for: 'POST /api/lead (scoring pipeline), GET /api/leads (dashboard data)',
              },
              {
                name: 'OpenAI API — GPT-4o-mini',
                language: 'REST / JSON',
                why: 'GPT-4o-mini chosen for speed and cost. The scoring prompt uses structured JSON output mode (response_format: json_object) — guaranteed valid JSON, no parsing hacks needed. Full scoring in ~1.5 seconds.',
                used_for: 'Lead scoring: 4 dimensions, 0–100 score, recommended action, summary',
              },
              {
                name: 'Supabase',
                language: 'PostgreSQL / REST',
                why: 'Managed Postgres with a REST API and typed JS client. Row Level Security enabled. Chose Supabase over raw Postgres for the instant REST API — no ORM setup, no migrations tooling, works out of the box.',
                used_for: 'Storing all leads with score, stage, score_breakdown (JSONB column), recommended_action',
              },
            ].map(({ name, language, why, used_for }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{name}</h3>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded mt-1 inline-block">{language}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2"><span className="text-gray-500 font-medium">Why:</span> {why}</p>
                <p className="text-gray-400 text-sm"><span className="text-gray-500 font-medium">Used for:</span> {used_for}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Automation */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Automation Layer</h2>
          <div className="space-y-3">
            {[
              {
                name: 'n8n (self-hosted)',
                language: 'Node.js / JSON workflows',
                why: 'Self-hosted on Hetzner VPS via Coolify. Chosen over Zapier/Make.com because: no per-task pricing, full data control (GDPR-relevant), runs on own infrastructure. Workflow triggered by HTTP webhook from Vercel.',
                used_for: 'Hot lead webhook receiver → WhatsApp message sender → webhook response',
              },
              {
                name: 'WhatsApp Business API (Meta Graph API)',
                language: 'REST / JSON',
                why: 'Official Meta Cloud API. Sends WhatsApp messages to a verified number via HTTP POST to graph.facebook.com/v19.0/{phone_number_id}/messages. Template messages used to comply with Meta messaging policy.',
                used_for: 'Instant WhatsApp notification to business owner when lead scores 70+',
              },
              {
                name: 'Vercel Serverless Functions',
                language: 'TypeScript / Node.js runtime',
                why: 'Zero-config deployment from GitHub. Automatic HTTPS, global CDN, environment variable management, function logs. Hobby tier sufficient for demo — scales automatically on paid plans.',
                used_for: 'Hosting the Next.js app and all API routes in production',
              },
            ].map(({ name, language, why, used_for }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{name}</h3>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded mt-1 inline-block">{language}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2"><span className="text-gray-500 font-medium">Why:</span> {why}</p>
                <p className="text-gray-400 text-sm"><span className="text-gray-500 font-medium">Used for:</span> {used_for}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Scoring Logic */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">AI Scoring Logic</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-6">GPT-4o-mini receives the lead details and returns a structured JSON object. The prompt enforces exact output format using <code className="bg-gray-800 px-1 rounded text-xs">response_format: json_object</code>.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { dimension: 'Intent Strength', max: 25, desc: 'Is the person ready to buy, or just researching?' },
                { dimension: 'Budget Signals', max: 25, desc: 'Do they mention a budget, price range, or investment?' },
                { dimension: 'Urgency', max: 25, desc: 'Do they have a deadline or say they need it soon?' },
                { dimension: 'Specificity', max: 25, desc: 'Is their problem clearly defined or vague?' },
              ].map(({ dimension, max, desc }) => (
                <div key={dimension} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">{dimension}</span>
                    <span className="text-xs text-gray-500">0–{max} pts</span>
                  </div>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
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
        </div>

        {/* Infrastructure */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Infrastructure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Hetzner VPS (CX22)', role: 'n8n self-hosting', detail: '2 vCPU, 4GB RAM, €4.51/month. Running Coolify for container management.' },
              { name: 'Coolify', role: 'Container orchestration', detail: 'Self-hosted PaaS. Manages n8n Docker container, SSL certificates, reverse proxy.' },
              { name: 'Vercel', role: 'Frontend + API hosting', detail: 'Next.js deployment. Automatic deploys from GitHub main branch. Global CDN.' },
              { name: 'Supabase Cloud', role: 'Managed database', detail: 'Free tier. Postgres 15. REST API auto-generated from schema. Row Level Security.' },
              { name: 'GitHub', role: 'Version control', detail: 'Source of truth. Vercel auto-deploys on every push to main.' },
              { name: 'Meta Cloud API', role: 'WhatsApp messaging', detail: 'Official API. Test number provided by Meta. Template messages for outbound.' },
            ].map(({ name, role, detail }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-sm">{name}</h3>
                    <p className="text-blue-400 text-xs mb-1">{role}</p>
                    <p className="text-gray-500 text-xs">{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full tech list */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Complete Technology List</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-500 font-medium">Technology</th>
                  <th className="text-left p-4 text-gray-500 font-medium">Category</th>
                  <th className="text-left p-4 text-gray-500 font-medium">Version</th>
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
                  ['Hetzner VPS', 'Cloud Infrastructure', 'CX22'],
                  ['Coolify', 'Container Management', 'v4'],
                  ['GitHub', 'Version Control', '-'],
                  ['Node.js', 'Runtime', '20.x (Vercel)'],
                ].map(([tech, category, version]) => (
                  <tr key={tech} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="p-4 font-medium text-white">{tech}</td>
                    <td className="p-4 text-gray-400">{category}</td>
                    <td className="p-4 text-gray-500 font-mono text-xs">{version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">See it in action</h2>
          <p className="text-gray-400 mb-6">Submit a lead and watch the entire pipeline run in real time.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Submit a Test Lead
            </Link>
            <Link href="/dashboard" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors">
              View Live Dashboard
            </Link>
            <Link href="/how-it-works" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors">
              Plain English Explanation
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
