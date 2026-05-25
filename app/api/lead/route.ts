import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function scoreLead(lead: {
  name: string
  email: string
  company?: string
  message: string
}) {
  const prompt = `You are a lead scoring AI. Score this lead from 0 to 100 based on how likely they are to become a paying client.

Lead details:
- Name: ${lead.name}
- Company: ${lead.company || 'Not provided'}
- Message: ${lead.message}

Scoring criteria:
- Intent strength: Are they ready to buy or just browsing? (0-25 points)
- Budget signals: Do they mention budget, price, or investment? (0-25 points)
- Urgency: Do they have a deadline or timeline? (0-25 points)
- Specificity: Is their problem specific or vague? (0-25 points)

Return ONLY a JSON object with this exact structure:
{
  "score": <number 0-100>,
  "intent": <number 0-25>,
  "budget": <number 0-25>,
  "urgency": <number 0-25>,
  "specificity": <number 0-25>,
  "recommended_action": "<one of: 'Call within 1 hour' | 'Send case study' | 'Add to nurture sequence' | 'Low priority - monitor'>",
  "summary": "<one sentence explaining the score>"
}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content!)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message, channel } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert lead with stage 'new' first
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({ name, email, phone, company, message, channel, stage: 'new' })
      .select()
      .single()

    if (insertError) throw insertError

    // Score the lead with OpenAI
    const scoring = await scoreLead({ name, email, company, message })

    // Determine stage based on score
    const stage = scoring.score >= 70 ? 'hot' : scoring.score >= 40 ? 'warm' : 'cold'

    // Update lead with score
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        score: scoring.score,
        recommended_action: scoring.recommended_action,
        stage,
        score_breakdown: {
          intent: scoring.intent,
          budget: scoring.budget,
          urgency: scoring.urgency,
          specificity: scoring.specificity,
          summary: scoring.summary,
        },
      })
      .eq('id', lead.id)

    if (updateError) throw updateError

    // Trigger WhatsApp follow-up for hot leads via n8n
    console.log('N8N_WEBHOOK_URL:', process.env.N8N_WEBHOOK_URL)
    console.log('score:', scoring.score, 'phone:', phone)
    if (scoring.score >= 70 && process.env.N8N_WEBHOOK_URL && phone) {
      const webhookUrl = process.env.N8N_WEBHOOK_URL
      console.log('Calling n8n webhook:', webhookUrl)
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, message, score: scoring.score }),
      })
        .then(async (res) => {
          const text = await res.text()
          console.log('n8n response status:', res.status, 'body:', text)
        })
        .catch((err) => {
          console.error('n8n webhook error:', err)
        })
    }

    return NextResponse.json({ success: true, score: scoring.score, stage })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
