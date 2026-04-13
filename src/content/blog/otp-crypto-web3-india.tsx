import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-crypto-web3-india',
  title: 'OTP for Crypto Exchanges & Web3 Apps in India',
  description:
    'How Indian crypto exchanges and Web3 apps use phone OTP for KYC, withdrawals, and wallet recovery — and where SMS OTP must give way to hardware factors.',
  category: 'use-cases',
  keywords: [
    'crypto exchange otp india',
    'web3 phone verification',
    'crypto wallet otp recovery',
    'crypto kyc india otp',
    'binance wazirx otp',
    'crypto withdrawal otp',
    'crypto sim swap defense',
    'web3 onboarding india',
    'crypto exchange sms india',
    'crypto fintech otp india',
  ],
  publishedAt: '2026-05-10',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Product' },
  tableOfContents: [
    { id: 'why-otp', title: 'Why OTP at All for Crypto' },
    { id: 'where-otp-fits', title: 'Where OTP Fits' },
    { id: 'where-otp-fails', title: 'Where OTP Fails' },
    { id: 'recommended-stack', title: 'Recommended Auth Stack' },
    { id: 'india-context', title: 'Indian Regulatory Context' },
    { id: 'integration', title: 'Integration Notes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['sim-swap-otp-protection-india', 'otp-fintech-india', 'silent-authentication-vs-otp-india'],
  faq: [
    {
      question: 'Should crypto exchanges use SMS OTP at all?',
      answer:
        'For login and low-risk actions, yes. For withdrawals and changes to security settings, no — SMS OTP is too vulnerable to SIM swap. Use a TOTP authenticator app or hardware key for the highest-risk steps.',
    },
    {
      question: 'How do I migrate users from SMS OTP to TOTP without losing them?',
      answer:
        'Make TOTP optional first, with a one-time bonus or trust badge for users who enroll. Send a clear in-app notification explaining the SIM-swap risk. Most exchanges hit 30–50% adoption within three months of a well-designed campaign.',
    },
    {
      question: 'Is StartMessaging suitable for crypto exchanges?',
      answer:
        'Yes for the user-facing login OTP and for non-financial verifications. For withdrawal-time MFA, layer a TOTP or hardware factor on top so SMS interception alone can\'t drain a wallet.',
    },
  ],
  content: (
    <>
      <p>
        Crypto exchanges and Web3 apps have a different risk profile than
        regular fintech: a single account compromise can drain a wallet
        instantly and irreversibly. SMS OTP is still part of the stack for
        good reasons &mdash; but it&rsquo;s not enough on its own.
      </p>

      <h2 id="why-otp">Why OTP at All for Crypto</h2>
      <ul>
        <li>Universal: every Indian phone supports SMS, no app install needed.</li>
        <li>Low friction at signup: lower drop-off than asking for an authenticator app.</li>
        <li>Anchors a real identity to every account.</li>
        <li>Cheap: Rs 0.25 per OTP scales to millions of users.</li>
      </ul>

      <h2 id="where-otp-fits">Where OTP Fits</h2>
      <ul>
        <li>Initial signup and email/phone confirmation.</li>
        <li>Login from a new device (paired with device fingerprint).</li>
        <li>Re-confirming identity for view-only changes (default address, profile).</li>
        <li>Account recovery (paired with KYC re-check).</li>
      </ul>

      <h2 id="where-otp-fails">Where OTP Fails</h2>
      <p>
        For withdrawal authorization, security setting changes, and
        whitelisting new wallet addresses, SMS OTP is not enough. SIM swap
        is the dominant attack:{' '}
        <Link href="/blog/sim-swap-otp-protection-india">
          see our SIM swap defense article
        </Link>
        . Treat these flows as &ldquo;require TOTP or hardware key.&rdquo;
      </p>

      <h2 id="recommended-stack">Recommended Auth Stack</h2>
      <ol>
        <li>
          <strong>Phone OTP</strong> at signup and on every login from a new
          device.
        </li>
        <li>
          <strong>TOTP authenticator</strong> mandatory for any user who
          completes KYC and deposits funds.
        </li>
        <li>
          <strong>Withdrawal whitelist</strong> with 24-hour cooling period
          and TOTP confirmation when adding addresses.
        </li>
        <li>
          <strong>Hardware key (FIDO2)</strong> optional for power users; some
          exchanges offer fee discounts for FIDO2 users.
        </li>
        <li>
          <strong>Device binding</strong> across all of the above so a stolen
          credential alone can&rsquo;t move funds.
        </li>
      </ol>

      <h2 id="india-context">Indian Regulatory Context</h2>
      <p>
        Indian crypto exchanges operate under FIU registration and strict
        AML / CFT rules. Phone OTP plays a small but important role: it
        gives auditors a clean trail of which phone confirmed which
        action. Pair it with PAN and Aadhaar verification for the full KYC
        picture.
      </p>

      <h2 id="integration">Integration Notes</h2>
      <ol>
        <li>Lead the SMS body with the action (&ldquo;Withdraw Rs ...&rdquo;).</li>
        <li>Never include the destination wallet address in the SMS.</li>
        <li>
          Rate-limit OTP send by phone and IP &mdash; see our{' '}
          <Link href="/blog/otp-rate-limiting-guide">rate limiting guide</Link>.
        </li>
        <li>
          Log every verification with request ID, IP, and device
          fingerprint for the compliance team.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/otp-fintech-india">fintech OTP guide</Link> for
        the related architecture.
      </p>
    </>
  ),
};
