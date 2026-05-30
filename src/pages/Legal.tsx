import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Scale } from 'lucide-react';

function LegalLayout({ title, subtitle, icon: Icon, children }: { title: string; subtitle: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6E3]">
      {/* Nav */}
      <nav className="border-b border-[#1F1F2E] sticky top-0 bg-[#050505]/90 backdrop-blur-xl z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border border-[#C5A23E]/40 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-5 h-5">
                <defs>
                  <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8a7229" />
                    <stop offset="50%" stopColor="#F4E08A" />
                    <stop offset="100%" stopColor="#8a7229" />
                  </linearGradient>
                </defs>
                <path d="M 22 50 A 28 28 0 1 1 78 50 L 78 58 L 56 58 L 56 50 L 70 50 L 70 48 A 20 20 0 1 0 50 70 L 50 78 A 28 28 0 0 1 22 50 Z" fill="url(#navGold)" />
                <rect x="47" y="30" width="6" height="40" fill="url(#navGold)" />
              </svg>
            </div>
            <span className="font-display text-sm font-semibold hidden sm:block">SB <span className="gold-shimmer">TRADEX</span></span>
          </Link>
          <Link to="/" className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] hover:text-[#C5A23E] transition-colors flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> BACK TO SITE
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="relative py-20 border-b border-[#1F1F2E]">
        <div className="absolute inset-0 spotlight pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C5A23E]/30 mb-6"
          >
            <Icon className="w-7 h-7 text-[#C5A23E]" strokeWidth={1.2} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#6B6B7B] text-lg"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-mono text-xs text-[#3A3A4A]"
          >
            Last Updated: January 15, 2025
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F1F2E] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-label text-[10px] tracking-[0.25em] text-[#6B6B7B] mb-4">
            © 2025 IKTAJ GROUP • SB TRADEX BY IKTAJ GROUP
          </div>
          <div className="flex items-center justify-center gap-6 text-xs">
            <Link to="/terms" className="text-[#6B6B7B] hover:text-[#C5A23E] transition-colors">Terms of Service</Link>
            <span className="text-[#1F1F2E]">•</span>
            <Link to="/privacy" className="text-[#6B6B7B] hover:text-[#C5A23E] transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The rules of engagement for the SB TRADEX platform."
      icon={Scale}
    >
      <div className="space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">1. Acceptance of Terms</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            By accessing or using SB TRADEX, operated by IKTAJ GROUP, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, you may not access or use our services. These terms constitute a legally 
            binding agreement between you and IKTAJ GROUP regarding your use of the platform.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">2. Description of Service</h2>
          <p className="text-[#6B6B7B] leading-relaxed mb-4">
            SB TRADEX provides educational content, market analysis, and trading signals for informational purposes only. 
            Our services include:
          </p>
          <ul className="list-disc list-inside text-[#6B6B7B] space-y-2 ml-4">
            <li>Premium trading signals across multiple markets (Forex, Stocks, Crypto, Commodities)</li>
            <li>Educational modules and mentorship programs</li>
            <li>Market analysis and research reports</li>
            <li>Private community access and networking opportunities</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">3. Not Financial Advice</h2>
          <div className="glass rounded-sm p-6 border-l-2 border-[#C5A23E]">
            <p className="text-[#E8E6E3] font-semibold mb-2">Important Disclaimer</p>
            <p className="text-[#6B6B7B] text-sm leading-relaxed">
              SB TRADEX does not provide investment advice, and nothing on this platform should be construed as a 
              recommendation to buy, sell, or hold any security or financial instrument. All content is for educational 
              and informational purposes only. You are solely responsible for your investment decisions.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">4. Subscription and Payment</h2>
          <p className="text-[#6B6B7B] leading-relaxed mb-4">
            Access to SB TRADEX is provided through tiered subscriptions:
          </p>
          <ul className="list-disc list-inside text-[#6B6B7B] space-y-2 ml-4">
            <li><strong className="text-[#E8E6E3]">Observer (Free):</strong> Basic market updates and limited content</li>
            <li><strong className="text-[#E8E6E3]">Strategist:</strong> Daily signals and full Academy access</li>
            <li><strong className="text-[#E8E6E3]">Architect:</strong> 1-on-1 mentorship and Inner Circle access</li>
          </ul>
          <p className="text-[#6B6B7B] leading-relaxed mt-4">
            Subscriptions are billed in advance and renew automatically unless cancelled. No refunds will be provided 
            for partial months. We reserve the right to modify pricing with 30 days notice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">5. Risk Disclosure</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            Trading financial instruments carries a high level of risk and may not be suitable for all investors. 
            Past performance is not indicative of future results. You could lose some or all of your invested capital. 
            Only trade with money you can afford to lose. Seek independent financial advice if unsure.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">6. Intellectual Property</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            All content on SB TRADEX, including but not limited to signals, analysis, videos, written content, and 
            platform design, is the exclusive property of IKTAJ GROUP. Unauthorized reproduction, distribution, or 
            sharing of content is strictly prohibited and may result in immediate termination of your account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">7. Contact</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            For questions regarding these Terms, please contact us at:{' '}
            <a href="mailto:legal@sbtradex.com" className="text-[#C5A23E] hover:underline">legal@sbtradex.com</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we handle your data with the same care we handle our positions."
      icon={Shield}
    >
      <div className="space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">1. Information We Collect</h2>
          <p className="text-[#6B6B7B] leading-relaxed mb-4">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-[#6B6B7B] space-y-2 ml-4">
            <li>Account information (name, email, phone number)</li>
            <li>Payment and billing information</li>
            <li>Profile information and preferences</li>
            <li>Communications with our support team</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">2. How We Use Your Information</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, including:
          </p>
          <ul className="list-disc list-inside text-[#6B6B7B] space-y-2 ml-4 mt-4">
            <li>Processing your subscription and payments</li>
            <li>Delivering signals and educational content</li>
            <li>Personalizing your experience on the platform</li>
            <li>Communicating with you about updates and offers</li>
            <li>Analyzing usage patterns to improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">3. Data Security</h2>
          <div className="glass rounded-sm p-6 border-l-2 border-[#C5A23E]">
            <p className="text-[#E8E6E3] font-semibold mb-2">Our Commitment</p>
            <p className="text-[#6B6B7B] text-sm leading-relaxed">
              We implement industry-standard security measures to protect your personal information. 
              This includes encryption in transit and at rest, secure payment processing, and regular 
              security audits. However, no method of transmission over the Internet is 100% secure.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">4. Third-Party Services</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            We use trusted third-party services for payment processing (Stripe), analytics, and communication. 
            These providers have access to your information only to perform specific tasks on our behalf and 
            are obligated not to disclose or use it for other purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">5. Your Rights</h2>
          <p className="text-[#6B6B7B] leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-[#6B6B7B] space-y-2 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data (subject to legal obligations)</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">6. Cookies and Tracking</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            We use cookies and similar technologies to enhance your experience, analyze usage, and assist 
            in our marketing efforts. You can control cookies through your browser settings, though disabling 
            cookies may affect platform functionality.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#C5A23E] mb-4">7. Contact Us</h2>
          <p className="text-[#6B6B7B] leading-relaxed">
            If you have questions about this Privacy Policy or our data practices, contact us at:{' '}
            <a href="mailto:privacy@sbtradex.com" className="text-[#C5A23E] hover:underline">privacy@sbtradex.com</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6E3] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A23E] opacity-[0.03] blur-[100px]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center px-6 max-w-2xl"
      >
        {/* 404 */}
        <div className="font-display text-[150px] md:text-[200px] font-bold leading-none gold-shimmer opacity-20 select-none">
          404
        </div>

        <div className="relative -mt-16">
          <div className="font-label text-[11px] tracking-[0.4em] text-[#C5A23E] mb-4">◆ VOID DETECTED ◆</div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">This Page Does Not Exist.</h1>
          <p className="text-[#6B6B7B] text-lg mb-8 max-w-md mx-auto">
            The position you are looking for has been closed, or perhaps it never existed in the first place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-gold font-label text-[11px] tracking-[0.25em] px-8 py-3.5 rounded-sm">
              RETURN HOME
            </Link>
            <Link to="/dashboard" className="btn-outline-gold font-label text-[11px] tracking-[0.25em] px-8 py-3.5 rounded-sm">
              GO TO DASHBOARD
            </Link>
          </div>
        </div>

        {/* Decorative */}
        <div className="mt-16 pt-8 border-t border-[#1F1F2E]">
          <div className="font-mono text-xs text-[#3A3A4A]">
            ERROR_CODE: VOID_404 • TIMESTAMP: {new Date().toISOString()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
