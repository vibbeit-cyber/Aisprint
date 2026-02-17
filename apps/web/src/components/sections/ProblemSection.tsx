export default function ProblemSection() {
  const problems = [
    {
      icon: '🎬',
      title: 'Hours of Passive Video Content',
      description:
        'You watch lecture after lecture, but nothing sticks. No one answers your specific questions or explains why the code breaks on your machine.',
    },
    {
      icon: '🏝️',
      title: 'Zero Real-World Context',
      description:
        'Courses teach you toy datasets and hello-world models. Nobody shows you how AI is deployed at scale in production systems.',
    },
    {
      icon: '📋',
      title: 'Generic Certificates That Mean Nothing',
      description:
        'You spend ₹40,000 on a course, get a PDF certificate, and still can\'t answer basic interview questions from real companies.',
    },
    {
      icon: '👻',
      title: 'Disappear After You Pay',
      description:
        'Support teams take 3 days to reply. The "community" is a ghost town. You\'re stuck debugging alone at 2 AM with no help.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-orange mb-4">The Hard Truth</span>
          <h2 className="section-heading mt-3 mb-5">
            Why Are 91% of AI Learners Still Unemployed After Courses?
          </h2>
          <p className="section-subheading mx-auto">
            The online AI learning market is broken. Pre-recorded courses, generic curriculum, and zero accountability are leaving lakhs of learners stuck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-2xl bg-red-50/60 border border-red-100 hover:border-red-200 transition-colors"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">{problem.icon}</div>
              <div>
                <h3 className="font-heading font-bold text-base text-neutral-950 mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-body">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout stat */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-neutral-950 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/100 to-transparent" />
            <div className="relative z-10">
              <p className="text-4xl font-heading font-bold text-white mb-2">
                ₹2.1 Lakh
              </p>
              <p className="text-white text-sm font-body">
                Average amount Indians spend on online AI courses before landing their first relevant job  mostly on courses that don&apos;t work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
