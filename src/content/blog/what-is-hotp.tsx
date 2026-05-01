import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-hotp',
  title: 'What is HOTP? Counter-Based OTP Explained',
  description:
    'HOTP — HMAC-based One-Time Password — explained. The RFC 4226 algorithm, how it differs from TOTP, hardware-token use cases, and modern alternatives.',
  category: 'security',
  keywords: [
    'what is hotp',
    'hmac otp',
    'rfc 4226',
    'hotp algorithm',
    'hotp vs totp',
    'counter based otp',
  ],
  publishedAt: '2026-04-23',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'HOTP — Definition' },
    { id: 'algorithm', title: 'How HOTP Works' },
    { id: 'hotp-vs-totp', title: 'HOTP vs TOTP' },
    { id: 'use-cases', title: 'Where HOTP is Still Used' },
    { id: 'pitfalls', title: 'Pitfalls' },
    { id: 'modern-alternatives', title: 'Modern Alternatives' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-totp',
    'what-is-otp',
    'what-is-2fa',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'Is HOTP still relevant in 2026?',
      answer:
        'Mostly as a legacy mechanism. Hardware tokens still ship HOTP-mode firmware, and a few enterprise products keep HOTP for backwards compatibility. New deployments almost always pick TOTP, FIDO2 or SMS OTP instead.',
    },
    {
      question: 'How is HOTP different from TOTP?',
      answer:
        'HOTP uses a counter that increments per-use. TOTP uses the current 30-second time window as its counter. Both are HMAC-SHA1-based and produce the same kind of 6-digit output; only the counter source differs.',
    },
    {
      question: 'Can HOTP get out of sync?',
      answer:
        'Yes — if the user generates several codes without using them, the client counter races ahead of the server. Servers usually accept a window of N future counters (commonly 10) to recover gracefully.',
    },
  ],
  content: (
    <>
      <p>
        HOTP is the older, less famous cousin of TOTP. It is the original
        HMAC-based OTP scheme defined in RFC 4226 and is the algorithm that
        powered the early generation of hardware authentication tokens — the
        small key-fobs with a button and an LCD that you might have used to log
        into a corporate VPN in 2010.
      </p>
      <p>
        This guide covers <strong>what HOTP is</strong>, how the algorithm
        works, when you would still pick it over TOTP today (rarely), and the
        modern alternatives most teams should reach for.
      </p>

      <h2 id="definition">HOTP — Definition</h2>
      <p>
        <strong>HOTP — HMAC-based One-Time Password</strong> — derives a short
        numeric code by hashing a shared secret with a monotonically increasing
        counter. It was published as{' '}
        <a
          href="https://datatracker.ietf.org/doc/html/rfc4226"
          target="_blank"
          rel="noreferrer noopener"
        >
          RFC 4226
        </a>{' '}
        in 2005 and inspired TOTP three years later.
      </p>
      <p>
        Each press of the button on a HOTP token (or each call from a HOTP
        software client) increments the counter and emits a new code. The code
        does not change with time — it changes with use. A code printed on a
        scratch card and left in a drawer for a year is still valid; a code
        from yesterday&rsquo;s login is not, because both client and server
        have moved on.
      </p>

      <h2 id="algorithm">How HOTP Works</h2>
      <pre>
        <code>{`// Inputs: secret K, counter C
HMAC = HMAC-SHA1(K, C)            // 20 bytes
offset = HMAC[19] & 0x0F           // last nibble
truncated = (HMAC[offset]   & 0x7F) << 24
          | (HMAC[offset+1] & 0xFF) << 16
          | (HMAC[offset+2] & 0xFF) << 8
          | (HMAC[offset+3] & 0xFF)
code = truncated % 10^d           // d = 6, usually`}</code>
      </pre>
      <p>
        On each verification, the server tries the expected counter value plus
        a small look-ahead window (commonly 10) to forgive accidental
        increments where the user pressed the button but never typed the code.
        After a successful verification, the server&rsquo;s counter advances
        past the last accepted value to prevent replay.
      </p>

      <h2 id="hotp-vs-totp">HOTP vs TOTP</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>HOTP (RFC 4226)</th>
              <th>TOTP (RFC 6238)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Counter source</td>
              <td>Per-use counter</td>
              <td>Current 30-second window</td>
            </tr>
            <tr>
              <td>Re-use prevention</td>
              <td>Server tracks last counter</td>
              <td>Server tracks last accepted window</td>
            </tr>
            <tr>
              <td>Code rotation</td>
              <td>On user action</td>
              <td>Every 30s automatically</td>
            </tr>
            <tr>
              <td>Out-of-sync risk</td>
              <td>Yes — needs look-ahead</td>
              <td>Yes — needs ±1 window for clock drift</td>
            </tr>
            <tr>
              <td>Modern adoption</td>
              <td>Legacy hardware tokens</td>
              <td>Authenticator apps (default)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For a deeper TOTP write-up see{' '}
        <Link href="/blog/what-is-totp">our TOTP explainer</Link>.
      </p>

      <h2 id="use-cases">Where HOTP is Still Used</h2>
      <ul>
        <li>
          <strong>Hardware tokens.</strong> Many YubiKey and Feitian models
          have a HOTP button mode for legacy compatibility.
        </li>
        <li>
          <strong>Air-gapped environments.</strong> Where you cannot rely on a
          synchronised clock, HOTP avoids the drift problem.
        </li>
        <li>
          <strong>Printed scratch-card OTPs.</strong> A pre-generated list of
          HOTP codes printed in a passbook, used in some banking products.
        </li>
      </ul>

      <h2 id="pitfalls">Pitfalls</h2>
      <ul>
        <li>
          <strong>Drift.</strong> Counter desynchronisation is the #1 source of
          support tickets. Tune the look-ahead window carefully — too small and
          you lock users out, too large and you increase brute-force surface.
        </li>
        <li>
          <strong>Replay.</strong> Always advance the server counter past the
          last accepted value.
        </li>
        <li>
          <strong>Hardware loss.</strong> A HOTP key is single-purpose; users
          will lose them. Plan recovery flows up front.
        </li>
      </ul>

      <h2 id="modern-alternatives">Modern Alternatives</h2>
      <p>
        Most products that would historically have picked HOTP now reach for
        one of:
      </p>
      <ul>
        <li>
          <Link href="/blog/what-is-totp">TOTP</Link> — same crypto, no counter
          sync issues.
        </li>
        <li>
          <Link href="/blog/what-is-otp">SMS OTP</Link> — universal handset
          support, instant delivery via{' '}
          <Link href="/dlt-free-otp">a managed OTP API</Link>.
        </li>
        <li>
          <strong>FIDO2 / passkeys</strong> — phishing-resistant, no shared
          secret to leak.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For most Indian-market apps, the practical answer is{' '}
        <Link href="/blog/what-is-otp">SMS OTP via StartMessaging</Link> for
        primary auth and TOTP as an opt-in upgrade. HOTP rarely earns its slot
        on the menu in 2026.
      </p>
    </>
  ),
};
