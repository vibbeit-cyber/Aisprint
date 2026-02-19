import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { LeadSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { sendApplicationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1️⃣ Validate input
    const validated = LeadSchema.parse(body)

    // 2️⃣ Capture request metadata
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null

    const userAgent = request.headers.get('user-agent') || null

    // 3️⃣ Insert into PostgreSQL
    const rows = await query<{ id: string }>(
      `
      INSERT INTO leads 
      (name, email, phone, experience, career_goal, course_type, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7::inet, $8)
      RETURNING id
      `,
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

    const leadId = rows[0]?.id

    // 4️⃣ Send email (non-blocking)
    sendApplicationEmail({
      name: validated.name,
      email: validated.email,
      course: validated.course_type,
    }).catch((emailError) => {
      console.error('[Email Send Error]', emailError)
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        id: leadId,
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

    console.error('[Lead API Error]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    )
  }
}
