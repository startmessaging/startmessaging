import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-flash-call-auth',
  title: 'What is Flash Call Authentication? (And Should You Use It?)',
  description:
    'Flash call authentication explained: how the missed-call mechanism verifies phone numbers without an OTP, where it works and where it does not, and why India regulators have pushed back.',
  category: 'security',
  keywords: [
    'what is flash call',
    'flash call authentication',
    'missed call otp',
    'flash call vs sms otp',
    'flash call india',
    'silent verification',
  ],
  publishedAt: '2026-04-25',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'Flash Call — Definition' },
    { id: 'how-it-works', title: 'How a Flash Call Authenticates a Number' },
    { id: 'pros-cons', title: 'Pros and Cons' },
    { id: 'india', title: 'Flash Call in India' },
    { id: 'when-to-use', title: 'When to Use It (and When Not To)' },
    { id: 'alternatives', title: 'Alternatives' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-silent-authentication',
    'what-is-sms-otp',
    'silent-authentication-vs-otp-india',
    'what-is-otp',
  ],
  faq: [
    {
      question: 'Why is it called a "flash" call?',
      answer:
        'The call is intentionally hung up immediately — it appears and is gone in a flash. The user never picks up; only the missed-call entry contains the verification information.',
    },
    {
      question: 'Does flash call work on iOS?',
      answer:
        'Reading the call log requires permissions iOS does not grant to apps. Flash call as an automated mechanism only works on Android. Most apps fall back to SMS OTP on iOS.',
    },
    {
      question: 'Is flash call cheaper than SMS OTP?',
      answer:
        'Yes — typically 50–70% cheaper because no SMS is sent and the call is terminated within seconds. The trade-off is platform support and regulatory uncertainty in India.',
    },
  ],
  content: (
    <>
      <p>
        Flash call authentication promises a simpler, cheaper, and faster
        version of SMS OTP: instead of typing a code, the user&rsquo;s phone
        receives a missed call from a number whose last few digits{' '}
        <em>are</em> the OTP, and the app reads those digits automatically.
        Where it works, it is genuinely magical. The catch is that it works in
        fewer places than vendors will tell you, and Indian regulators have
        had specific concerns.
      </p>
      <p>
        This guide covers <strong>what flash call authentication is</strong>,
        the precise mechanism, where it shines, where it breaks, and how to
        decide whether to add it to your verification stack.
      </p>

      <h2 id="definition">Flash Call — Definition</h2>
      <p>
        <strong>Flash call authentication</strong> is a phone-number
        verification technique in which the verification system places a brief
        call to the user&rsquo;s number, then hangs up before the user can
        answer. The last 3–6 digits of the calling number serve as the OTP.
        The user&rsquo;s app reads those digits from the call log and
        auto-fills the verification field — no SMS, no typing.
      </p>

      <h2 id="how-it-works">How a Flash Call Authenticates a Number</h2>
      <ol>
        <li>
          Backend triggers a flash-call request. The verification provider
          allocates a temporary outbound number whose suffix is the &ldquo;OTP&rdquo;.
        </li>
        <li>
          The provider places a call from that number to the user. The call
          rings briefly (1–3 seconds) and is hung up before the user answers.
        </li>
        <li>
          The Android app — having been granted{' '}
          <code>READ_CALL_LOG</code> permission — sees the missed call entry,
          extracts the suffix, and submits it to your backend automatically.
        </li>
        <li>
          Backend verifies that the suffix matches what the provider said it
          would be, and marks the phone as verified.
        </li>
      </ol>

      <h2 id="pros-cons">Pros and Cons</h2>
      <h3>Pros</h3>
      <ul>
        <li>50–70% cheaper than SMS OTP.</li>
        <li>Faster — no SMS network hop, often verified in 5 seconds.</li>
        <li>No DLT or template approvals.</li>
        <li>No SMS scrubbing risk.</li>
      </ul>
      <h3>Cons</h3>
      <ul>
        <li>Android-only in practice — iOS does not allow apps to read the call log.</li>
        <li>Requires an installed app — not usable in web flows.</li>
        <li>
          Some Android skins / regions strip incoming-call metadata for privacy.
        </li>
        <li>Regulatory uncertainty in India.</li>
        <li>
          Permission fatigue —{' '}
          <code>READ_CALL_LOG</code> is one of Google&rsquo;s most strictly
          policed permissions; Play Store review may push back.
        </li>
      </ul>

      <h2 id="india">Flash Call in India</h2>
      <p>
        TRAI and the major Indian telecom operators have been wary of flash
        call authentication. Concerns include:
      </p>
      <ul>
        <li>
          <strong>Bypassing DLT.</strong> Flash call dodges the SMS DLT
          framework, which regulators see as a hole in the compliance regime.
        </li>
        <li>
          <strong>Cost-shifting.</strong> Flash calls reuse network
          signalling without revenue, which operators have publicly objected
          to.
        </li>
        <li>
          <strong>Permission concerns.</strong> Reading call logs is sensitive
          and DPDP-relevant.
        </li>
      </ul>
      <p>
        As of 2026 there is no outright ban, but the practical effect is that
        flash call delivery is unpredictable on Indian networks — large
        carriers may rate-limit or filter the traffic.
      </p>

      <h2 id="when-to-use">When to Use It (and When Not To)</h2>
      <p>Flash call may be a fit when:</p>
      <ul>
        <li>You have an installed Android app.</li>
        <li>SMS cost is dominating your unit economics at scale.</li>
        <li>
          Your users are in markets where flash call is unambiguously
          permitted.
        </li>
      </ul>
      <p>Skip flash call when:</p>
      <ul>
        <li>You serve a primarily web or iOS audience.</li>
        <li>You are operating exclusively in India and need predictable delivery.</li>
        <li>You cannot justify the call-log permission to Play Store review.</li>
      </ul>

      <h2 id="alternatives">Alternatives</h2>
      <ul>
        <li>
          <Link href="/blog/what-is-sms-otp">SMS OTP</Link> — the universal
          baseline.
        </li>
        <li>
          <Link href="/blog/what-is-silent-authentication">
            Silent network authentication
          </Link>{' '}
          — carrier-side proof of possession, no permissions needed.
        </li>
        <li>
          Android <a href="https://developers.google.com/identity/sms-retriever">SMS Retriever API</a>{' '}
          — auto-fill the SMS OTP without granting SMS-read permissions. Often
          the right balance.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For Indian apps, the pragmatic stack is{' '}
        <Link href="/dlt-free-otp">SMS OTP via StartMessaging</Link> with
        Android SMS Retriever for auto-fill. Flash call adds complexity and
        regulatory exposure that rarely pays back.
      </p>
    </>
  ),
};
