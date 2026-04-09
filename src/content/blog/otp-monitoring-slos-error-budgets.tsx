import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-monitoring-slos-error-budgets',
  title: 'Monitoring OTP Health: SLOs, Error Budgets, and Alerts',
  description:
    'Define SLOs for OTP send and verify paths and monitor TRAI-compliant transactional SMS health—not just API uptime—for Indian peak traffic.',
  category: 'business',
  keywords: [
    'OTP API monitoring',
    'SMS OTP SLO',
    'error budget OTP',
    'on-call OTP alerts',
    'verification success rate',
    'OTP metrics dashboard',
    'TRAI SMS OTP reliability',
    'DLT SMS delivery monitoring',
    'transactional SMS SLA India',
    'bulk SMS OTP observability',
    'SMS gateway uptime OTP',
  ],
  publishedAt: '2026-04-18',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'not-generic-uptime', title: 'Beyond Generic API Uptime' },
    { id: 'golden-signals', title: 'Golden Signals for OTP' },
    { id: 'error-budgets', title: 'Error Budgets and Product Tradeoffs' },
    { id: 'relation-to-scale-post', title: 'How This Extends Scale Guidance' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'phone-verification-at-scale-best-practices',
    'otp-delivery-status-polling-vs-webhooks',
    'otp-delivery-rates-india',
  ],
  faq: [
    {
      question: 'Is this the same as phone verification at scale?',
      answer:
        'The scale article covers architecture and fraud. This article focuses on measurable SLOs and alerting—complementary, not a copy.',
    },
    {
      question: 'What is a reasonable OTP verify success SLO?',
      answer:
        'It depends on your user mix and network. Start from observed baselines, then set targets that improve UX without blaming the SMS channel for every carrier blip.',
    },
  ],
  content: (
    <>
      <p>
        <Link
          href="/blog/phone-verification-at-scale-best-practices"
          className="text-primary hover:underline"
        >
          Phone verification at scale
        </Link>{' '}
        discussed architecture. This post focuses on <strong>operational
        metrics</strong>: what to measure, how to alert, and how to tie OTP
        reliability to product decisions—without repeating the same
        paragraphs as our{' '}
        <Link
          href="/blog/otp-sms-deliverability-checklist"
          className="text-primary hover:underline"
        >
          deliverability checklist
        </Link>
        , which is about message content and templates.
      </p>

      <h2 id="not-generic-uptime">Beyond Generic API Uptime</h2>
      <p>
        Your API gateway can return 200 while users still fail login because SMS
        never arrived or verification timed out. Track <em>end-to-end</em>{' '}
        outcomes: request OTP → user submits code → verify succeeds, segmented
        by region and client version.
      </p>

      <h2 id="golden-signals">Golden Signals for OTP</h2>
      <p>
        Useful starting points: send acceptance rate from your provider,
        latency from send click to SMS received (sampled with user consent or
        instrumentation), verify success rate, and cost per successful
        verification. If you poll status, include{' '}
        <Link
          href="/blog/otp-delivery-status-polling-vs-webhooks"
          className="text-primary hover:underline"
        >
          delivery state
        </Link>{' '}
        in analytics.
      </p>

      <h2 id="error-budgets">Error Budgets and Product Tradeoffs</h2>
      <p>
        If verify success drops below SLO for a week, freeze new auth features
        and invest in carrier diagnostics or UX copy. Error budgets turn
        reliability into a shared product decision, not only an on-call
        problem.
      </p>

      <h2 id="relation-to-scale-post">How This Extends Scale Guidance</h2>
      <p>
        Indian peak hours and festivals can spike OTP volume—{' '}
        <Link
          href="/blog/otp-delivery-rates-india"
          className="text-primary hover:underline"
        >
          delivery benchmarks
        </Link>{' '}
        help set realistic targets. Pair monitoring with{' '}
        <Link href="/pricing" className="text-primary hover:underline">
          cost visibility
        </Link>{' '}
        so engineering and finance agree when to optimize code versus when to
        negotiate volume.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>See FAQ above.</p>
    </>
  ),
};
