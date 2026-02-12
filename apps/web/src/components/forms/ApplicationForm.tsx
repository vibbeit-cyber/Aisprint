'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApplicationFormProps {
  courseType: 'ml-ai' | 'prompt-engineering'
  courseTitle: string
  coursePrice: string
}

type ExperienceLevel = 'no-experience' | 'beginner' | 'intermediate' | 'advanced'

const experienceLevels: { value: ExperienceLevel; label: string; desc: string }[] = [
  { value: 'no-experience', label: 'No Experience', desc: 'Never coded or worked with AI before' },
  { value: 'beginner', label: 'Beginner', desc: 'Some Python or basic data skills' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Used ML libraries or AI APIs before' },
  { value: 'advanced', label: 'Advanced', desc: 'Built ML models or AI applications' },
]

export default function ApplicationForm({ courseType, courseTitle, coursePrice }: ApplicationFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '' as ExperienceLevel | '',
    career_goal: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Full name is required (at least 2 characters)'
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'A valid email address is required'
    }
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')) && !/^\+[1-9]\d{7,14}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number (e.g. 9876543210)'
    }
    if (!form.experience) {
      newErrors.experience = 'Please select your experience level'
    }
    if (!form.career_goal.trim() || form.career_goal.trim().length < 10) {
      newErrors.career_goal = 'Please describe your career goal (at least 10 characters)'
    }
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, course_type: courseType }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/thank-you')
      } else {
        setServerError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Hidden course type */}
      <input type="hidden" name="course_type" value={courseType} />

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="label">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Rahul Sharma"
          value={form.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="rahul@example.com"
          value={form.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="label">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="9876543210"
          value={form.phone}
          onChange={handleChange}
          className={`input-field ${errors.phone ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        <p className="mt-1 text-xs text-gray-400 font-body">10-digit Indian mobile or international with country code</p>
        {errors.phone && <p className="mt-1 text-xs text-red-500 font-body">{errors.phone}</p>}
      </div>

      {/* Experience Level */}
      <div>
        <label className="label">
          Experience Level <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {experienceLevels.map((level) => (
            <label
              key={level.value}
              className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                form.experience === level.value
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="experience"
                value={level.value}
                checked={form.experience === level.value}
                onChange={() => {
                  setForm((prev) => ({ ...prev, experience: level.value }))
                  if (errors.experience) setErrors((prev) => ({ ...prev, experience: '' }))
                }}
                className="sr-only"
              />
              <span className={`text-sm font-semibold font-body ${form.experience === level.value ? 'text-brand-700' : 'text-gray-800'}`}>
                {level.label}
              </span>
              <span className="text-xs text-gray-500 font-body mt-0.5">{level.desc}</span>
            </label>
          ))}
        </div>
        {errors.experience && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.experience}</p>}
      </div>

      {/* Career Goal */}
      <div>
        <label htmlFor="career_goal" className="label">
          What is your career goal? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="career_goal"
          name="career_goal"
          rows={4}
          placeholder="E.g. I want to transition from software engineering to a Machine Learning role at a product startup within 6 months..."
          value={form.career_goal}
          onChange={handleChange}
          className={`input-field resize-none ${errors.career_goal ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.career_goal && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.career_goal}</p>}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-body">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Submitting Application...
          </>
        ) : (
          <>
            Submit Application for {courseTitle}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-400 font-body">
        By submitting, you agree to our{' '}
        <a href="/policies/privacy" className="underline hover:text-gray-600">Privacy Policy</a>
        {' '}and{' '}
        <a href="/policies/terms" className="underline hover:text-gray-600">Terms & Conditions</a>.
        Investment: {coursePrice}.
      </p>
    </form>
  )
}
