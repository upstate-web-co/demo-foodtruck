import type { APIContext } from 'astro'
import { SITE, MENU, SCHEDULE, CATERING } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a street taco food truck.

MENU:
${MENU.map(m => `- ${m.name} (${m.category}) — ${m.price} — ${m.description}${m.spicy ? ' 🔥 SPICY' : ''}`).join('\n')}

THIS WEEK'S SCHEDULE:
${SCHEDULE.map(s => `- ${s.day}: ${s.location}, ${s.time}`).join('\n')}

CATERING: ${CATERING.pricePerPerson}/person, min ${CATERING.minGuests} guests. ${CATERING.includes}

DELIVERY: Available on Uber Eats, DoorDash, and Grubhub.

INSTAGRAM: ${SITE.instagram} — follow for real-time location updates

RULES:
- Be fun, casual, and enthusiastic about tacos
- Keep answers concise (2-3 sentences)
- When asked about location: give today's schedule from the list
- Recommend specific menu items when possible
- For catering: direct to the catering form on the website`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message, history = [] } = await request.json() as { message?: string; history?: Array<{ role: string; content: string }> }
    if (!message) return Response.json({ reply: 'Yo! Ask about the menu, where we are today, or catering. 🌮' })

    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY

    if (!apiKey) {
      const lower = message.toLowerCase()
      const today = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][new Date().getDay()]
      const todaySchedule = SCHEDULE.find(s => s.day.toLowerCase() === today)

      if (lower.includes('where') || lower.includes('today') || lower.includes('location') || lower.includes('find')) {
        return Response.json({ reply: todaySchedule ? `Today (${todaySchedule.day}) we're at ${todaySchedule.location}, ${todaySchedule.time}! See you there 🌮` : `Check our full schedule on the site — and follow ${SITE.instagram} for real-time updates!` })
      }
      if (lower.includes('spicy') || lower.includes('hot')) return Response.json({ reply: `Our spiciest taco is El Diablo ($5) — chorizo, habanero salsa, ghost pepper crema, and pickled jalapeño. 🔥 Not for the faint of heart!` })
      if (lower.includes('best') || lower.includes('popular') || lower.includes('recommend')) return Response.json({ reply: `Our #1 is Al Pastor ($4) — marinated pork with pineapple, cilantro, and onion. If you want something special, try the Birria ($5) with consommé for dipping!` })
      if (lower.includes('cater') || lower.includes('event') || lower.includes('party') || lower.includes('wedding')) return Response.json({ reply: `We cater! ${CATERING.pricePerPerson} per person, ${CATERING.minGuests}+ guests. Fill out the catering form and we'll send a quote within 24 hours!` })
      if (lower.includes('deliver') || lower.includes('uber') || lower.includes('doordash') || lower.includes('grubhub')) return Response.json({ reply: `We deliver through Uber Eats, DoorDash, and Grubhub! Check the Order section on our site for links.` })
      if (lower.includes('menu') || lower.includes('taco')) return Response.json({ reply: `We've got 5 taco varieties ($4-$5), elote bowl ($8), loaded nachos ($10), churro bites ($5), horchata ($4), and Jarritos ($3). Check the full menu below!` })
      return Response.json({ reply: `Hey! I can help with today's location, menu recs, catering info, or delivery. What's up? 🌮` })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [...history.slice(-20).map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })), { role: 'user' as const, content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'Not sure about that — DM us on Instagram!' })
  } catch { return Response.json({ reply: 'Something went wrong. Call us at ' + SITE.phone + '! 🌮' }) }
}
