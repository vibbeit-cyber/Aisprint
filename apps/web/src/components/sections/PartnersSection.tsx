export default function PartnersSection() {
  const recognitions = [
    {
      logo: '🚀',
      name: 'Startup India',
      description: 'Officially recognized partner under the Startup India initiative by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India.',
      badge: 'DPIIT Recognized',
    },
    {
      logo: '📚',
      name: 'Swayam',
      description: 'Our curriculum and quality standards are recognized under SWAYAM — India\'s national online education platform by the Ministry of Education.',
      badge: 'MOE Recognized',
    },
    {
      logo: '🏢',
      name: 'NASSCOM',
      description: 'AiSprint\'s training framework is aligned with NASSCOM Future Skills Prime, India\'s largest digital skilling platform.',
      badge: 'Future Skills Aligned',
    },
    {
      logo: '🌐',
      name: 'ISO 9001:2015',
      description: 'Certified for quality management systems ensuring consistent, high-quality learning experiences across all our programs.',
      badge: 'Quality Certified',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-blue mb-4">Trust & Recognition</span>
          <h2 className="section-heading mt-3 mb-5">
            Backed by India&apos;s Most Credible{' '}
            <span className="text-brand-600">Institutions</span>
          </h2>
          <p className="section-subheading mx-auto">
            Our partnerships and recognitions are a direct reflection of the quality we hold ourselves to.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {recognitions.map((item) => (
            <div
              key={item.name}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl flex-shrink-0">
                {item.logo}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-bold text-base text-neutral-950">{item.name}</h3>
                  <span className="badge-blue text-xs">{item.badge}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-body">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 py-8 px-8 bg-gray-50 rounded-3xl flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { value: '2019', label: 'Founded' },
            { value: '₹0 VC', label: 'Bootstrapped & Profitable' },
            { value: '100%', label: 'India-Built' },
            { value: 'Govt.', label: 'Backed Programs' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-heading text-xl font-bold text-neutral-950">{item.value}</p>
              <p className="text-xs text-gray-500 font-body mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
