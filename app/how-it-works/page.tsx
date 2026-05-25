'use client'
import Link from 'next/link'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">← Back</Link>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span className="text-blue-400 text-sm font-medium">Live Demo — Real AI Scoring</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">How It Works — Plain English</h1>
          <p className="text-gray-400 text-lg">
            See how a real German company uses this system to stop wasting time on bad leads.
          </p>
        </div>

        {/* Company intro */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">M</div>
            <div>
              <h2 className="text-lg font-semibold">Müllertech GmbH — München, Germany</h2>
              <p className="text-gray-500 text-sm">B2B marketing agency. 12 employees. Runs campaigns for mid-size German manufacturers.</p>
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                Before this system, Müllertech's team spent 3–4 hours every day manually reading contact form submissions and deciding who to call.
                Hot prospects waited 24+ hours for a response. Cold leads got the same attention as real buyers.
                They were losing deals to faster agencies.
              </p>
            </div>
          </div>
        </div>

        {/* The problem */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">The Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '⏱', title: '3–4 hours wasted daily', desc: 'Sales team reading every lead manually before deciding who to call first.' },
              { icon: '📉', title: 'Hot leads going cold', desc: 'Serious buyers waited 24+ hours because no one knew they were serious.' },
              { icon: '🔁', title: 'Same follow-up for everyone', desc: 'Cold leads and hot leads got the same email. No prioritization.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-red-400 mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step by step */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">What Happens Step by Step</h2>
          <div className="space-y-4">

            {/* Step 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h3 className="font-semibold mb-2">A potential client fills in the contact form</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Thomas Wagner, Marketing Director at a Nürnberg manufacturer, finds Müllertech online and fills in their contact form.
                </p>
                <div className="bg-gray-800 rounded-lg p-4 text-sm">
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Thomas writes:</p>
                  <p className="text-gray-300 italic">"We need to completely automate our lead follow-up. We are losing deals every week because our sales team responds too slowly. Budget is €8,000. We need this running before our trade fair in 6 weeks."</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h3 className="font-semibold mb-2">The AI reads the message and scores it instantly</h3>
                <p className="text-gray-400 text-sm mb-4">
                  In about 2 seconds, the AI analyses Thomas's message across 4 dimensions. No human involved yet.
                </p>
                <div className="grid grid-cols-2 gap-3">
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
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(score / max) * 100}%` }} />
                      </div>
                      <p className="text-gray-500 text-xs">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h3 className="font-semibold mb-2">The system classifies Thomas as a HOT lead</h3>
                <p className="text-gray-400 text-sm mb-4">Total score: <span className="text-red-400 font-bold">92/100</span>. Any lead scoring 70+ is automatically classified as HOT.</p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-red-400">92</div>
                    <div className="text-xs text-gray-500 mt-1">out of 100</div>
                  </div>
                  <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="text-red-400 font-semibold text-sm mb-1">HOT LEAD — Call within 1 hour</div>
                    <p className="text-gray-400 text-xs">This lead has a defined budget, hard deadline, and is experiencing active pain. High probability of closing if contacted immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h3 className="font-semibold mb-2">Müllertech's owner gets a WhatsApp alert — immediately</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Within 10 seconds of Thomas submitting the form, the owner's phone buzzes with a WhatsApp message.
                </p>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">WA</div>
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

            {/* Step 5 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1">
                <h3 className="font-semibold mb-2">Everything is stored in the live dashboard</h3>
                <p className="text-gray-400 text-sm">
                  Thomas's lead — along with every other submission — appears in the real-time dashboard.
                  The team sees the score, the breakdown, the recommended action, and the full pipeline at a glance.
                  No spreadsheets, no manual sorting.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Results for Müllertech after 30 days</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '3h', label: 'Saved per day', sub: 'No more manual lead review' },
              { value: '< 10min', label: 'Response to hot leads', sub: 'Was 24+ hours before' },
              { value: '2x', label: 'Reply rate', sub: 'From contacting right leads first' },
              { value: '100%', label: 'Leads captured', sub: 'Nothing falls through the cracks' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">{value}</div>
                <div className="text-sm font-medium text-white mb-1">{label}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What about cold/warm */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">What happens to warm and cold leads?</h2>
          <div className="space-y-4">
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">WARM — Score 40–69</span>
              </div>
              <p className="text-gray-300 text-sm font-medium mb-1">Example: "We're exploring options for automating our email follow-ups. Not sure about budget yet."</p>
              <p className="text-gray-400 text-sm">System action: Tagged as warm, appears in dashboard, recommended action is "Send case study." No urgent alert — they go into the weekly follow-up list.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">COLD — Score below 40</span>
              </div>
              <p className="text-gray-300 text-sm font-medium mb-1">Example: "Hi, just curious what you do."</p>
              <p className="text-gray-400 text-sm">System action: Tagged cold, stored in dashboard, recommended action is "Low priority — monitor." No time wasted on them.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try it yourself</h2>
          <p className="text-gray-400 mb-6">Submit a test lead and watch the AI score it in real time. Check the dashboard to see where it lands.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Submit a Test Lead
            </Link>
            <Link href="/dashboard" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors">
              View Live Dashboard
            </Link>
            <Link href="/tech-stack" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors">
              See Technical Stack
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
