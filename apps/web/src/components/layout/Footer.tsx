import Link from 'next/link'

const footerLinks = {
  Courses: [
    { label: 'ML & AI Program', href: '/ml-ai' },
    { label: 'Prompt Engineering', href: '/prompt-engineering' },
    { label: 'All Courses', href: '/courses' },
  ],
  Company: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Apply Now', href: '/ml-ai/apply' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms & Conditions', href: '/policies/terms' },
    { label: 'Refund Policy', href: '/policies/refund' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-400">
      {/* Top section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-heading font-bold text-sm">
                AI
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                Ai<span className="text-brand-400">SPRINT</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s premier 1:1 live AI education platform. Partnered with Startup India and recognized by Swayam.
            </p>
            <div className="flex gap-3">
              {/* Social icons */}
              {['LinkedIn', 'Twitter', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-600 flex items-center justify-center transition-colors"
                >
                  <span className="text-xs font-semibold text-white">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="badge bg-white/10 text-gray-300 text-xs">
                🚀 Startup India Partner
              </span>
              <span className="badge bg-white/10 text-gray-300 text-xs">
                🎓 Swayam Recognized
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white text-sm mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AiSprint Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Chennai, Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  )
}
