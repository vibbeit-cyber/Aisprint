import { NextResponse } from 'next/server'

export async function GET() {
  // Base URL (fallback included for safety)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Google OAuth URL
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')

  // Required params
  googleAuthUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!)
  googleAuthUrl.searchParams.set(
    'redirect_uri',
    `${baseUrl}/api/auth/google/callback`
  )
  googleAuthUrl.searchParams.set('response_type', 'code')
  googleAuthUrl.searchParams.set('scope', 'openid email profile')

  // Optional but recommended
  googleAuthUrl.searchParams.set('access_type', 'offline')
  googleAuthUrl.searchParams.set('prompt', 'consent')

  // Redirect user to Google
  return NextResponse.redirect(googleAuthUrl.toString())
}