export default function PlacementSection() {
  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay',
    'Meesho', 'CRED', 'PhonePe', 'Zepto', 'Groww',
    'Swiggy', 'Zomato', 'Ola', 'Paytm', 'Freshworks',
  ]

  const services = [
    {
      icon: '📄',
      title: 'AI-Optimised CV Building',
      description: 'Your resume is crafted to pass ATS systems and impress hiring managers at top tech companies.',
    },
    {
      icon: '🎤',
      title: '5 Mock Interviews',
      description: 'Simulated technical and behavioural interviews with industry professionals, with recorded feedback.',
    },
    {
      icon: '🔗',
      title: 'Direct Recruiter Referrals',
      description: 'We maintain active relationships with 200+ hiring managers who trust our graduates.',
    },
    {
      icon: '💼',
      title: 'LinkedIn Profile Overhaul',
      description: 'Complete LinkedIn optimization including headlines, about section, and project showcasing.',
    },
    {
      icon: '🌐',
      title: 'Global Job Board Access',
      description: 'Exclusive access to curated AI/ML roles across India, Singapore, UAE, UK, and US.',
    },
    {
      icon: '🤝',
      title: '6-Month Placement Guarantee',
      description: "If you don't get placed in 6 months after completing the program, we extend support at no cost.",
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-brand-950 to-neutral-950 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge bg-brand-600/80 text-brand-200 mb-4">Placement Support</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mt-3 mb-5">
            We Don&apos;t Stop Until{' '}
            <span className="text-brand-300">You Get Hired</span>
          </h2>
          <p className="text-brand-200/70 text-lg leading-relaxed">
            Our placement team has 7+ years of experience connecting AI talent with the right companies globally. This isn&apos;t a career counselling add-on — it&apos;s a core part of the program.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-400/30 transition-all duration-200"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-heading font-bold text-white text-base mb-2">{service.title}</h3>
              <p className="text-sm text-brand-200/60 leading-relaxed font-body">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Companies */}
        <div className="text-center mb-8">
          <p className="text-sm text-brand-200/50 font-body uppercase tracking-widest mb-6">
            Our graduates work at
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {companies.map((company) => (
              <span
                key={company}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 font-body hover:bg-white/10 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '94%', label: 'Placement rate within 6 months' },
            { value: '₹12L+', label: 'Average first-year package' },
            { value: '40+', label: 'Countries represented' },
            { value: '200+', label: 'Hiring partners' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-brand-300 mb-1">{stat.value}</p>
              <p className="text-xs text-brand-200/50 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
