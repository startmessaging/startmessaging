import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-event-ticketing-india',
  title: 'OTP for Event Ticketing and Bookings in India',
  description:
    'How concert, IPL and movie ticketing apps in India use OTP for sign-up, queue protection, payment and entry-gate verification — with patterns to survive 50× traffic spikes.',
  category: 'use-cases',
  keywords: [
    'event ticketing otp',
    'movie ticket otp india',
    'concert ticket otp',
    'ipl ticket otp',
    'event booking sms',
    'ticket entry otp',
  ],
  publishedAt: '2026-04-29',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Ticketing Apps Burn OTPs' },
    { id: 'flows', title: 'OTP Flows in Event Ticketing' },
    { id: 'spike', title: 'Surviving the Sale-Open Spike' },
    { id: 'fraud', title: 'Fraud Defences' },
    { id: 'gate-otp', title: 'Entry-Gate OTPs' },
    { id: 'compliance', title: 'Compliance Notes' },
    { id: 'reference', title: 'Reference Implementation' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-travel-hotel-booking-india',
    'otp-bot-attacks-traffic-pumping',
    'otp-rate-limiting-guide',
    'otp-gaming-fantasy-india',
  ],
  faq: [
    {
      question: 'How do I size capacity for a 50× spike at sale-open?',
      answer:
        'Pick an OTP API with no monthly minimums and elastic per-second throughput. Pre-warm the queue with non-blocking sends; rate-limit per phone, per IP, and per device fingerprint to suppress bots.',
    },
    {
      question: 'Should the entry-gate OTP be the same as the sign-up OTP?',
      answer:
        'No — generate a fresh, short-lived (5-min) ticket-code on demand. Reusing the sign-up OTP creates replay attacks where a screenshot of one OTP unlocks the gate.',
    },
    {
      question: 'How do I handle scalpers who use multiple phone numbers?',
      answer:
        'Limit purchases per device fingerprint, payment method and home address (where collected). Pure phone-based limits are easy to bypass with virtual numbers.',
    },
  ],
  content: (
    <>
      <p>
        Event ticketing is the most extreme OTP workload most teams ever ship.
        IPL final tickets, BookMyShow concerts, and on-sale-now releases
        compress what would otherwise be a year of sign-ups into a thirty-
        minute window. Your OTP layer either survives or your trending hashtag
        is &ldquo;site down&rdquo; on Twitter.
      </p>

      <h2 id="why">Why Ticketing Apps Burn OTPs</h2>
      <ul>
        <li>First-time users sign up at sale time.</li>
        <li>Queue-protection codes resent every refresh.</li>
        <li>Payment OTPs from issuing banks.</li>
        <li>Booking-confirmation SMS.</li>
        <li>Entry-gate OTPs at the venue.</li>
      </ul>

      <h2 id="flows">OTP Flows in Event Ticketing</h2>
      <ol>
        <li>
          <strong>Account / login OTP</strong> — phone-first auth, often the
          user&rsquo;s very first interaction.
        </li>
        <li>
          <strong>Queue / virtual-waiting-room OTP</strong> — confirms the
          user is real before granting a spot in the buy queue.
        </li>
        <li>
          <strong>Payment OTP</strong> — issued by the bank.
        </li>
        <li>
          <strong>Booking confirmation SMS</strong> — transactional, contains
          the e-ticket QR.
        </li>
        <li>
          <strong>Entry-gate OTP</strong> — short-lived code emitted only on
          arrival.
        </li>
      </ol>

      <h2 id="spike">Surviving the Sale-Open Spike</h2>
      <p>The defensive stack:</p>
      <ul>
        <li>
          <strong>No monthly-minimum provider.</strong> 50× spike = 50× SMS bill
          if you size for off-peak.
        </li>
        <li>
          <strong>Multi-provider failover.</strong> One operator throttling
          your sender ID kills your sale.
        </li>
        <li>
          <strong>Per-phone rate limits.</strong> Block at 5 OTPs / hour per
          number.
        </li>
        <li>
          <strong>Per-IP and device fingerprint limits.</strong> Block bot farms.
        </li>
        <li>
          <strong>Captcha at the OTP send step.</strong> Adds 200 ms of human
          friction; saves thousands of fraudulent SMS.
        </li>
      </ul>

      <h2 id="fraud">Fraud Defences</h2>
      <ul>
        <li>
          <strong>OTP traffic pumping</strong> — see{' '}
          <Link href="/blog/otp-bot-attacks-traffic-pumping">
            our defence guide
          </Link>
          .
        </li>
        <li>
          <strong>Account farms.</strong> Verify+kyc only at first purchase to
          deter bulk-account creation for resale.
        </li>
        <li>
          <strong>SIM-swap account takeover.</strong> Recent port-out is a red
          flag; require step-up auth.
        </li>
      </ul>

      <h2 id="gate-otp">Entry-Gate OTPs</h2>
      <p>
        At the venue, an entry-gate OTP is the friction-free way to verify the
        ticket-holder is the booker — without scanning paper. Pattern:
      </p>
      <ol>
        <li>User taps &ldquo;Show entry code&rdquo; in the app.</li>
        <li>
          Backend generates a 5-minute OTP and SMSes it to the registered phone.
        </li>
        <li>
          Gate scanner asks for last 4 digits. Backend verifies via{' '}
          <code>/otp/verify</code>.
        </li>
        <li>Ticket marks &ldquo;used&rdquo;.</li>
      </ol>

      <h2 id="compliance">Compliance Notes</h2>
      <ul>
        <li>OTP SMS — service-implicit DLT category.</li>
        <li>Confirmation SMS — transactional.</li>
        <li>Promo &ldquo;sale starts in 1 hour&rdquo; — promotional, requires consent.</li>
      </ul>

      <h2 id="reference">Reference Implementation</h2>
      <pre>
        <code>{`// Queue-OTP with idempotency to survive refresh storms
POST /otp/send  { "phoneNumber": "+91...", "idempotencyKey": userQueueToken }`}</code>
      </pre>
      <p>
        Code samples for Node, Python, Django, Java are in{' '}
        <Link href="/blog">our tutorials library</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> is built for
        elastic, bursty Indian SMS workloads — no monthly minimums, multi-
        provider failover, idempotency keys baked in.
      </p>
    </>
  ),
};
