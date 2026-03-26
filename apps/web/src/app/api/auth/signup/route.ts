import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import {
  hashPassword,
  isValidEmail,
  isValidPassword,
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { username, email, password } = body

    // ✅ Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // ✅ Validate password
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Password must be at least 8 characters with uppercase, lowercase, and numbers',
        },
        { status: 400 }
      )
    }

    // ✅ Auto-generate username (UXcel style)
    if (!username) {
      const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
      const random = Math.floor(1000 + Math.random() * 9000)
      username = `${base}${random}`
    }

    // ✅ Ensure username is unique
    let finalUsername = username
    let attempt = 0

    while (attempt < 5) {
      const existing = await query(
        'SELECT id FROM public.users WHERE username = $1',
        [finalUsername]
      )

      if (existing.length === 0) break

      finalUsername = `${username}${Math.floor(Math.random() * 1000)}`
      attempt++
    }

    // ❌ If still duplicate after attempts
    if (attempt === 5) {
      return NextResponse.json(
        { success: false, message: 'Failed to generate unique username' },
        { status: 500 }
      )
    }

    // ✅ Check email uniqueness
    const existingEmail = await query(
      'SELECT id FROM public.users WHERE email = $1',
      [email]
    )

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      )
    }

    // ✅ Hash password
    const passwordHash = await hashPassword(password)

    // ✅ Insert user
    const userResult = await query(
      `INSERT INTO public.users (name, username, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, username, name`,
      [
        email.split('@')[0], // name
        finalUsername,
        email,
        passwordHash,
      ]
    )

    const user = userResult[0]

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Failed to create account' },
        { status: 500 }
      )
    }

    // ✅ Optional: send email (safe fail)
    try {
      const { sendSignupConfirmation } = await import('@/lib/email.service')
      await sendSignupConfirmation({
        name: user.name as string,
        email: user.email as string,
      })
    } catch (err) {
      console.error('Email send failed (non-blocking):', err)
    }

    // ✅ SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Sign up error:', error)

    return NextResponse.json(
      { success: false, message: 'An error occurred during sign up' },
      { status: 500 }
    )
  }
}