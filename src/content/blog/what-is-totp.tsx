import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-totp',
  title: 'What is TOTP? Time-Based OTP Explained for Developers',
  description:
    'TOTP — Time-Based One-Time Password — explained: how the RFC 6238 algorithm generates 6-digit codes, how it differs from SMS OTP, when to use it, and how to implement it.',
  category: 'security',
  keywords: [
    'what is totp',
    'totp meaning',
    'time based otp',
    'rfc 6238',
    'totp algorithm',
    'totp vs sms otp',
    'authenticator app',
  ],
  publishedAt: '2026-04-23',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'TOTP — Definition' },
    { id: 'algorithm', title: 'How TOTP is Generated' },
    { id: 'totp-vs-sms', title: 'TOTP vs SMS OTP' },
    { id: 'when-to-use', title: 'When to Choose TOTP' },
    { id: 'implementation', title: 'Implementing TOTP' },
    { id: 'recovery', title: 'Backup Codes and Recovery' },
    { id: 'pitfalls', title: 'Pitfalls' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-otp',
    'what-is-hotp',
    'what-is-2fa',
    'sms-otp-vs-email-magic-link-vs-totp',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'What does TOTP stand for?',
      answer:
        'TOTP stands for Time-based One-Time Password. It is defined in RFC 6238 and is the algorithm behind Google Authenticator, Authy, 1Password, Microsoft Authenticator, and most other authenticator apps.',
    },
    {
      question: 'Why is TOTP usually 6 digits?',
      answer:
        '6 digits is the default in RFC 6238 because it balances entropy (10^6 = one million combinations) with usability. Some servers can configure 7 or 8 digits for higher entropy at the cost of typing fatigue.',
    },
    {
      question: 'Does TOTP need an internet connection?',
      answer:
        'No. After the secret is shared at enrolment, the authenticator app generates codes purely from the device clock. This is a major advantage over SMS OTP, which needs cellular reception every time.',
    },
    {
      question: 'Can I migrate users from SMS OTP to TOTP?',
      answer:
        'Yes. The standard pattern is: keep SMS OTP as the default, offer TOTP as an opt-in &ldquo;faster login&rdquo; in settings, and eventually nudge users towards it through banners. Always retain SMS OTP as a fallback for lost-device recovery.',
    },
  ],
  content: (
    <>
      <p>
        If you have ever scanned a QR code into Google Authenticator and
        watched it spit out a fresh 6-digit code every 30 seconds, you have
        used TOTP. It is the most widely deployed second factor on the
        internet, the algorithm that powers virtually every authenticator app,
        and a deserved alternative to SMS OTP for users who want a faster, free
        and offline-capable verification step.
      </p>
      <p>
        This explainer answers <strong>what TOTP is</strong>, how the algorithm
        actually generates codes, where it shines compared to SMS, and how to
        implement it (or layer it on top of an existing SMS-OTP flow).
      </p>

      <h2 id="definition">TOTP — Definition</h2>
      <p>
        <strong>TOTP (Time-based One-Time Password)</strong> is an algorithm
        that derives a short numeric code from a shared secret and the current
        time. It is defined in{' '}
        <a
          href="https://datatracker.ietf.org/doc/html/rfc6238"
          target="_blank"
          rel="noreferrer noopener"
        >
          RFC 6238
        </a>{' '}
        and is a time-based variant of HOTP (RFC 4226).
      </p>
      <p>The defining properties:</p>
      <ul>
        <li>
          A shared secret is exchanged once, at enrolment (usually via QR code).
        </li>
        <li>
          Both server and client derive the current code by hashing{' '}
          <em>secret + current_time_window</em>.
        </li>
        <li>
          The code rotates automatically — typically every 30 seconds — without
          any further communication.
        </li>
      </ul>

      <h2 id="algorithm">How TOTP is Generated</h2>
      <p>The full RFC 6238 derivation, step by step:</p>
      <ol>
        <li>
          Take the shared secret K (a base32-encoded byte string, usually 20
          bytes).
        </li>
        <li>
          Compute T = floor((current_unix_time - T0) / X), where T0 = 0 and
          X = 30 (the standard time-step).
        </li>
        <li>
          Compute HMAC = HMAC-SHA1(K, T) — an 8-byte big-endian counter.
        </li>
        <li>
          Take the last 4 bits of the HMAC as an offset; extract 31 bits
          starting at that offset.
        </li>
        <li>
          Modulo by 10^d (where d is the desired digit count, usually 6) and
          zero-pad.
        </li>
      </ol>
      <pre>
        <code>{`// Pseudocode
T = floor(unixTime / 30)
HMAC = HMAC-SHA1(secret, T)
offset = HMAC[19] & 0x0F
truncated = (HMAC[offset] & 0x7F) << 24
          | HMAC[offset+1] << 16
          | HMAC[offset+2] << 8
          | HMAC[offset+3]
code = truncated % 1000000`}</code>
      </pre>
      <p>
        Real implementations use battle-tested libraries — Python{' '}
        <code>pyotp</code>, Node <code>otplib</code>, Go <code>otp</code>, etc.
        Roll your own only as a learning exercise.
      </p>

      <h2 id="totp-vs-sms">TOTP vs SMS OTP</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>TOTP</th>
              <th>SMS OTP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cost per code</td>
              <td>Free</td>
              <td>Rs 0.10–0.30</td>
            </tr>
            <tr>
              <td>Latency</td>
              <td>Instant</td>
              <td>Seconds (carrier dependent)</td>
            </tr>
            <tr>
              <td>Works offline</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>SIM swap risk</td>
              <td>None</td>
              <td>High</td>
            </tr>
            <tr>
              <td>User onboarding</td>
              <td>Needs app install + QR scan</td>
              <td>Just enter phone</td>
            </tr>
            <tr>
              <td>Lost-device recovery</td>
              <td>Hard — need backup codes</td>
              <td>Easy — re-issue OTP</td>
            </tr>
            <tr>
              <td>Phishing resistance</td>
              <td>Same as SMS (proxy-attackable)</td>
              <td>Same as TOTP</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="when-to-use">When to Choose TOTP</h2>
      <p>Strong candidates for TOTP:</p>
      <ul>
        <li>Internal admin dashboards.</li>
        <li>B2B SaaS where users are technically inclined.</li>
        <li>High-volume login flows where SMS cost dominates.</li>
        <li>
          Markets with poor cellular coverage where SMS delivery is unreliable.
        </li>
      </ul>
      <p>Stick with SMS OTP when:</p>
      <ul>
        <li>You serve mass-market consumer users in India.</li>
        <li>Sign-up frequency is low and SMS cost is negligible.</li>
        <li>
          Your users are unlikely to install an authenticator app or back up
          recovery codes.
        </li>
      </ul>

      <h2 id="implementation">Implementing TOTP</h2>
      <p>The integration usually has three pieces:</p>
      <ol>
        <li>
          <strong>Enrolment.</strong> Generate a random 20-byte secret, store
          it server-side, encode it in a{' '}
          <code>otpauth://totp/...</code> URL, render the URL as a QR code, and
          have the user scan it with Google Authenticator / Authy.
        </li>
        <li>
          <strong>Verification.</strong> Receive the 6-digit code, recompute
          the expected codes for time-windows T-1, T, and T+1 (to allow ±30s
          clock drift), and compare in constant time.
        </li>
        <li>
          <strong>Replay protection.</strong> Store the highest accepted
          time-window per user; reject any code from the same or earlier
          window.
        </li>
      </ol>
      <p>
        For most teams, the right call is to keep using SMS OTP via{' '}
        <Link href="/otp-api">StartMessaging</Link> for primary enrolment and
        recovery, and add a TOTP enrolment screen as an optional speed-up. The
        TOTP code itself is a few lines with a library; the harder problem is
        always recovery.
      </p>

      <h2 id="recovery">Backup Codes and Recovery</h2>
      <p>
        Lost phones break TOTP-only setups. The standard mitigations:
      </p>
      <ul>
        <li>
          <strong>Backup codes.</strong> 10 single-use codes generated at
          enrolment, displayed once, encouraged to print or store in a password
          manager.
        </li>
        <li>
          <strong>SMS fallback.</strong> Allow users to receive an SMS OTP if
          they lose their authenticator. This pulls security back to the
          weakest factor, but is the right UX trade-off for most consumer apps.
        </li>
        <li>
          <strong>Identity-bound recovery.</strong> Manual support flow with
          KYC verification. Required by many regulators for fintech.
        </li>
      </ul>

      <h2 id="pitfalls">Pitfalls</h2>
      <ul>
        <li>
          <strong>Server clock drift.</strong> If your servers are off by more
          than 30s, every code will appear invalid. Run NTP.
        </li>
        <li>
          <strong>Storing the secret in plaintext.</strong> Encrypt at rest
          using KMS or libsodium.
        </li>
        <li>
          <strong>No replay protection.</strong> A code from window T can be
          replayed inside the 30s window unless you track the last accepted T.
        </li>
        <li>
          <strong>Logging the code.</strong> Even a TOTP code in your access
          log is a 30-second window of vulnerability.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Want SMS OTP as your primary factor with TOTP as an upgrade later?{' '}
        <Link href="/dlt-free-otp">
          StartMessaging gets you sending OTPs in five minutes
        </Link>{' '}
        — at Rs 0.25 each, with no DLT registration to deal with.
      </p>
    </>
  ),
};
