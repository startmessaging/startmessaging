import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-voice-otp',
  title: 'What is Voice OTP? When to Use It Instead of SMS',
  description:
    'Voice OTP explained — how the OTP is read aloud over a robocall, when it beats SMS, accessibility benefits, India regulatory context, and integration patterns.',
  category: 'security',
  keywords: [
    'what is voice otp',
    'voice otp india',
    'voice call otp',
    'ivr otp',
    'voice otp vs sms',
    'audio otp',
  ],
  publishedAt: '2026-04-24',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'Voice OTP — Definition' },
    { id: 'how-it-works', title: 'How Voice OTP Works' },
    { id: 'when-to-use', title: 'When Voice OTP Beats SMS' },
    { id: 'india', title: 'Voice OTP in India' },
    { id: 'cost-latency', title: 'Cost and Latency' },
    { id: 'pitfalls', title: 'Pitfalls' },
    { id: 'integration', title: 'Integration Pattern' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'voice-otp-vs-sms-otp-india',
    'what-is-sms-otp',
    'what-is-otp',
    'otp-delivery-rates-india',
  ],
  faq: [
    {
      question: 'Is voice OTP more secure than SMS OTP?',
      answer:
        'Marginally — SS7 attacks affect both, but voice OTP is harder to silently intercept on the network. The bigger win is delivery success when SMS is blocked or ignored.',
    },
    {
      question: 'Does voice OTP need DLT registration?',
      answer:
        'In India, voice channels follow a separate but parallel TRAI regulation regime. Operating an outbound voice campaign requires registration; using a service that has already done so absorbs that work.',
    },
    {
      question: 'How long is a voice OTP read aloud?',
      answer:
        'Typical scripts read the 6-digit code twice with a short pause, taking 12–20 seconds end-to-end. Most providers let users repeat by pressing 1.',
    },
  ],
  content: (
    <>
      <p>
        Voice OTP is SMS OTP&rsquo;s less famous sibling: instead of arriving as
        a text message, the code is read aloud over an automated phone call.
        It is rarely the first choice for an OTP flow but is the right answer
        in specific situations — accessibility, SMS-blocked corridors, and
        elderly users — and almost always sits alongside SMS OTP as a
        fallback.
      </p>
      <p>
        This guide covers <strong>what voice OTP is</strong>, how the
        underlying robocall works, when to pick it, the India regulatory
        context, and a typical integration pattern.
      </p>

      <h2 id="definition">Voice OTP — Definition</h2>
      <p>
        <strong>Voice OTP</strong> delivers a one-time password to the user as
        a recorded or text-to-speech (TTS) phone call. The properties are
        otherwise identical to SMS OTP: single use, time-bound, generated
        server-side.
      </p>

      <h2 id="how-it-works">How Voice OTP Works</h2>
      <ol>
        <li>
          Backend calls the voice OTP API with the user&rsquo;s phone number.
        </li>
        <li>
          The API generates a numeric code, hashes it for storage, and queues
          an outbound call.
        </li>
        <li>
          A telephony aggregator places the call. When the user answers, an
          IVR plays the script: &ldquo;Your verification code is four eight two
          nine one zero. Repeating: four eight two nine one zero. Press one to
          repeat.&rdquo;
        </li>
        <li>
          The user types the code into the app, your backend calls{' '}
          <code>/otp/verify</code>, the call hangs up.
        </li>
      </ol>

      <h2 id="when-to-use">When Voice OTP Beats SMS</h2>
      <ul>
        <li>
          <strong>SMS-blocked routes.</strong> When DLT scrubbing or a carrier
          issue suppresses the SMS, voice often gets through.
        </li>
        <li>
          <strong>Elderly or non-tech-savvy users.</strong> Hearing the code
          read aloud is more reliable than reading SMS for some demographics.
        </li>
        <li>
          <strong>Accessibility.</strong> Visually impaired users may rely on
          screen readers; an explicit voice channel ensures the OTP reaches
          them clearly.
        </li>
        <li>
          <strong>International numbers.</strong> Some destinations have
          unreliable SMS but reliable voice.
        </li>
        <li>
          <strong>Fallback after SMS fails.</strong> If a user has not entered
          a code within ~30 seconds, automatically trigger a voice OTP.
        </li>
      </ul>

      <h2 id="india">Voice OTP in India</h2>
      <p>
        Outbound voice in India is governed by TRAI&rsquo;s commercial
        communication regulations and the Telecom Commercial Communications
        Customer Preference Regulations (TCCCPR). Specific points to know:
      </p>
      <ul>
        <li>
          Outbound IVR campaigns require operator-level registration similar
          to SMS DLT, though with a different platform.
        </li>
        <li>
          Voice OTP for transactional / OTP categories is generally exempt
          from DND rules, but documentation is required.
        </li>
        <li>
          Calls must originate from registered DID numbers tied to your
          business.
        </li>
      </ul>
      <p>
        See our deep comparison of{' '}
        <Link href="/blog/voice-otp-vs-sms-otp-india">
          voice OTP vs SMS OTP in India
        </Link>{' '}
        for a fuller breakdown of when each shines.
      </p>

      <h2 id="cost-latency">Cost and Latency</h2>
      <ul>
        <li>
          <strong>Cost.</strong> Voice OTP in India is roughly 2–3× the cost of
          SMS — Rs 0.40–0.80 per call vs Rs 0.15–0.25 per SMS.
        </li>
        <li>
          <strong>Latency.</strong> Slightly higher than SMS — the call has to
          be placed and answered. Plan for ~10–20 seconds of dial time before
          the user hears the code.
        </li>
        <li>
          <strong>Conversion.</strong> Some users will not answer unknown
          numbers; voice fallback may have lower completion than SMS retry. A/B
          test it.
        </li>
      </ul>

      <h2 id="pitfalls">Pitfalls</h2>
      <ul>
        <li>
          <strong>Repeated digits sound similar.</strong> &ldquo;5&rdquo; and
          &ldquo;9&rdquo; can be confused. Pad the script with phonetics or
          pause between each digit.
        </li>
        <li>
          <strong>Voicemail.</strong> The OTP will be left on the user&rsquo;s
          voicemail unless you detect answering machine and bail. Most
          providers expose AMD (answering machine detection).
        </li>
        <li>
          <strong>Call-blocking apps.</strong> Truecaller and similar mark
          unknown numbers as spam. Use a registered DID with a clear
          business name displayed.
        </li>
      </ul>

      <h2 id="integration">Integration Pattern</h2>
      <pre>
        <code>{`// Pseudo-code: SMS first, voice fallback after 30s
const { requestId } = await sendSmsOtp(phone);

// On the client, watch for OTP autofill or user input
// If neither happens within 30s:
await sendVoiceOtpFallback(requestId, phone);`}</code>
      </pre>
      <p>
        StartMessaging&rsquo;s OTP API supports voice OTP as a fallback option
        on the same request ID, so the verify call works regardless of which
        channel actually delivered the code. See{' '}
        <Link href="/otp-api">our API docs</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Most products start with SMS OTP and add voice only after they see
        delivery failures in the wild.{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> handles both
        channels, both regulatory regimes, and shared verification on a single
        request ID — no DLT registration, no double integration.
      </p>
    </>
  ),
};
