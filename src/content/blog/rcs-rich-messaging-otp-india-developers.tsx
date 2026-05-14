import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'rcs-rich-messaging-otp-india-developers',
  title: 'RCS Rich Messaging for OTP in India: What Developers Should Know',
  description:
    'How RCS (Rich Communication Services) differs from plain SMS for OTP and alerts in India, operator coverage realities, fallback design, and when RCS is worth the integration cost.',
  category: 'tutorials',
  keywords: [
    'RCS OTP India',
    'RCS messaging API India',
    'rich messaging OTP',
    'SMS vs RCS authentication',
    'Google RCS business messaging India',
    'OTP delivery RCS fallback',
    'RCS developer India',
  ],
  publishedAt: '2026-05-14',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'what-rcs', title: 'What RCS Changes for OTP' },
    { id: 'coverage', title: 'Coverage and Handset Reality in India' },
    { id: 'architecture', title: 'Architecture: RCS First, SMS Fallback' },
    { id: 'branding', title: 'Branding, Trust, and Phishing Resistance' },
    { id: 'dlt', title: 'DLT, Templates, and Regulatory Parallels' },
    { id: 'when', title: 'When to Prioritise RCS' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'sms-otp-vs-whatsapp-otp',
    'otp-sms-deliverability-checklist',
    'what-is-sms-otp',
    'voice-otp-vs-sms-otp-india',
  ],
  faq: [
    {
      question: 'Can RCS fully replace SMS OTP in India today?',
      answer:
        'Not as a sole channel. RCS availability depends on the user device, default messaging app, and carrier RCS profile. Production systems should always implement SMS (or voice) fallback with the same OTP semantics and expiry.',
    },
    {
      question: 'Is an OTP delivered over RCS more secure than SMS?',
      answer:
        'RCS can improve trust when the brand is verified and the UI shows the business profile, which reduces some impersonation patterns. It does not remove SIM-swap or device-compromise risks. Treat RCS as a presentation layer, not a new trust root.',
    },
    {
      question: 'Do I need separate DLT templates for RCS and SMS?',
      answer:
        'SMS to Indian mobiles still flows through DLT-style controls. RCS business messaging has its own onboarding with aggregators. If you run both channels, expect parallel template and approval workflows until your provider abstracts them.',
    },
  ],
  content: (
    <>
      <p>
        Indian users are used to SMS OTP.{' '}
        <strong>RCS (Rich Communication Services)</strong> adds branded
        cards, suggested replies, and read receipts inside the default
        messaging experience on supported Android devices. For product teams
        evaluating &ldquo;rich OTP,&rdquo; this guide frames the engineering
        trade-offs without vendor hype.
      </p>

      <h2 id="what-rcs">What RCS Changes for OTP</h2>
      <p>
        Plain SMS OTP is a string in a thread. RCS OTP can be a structured
        message with your logo, a short explainer line, and action chips
        (&ldquo;It was me&rdquo; / &ldquo;Report&rdquo;). That improves UX for
        high-value flows (wallet load, device authorisation) where users
        hesitate on anonymous short codes.
      </p>
      <ul>
        <li>
          <strong>Rendering:</strong> RCS is an IP channel; SMS is CSMS. Your
          backend still generates a random code; the channel only changes how
          it is framed.
        </li>
        <li>
          <strong>Latency:</strong> RCS can be faster on Wi‑Fi, but can also
          queue longer on congested mobile data. Always measure end-to-end
          verify latency, not just send API latency.
        </li>
      </ul>

      <h2 id="coverage">Coverage and Handset Reality in India</h2>
      <p>
        Coverage is a moving target: dual-SIM behaviour, OEM messaging apps,
        and users who disabled RCS all create gaps. Before you commit UI copy
        to &ldquo;Open Messages to see your branded OTP,&rdquo; run a cohort
        study on your own user base (Android version, manufacturer, carrier).
      </p>

      <h2 id="architecture">Architecture: RCS First, SMS Fallback</h2>
      <ol>
        <li>
          Issue a single logical <code>verificationId</code> server-side.
        </li>
        <li>
          Attempt RCS send through your aggregator; persist provider message
          id.
        </li>
        <li>
          If RCS is not reachable within a tight SLA (for example 2–3
          seconds), fall back to SMS OTP automatically.
        </li>
        <li>
          Keep the same code length, TTL, and rate limits across channels to
          avoid split-brain verification logic.
        </li>
      </ol>

      <h2 id="branding">Branding, Trust, and Phishing Resistance</h2>
      <p>
        Verified sender profiles help users distinguish you from smishing
        templates that spoof bank names in SMS bodies. They do not replace
        device binding, step-up rules, or{' '}
        <Link href="/blog/otp-smishing-phishing-prevention">
          phishing-resistant patterns
        </Link>
        .
      </p>

      <h2 id="dlt">DLT, Templates, and Regulatory Parallels</h2>
      <p>
        SMS OTP to Indian numbers still sits under TRAI&rsquo;s DLT framework
        when sent as commercial SMS. RCS onboarding is a parallel track with
        aggregators. Plan compliance reviews for both paths if you operate a
        hybrid stack. Many teams start with SMS-only APIs such as{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> and add RCS later
        once product metrics justify the operational overhead.
      </p>

      <h2 id="when">When to Prioritise RCS</h2>
      <ul>
        <li>High-value transactions where branded UI reduces drop-off.</li>
        <li>Flows where you already see heavy SMS smishing in user research.</li>
        <li>Android-heavy user bases with measured RCS reach above your bar.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For cost and control today, most Indian startups still ship SMS OTP
        first. RCS becomes interesting once you have the analytics to prove
        incremental completion rates on your cohort.
      </p>
    </>
  ),
};
