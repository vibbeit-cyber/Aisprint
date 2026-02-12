export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Apply & Get Matched',
      description:
        'Fill out a short application. Our team reviews your background, goals, and schedule to match you with the right mentor within 48 hours.',
      icon: '📋',
      detail: 'Takes 5 minutes',
    },
    {
      step: '02',
      title: 'Free Orientation Call',
      description:
        'A 30-minute session with your assigned mentor to align on goals, assess your starting point, and build a personalized curriculum just for you.',
      icon: '📞',
      detail: '30-minute call',
    },
    {
      step: '03',
      title: 'Weekly 1:1 Live Sessions',
      description:
        '2× weekly live video sessions directly with your mentor. Share screen, work through problems together, get real-time code review and explanations.',
      icon: '🖥️',
      detail: '2× per week',
    },
    {
      step: '04',
      title: 'Build Real Projects',
      description:
        'Between sessions, you work on guided assignments and real projects. Your mentor reviews every submission and gives detailed written feedback.',
      icon: '🏗️',
      detail: '3–5 projects total',
    },
    {
      step: '05',
      title: 'Interview Prep & Placement',
      description:
        'In the final weeks, intensive mock interviews, portfolio review, and direct introductions to hiring companies in our network.',
      icon: '🎯',
      detail: 'Placement within 6 months',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-blue mb-4">The Process</span>
          <h2 className="section-heading mt-3 mb-5">
            How 1:1 Learning Actually Works
          </h2>
          <p className="section-subheading mx-auto">
            Every step is designed to minimize friction and maximize your progress. Here&apos;s exactly what happens from application to offer letter.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="flex gap-6 group">
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0 group-hover:bg-brand-700 transition-colors">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-200 to-brand-50 mt-2 min-h-[2rem]" />
                )}
              </div>

              {/* Content */}
              <div className={`${index < steps.length - 1 ? 'pb-10' : 'pb-0'} flex-1`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-brand-400 font-body uppercase tracking-widest">
                    STEP {step.step}
                  </span>
                  <span className="badge bg-gray-100 text-gray-500">{step.detail}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-950 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
