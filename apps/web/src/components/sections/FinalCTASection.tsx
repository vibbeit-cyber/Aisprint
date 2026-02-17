import Link from 'next/link'

export default function FinalCTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-mesh">
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
      }} />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-6">
            <span className="badge bg-brand-900/80 text-brand-50">🚀 Startup India Partner</span>
            <span className="badge bg-brand-900/80 text-brand-50">🎓 Swayam Recognized</span>
          </div> 

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            The Best Time to Start Your AI Career Was Yesterday.{' '}
            <span className="text-brand-300">The Second Best Is Now.</span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto font-body">
            Seats are limited to 8 students per mentor per month. We keep cohorts small so every learner gets the attention they deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ml-ai/apply"
              className="btn-primary px-8 py-4 text-base border-white/20 text-white hover:bg-white/10"
            >
              Apply for ML & AI Course

            </Link>
            <Link
              href="/prompt-engineering/apply"
              className="btn-primary px-8 py-4 text-base border-white/20 text-white hover:bg-white/10"
            >
              Apply for Prompt Engineering
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500 font-body">
            Free orientation call · 7-day refund policy · No coding required for PE course
          </p>

          {/* Urgency indicator */}
          <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-amber-400 text-xs font-semibold font-body">
              Only 3 mentor slots remaining this month — as of {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
