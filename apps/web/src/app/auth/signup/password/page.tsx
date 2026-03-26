import { Metadata } from 'next'
import PasswordStepForm from '@/components/forms/PasswordStepForm'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Password - AIsprint',
}

export default function PasswordStepPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email || ''

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10 overflow-x-hidden">

      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
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
        <div className="text-center mb-7">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create your free account
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Let’s create a password for{' '}
            <span className="font-medium text-gray-700">{email}</span>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <PasswordStepForm email={email} />
        </div>

        {/* ✅ Back to Sign In (CORRECT POSITION) */}
        <div className="text-center mt-6">
          <Link
            href="/auth/signin"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Back to sign in
          </Link>
        </div>

      </div>

    </main>
  )
}