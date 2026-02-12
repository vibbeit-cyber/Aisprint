import Link from 'next/link'

const courses = [
  {
    id: 'ml-ai',
    badge: 'Most Popular',
    badgeColor: 'badge-orange',
    icon: '🤖',
    title: 'Machine Learning & AI',
    subtitle: 'Comprehensive 16-Week Program',
    description:
      'From Python fundamentals to deploying production ML models. Master supervised learning, deep learning, NLP, computer vision, MLOps, and land a role as an AI/ML Engineer.',
    duration: '16 Weeks',
    sessions: '32 Live Sessions',
    level: 'Beginner → Advanced',
    outcomes: [
      'Build & deploy 4 production ML models',
      'Master PyTorch, TensorFlow & HuggingFace',
      'MLOps with Docker, AWS & CI/CD pipelines',
      'NLP pipelines & LLM fine-tuning',
    ],
    href: '/ml-ai',
    applyHref: '/ml-ai/apply',
    price: '₹79,999',
  },
  {
    id: 'prompt-engineering',
    badge: 'Hot Right Now',
    badgeColor: 'badge-blue',
    icon: '✨',
    title: 'Prompt Engineering & LLMs',
    subtitle: '8-Week Intensive Program',
    description:
      'The fastest path to working with AI professionally. Master prompt design, RAG systems, GPT-4, Claude, Gemini, and build AI-powered products that companies pay top dollar for.',
    duration: '8 Weeks',
    sessions: '16 Live Sessions',
    level: 'Beginner → Professional',
    outcomes: [
      'Advanced prompt patterns & chain-of-thought',
      'Build RAG systems with LangChain & LlamaIndex',
      'Fine-tune & deploy custom LLMs',
      'AI product development for SaaS companies',
    ],
    href: '/prompt-engineering',
    applyHref: '/prompt-engineering/apply',
    price: '₹44,999',
  },
]

export default function CoursesOverviewSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-blue mb-4">Our Programs</span>
          <h2 className="section-heading mt-3 mb-5">
            Two Focused Paths to an{' '}
            <span className="text-brand-600">AI Career</span>
          </h2>
          <p className="section-subheading mx-auto">
            Each program is built around your outcomes, not our content library. Choose based on where you want to go.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl">
                    {course.icon}
                  </div>
                  <span className={course.badgeColor}>{course.badge}</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-neutral-950 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs font-semibold text-brand-500 font-body mb-3 uppercase tracking-wide">
                  {course.subtitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed font-body">
                  {course.description}
                </p>
              </div>

              {/* Stats row */}
              <div className="px-8 py-4 border-y border-gray-100 grid grid-cols-3 gap-4">
                {[
                  { label: 'Duration', value: course.duration },
                  { label: 'Live 1:1', value: course.sessions },
                  { label: 'Level', value: course.level },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xs text-gray-400 font-body mb-0.5">{stat.label}</p>
                    <p className="text-xs font-semibold text-gray-800 font-body">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Outcomes */}
              <div className="px-8 py-5">
                <p className="text-xs font-semibold text-gray-500 font-body mb-3 uppercase tracking-wide">
                  What you&apos;ll achieve
                </p>
                <ul className="flex flex-col gap-2">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5">
                      <span className="text-brand-500 mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700 font-body">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div className="px-8 pb-8 pt-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-body">Total investment</p>
                    <p className="text-2xl font-heading font-bold text-neutral-950">{course.price}</p>
                  </div>
                  <span className="badge bg-green-50 text-green-700">EMI Available</span>
                </div>
                <div className="flex gap-3">
                  <Link href={course.applyHref} className="btn-primary flex-1 justify-center">
                    Apply Now
                  </Link>
                  <Link
                    href={course.href}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors font-body"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
