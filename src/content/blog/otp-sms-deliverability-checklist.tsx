import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-sms-deliverability-checklist',
  title: 'OTP SMS Deliverability Checklist for Production Apps',
  description:
    'Improve OTP delivery: E.164 numbers, DLT template ID match, TRAI scrubbing awareness, timing, retries, and monitoring for transactional SMS in India.',
  category: 'tutorials',
  keywords: [
    'OTP deliverability',
    'SMS OTP delivery rate',
    'improve OTP delivery',
    'SMS not received OTP',
    'E.164 phone format India',
    'OTP retry best practices',
    'transactional SMS delivery',
    'DLT template approval SMS',
    'SMS template ID mismatch India',
    'TRAI SMS scrubbing',
    'service implicit SMS delivery',
    'DLT SMS variable tagging OTP',
    'OTP SMS API India reliability',
  ],
  publishedAt: '2026-04-07',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'start-with-data', title: 'Start With Clean Phone Data' },
    { id: 'template-and-content', title: 'Template and Message Content' },
    { id: 'timing-and-ux', title: 'Timing and User Experience' },
    { id: 'retries-and-failover', title: 'Retries and Provider Failover' },
    { id: 'measurement', title: 'What to Measure' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-delivery-rates-india',
    'otp-verification-flow',
    'best-otp-api-india',
  ],
  faq: [
    {
      question: 'Why do some users never receive OTP SMS?',
      answer:
        'Common causes include wrong country code formatting, device or SIM issues, DND or filtering on promotional routes, template mismatch, temporary carrier congestion, and handset storage limits. Systematically verify E.164 formatting, template registration, and delivery status from your provider before assuming random failure.',
    },
    {
      question: 'How often should we let users resend OTP?',
      answer:
        'Offer a resend action after a short delay (for example thirty to sixty seconds) and cap total sends per number per hour. Each resend should be idempotent on the server side where possible to avoid duplicate charges and duplicate SMS.',
    },
    {
      question: 'Does message language affect deliverability?',
      answer:
        'Using the language and script registered in your DLT template matters. Mixing unregistered languages or adding marketing text to an OTP template can cause rejection or filtering.',
    },
  ],
  content: (
    <>
      <p>
        Poor OTP deliverability shows up as login failures, abandoned carts, and
        angry support tickets. Many issues are fixable with disciplined
        formatting, compliant templates, and good instrumentation. Use this
        checklist before you blame users or switch SMS providers.
      </p>

      <h2 id="start-with-data">Start With Clean Phone Data</h2>
      <p>
        Normalize every phone number to E.164 before you call your SMS API. For
        India, that typically means +91 followed by ten digits, with no
        leading zero in the national portion. Reject or correct obviously
        invalid input at signup instead of at send time.
      </p>
      <p>
        If you accept international numbers, maintain per-country rules and
        test with real SIMs on major operators. Our{' '}
        <Link href="/otp-api" className="text-primary hover:underline">
          API documentation
        </Link>{' '}
        describes the expected phone format for sends.
      </p>

      <h2 id="template-and-content">Template and Message Content</h2>
      <p>
        On Indian routes, your OTP body must follow an approved DLT template.
        Variables should map cleanly: OTP value, optional app name, and expiry
        minutes if you include them. Avoid adding promotional sentences or
        links that are not part of the registered pattern.
      </p>
      <p>
        If you manage templates yourself, budget time for approval churn. If
        you use a{' '}
        <Link href="/" className="text-primary hover:underline">
          hosted OTP service
        </Link>
        , confirm which placeholders the provider expects and test end-to-end
        in staging with production-like templates.
      </p>

      <h2 id="timing-and-ux">Timing and User Experience</h2>
      <p>
        Users abandon flows when OTPs arrive late or when the UI does not
        explain what to expect. Show clear copy that an SMS is coming, display a
        visible cooldown before resend, and support paste from SMS where
        platforms allow it.
      </p>
      <p>
        Align OTP validity with realistic delivery times: codes that expire in
        under two minutes cause unnecessary failures on congested networks.
        Refer to{' '}
        <Link
          href="/blog/otp-expiry-attempt-limits"
          className="text-primary hover:underline"
        >
          expiry and attempt limits
        </Link>{' '}
        for balanced defaults.
      </p>

      <h2 id="retries-and-failover">Retries and Provider Failover</h2>
      <p>
        Implement exponential backoff for automatic retries on your side only
        where your provider documents it; blind retries can duplicate messages
        or violate rate limits. Prefer providers that offer multi-carrier
        failover and transparent status codes so you can distinguish soft
        failures from hard invalid numbers.
      </p>
      <p>
        For operational playbooks when delivery drops, see{' '}
        <Link
          href="/blog/otp-delivery-rates-india"
          className="text-primary hover:underline"
        >
          OTP delivery rates in India
        </Link>{' '}
        and our{' '}
        <Link
          href="/blog/migrate-sms-provider-checklist"
          className="text-primary hover:underline"
        >
          provider migration checklist
        </Link>
        .
      </p>

      <h2 id="measurement">What to Measure</h2>
      <p>
        Track at minimum: send acceptance rate, delivery success rate (where
        available), time-to-deliver, verify success rate, and cost per successful
        verification. Slice by carrier or region if your provider exposes it.
      </p>
      <p>
        When you compare vendors, use the same traffic profile and time window.
        Our{' '}
        <Link
          href="/blog/otp-api-pricing-comparison-india"
          className="text-primary hover:underline"
        >
          OTP API pricing comparison for India
        </Link>{' '}
        explains how to compare total cost, not only per-SMS price.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Additional short answers appear in the FAQ section above.
      </p>
    </>
  ),
};
