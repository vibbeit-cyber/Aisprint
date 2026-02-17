import { NextRequest, NextResponse } from 'next/server'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
}

interface ChatRequest {
  message: string
  conversationHistory: Message[]
}

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are AiSprint's helpful AI Assistant. You represent AiSprint, an AI education and mentorship platform that offers:

1. **Courses**:
   - Machine Learning & AI course - Learn ML fundamentals, deep learning, NLP, and computer vision with 1:1 mentorship
   - Prompt Engineering course - Master prompt engineering, ChatGPT, and AI applications

2. **Key Features**:
   - Personalized 1:1 live mentorship from industry experts
   - Job placement support and career guidance
   - Startup India recognized program
   - Swayam recognized curriculum
   - Global placement opportunities
   - Hands-on projects and real-world applications

3. **Why Choose AiSprint**:
   - Expert mentors with industry experience
   - Personalized learning paths
   - Job placement assistance
   - Affordable pricing
   - Flexible learning schedules

Be helpful, friendly, and informative. Answer questions about our courses, programs, mentorship, placement support, and more. 
If a user wants to apply or get more information, guide them to the contact form or suggest they visit specific pages.
Always be professional and represent AiSprint positively.

When appropriate, suggest relevant courses, mentorship programs, or next steps.`

// Fallback knowledge base for course-related questions
const getKnowledgeBaseResponse = (
  userMessage: string
): string | null => {
  const message = userMessage.toLowerCase()

  // Course information
  if (
    message.includes('course') ||
    message.includes('ml') ||
    message.includes('ai') ||
    message.includes('prompt')
  ) {
    if (message.includes('prompt')) {
      return `Great question! Our **Prompt Engineering course** teaches you how to effectively work with AI models like ChatGPT, GPT-4, and other LLMs. 

You'll learn:
- Prompt design and optimization techniques
- Advanced ChatGPT usage
- Integrating AI into applications
- Real-world AI applications

**Duration**: 8-12 weeks
**Format**: 1:1 mentorship + group sessions
**Placement Support**: Yes
**Price**: Competitive and affordable

Would you like to know more details or apply for the course? Visit /prompt-engineering to learn more!`
    }

    if (message.includes('machine learning') || message.includes('ml')) {
      return `Excellent! Our **Machine Learning & AI course** is comprehensive and industry-focused.

You'll master:
- ML fundamentals and supervised/unsupervised learning
- Deep Learning with TensorFlow and PyTorch
- Natural Language Processing (NLP)
- Computer Vision
- Real-world projects and applications

**Duration**: 12-16 weeks
**Format**: Personalized 1:1 mentorship
**Mentors**: Industry experts from top companies
**Placement Support**: Yes, with global opportunities
**Recognition**: Startup India partner, Swayam recognized

Ready to start your AI journey? Visit /ml-ai or contact us for more details!`
    }

    return `We offer two main courses:
1. **Machine Learning & AI** - Comprehensive ML and deep learning course
2. **Prompt Engineering** - Master ChatGPT and LLM prompts

Both courses feature personalized 1:1 mentorship and job placement support. Which course interests you?`
  }

  // Mentorship questions
  if (message.includes('mentor') || message.includes('coaching')) {
    return `Our **1:1 Mentorship Program** is the heart of AiSprint! 

Each student gets:
- A dedicated industry expert mentor
- Personalized learning path
- Weekly 1:1 sessions
- Career guidance and job preparation
- Access to exclusive resources
- Lifetime community support

Our mentors have experience from companies like Google, Microsoft, Amazon, and leading startups.

Interested in learning more? Contact us or visit /courses!`
  }

  // Placement/jobs
  if (
    message.includes('placement') ||
    message.includes('job') ||
    message.includes('career') ||
    message.includes('employment')
  ) {
    return `We offer **Comprehensive Placement Support**:

✓ Resume & LinkedIn optimization
✓ Interview preparation
✓ Coding practice and DSA training
✓ Job interview connections
✓ Global placement opportunities
✓ Startup incubation support

Our students have been placed in top companies globally. We're recognized by Startup India and have strong industry connections.

Ready to transform your career? Apply for one of our courses today!`
  }

  // Pricing/pricing-related
  if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
    return `Our pricing is competitive and affordable! We offer flexible payment options.

For exact pricing details, please:
1. **Contact us** at support@aisprint.in
2. **Visit** the course pages (/ml-ai or /prompt-engineering)
3. **Fill out** the form to get a personalized quote

We also offer payment plans and financing options. Let's discuss what works best for you!`
  }

  // Eligibility
  if (message.includes('eligibility') || message.includes('require') || message.includes('prerequisite')) {
    return `Great question! Our courses are designed for:

**No strict prerequisites required**, but ideal candidates:
- Have basic Python knowledge (or willing to learn)
- Curious about AI and Machine Learning
- Committed to 1:1 learning
- Want hands-on project experience

Whether you're a student, career-changer, or professional - we have mentors who can guide you!

Ready to start? Contact us to discuss your background and learning goals.`
  }

  // Startup India / Recognition
  if (message.includes('startup india') || message.includes('swayam') || message.includes('recognition')) {
    return `Yes! AiSprint is:
✓ **Startup India recognized** - Official Startup India member
✓ **Swayam recognized** - Advanced level course recognition
✓ Industry-backed with partnerships with leading tech companies

This means:
- Credible and quality assured curriculum
- Government-backed initiatives
- Industry-aligned training
- Career advancement opportunities

Your training is recognized nationwide!`
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, conversationHistory } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check for knowledge base match first
    const knowledgeResponse = getKnowledgeBaseResponse(message)

    // Try to use OpenAI API if available
    const openaiKey = process.env.OPENAI_API_KEY
    const anthropicKey = process.env.ANTHROPIC_API_KEY

    if (openaiKey) {
      try {
        return await handleOpenAI(message, conversationHistory, openaiKey)
      } catch (openaiError) {
        console.error('OpenAI error:', openaiError)
        // Fall through to knowledge base
      }
    }

    if (anthropicKey) {
      try {
        return await handleAnthropic(message, conversationHistory, anthropicKey)
      } catch (anthropicError) {
        console.error('Anthropic error:', anthropicError)
        // Fall through to knowledge base
      }
    }

    // Use knowledge base response
    if (knowledgeResponse) {
      return NextResponse.json({ reply: knowledgeResponse })
    }

    // Fallback generic response
    const fallbackResponse = `Thanks for your question about "${message}"! 
    
To get more detailed information, I recommend:
1. Visit our courses page at /courses
2. Check out the specific course pages (/ml-ai or /prompt-engineering)
3. Contact our team at support@aisprint.in or use the contact form at /contact

Our team would be happy to answer any specific questions!`

    return NextResponse.json({ reply: fallbackResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message. Please try again.' },
      { status: 500 }
    )
  }
}

async function handleOpenAI(
  message: string,
  conversationHistory: Message[],
  apiKey: string
): Promise<NextResponse> {
  // Convert message history to OpenAI format
  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    ...conversationHistory.map((msg) => ({
      role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: msg.content,
    })),
    { role: 'user' as const, content: message },
  ]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content || 'Unable to generate response'

  return NextResponse.json({ reply })
}

async function handleAnthropic(
  message: string,
  conversationHistory: Message[],
  apiKey: string
): Promise<NextResponse> {
  // Build conversation for Anthropic
  const conversationText = conversationHistory
    .map((msg) => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
    .join('\n')

  const prompt = `${SYSTEM_PROMPT}\n\n${conversationText}\n\nHuman: ${message}\n\nAssistant:`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`)
  }

  const data = await response.json()
  const reply = data.content?.[0]?.text || 'Unable to generate response'

  return NextResponse.json({ reply })
}
