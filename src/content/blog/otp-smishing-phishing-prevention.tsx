import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-smishing-phishing-prevention',
  title: 'OTP Smishing: How Phishers Steal Codes (and How to Stop Them)',
  description:
    'How smishing attacks trick users into handing over OTPs in India, the warning signs, and the product, copy, and infrastructure changes that defeat them.',
  category: 'security',
  keywords: [
    'otp smishing india',
    'sms phishing otp',
    'otp social engineering',
    'fake sms otp scam',
    'phishing otp prevention',
    'do not share otp india',
    'otp scam awareness',
    'smishing defense product',
    'sms phishing template india',
    'safe sms otp delivery',
  ],
  publishedAt: '2026-05-02',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Security' },
  tableOfContents: [
    { id: 'what-is-smishing', title: 'What is Smishing' },
    { id: 'common-patterns', title: 'Common Patterns in India' },
    { id: 'sms-copy', title: 'OTP SMS Copy That Helps' },
    { id: 'in-app-cues', title: 'In-App Cues' },
    { id: 'never-call', title: 'The Never-Call Promise' },
    { id: 'reporting', title: 'Reporting and Takedowns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['prevent-otp-fraud', 'otp-security-best-practices', 'sim-swap-otp-protection-india'],
  faq: [
    {
      question: 'What\'s the difference between phishing and smishing?',
      answer:
        'Phishing usually means deceptive emails or websites. Smishing is the SMS version — fake messages or calls that trick the user into revealing an OTP, password, or banking detail. Vishing is the voice-call equivalent.',
    },
    {
      question: 'Should I include "do not share this OTP" in every SMS?',
      answer:
        'Yes. The line "Do not share this OTP with anyone, including bank staff" is one of the highest-ROI fraud-prevention nudges. It costs zero and demonstrably reduces social-engineering losses.',
    },
    {
      question: 'Can my SMS sender ID be spoofed?',
      answer:
        'In India, alphanumeric sender IDs registered through DLT are harder to spoof than international senders. StartMessaging\'s standard route uses pre-approved DLT-compliant senders so receivers see a recognized brand.',
    },
  ],
  content: (
    <>
      <p>
        OTP smishing is the simplest and most effective attack against
        consumer finance apps in India. The attacker doesn&rsquo;t need to
        break your encryption or your API &mdash; they just need the user to
        read out the code. This guide is about the product, copy, and
        infrastructure choices that lower smishing success rates.
      </p>

      <h2 id="what-is-smishing">What is Smishing</h2>
      <p>
        Smishing is phishing over SMS. The attacker sends a message
        impersonating your brand &mdash; &ldquo;Your account is blocked, share
        the OTP to unblock&rdquo; &mdash; or calls the user pretending to be
        bank staff and asks them to read the OTP that the real app just sent
        for an attacker-initiated transaction.
      </p>

      <h2 id="common-patterns">Common Patterns in India</h2>
      <ul>
        <li>
          <strong>KYC update scam:</strong> &ldquo;Your KYC will expire today.
          Click this link to update.&rdquo;
        </li>
        <li>
          <strong>Reward redemption:</strong> &ldquo;You&rsquo;ve won Rs 5000
          cashback. Share OTP to claim.&rdquo;
        </li>
        <li>
          <strong>Customer-care impersonation:</strong> A live caller claiming
          to be from the bank, asking for the OTP that &ldquo;was just
          sent.&rdquo;
        </li>
        <li>
          <strong>Reverse OTP:</strong> Attacker triggers a real OTP from your
          app, then calls and asks the user to read it back.
        </li>
      </ul>

      <h2 id="sms-copy">OTP SMS Copy That Helps</h2>
      <p>The body of the SMS is your last and only message-time defense:</p>
      <pre>
        <code>{`Your YourApp OTP is 482910.
Do not share this code with anyone, including YourApp staff.
This code expires in 10 minutes.
- YourApp`}</code>
      </pre>
      <ul>
        <li>Lead with the code (so users with autofill never need to read further).</li>
        <li>Include the explicit do-not-share line.</li>
        <li>Name the action (login / payment / signup) when possible.</li>
        <li>Sign with your brand so it feels official and so the user can spot fakes.</li>
      </ul>

      <h2 id="in-app-cues">In-App Cues</h2>
      <ul>
        <li>
          Show a banner above the OTP field: &ldquo;We will never call you for
          this code.&rdquo;
        </li>
        <li>
          Show an &ldquo;I&rsquo;m on a call right now&rdquo; checkbox that
          delays the verify by 30 seconds.
        </li>
        <li>
          Surface a quick &ldquo;Was this you?&rdquo; nudge after every
          high-risk action.
        </li>
      </ul>

      <h2 id="never-call">The Never-Call Promise</h2>
      <p>
        Make it brand policy: &ldquo;YourApp will never call you and ask for
        an OTP.&rdquo; Repeat it on every receipt, every push notification,
        and every customer-care touchpoint. Users who internalize this rule
        defeat 80% of vishing scripts on their own.
      </p>

      <h2 id="reporting">Reporting and Takedowns</h2>
      <p>
        Stand up a one-tap &ldquo;Report a fake message&rdquo; flow inside the
        app. Forward smishing samples to TRAI&rsquo;s Sanchar Saathi portal
        and to your SMS provider so the sender ID can be flagged. See our{' '}
        <Link href="/blog/prevent-otp-fraud">
          prevent OTP fraud guide
        </Link>{' '}
        for the full incident-response playbook.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        See also our{' '}
        <Link href="/blog/otp-security-best-practices">
          OTP security best practices
        </Link>{' '}
        article.
      </p>
    </>
  ),
};
