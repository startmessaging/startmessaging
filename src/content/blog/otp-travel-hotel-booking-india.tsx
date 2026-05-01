import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-travel-hotel-booking-india',
  title: 'OTP for Travel and Hotel Booking Apps in India (2026)',
  description:
    'How travel and hotel booking apps in India use OTP for sign-up, payment authentication, booking confirmation and check-in. Patterns, pitfalls, and a reference implementation.',
  category: 'use-cases',
  keywords: [
    'otp travel app india',
    'hotel booking otp',
    'flight booking otp',
    'travel app authentication',
    'check in otp',
    'booking confirmation sms',
  ],
  publishedAt: '2026-04-29',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-otp', title: 'Why Travel Apps Lean So Hard on OTP' },
    { id: 'flows', title: 'OTP Flows in Travel Apps' },
    { id: 'cost-model', title: 'Cost Model and Burst Patterns' },
    { id: 'compliance', title: 'India Compliance: RBI, IRDAI, DLT' },
    { id: 'patterns', title: 'Production Patterns' },
    { id: 'pitfalls', title: 'Common Pitfalls' },
    { id: 'reference', title: 'Reference Implementation' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-event-ticketing-india',
    'otp-food-delivery-logistics',
    'otp-ecommerce-india',
    'send-otp-nodejs',
    'otp-verification-flow',
  ],
  faq: [
    {
      question: 'Do I need a separate sender ID for booking confirmations vs OTPs?',
      answer:
        'Booking confirmation SMS is transactional / service-implicit and can share a sender ID category with OTPs, but most teams keep them on separate templates so analytics and DLT renewals stay clean.',
    },
    {
      question: 'How do I prevent OTP-pumping during sale events?',
      answer:
        'Per-phone hourly limits, per-IP limits, captcha on the send-OTP form, and a multi-provider failover OTP API. See our guide on OTP traffic pumping defence.',
    },
    {
      question: 'Should the booking PNR be sent over the same channel?',
      answer:
        'Yes — SMS remains the default for booking confirmation in India because it works on the airline counter staff side too. WhatsApp is increasingly added as a parallel channel.',
    },
  ],
  content: (
    <>
      <p>
        Indian travel and hospitality apps live on SMS OTP. From the first
        sign-up at a discount fare to the chauffeur drop-OTP at the hotel
        parking, OTP traffic peaks at multiple stages of the booking funnel.
        Getting it right materially shifts conversion; getting it wrong burns
        money in undelivered messages and lost bookings.
      </p>

      <h2 id="why-otp">Why Travel Apps Lean So Hard on OTP</h2>
      <ul>
        <li>
          <strong>One-shot bookings.</strong> Most users buy a flight or
          hotel night through your app once and may never return. They will
          not memorise a password.
        </li>
        <li>
          <strong>RBI-mandated 2FA on payments.</strong> Card-not-present
          transactions in India require AFA. OTP is the universal default.
        </li>
        <li>
          <strong>Trust-building.</strong> Booking confirmation SMS doubles as
          proof of purchase the user can show at the hotel desk.
        </li>
        <li>
          <strong>Operational handoff.</strong> Hotel check-in OTP, ride
          drop-off OTP, and luggage-locker OTP all chain off the original
          booking.
        </li>
      </ul>

      <h2 id="flows">OTP Flows in Travel Apps</h2>
      <ol>
        <li>
          <strong>Sign-up / login OTP.</strong> Phone-first auth with{' '}
          <code>/otp/send</code> + <code>/otp/verify</code>.
        </li>
        <li>
          <strong>Payment OTP.</strong> Issued by the issuing bank (not your
          OTP provider) but you must redirect cleanly back into your app.
        </li>
        <li>
          <strong>Booking confirmation SMS.</strong> Transactional, contains
          PNR / booking ID, hotel name, check-in date.
        </li>
        <li>
          <strong>Pre-trip reminders.</strong> 24h before departure, with
          gate / bus stand details.
        </li>
        <li>
          <strong>Check-in OTP.</strong> Issued at the property as proof of
          arrival (used in self-check-in hotels).
        </li>
      </ol>

      <h2 id="cost-model">Cost Model and Burst Patterns</h2>
      <p>
        Travel traffic is bursty: long-weekend sales, festival travel, IPL,
        Bengaluru-Goa Friday spikes. Plan for 5–10× normal volume during
        these windows and:
      </p>
      <ul>
        <li>
          Use a provider with elastic capacity. StartMessaging has no monthly
          minimums, so spend tracks volume.
        </li>
        <li>Top up your wallet ahead of major sale events.</li>
        <li>Aggressively rate-limit per-phone to defend against bots.</li>
      </ul>

      <h2 id="compliance">India Compliance: RBI, IRDAI, DLT</h2>
      <ul>
        <li>
          Card payment OTPs follow RBI&rsquo;s AFA framework — see our{' '}
          <Link href="/blog/rbi-2fa-2026-mandate">RBI 2FA mandate guide</Link>.
        </li>
        <li>
          Travel insurance flows trigger IRDAI obligations.
        </li>
        <li>
          Sign-up SMS must be DLT-approved templates with the right sender ID.
        </li>
      </ul>

      <h2 id="patterns">Production Patterns</h2>
      <ul>
        <li>
          <strong>Single-tap login.</strong> Auto-fill OTP via Android SMS
          Retriever and iOS keychain. See{' '}
          <Link href="/blog/otp-autofill-android-ios-sms-retriever">
            our auto-fill guide
          </Link>
          .
        </li>
        <li>
          <strong>Voice fallback.</strong> If SMS doesn&rsquo;t arrive in 30
          seconds, offer voice OTP — international travellers may have SMS
          blocked while roaming.
        </li>
        <li>
          <strong>Booking ID never repeats.</strong> Make sure your idempotency
          key is per-booking-attempt, not per-user.
        </li>
        <li>
          <strong>WhatsApp parallel.</strong> Many travel apps now send
          confirmation on both channels.
        </li>
      </ul>

      <h2 id="pitfalls">Common Pitfalls</h2>
      <ul>
        <li>
          OTP-pumping during sales — random phone numbers fired by bots.
        </li>
        <li>
          Wrong DLT category — confirmation SMS sent under transactional but
          marketing mistakenly batched in.
        </li>
        <li>
          OTP shared with wrong language locale — Indian travellers expect
          English-only OTPs even on regional-language UIs.
        </li>
        <li>
          Hardcoded 10-minute expiry — global travellers in different time
          zones may need longer windows.
        </li>
      </ul>

      <h2 id="reference">Reference Implementation</h2>
      <pre>
        <code>{`POST /otp/send
{ "phoneNumber": "+919876543210", "idempotencyKey": "<uuid>" }
→ { requestId, expiresAt }

// Booking confirmation (after payment success)
POST /otp/send  // not actually OTP — your transactional SMS endpoint
{ "phoneNumber": "+91...", "templateId": "BOOKING_CONFIRM_V2", "vars": { pnr: "..." } }`}</code>
      </pre>
      <p>
        Tutorials in your stack:{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-python">Python</Link>,{' '}
        <Link href="/blog/send-otp-django">Django</Link>,{' '}
        <Link href="/blog/send-otp-php-laravel">PHP/Laravel</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Building or scaling a travel app?{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> handles bursty
        sale-day traffic without monthly minimums and absorbs DLT compliance
        so you can launch the same day.
      </p>
    </>
  ),
};
