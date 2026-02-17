import Link from 'next/link'
import Image from 'next/image'

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
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo2.png"
                alt="AiSprint Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s premier 1:1 live AI education platform. Partnered with Startup India and recognized by Swayam.
            </p>

            <div className="flex gap-3">
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
