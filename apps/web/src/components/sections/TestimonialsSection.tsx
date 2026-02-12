const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'ML Engineer at Razorpay',
    image: 'RS',
    color: 'from-blue-500 to-blue-700',
    quote:
      'I spent 2 years doing Coursera courses and couldn\'t crack a single ML interview. 4 months into AiSprint\'s 1:1 program, I had 3 offers on the table. The personalised mentorship changes everything.',
    course: 'ML & AI Program',
    package: '₹22 LPA',
  },
  {
    name: 'Priya Nair',
    role: 'AI Product Manager at Microsoft',
    image: 'PN',
    color: 'from-purple-500 to-purple-700',
    quote:
      'As a non-technical PM, I was worried I wouldn\'t survive the prompt engineering course. My mentor adjusted every session to my level and within 8 weeks I was building LLM-powered features for our product team.',
    course: 'Prompt Engineering',
    package: '₹28 LPA',
  },
  {
    name: 'Aditya Verma',
    role: 'Data Scientist at Google',
    image: 'AV',
    color: 'from-green-500 to-green-700',
    quote:
      'The 1:1 format forces accountability in a way no cohort course can. My mentor knew when I was stuck before I did. The real projects we built together are literally in my GitHub and got me the Google interview.',
    course: 'ML & AI Program',
    package: '₹45 LPA',
  },
  {
    name: 'Deepika Srinivasan',
    role: 'Senior LLM Engineer at Cohere',
    image: 'DS',
    color: 'from-rose-500 to-rose-700',
    quote:
      'I was skeptical about the Swayam recognition — but it actually made my employer take my certificate seriously. More importantly, the curriculum was 6 months ahead of what the competition was teaching.',
    course: 'Prompt Engineering',
    package: '$95K USD',
  },
  {
    name: 'Karan Mehta',
    role: 'AI Researcher at IIT Bombay → Amazon',
    image: 'KM',
    color: 'from-amber-500 to-amber-700',
    quote:
      'Coming from an academic background, I needed industry context. My mentor had built ML systems at Amazon and bridged that gap perfectly. Startup India recognition also helped with my research grant applications.',
    course: 'ML & AI Program',
    package: '₹32 LPA',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Freelance AI Consultant (Singapore)',
    image: 'AK',
    color: 'from-teal-500 to-teal-700',
    quote:
      'I moved from HR to AI consulting in under a year. The placement team helped me target the Singapore market specifically and made direct introductions. I now charge SGD 180/hour for AI consulting.',
    course: 'Prompt Engineering',
    package: 'SGD 180/hr',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-blue mb-4">Student Stories</span>
          <h2 className="section-heading mt-3 mb-5">
            Real People. Real Jobs.{' '}
            <span className="text-brand-600">Real Packages.</span>
          </h2>
          <p className="section-subheading mx-auto">
            These aren&apos;t cherry-picked reviews — they&apos;re a cross-section of what our graduates achieve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm text-gray-700 leading-relaxed font-body flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-950 text-sm font-body truncate">{t.name}</p>
                  <p className="text-xs text-gray-500 font-body truncate">{t.role}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-brand-600 font-body">{t.package}</p>
                  <p className="text-xs text-gray-400 font-body">{t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
