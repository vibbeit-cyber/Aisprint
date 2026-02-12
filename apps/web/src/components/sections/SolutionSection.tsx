export default function SolutionSection() {
  const pillars = [
    {
      number: '01',
      icon: '🎯',
      title: '1:1 Live Mentorship',
      description:
        'Every session is scheduled around you. Your mentor reviews your code, corrects your thinking in real time, and adapts explanations to your learning style. No generic lectures.',
      highlight: 'Average session rating: 4.97 / 5',
    },
    {
      number: '02',
      icon: '🌍',
      title: 'Global Placement Support',
      description:
        'Our career team has placed graduates at Google, Microsoft, Flipkart, Razorpay, Meesho, and 80+ startups globally. We do mock interviews, CV reviews, and referrals.',
      highlight: '94% placement within 6 months',
    },
    {
      number: '03',
      icon: '🏗️',
      title: 'Real Production Projects',
      description:
        'You don\'t just learn theory — you build and deploy. Every learner ships at least 3 real projects to GitHub and a public portfolio that hiring managers can verify.',
      highlight: 'Average 4 projects per learner',
    },
    {
      number: '04',
      icon: '🤝',
      title: 'Lifetime Access & Community',
      description:
        'Recordings of every session, updated curriculum as AI evolves, and a private alumni community of 2,400+ professionals. Pay once, grow forever.',
      highlight: '2,400+ active alumni network',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <span className="badge-blue mb-4">Our Approach</span>
            <h2 className="section-heading mt-3 mb-6">
              We Fixed Every Part That Was Broken About AI Education
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 font-body">
              AiSprint was built by engineers who were frustrated with their own learning journeys. We spent 18 months researching what makes AI learners actually land jobs — and built the platform from first principles.
            </p>

            {/* USP badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="badge bg-brand-50 text-brand-700 py-2 px-4">
                🚀 Startup India Partner
              </span>
              <span className="badge bg-amber-50 text-amber-700 py-2 px-4">
                🎓 Swayam Recognized
              </span>
              <span className="badge bg-green-50 text-green-700 py-2 px-4">
                ✅ NASSCOM Aligned
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="font-heading text-3xl font-bold text-brand-600">2,400+</p>
                <p className="text-sm text-gray-500 font-body">Students Enrolled</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-brand-600">94%</p>
                <p className="text-sm text-gray-500 font-body">Placement Rate</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-brand-600">40+</p>
                <p className="text-sm text-gray-500 font-body">Countries Served</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-brand-600">4.9★</p>
                <p className="text-sm text-gray-500 font-body">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right: pillars */}
          <div className="grid grid-cols-1 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-xl">
                    {pillar.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-brand-400 font-body">{pillar.number}</span>
                    <h3 className="font-heading font-bold text-base text-neutral-950">{pillar.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2 font-body">
                    {pillar.description}
                  </p>
                  <span className="text-xs font-semibold text-brand-600 font-body">{pillar.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
