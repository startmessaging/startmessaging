import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-security-best-practices',
  title: 'OTP Security Best Practices for Developers',
  description:
    'Learn how to secure OTP systems with bcrypt hashing, rate limiting, expiry windows, attempt limits, HTTPS enforcement, and idempotency keys.',
  category: 'security',
  keywords: [
    'OTP security',
    'OTP best practices',
    'bcrypt OTP hashing',
    'rate limiting OTP',
    'OTP expiry',
    'secure OTP API',
    'OTP fraud prevention',
    'India OTP security',
  ],
  publishedAt: '2026-01-20',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-otp-security-matters', title: 'Why OTP Security Matters' },
    { id: 'hash-otp-codes-with-bcrypt', title: 'Hash OTP Codes with bcrypt' },
    { id: 'enforce-rate-limiting', title: 'Enforce Rate Limiting' },
    { id: 'set-expiry-windows', title: 'Set Expiry Windows' },
    { id: 'limit-verification-attempts', title: 'Limit Verification Attempts' },
    { id: 'secure-transmission-https', title: 'Secure Transmission with HTTPS' },
    { id: 'use-idempotency-keys', title: 'Use Idempotency Keys' },
    { id: 'additional-hardening', title: 'Additional Hardening Techniques' },
    { id: 'how-startmessaging-handles-security', title: 'How StartMessaging Handles Security' },
    { id: 'security-checklist', title: 'Security Checklist' },
  ],
  content: (
    <>
      <p>
        One-time passwords are the backbone of user verification in modern applications. From login
        flows to payment confirmations, OTPs protect millions of transactions daily across India.
        Yet many development teams treat OTP implementation as a simple &quot;generate and send&quot;
        problem, overlooking critical security considerations that can expose their users to account
        takeover, financial fraud, and data breaches.
      </p>
      <p>
        This guide walks through every layer of OTP security that you should implement, from
        cryptographic hashing to transport-layer enforcement. Whether you are building your own OTP
        system or integrating a managed{' '}
        <Link href="/otp-api">OTP API like StartMessaging</Link>, these principles apply.
      </p>

      <h2 id="why-otp-security-matters">Why OTP Security Matters</h2>
      <p>
        OTP codes are short-lived credentials, but they carry significant trust. When a user
        receives a 6-digit code and enters it correctly, your system grants them access to an
        account, authorises a payment, or confirms an identity change. If an attacker can intercept,
        guess, or replay that code, they inherit that trust.
      </p>
      <p>Common attack vectors against OTP systems include:</p>
      <ul>
        <li>
          <strong>Brute force:</strong> With a 6-digit code, there are only 1,000,000 possible
          combinations. Without attempt limits, an attacker can try all of them in seconds.
        </li>
        <li>
          <strong>Database exposure:</strong> If OTP codes are stored in plaintext and the database
          is compromised, every pending OTP is immediately usable.
        </li>
        <li>
          <strong>SMS pumping:</strong> Attackers trigger thousands of OTP sends to premium-rate
          numbers, inflating your SMS costs without any real users involved.
        </li>
        <li>
          <strong>Replay attacks:</strong> A previously valid OTP is resubmitted after it should
          have been invalidated.
        </li>
        <li>
          <strong>Man-in-the-middle:</strong> OTP codes intercepted in transit when the API
          connection is not encrypted.
        </li>
      </ul>
      <p>
        Each of the practices below addresses one or more of these vectors. Implementing them
        together creates a defence-in-depth posture that makes your OTP system far harder to
        compromise.
      </p>

      <h2 id="hash-otp-codes-with-bcrypt">Hash OTP Codes with bcrypt</h2>
      <p>
        The single most important security measure for OTP storage is <strong>never storing the OTP
        code in plaintext</strong>. If your database is breached, an attacker with access to raw OTP
        values can verify any pending request.
      </p>
      <p>
        Use bcrypt to hash OTP codes before writing them to the database. When a user submits their
        code for verification, hash the submitted value and compare it against the stored hash.
      </p>
      <pre>
        <code>{`import bcrypt from 'bcrypt';

// When generating an OTP
const otpCode = generateSecureRandom6Digit();
const saltRounds = 10;
const otpHash = await bcrypt.hash(otpCode, saltRounds);

// Store otpHash in your database — never store otpCode
await db.otpRequests.create({
  phoneNumber: '+919876543210',
  otpHash: otpHash,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  attemptsLeft: 3,
});

// Send the plaintext code to the user via SMS
await sendSms(phoneNumber, \`Your verification code is \${otpCode}\`);`}</code>
      </pre>
      <p>
        When verifying:
      </p>
      <pre>
        <code>{`// User submits their code
const isValid = await bcrypt.compare(submittedCode, storedOtpHash);
if (!isValid) {
  // Decrement attempts remaining
  await db.otpRequests.update(requestId, {
    attemptsLeft: attemptsLeft - 1,
  });
  throw new Error('Invalid OTP code');
}`}</code>
      </pre>
      <p>
        Why bcrypt instead of SHA-256? bcrypt is deliberately slow, which means even if the hash
        leaks, an attacker cannot quickly brute-force all 1,000,000 possible 6-digit codes. SHA-256
        is fast enough that brute-forcing a 6-digit space takes milliseconds.
        StartMessaging uses bcrypt hashing for all OTP codes internally, so codes are never stored
        in a recoverable format.
      </p>

      <h2 id="enforce-rate-limiting">Enforce Rate Limiting</h2>
      <p>
        Rate limiting prevents abuse at the entry point. Without it, attackers can trigger unlimited
        OTP sends (SMS pumping) or submit unlimited verification attempts (brute force).
      </p>
      <p>Implement rate limits at multiple levels:</p>
      <ul>
        <li>
          <strong>Per phone number:</strong> No more than 3-5 OTP requests per phone number within a
          10-minute window. This prevents a single number from being flooded.
        </li>
        <li>
          <strong>Per IP address:</strong> No more than 10-20 OTP requests per IP within a
          10-minute window. This catches attackers rotating through phone numbers from a single
          source.
        </li>
        <li>
          <strong>Global rate limit:</strong> Set an upper bound on total OTP sends per minute
          across your entire application. If this limit is hit, alert your engineering team.
        </li>
      </ul>
      <p>
        A sliding window approach works well for OTP rate limiting. Rather than resetting counters on
        fixed intervals, track the timestamp of each request and count how many fall within the
        trailing window.
      </p>
      <pre>
        <code>{`// Redis-based sliding window rate limiter
async function checkRateLimit(phoneNumber: string): Promise<boolean> {
  const key = \`otp:ratelimit:\${phoneNumber}\`;
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;
  const now = Date.now();

  // Remove entries outside the window
  await redis.zremrangebyscore(key, 0, now - windowMs);

  // Count remaining entries
  const count = await redis.zcard(key);
  if (count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Add the current request
  await redis.zadd(key, now, \`\${now}\`);
  await redis.expire(key, Math.ceil(windowMs / 1000));
  return true;
}`}</code>
      </pre>
      <p>
        For a deeper dive, read our{' '}
        <Link href="/blog/otp-rate-limiting-guide">complete guide to OTP rate limiting</Link>.
        StartMessaging includes built-in per-number and per-IP rate limiting on all OTP endpoints,
        so you get protection out of the box.
      </p>

      <h2 id="set-expiry-windows">Set Expiry Windows</h2>
      <p>
        Every OTP code must have a time-to-live. The longer an OTP remains valid, the larger the
        window for interception or brute-force attacks.
      </p>
      <p>
        The recommended expiry window is <strong>5 to 10 minutes</strong>. Five minutes is ideal for
        most login and verification flows. Ten minutes can be appropriate for less time-sensitive
        operations like email change confirmations where the user might take longer to act.
      </p>
      <p>Best practices for expiry:</p>
      <ul>
        <li>
          Store an <code>expiresAt</code> timestamp alongside the hashed OTP. Check it before
          comparing the hash.
        </li>
        <li>
          Invalidate the OTP immediately after successful verification. Do not allow a valid code to
          be reused.
        </li>
        <li>
          When a new OTP is generated for the same phone number and purpose, invalidate any
          previously active OTP for that combination.
        </li>
        <li>
          Run a periodic cleanup job to delete expired OTP records from the database.
        </li>
      </ul>
      <p>
        For detailed guidance on choosing the right expiry window and handling edge cases, see our{' '}
        <Link href="/blog/otp-expiry-attempt-limits">OTP Expiry and Attempt Limits Design Guide</Link>.
      </p>

      <h2 id="limit-verification-attempts">Limit Verification Attempts</h2>
      <p>
        Even with bcrypt hashing, you should limit the number of times a user can attempt to verify
        a given OTP. Three to five attempts is the standard range.
      </p>
      <p>Implementation approach:</p>
      <ol>
        <li>
          Store an <code>attemptsLeft</code> counter (e.g., 3) when the OTP is created.
        </li>
        <li>
          On each failed verification, decrement the counter.
        </li>
        <li>
          When the counter reaches zero, mark the OTP as exhausted and require the user to request a
          new one.
        </li>
        <li>
          After multiple exhausted OTPs in sequence, apply a cooldown before allowing a new request
          (e.g., 30 seconds, then 60 seconds, then 5 minutes).
        </li>
      </ol>
      <pre>
        <code>{`// Verify OTP with attempt limiting
async function verifyOtp(requestId: string, code: string) {
  const otpRequest = await db.otpRequests.findOne(requestId);

  if (!otpRequest || otpRequest.expiresAt < new Date()) {
    throw new Error('OTP expired or not found');
  }

  if (otpRequest.attemptsLeft <= 0) {
    throw new Error('Maximum attempts exceeded. Request a new OTP.');
  }

  const isValid = await bcrypt.compare(code, otpRequest.otpHash);

  if (!isValid) {
    await db.otpRequests.update(requestId, {
      attemptsLeft: otpRequest.attemptsLeft - 1,
    });
    throw new Error(
      \`Invalid code. \${otpRequest.attemptsLeft - 1} attempts remaining.\`
    );
  }

  // Success — invalidate the OTP
  await db.otpRequests.update(requestId, {
    verifiedAt: new Date(),
    attemptsLeft: 0,
  });

  return { verified: true };
}`}</code>
      </pre>

      <h2 id="secure-transmission-https">Secure Transmission with HTTPS</h2>
      <p>
        All communication between your client application, your backend, and any OTP API must use
        HTTPS (TLS 1.2 or higher). This is non-negotiable.
      </p>
      <p>Key points:</p>
      <ul>
        <li>
          <strong>API calls:</strong> Your backend should only call OTP provider APIs over HTTPS.
          Reject any provider that offers HTTP-only endpoints.
        </li>
        <li>
          <strong>Client to server:</strong> Your frontend must submit verification codes over
          HTTPS. Set up HSTS headers to prevent protocol downgrade attacks.
        </li>
        <li>
          <strong>API key transmission:</strong> The API key used to authenticate with your OTP
          provider travels in every request header. Without HTTPS, it is visible to any network
          observer.
        </li>
        <li>
          <strong>Certificate pinning:</strong> For mobile apps, consider certificate pinning to
          prevent man-in-the-middle attacks even on compromised networks.
        </li>
      </ul>
      <p>
        StartMessaging enforces HTTPS on all API endpoints. Requests to{' '}
        <code>https://api.startmessaging.com/otp/send</code> and{' '}
        <code>https://api.startmessaging.com/otp/verify</code> use TLS 1.2+ exclusively. API keys
        are transmitted via the <code>X-API-Key</code> header and are stored as SHA-256 hashes on
        our end.
      </p>

      <h2 id="use-idempotency-keys">Use Idempotency Keys</h2>
      <p>
        Network failures happen. When a client does not receive a response to an OTP send request,
        it may retry. Without idempotency protection, each retry generates and sends a new OTP code,
        confusing the user and wasting SMS credits.
      </p>
      <p>
        An idempotency key is a unique identifier that the client generates and includes with each
        request. If the server receives a second request with the same idempotency key, it returns
        the original response without creating a new OTP.
      </p>
      <pre>
        <code>{`// Client-side: generate idempotency key before sending
const idempotencyKey = crypto.randomUUID();

const response = await fetch('https://api.startmessaging.com/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'sm_live_your_api_key_here',
    'Idempotency-Key': idempotencyKey,
  },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    expiry: 300,
  }),
});

// If the request times out, retry with the SAME idempotencyKey
// The server will return the original response`}</code>
      </pre>
      <p>
        On the server side, store the idempotency key with a database unique constraint. When a
        duplicate arrives, look up the existing record and return its response. StartMessaging
        supports idempotency keys natively on the <code>/otp/send</code> endpoint, preventing
        duplicate OTP sends from costing you extra.
      </p>

      <h2 id="additional-hardening">Additional Hardening Techniques</h2>
      <p>
        Beyond the core practices above, consider these additional layers of protection:
      </p>

      <h3>Use Cryptographically Secure Random Generation</h3>
      <p>
        Never use <code>Math.random()</code> to generate OTP codes. It is not cryptographically
        secure and can be predicted. Use <code>crypto.randomInt()</code> in Node.js or equivalent
        secure random APIs.
      </p>
      <pre>
        <code>{`import crypto from 'crypto';

function generateOtp(length = 6): string {
  const max = Math.pow(10, length);
  const code = crypto.randomInt(0, max);
  return code.toString().padStart(length, '0');
}`}</code>
      </pre>

      <h3>Avoid Leaking OTP Status Information</h3>
      <p>
        Your API responses should not reveal whether a phone number exists in your system.
        Whether the number is registered or not, return the same generic response:
        &quot;If this number is registered, an OTP has been sent.&quot; This prevents phone number
        enumeration attacks.
      </p>

      <h3>Log and Monitor OTP Activity</h3>
      <p>
        Track metrics like OTP send volume, failure rates, and verification success rates. Sudden
        spikes in any of these can indicate an attack. Set up alerts for:
      </p>
      <ul>
        <li>More than 100 OTP sends per minute (adjust to your baseline)</li>
        <li>Verification success rate dropping below 50%</li>
        <li>A single phone number receiving more than 10 OTPs in an hour</li>
        <li>A single IP triggering more than 50 OTP requests in an hour</li>
      </ul>

      <h3>Implement Resend Cooldowns</h3>
      <p>
        When users request a new OTP (resend), enforce a cooldown period of at least 30 seconds.
        This prevents rapid-fire resend abuse and gives the original SMS time to arrive.
      </p>

      <h2 id="how-startmessaging-handles-security">How StartMessaging Handles Security</h2>
      <p>
        <Link href="/features">StartMessaging</Link> is designed with these security practices built
        into the platform, so you do not have to implement them from scratch:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Security Layer</th>
              <th>StartMessaging Implementation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OTP hashing</td>
              <td>All codes bcrypt-hashed before storage. Plaintext is never persisted.</td>
            </tr>
            <tr>
              <td>Rate limiting</td>
              <td>Per-phone and per-IP limits applied automatically on send and verify endpoints.</td>
            </tr>
            <tr>
              <td>Expiry windows</td>
              <td>Configurable expiry (default 5 minutes). Codes invalidated on successful verify.</td>
            </tr>
            <tr>
              <td>Attempt limits</td>
              <td>3 verification attempts per OTP. Exceeded attempts require a new request.</td>
            </tr>
            <tr>
              <td>HTTPS</td>
              <td>TLS 1.2+ enforced on all endpoints. No HTTP fallback.</td>
            </tr>
            <tr>
              <td>Idempotency</td>
              <td>Native idempotency key support on /otp/send to prevent duplicate sends.</td>
            </tr>
            <tr>
              <td>API key security</td>
              <td>Keys are SHA-256 hashed. Full key shown only once at creation time.</td>
            </tr>
            <tr>
              <td>Fraud detection</td>
              <td>SMS pumping detection with automatic blocking of suspicious patterns.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        At <Link href="/pricing">Rs 0.25 per OTP</Link>, you get enterprise-grade security without
        the engineering overhead of building these protections yourself.
      </p>

      <h2 id="security-checklist">Security Checklist</h2>
      <p>
        Use this checklist when auditing your OTP implementation:
      </p>
      <ol>
        <li>OTP codes are hashed with bcrypt (not stored in plaintext or with fast hashes)</li>
        <li>Rate limiting is applied per phone number, per IP, and globally</li>
        <li>OTP expiry is set between 5 and 10 minutes</li>
        <li>Verification attempts are capped at 3-5 per OTP</li>
        <li>All API communication uses HTTPS with TLS 1.2+</li>
        <li>Idempotency keys prevent duplicate OTP sends on retries</li>
        <li>OTP generation uses cryptographically secure randomness</li>
        <li>API responses do not leak phone number registration status</li>
        <li>Resend cooldowns of at least 30 seconds are enforced</li>
        <li>Monitoring and alerting are set up for anomalous OTP activity</li>
        <li>Used OTP codes are invalidated immediately after successful verification</li>
        <li>Previous active OTPs are invalidated when a new one is generated</li>
      </ol>
      <p>
        If you want a managed solution that handles all of the above,{' '}
        <Link href="/otp-api">explore the StartMessaging OTP API</Link>. You can go from zero to
        production-ready OTP verification in under 15 minutes.
      </p>
    </>
  ),
  relatedSlugs: ['otp-rate-limiting-guide', 'prevent-otp-fraud'],
  faq: [
    {
      question: 'Why should I hash OTP codes with bcrypt instead of SHA-256?',
      answer:
        'bcrypt is intentionally slow, making brute-force attacks against the 6-digit code space computationally expensive. SHA-256 is fast enough that an attacker can try all 1,000,000 possible 6-digit codes in milliseconds. bcrypt with a reasonable salt round count (10-12) makes each comparison take tens of milliseconds, turning a millisecond attack into a hours-long effort.',
    },
    {
      question: 'What is the recommended OTP expiry time?',
      answer:
        'Five minutes is the standard recommendation for login and verification flows. It gives users enough time to receive and enter the code while minimising the attack window. For less time-sensitive flows, 10 minutes is acceptable. Never set expiry beyond 15 minutes.',
    },
    {
      question: 'How many verification attempts should I allow per OTP?',
      answer:
        'Three attempts is the recommended maximum. This gives legitimate users room for typos while making brute-force attacks impractical. With 3 attempts out of 1,000,000 possible codes, the probability of a random guess succeeding is 0.0003%.',
    },
    {
      question: 'Does StartMessaging handle OTP security automatically?',
      answer:
        'Yes. StartMessaging bcrypt-hashes all OTP codes, enforces rate limiting per phone number and IP address, sets configurable expiry windows, limits verification attempts to 3, requires HTTPS, and supports idempotency keys. All of these protections are active by default on every API call.',
    },
  ],
};
