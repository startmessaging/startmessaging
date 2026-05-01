import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-silent-authentication',
  title: 'What is Silent Authentication? Carrier-Based Phone Verification',
  description:
    'Silent network authentication explained: how mobile-network operators confirm SIM ownership without an OTP, where it works in India, and how to integrate it as a fallback or upgrade.',
  category: 'security',
  keywords: [
    'what is silent authentication',
    'silent network auth',
    'silent verification',
    'mobile network authentication',
    'silent auth india',
    'silent otp',
  ],
  publishedAt: '2026-04-25',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'Silent Authentication — Definition' },
    { id: 'how-it-works', title: 'How It Works' },
    { id: 'benefits', title: 'Benefits' },
    { id: 'limitations', title: 'Limitations' },
    { id: 'india', title: 'Silent Auth in India' },
    { id: 'integration', title: 'Integration Pattern' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'silent-authentication-vs-otp-india',
    'what-is-sms-otp',
    'what-is-flash-call-auth',
    'what-is-otp',
  ],
  faq: [
    {
      question: 'Is silent auth more secure than SMS OTP?',
      answer:
        'For specific threat models — yes. It is harder to phish (no code to leak), and SIM-swap attacks fail unless the attacker is also using the cellular network from that phone. SMS OTP retains broader compatibility.',
    },
    {
      question: 'Does silent auth work on Wi-Fi?',
      answer:
        'No — by design it requires the cellular network to confirm carrier-level identity. Most providers fall back to SMS OTP if mobile data is unavailable.',
    },
    {
      question: 'Which Indian carriers support silent authentication?',
      answer:
        'Coverage varies by aggregator. Tier-1 operators (Jio, Airtel, Vi) generally support it via partners; BSNL and MVNOs are less consistent. Test specific carrier-region combinations before launch.',
    },
  ],
  content: (
    <>
      <p>
        Silent authentication is the newest entrant in the phone-verification
        toolbox. Instead of asking the user to type or auto-fill an OTP, it
        leans on the mobile-network operator to confirm — silently and
        transparently — that the device is currently connected to the SIM
        registered to the phone number you are trying to verify. When it
        works, the user experience is magical: no SMS, no code, no waiting.
      </p>
      <p>
        This guide explains <strong>what silent authentication is</strong>,
        the network mechanics behind it, where it shines, where it breaks, and
        how to add it as an upgrade alongside SMS OTP.
      </p>

      <h2 id="definition">Silent Authentication — Definition</h2>
      <p>
        <strong>Silent authentication</strong> (also called silent network
        authentication, mobile network authentication, or carrier-based
        verification) is a method of verifying phone-number ownership where
        the carrier itself proves to your backend that a specific SIM is
        currently active on the device.
      </p>
      <p>
        The user does nothing. There is no OTP code, no missed call, no app
        permission prompt. The result is a cryptographically signed token
        from the carrier that your backend exchanges for verification.
      </p>

      <h2 id="how-it-works">How It Works</h2>
      <ol>
        <li>
          The mobile app turns off Wi-Fi for a moment and asks the operating
          system to fetch a URL over the cellular network.
        </li>
        <li>
          The aggregator&rsquo;s endpoint receives the request, identifies the
          calling carrier and SIM, and asks that carrier to confirm the
          phone-number-to-IP mapping for the request.
        </li>
        <li>
          The carrier returns a signed token saying &ldquo;the SIM with phone
          number +91XXXXX is the SIM that originated this request.&rdquo;
        </li>
        <li>
          The aggregator forwards the verified phone number to your backend.
          You compare it to the number the user claimed in the app.
        </li>
      </ol>

      <h2 id="benefits">Benefits</h2>
      <ul>
        <li>
          <strong>Zero user effort.</strong> No code to type, no permission
          prompts beyond cellular use.
        </li>
        <li>
          <strong>Phishing resistance.</strong> There is no code that can be
          intercepted or proxied.
        </li>
        <li>
          <strong>SIM-swap defence.</strong> Unless the attacker has the
          physical SIM connected to a phone right now, verification fails.
        </li>
        <li>
          <strong>Lower cost.</strong> Cheaper than SMS OTP at scale (variable
          by aggregator).
        </li>
        <li>
          <strong>Faster.</strong> Sub-second verification compared to
          multi-second SMS delivery.
        </li>
      </ul>

      <h2 id="limitations">Limitations</h2>
      <ul>
        <li>
          <strong>Cellular only.</strong> Wi-Fi-only sessions cannot use it.
        </li>
        <li>
          <strong>Mobile app only.</strong> Web flows cannot drive the
          OS-level cellular request reliably.
        </li>
        <li>
          <strong>Carrier coverage gaps.</strong> Aggregator support varies; test each carrier and region.
        </li>
        <li>
          <strong>User awareness.</strong> Some users find a verification
          step that &ldquo;just succeeds&rdquo; suspicious.
        </li>
        <li>
          <strong>Privacy and DPDP review.</strong> The carrier sees the
          request; document the data flow.
        </li>
      </ul>

      <h2 id="india">Silent Auth in India</h2>
      <p>
        Silent authentication is rolling out among Indian carriers via global
        aggregators (Truecaller, tru.ID, telesign-style partners). Coverage:
      </p>
      <ul>
        <li>
          <strong>Jio &amp; Airtel</strong> — broadly supported through
          partner aggregators.
        </li>
        <li>
          <strong>Vi (Vodafone Idea)</strong> — variable, improving.
        </li>
        <li>
          <strong>BSNL</strong> — limited.
        </li>
        <li>
          <strong>MVNOs</strong> — patchy.
        </li>
      </ul>
      <p>
        Read{' '}
        <Link href="/blog/silent-authentication-vs-otp-india">
          our deep comparison of silent auth vs OTP for India
        </Link>{' '}
        for production deployment notes.
      </p>

      <h2 id="integration">Integration Pattern</h2>
      <pre>
        <code>{`// Pseudocode — silent auth first, OTP fallback
async function verifyPhone(claimedNumber) {
  try {
    const verified = await silentAuth(claimedNumber);
    if (verified) return { method: 'silent' };
  } catch {
    // fall through
  }
  // Fall back to SMS OTP
  const { requestId } = await sendSmsOtp(claimedNumber);
  return { method: 'sms', requestId };
}`}</code>
      </pre>
      <p>
        Most teams treat silent auth as a fast-path optimisation, with SMS
        OTP via{' '}
        <Link href="/otp-api">a managed OTP API</Link> as the always-available
        fallback.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        For most Indian products today, the right move is{' '}
        <Link href="/dlt-free-otp">SMS OTP via StartMessaging</Link> as the
        default and silent auth as an opt-in upgrade for native Android/iOS
        flows. Get the SMS half of the stack live in five minutes —{' '}
        <Link href="https://app.startmessaging.com/register">sign up</Link>.
      </p>
    </>
  ),
};
