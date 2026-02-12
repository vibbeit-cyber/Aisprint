import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy — AiSprint',
  description: 'AiSprint Refund Policy. Understand our 7-day refund guarantee and refund procedures.',
}

export default function RefundPolicyPage() {
  return (
    <div className="pt-16">
      <section className="bg-gray-50 pt-20 pb-12">
        <div className="container-custom max-w-3xl">
          <h1 className="section-heading mb-2">Refund Policy</h1>
          <p className="text-sm text-gray-400 font-body">Last updated: 1 January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="space-y-10 font-body text-gray-700 leading-relaxed text-sm">

            {/* Summary box */}
            <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
              <h2 className="font-heading font-bold text-base text-green-900 mb-2">Our Commitment to You</h2>
              <p className="text-green-800">
                We stand behind the quality of our programs. If you&apos;re not satisfied after your first session, we offer a full 7-day refund — no questions asked. We also offer mentor changes at no cost if the initial match isn&apos;t ideal.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">1. 7-Day Full Refund Guarantee</h2>
              <p>We offer a complete refund within 7 days of your first scheduled live session, provided:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The refund request is submitted within 7 calendar days of your first session</li>
                <li>You have attended no more than 2 sessions</li>
                <li>The request is made via email to refunds@AiSprint.in with your enrollment ID</li>
              </ul>
              <p className="mt-3">Approved refunds are processed within 7–10 business days to the original payment method. For EMI payments, the net amount disbursed is refunded.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">2. Partial Refunds (After 7 Days)</h2>
              <p>After the 7-day window, partial refunds may be granted at AiSprint&apos;s discretion in the following circumstances:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Medical emergencies:</strong> With valid documentation (medical certificate from a registered practitioner), pro-rated refund for unused sessions may be approved.</li>
                <li><strong>Extraordinary personal circumstances:</strong> Evaluated case-by-case. Must be submitted within 30 days of the event with supporting documentation.</li>
                <li><strong>Service failure:</strong> If AiSprint fails to assign a mentor within 14 days of enrollment, a full refund will be provided.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">3. No Refund Circumstances</h2>
              <p>Refunds will not be provided in the following situations:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>After 7 days from first session, in standard circumstances</li>
                <li>For no-shows to sessions without prior notice</li>
                <li>For change of mind after the 7-day refund period</li>
                <li>For sessions consumed or scheduled beyond the refund window</li>
                <li>Where enrollment has been terminated due to violation of our Code of Conduct</li>
                <li>For promotional pricing, scholarship, or heavily discounted enrollments (unless agreed otherwise in writing)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">4. Mentor Change Policy</h2>
              <p>If you are not satisfied with your assigned mentor for any reason, we offer a free mentor reassignment within the first 2 weeks of your program. Simply email support@AiSprint.in with your reasons, and we will facilitate a change within 5 business days. This is not subject to the 7-day refund window and does not count as a refund request.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">5. EMI & Financing Plans</h2>
              <p>If you enrolled using an EMI or deferred payment plan:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Refund is limited to the amount actually paid at the time of the refund request</li>
                <li>Cancellation of future EMI installments will be processed by the respective financing partner</li>
                <li>Any processing fees charged by the financing partner are non-refundable</li>
                <li>AiSprint is not responsible for any penalties or charges imposed by the EMI provider</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">6. International Payments</h2>
              <p>For payments made in foreign currencies (USD, EUR, GBP, SGD), refunds will be processed in INR equivalent at the exchange rate applicable on the date of the original transaction. Currency conversion fees and international transaction fees are non-refundable.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">7. How to Request a Refund</h2>
              <div className="p-5 bg-gray-50 rounded-2xl">
                <ol className="flex flex-col gap-3">
                  {[
                    'Send an email to refunds@AiSprint.in from your registered email address',
                    'Use the subject line: "Refund Request — [Your Enrollment ID]"',
                    'Include your full name, enrollment ID, course name, reason for refund, and bank/UPI details for the refund',
                    'Our team will acknowledge your request within 24 hours and respond with a decision within 5 business days',
                    'Approved refunds are credited within 7–10 business days',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-body">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">8. Dispute Resolution</h2>
              <p>If you believe your refund request was incorrectly handled, you may escalate by emailing grievances@AiSprint.in. We are committed to resolving all disputes fairly within 14 business days. Unresolved disputes may be escalated to the Consumer Forum under the Consumer Protection Act, 2019 (India).</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">9. Contact</h2>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p><strong>Refunds Desk</strong></p>
                <p>Email: refunds@AiSprint.in</p>
                <p>Response time: Within 24 hours on business days</p>
              </div>
            </div>

          </div>

          <div className="mt-12 p-6 bg-brand-50 rounded-2xl border border-brand-100 text-center">
            <p className="text-brand-800 text-sm font-body mb-3">
              Still have questions about our refund policy?
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Our Support Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
