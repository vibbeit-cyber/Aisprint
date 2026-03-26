import { Metadata } from 'next'
import SignUpForm from '@/components/forms/ApplicationForm'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sign Up - AIsprint',
  description: 'Create your AIsprint account',
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-start justify-center px-4 pt-16 pb-10 relative overflow-hidden overflow-x-hidden">

      {/* background blobs (fixed overflow) */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-200/20 blur-3xl rounded-full pointer-events-none max-w-full" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-200/20 blur-3xl rounded-full pointer-events-none max-w-full" />

      <div className="relative z-10 w-full max-w-sm">

        {/* ✅ Bigger logo */}
        <div className="flex justify-center mb-7">
          <Image
            src="/logo.png"
            alt="AIsprint"
            width={140}
            height={44}
            className="object-contain"
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Create your free account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start your AI learning journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200/50 p-5 sm:p-6 shadow-sm">
          <SignUpForm />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-brand-600 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
}