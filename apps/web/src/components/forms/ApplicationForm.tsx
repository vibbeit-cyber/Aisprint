'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApplicationFormProps {
  courseType: string
  courseTitle: string
  coursePrice: string
}

export default function ApplicationForm({ courseType, courseTitle, coursePrice }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    careerGoal: '',
    github: '',
    linkedin: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          course_type: courseType,
          course_title: courseTitle,
          course_price: coursePrice 
        }),
      })

      if (response.ok) {
        setSuccess(true)
      }
    } catch (error) {
      console.error('Application failed', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-8">Our team will contact you within 24 hours.</p>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
          Apply for another course
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone (WhatsApp/Call)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="+91 9876543210"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Experience
        </label>
        <textarea
          rows={3}
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-vertical"
          placeholder="Tell us about your current role, tech stack, years of experience..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Career Goal with this Course
        </label>
        <textarea
          rows={3}
          value={formData.careerGoal}
          onChange={(e) => setFormData({...formData, careerGoal: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-vertical"
          placeholder="What do you want to achieve? (Ex: ML Engineer role, AI product manager, freelance LLM consultant...)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub (optional)
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({...formData, github: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="https://github.com/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn (optional)
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-transparent focus:ring-brand-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {loading ? 'Submitting...' : `Apply for ${courseTitle}`}
      </button>
    </form>
  )
}

