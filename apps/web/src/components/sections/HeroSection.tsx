import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 md:pt-32 md:pb-28">


      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pill badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="badge-blue">🚀 Startup India Partner</span>
            <span className="badge-orange">🎓 Swayam Recognized</span>
            <span className="badge bg-green-50 text-green-700">✅ 94% Placement Rate</span>
          </div>

          {/* Headline */}
          <h1 className="section-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            Your{' '}
            <span className="relative">
              <span className="text-brand-600">AI Career</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

              </svg>
            </span>
            {' '}Starts With a{' '}
            <span className="text-brand-600">Real Mentor</span>
          </h1>

          <p className="section-subheading mx-auto mb-10 text-gray-600">
            Skip the pre-recorded noise. Get personalized 1:1 live sessions with industry experts who have built real AI systems at Google, Amazon, and top Indian unicorns.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Link href="/ml-ai/apply" className="btn-primary px-8 py-4 text-base">
              Apply for ML & AI Course
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/prompt-engineering/apply" className="btn-secondary px-8 py-4 text-base">
              Explore Prompt Engineering
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `hsl(${220 + i * 30}, 70%, 55%)` }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="font-medium text-gray-700">2,400+ enrolled</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="font-medium text-gray-700 ml-1">4.9/5 rating</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">🌍 40+ countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
