import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { LeadSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { sendLeadEmails } from '../../../lib/email.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validated = LeadSchema.parse(body)

    // Get request metadata
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null
    const userAgent = request.headers.get('user-agent') || null

    // Insert lead into database
    const rows = await query<{ id: string; name: string; email: string; phone: string; experience: string; career_goal: string; course_type: string; created_at: Date }>(
      `INSERT INTO leads (name, email, phone, experience, career_goal, course_type, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7::inet, $8)
       RETURNING id, name, email, phone, experience, career_goal, course_type, created_at`,
      [
        validated.name,
        validated.email,
        validated.phone,
        validated.experience,
        validated.career_goal,
        validated.course_type,
        ip,
        userAgent,
      ]
    )

    const lead = rows[0]

    if (!lead) {
      throw new Error('Failed to insert lead')
    }

    // Send emails asynchronously (don't block response)
    // If emails fail, lead is still saved — emails logged as failed
    sendLeadEmails({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      experience: lead.experience,
      career_goal: lead.career_goal,
      course_type: lead.course_type as 'ml-ai' | 'prompt-engineering',
      created_at: lead.created_at,
    }).catch((error: unknown) => {
      // Log email failure but don't crash
      console.error('[API Lead] Email sending failed:', error)
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        id: lead.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 422 }
      )
    }

    // Log error in production (use your logging service)
    console.error('[API Lead] Error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    )
  }
}