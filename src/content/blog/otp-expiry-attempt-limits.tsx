import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-expiry-attempt-limits',
  title: 'OTP Expiry and Attempt Limits: Design Guide',
  description:
    'Best practices for OTP time windows, max verification attempts, lockout strategies, resend cooldowns, and the UX tradeoffs developers need to consider.',
  category: 'security',
  keywords: [
    'OTP expiry time',
    'OTP attempt limit',
    'OTP lockout strategy',
    'OTP resend cooldown',
    'OTP TTL best practice',
    'OTP verification attempts',
    'OTP timeout',
    'OTP design guide',
  ],
  publishedAt: '2026-02-03',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-expiry-and-limits-matter', title: 'Why Expiry and Limits Matter' },
    { id: 'choosing-the-right-expiry-window', title: 'Choosing the Right Expiry Window' },
    { id: 'max-verification-attempts', title: 'Max Verification Attempts' },
    { id: 'lockout-strategies', title: 'Lockout Strategies' },
    { id: 'resend-cooldowns', title: 'Resend Cooldowns' },
    { id: 'invalidation-rules', title: 'Invalidation Rules' },
    { id: 'ux-considerations', title: 'UX Considerations' },
    { id: 'implementation-patterns', title: 'Implementation Patterns' },
    { id: 'security-tradeoffs', title: 'Security Tradeoffs' },
    { id: 'how-startmessaging-handles-this', title: 'How StartMessaging Handles This' },
  ],
  content: (
    <>
      <p>
        Two parameters define how secure and usable an OTP system feels: the expiry window (how
        long a code remains valid) and the attempt limit (how many times a user can try to enter
        it). Set them too tight and you frustrate legitimate users. Set them too loose and you
        invite brute-force attacks.
      </p>
      <p>
        This guide covers the design decisions behind both parameters, including the lockout
        strategies, resend cooldowns, and UX patterns that tie everything together into a coherent
        verification experience.
      </p>

      <h2 id="why-expiry-and-limits-matter">Why Expiry and Limits Matter</h2>
      <p>
        An OTP code is essentially a temporary password. The shorter its lifespan and the fewer
        guesses an attacker gets, the harder it is to compromise. Consider the math:
      </p>
      <ul>
        <li>
          A 6-digit OTP has 1,000,000 possible values.
        </li>
        <li>
          With unlimited attempts, an attacker can try all of them in seconds via an automated
          script.
        </li>
        <li>
          With 3 attempts, the probability of a random guess succeeding is 3 in 1,000,000
          (0.0003%).
        </li>
        <li>
          With a 5-minute expiry, even if the attacker somehow obtains the code (e.g., by reading
          the SMS off a screen), they have a narrow window to use it.
        </li>
      </ul>
      <p>
        Together, expiry and attempt limits reduce the attack surface to near zero for standard OTP
        implementations. But the specific values you choose affect your user experience significantly.
      </p>

      <h2 id="choosing-the-right-expiry-window">Choosing the Right Expiry Window</h2>
      <p>
        The expiry window defines how long after generation an OTP code can be successfully
        verified. Here is how different windows map to use cases:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Expiry Window</th>
              <th>Best For</th>
              <th>Tradeoff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2 minutes</td>
              <td>High-security financial transactions</td>
              <td>Some users on slow networks may not receive SMS in time</td>
            </tr>
            <tr>
              <td>5 minutes</td>
              <td>Login, registration, standard verification</td>
              <td>Best balance of security and usability for most apps</td>
            </tr>
            <tr>
              <td>10 minutes</td>
              <td>Email-based OTP, low-urgency verification</td>
              <td>Wider attack window but accommodates slower channels</td>
            </tr>
            <tr>
              <td>15 minutes</td>
              <td>Cross-device flows (start on mobile, verify on desktop)</td>
              <td>Borderline too long; consider alternatives for this scenario</td>
            </tr>
            <tr>
              <td>30+ minutes</td>
              <td>Not recommended for any use case</td>
              <td>Unnecessarily wide attack window</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>The 5-minute window is the industry standard for SMS OTP.</strong> It accounts for
        the typical SMS delivery time in India (3-10 seconds under normal conditions, up to 30
        seconds during peak hours) plus ample time for the user to read and enter the code.
      </p>
      <p>Key implementation details:</p>
      <ul>
        <li>
          Store the expiry as an absolute timestamp (<code>expiresAt</code>), not a relative
          duration. This avoids clock drift issues between services.
        </li>
        <li>
          Check expiry <em>before</em> comparing the hash. Do not waste compute on bcrypt
          comparison if the OTP has already expired.
        </li>
        <li>
          Use server time, not client time, for all expiry calculations. Client clocks can be
          manipulated.
        </li>
      </ul>
      <pre>
        <code>{`// Creating an OTP with expiry
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

async function createOtp(phoneNumber: string) {
  const code = generateSecureOtp();
  const hash = await bcrypt.hash(code, 10);

  const otpRequest = await db.otpRequests.create({
    phoneNumber,
    otpHash: hash,
    expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
    attemptsLeft: 3,
    resendCount: 0,
    createdAt: new Date(),
  });

  await sendSms(phoneNumber, code);
  return { requestId: otpRequest.id, expiresAt: otpRequest.expiresAt };
}

// Verifying with expiry check first
async function verifyOtp(requestId: string, code: string) {
  const request = await db.otpRequests.findOne(requestId);

  // Check expiry BEFORE hash comparison
  if (!request || request.expiresAt < new Date()) {
    throw new Error('OTP has expired. Please request a new one.');
  }

  if (request.attemptsLeft <= 0) {
    throw new Error('Too many attempts. Please request a new OTP.');
  }

  // Now compare the hash
  const isValid = await bcrypt.compare(code, request.otpHash);
  // ... handle result
}`}</code>
      </pre>

      <h2 id="max-verification-attempts">Max Verification Attempts</h2>
      <p>
        The attempt limit caps how many times a user (or attacker) can try to verify a specific OTP
        before it is invalidated. The standard range is 3 to 5 attempts.
      </p>

      <h3>Why 3 Attempts is the Sweet Spot</h3>
      <p>
        Three attempts provides enough room for legitimate user errors (misreading a digit, typo on
        a small phone keyboard) while keeping the brute-force probability negligible:
      </p>
      <ul>
        <li>
          <strong>3 attempts out of 1,000,000:</strong> 0.0003% chance of a random guess succeeding.
        </li>
        <li>
          <strong>5 attempts out of 1,000,000:</strong> 0.0005% chance. Marginally less secure but
          still extremely safe.
        </li>
        <li>
          <strong>10 attempts out of 1,000,000:</strong> 0.001% chance. Starting to provide
          unnecessary room for attackers with no real UX benefit.
        </li>
      </ul>
      <p>
        In practice, legitimate users almost always enter the correct code on the first or second
        attempt. If they fail three times, the most likely explanation is that they are entering an
        OTP from a different request or that the SMS was delivered to the wrong device. A new OTP
        solves both cases.
      </p>

      <h3>4-Digit vs 6-Digit OTPs</h3>
      <p>
        If you use 4-digit OTP codes (10,000 possible values), attempt limits become even more
        critical:
      </p>
      <ul>
        <li>
          3 attempts out of 10,000: 0.03% chance of random success.
        </li>
        <li>
          5 attempts out of 10,000: 0.05% chance.
        </li>
        <li>
          10 attempts out of 10,000: 0.1% or 1 in 1,000 chance. This is uncomfortably high for
          security-sensitive applications.
        </li>
      </ul>
      <p>
        For this reason, 6-digit OTPs are strongly recommended for any application handling
        financial data, personal information, or account access. Use 4-digit codes only for
        low-risk scenarios like newsletter signup confirmation.
      </p>

      <h2 id="lockout-strategies">Lockout Strategies</h2>
      <p>
        When a user exhausts their verification attempts, you need a lockout strategy. The goal is
        to prevent rapid retry abuse while allowing the legitimate user to recover.
      </p>

      <h3>Progressive Lockout</h3>
      <p>
        The most user-friendly approach is progressive lockout, where each consecutive exhausted OTP
        increases the cooldown before a new one can be requested:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Failed OTP Count</th>
              <th>Cooldown Before Next OTP</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1st exhausted OTP</td>
              <td>30 seconds</td>
              <td>Likely a typo; let them retry quickly</td>
            </tr>
            <tr>
              <td>2nd exhausted OTP</td>
              <td>60 seconds</td>
              <td>Possibly entering wrong code; slight pause helps</td>
            </tr>
            <tr>
              <td>3rd exhausted OTP</td>
              <td>5 minutes</td>
              <td>Suspicious; slow them down significantly</td>
            </tr>
            <tr>
              <td>4th exhausted OTP</td>
              <td>15 minutes</td>
              <td>Likely automated; long cooldown needed</td>
            </tr>
            <tr>
              <td>5th+ exhausted OTP</td>
              <td>1 hour</td>
              <td>Almost certainly abuse; near-lockout</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pre>
        <code>{`// Progressive lockout calculation
function getLockoutDurationMs(consecutiveFailures: number): number {
  const durations = [
    0,        // 0 failures: no lockout
    30_000,   // 1 failure: 30 seconds
    60_000,   // 2 failures: 1 minute
    300_000,  // 3 failures: 5 minutes
    900_000,  // 4 failures: 15 minutes
    3600_000, // 5+ failures: 1 hour
  ];
  const index = Math.min(consecutiveFailures, durations.length - 1);
  return durations[index];
}

async function canRequestNewOtp(phoneNumber: string): Promise<{
  allowed: boolean;
  waitMs: number;
}> {
  const recentFailures = await db.otpRequests.count({
    where: {
      phoneNumber,
      attemptsLeft: 0,
      verifiedAt: IsNull(), // Not successfully verified
      createdAt: MoreThan(new Date(Date.now() - 3600_000)), // Last hour
    },
  });

  const lockoutMs = getLockoutDurationMs(recentFailures);
  const lastRequest = await db.otpRequests.findOne({
    where: { phoneNumber },
    order: { createdAt: 'DESC' },
  });

  if (!lastRequest) return { allowed: true, waitMs: 0 };

  const elapsed = Date.now() - lastRequest.createdAt.getTime();
  if (elapsed < lockoutMs) {
    return { allowed: false, waitMs: lockoutMs - elapsed };
  }

  return { allowed: true, waitMs: 0 };
}`}</code>
      </pre>

      <h3>Hard Lockout</h3>
      <p>
        For high-security applications (banking, payment authorisation), consider a hard lockout
        after 3-5 consecutive exhausted OTPs. The user must contact support or use an alternative
        verification method (email, security questions) to regain access.
      </p>
      <p>
        Hard lockouts reduce abuse risk to near zero but create support burden. Use them only when
        the security requirement justifies the operational cost.
      </p>

      <h2 id="resend-cooldowns">Resend Cooldowns</h2>
      <p>
        Resend cooldowns govern how frequently a user can request a new OTP code. They serve a dual
        purpose: preventing SMS cost abuse and giving the current OTP time to be delivered.
      </p>
      <p>
        The recommended resend cooldown is <strong>30 seconds</strong> for the first resend, with
        progressive increases for subsequent resends within the same session.
      </p>

      <h3>Why 30 Seconds?</h3>
      <ul>
        <li>
          SMS delivery in India typically takes 3-10 seconds. By the time 30 seconds have passed,
          the original message has almost certainly been delivered or it has permanently failed.
        </li>
        <li>
          Users who tap &quot;Resend&quot; immediately often do so because they are impatient, not
          because the SMS actually failed. A 30-second cooldown reduces unnecessary resends by 60-70%.
        </li>
        <li>
          From a cost perspective, preventing even one unnecessary resend per 100 OTP flows saves
          Rs 0.25 per 100 flows (at StartMessaging rates), which adds up at scale.
        </li>
      </ul>

      <h3>Progressive Resend Schedule</h3>
      <pre>
        <code>{`// Resend cooldown schedule
const RESEND_COOLDOWNS_MS = [
  30_000,   // 1st resend: 30 seconds
  60_000,   // 2nd resend: 1 minute
  120_000,  // 3rd resend: 2 minutes
  300_000,  // 4th resend: 5 minutes
];

function getResendCooldown(resendCount: number): number {
  if (resendCount >= RESEND_COOLDOWNS_MS.length) {
    return RESEND_COOLDOWNS_MS[RESEND_COOLDOWNS_MS.length - 1];
  }
  return RESEND_COOLDOWNS_MS[resendCount];
}`}</code>
      </pre>
      <p>
        When a resend is triggered, invalidate the previous OTP. Only one OTP should be active for
        a given phone number and purpose at any time. This prevents confusion (user has two valid
        codes and enters the wrong one) and eliminates the attack surface of having multiple valid
        codes simultaneously.
      </p>

      <h2 id="invalidation-rules">Invalidation Rules</h2>
      <p>
        An OTP should be invalidated (made permanently unusable) under any of these conditions:
      </p>
      <ol>
        <li>
          <strong>Successful verification:</strong> The user entered the correct code. Mark it as
          used immediately. Never allow a verified code to be used again.
        </li>
        <li>
          <strong>Expiry:</strong> The <code>expiresAt</code> timestamp has passed. Reject the code
          even if it is correct.
        </li>
        <li>
          <strong>Attempts exhausted:</strong> The user used all allowed verification attempts
          without success.
        </li>
        <li>
          <strong>New OTP generated:</strong> When the user requests a resend, invalidate the
          previous OTP for the same phone number and purpose.
        </li>
        <li>
          <strong>Session ended:</strong> If the user navigates away from the verification flow or
          their session expires, consider invalidating any pending OTPs.
        </li>
      </ol>
      <pre>
        <code>{`// Invalidate previous OTPs when a new one is created
async function invalidatePreviousOtps(
  phoneNumber: string,
  purpose: string
) {
  await db.otpRequests.update(
    {
      phoneNumber,
      purpose,
      verifiedAt: IsNull(),
      expiresAt: MoreThan(new Date()), // Only active (non-expired) ones
    },
    {
      expiresAt: new Date(), // Set expiry to now
      attemptsLeft: 0,       // Zero out attempts
    }
  );
}`}</code>
      </pre>

      <h2 id="ux-considerations">UX Considerations</h2>
      <p>
        Security parameters directly affect user experience. Here are the UX patterns that make
        expiry and attempt limits feel natural rather than frustrating:
      </p>

      <h3>Show a Countdown Timer</h3>
      <p>
        Display a visible countdown showing how much time remains before the OTP expires. This sets
        clear expectations and reduces anxiety. When the timer reaches zero, show a prompt to
        request a new code.
      </p>

      <h3>Show Remaining Attempts</h3>
      <p>
        After a failed verification, tell the user how many attempts they have left: &quot;Incorrect
        code. 2 attempts remaining.&quot; This prevents the surprise of a sudden lockout.
      </p>

      <h3>Resend Button with Cooldown</h3>
      <p>
        Show the resend button with a countdown: &quot;Resend code in 28s&quot;. When the cooldown
        expires, enable the button. Never hide the resend option entirely; users need to know it
        exists even when it is temporarily unavailable.
      </p>

      <h3>Clear Error Messages</h3>
      <p>
        Use specific, actionable error messages:
      </p>
      <ul>
        <li>&quot;Incorrect code. 2 attempts remaining.&quot; (not just &quot;Invalid OTP&quot;)</li>
        <li>&quot;This code has expired. We have sent a new one.&quot; (auto-resend on expiry)</li>
        <li>&quot;Too many attempts. You can request a new code in 4 minutes.&quot;</li>
        <li>&quot;Code sent! Check your SMS inbox.&quot; (confirmation after resend)</li>
      </ul>

      <h3>Auto-Resend on Expiry (Optional)</h3>
      <p>
        Some applications automatically send a new OTP when the previous one expires, if the user
        is still on the verification screen. This reduces friction but increases SMS costs. Use it
        selectively for high-value conversion flows (e.g., checkout verification) where drop-off is
        costly.
      </p>

      <h2 id="implementation-patterns">Implementation Patterns</h2>
      <p>
        Here is a complete OTP request record structure that supports all the patterns discussed:
      </p>
      <pre>
        <code>{`// OTP Request entity
interface OtpRequest {
  id: string;
  phoneNumber: string;
  purpose: 'login' | 'registration' | 'payment' | 'password-reset';
  otpHash: string;           // bcrypt hash of the OTP code
  expiresAt: Date;           // Absolute expiry timestamp
  attemptsLeft: number;      // Starts at 3, decremented on failure
  resendCount: number;       // How many times this flow has been resent
  verifiedAt: Date | null;   // Set on successful verification
  createdAt: Date;
  idempotencyKey: string;    // Prevents duplicate sends on retry
}

// Configuration constants
const OTP_CONFIG = {
  codeLength: 6,
  expiryMs: 5 * 60 * 1000,        // 5 minutes
  maxAttempts: 3,
  maxResendsPerSession: 4,
  resendCooldownsMs: [30_000, 60_000, 120_000, 300_000],
  lockoutDurationsMs: [0, 30_000, 60_000, 300_000, 900_000, 3600_000],
};`}</code>
      </pre>

      <h2 id="security-tradeoffs">Security Tradeoffs</h2>
      <p>
        Every configuration choice involves a tradeoff. Here is a summary to guide your decisions:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>More Restrictive</th>
              <th>More Permissive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Expiry window</td>
              <td>2 min: Higher security, more expired-OTP frustration</td>
              <td>10 min: Lower security, fewer delivery-time issues</td>
            </tr>
            <tr>
              <td>Max attempts</td>
              <td>2: Near-zero brute force risk, more lockouts from typos</td>
              <td>5: Slightly higher risk, accommodates more user errors</td>
            </tr>
            <tr>
              <td>Resend cooldown</td>
              <td>60s: Lower SMS cost, some users feel stuck waiting</td>
              <td>15s: Higher SMS cost, faster recovery from delivery failures</td>
            </tr>
            <tr>
              <td>Lockout duration</td>
              <td>1 hour: Stops brute force cold, frustrates legitimate users</td>
              <td>1 min: Minimal friction, allows persistent attackers to continue</td>
            </tr>
            <tr>
              <td>OTP length</td>
              <td>8 digits: Very secure, harder to enter on mobile keyboards</td>
              <td>4 digits: Easy to enter, vulnerable with loose attempt limits</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For most Indian SaaS applications,{' '}
        <strong>5-minute expiry + 3 attempts + 6-digit codes + 30-second resend cooldown</strong>{' '}
        is the recommended baseline. Adjust based on your specific security requirements and user
        feedback.
      </p>

      <h2 id="how-startmessaging-handles-this">How StartMessaging Handles This</h2>
      <p>
        <Link href="/features">StartMessaging</Link> implements all of these design patterns in the
        managed OTP API:
      </p>
      <ul>
        <li>
          <strong>Default 5-minute expiry</strong> with configurable override per request (via the{' '}
          <code>expiry</code> parameter on{' '}
          <code>https://api.startmessaging.com/otp/send</code>).
        </li>
        <li>
          <strong>3 verification attempts</strong> per OTP. After exhaustion, the user must request
          a new code.
        </li>
        <li>
          <strong>Automatic invalidation</strong> of previous OTPs when a resend is triggered for
          the same phone number.
        </li>
        <li>
          <strong>bcrypt hashing</strong> of all OTP codes. Even our own database does not contain
          recoverable codes.
        </li>
        <li>
          <strong>Idempotency key support</strong> on the send endpoint, preventing duplicate sends
          from network retries.
        </li>
        <li>
          <strong>Built-in rate limiting</strong> that functions as a resend cooldown at the
          platform level.
        </li>
      </ul>
      <pre>
        <code>{`// StartMessaging OTP with custom expiry
const response = await fetch('https://api.startmessaging.com/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'sm_live_your_api_key_here',
    'Idempotency-Key': crypto.randomUUID(),
  },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    expiry: 300, // 5 minutes in seconds
  }),
});

// Verify within the expiry window (max 3 attempts)
const verifyResponse = await fetch('https://api.startmessaging.com/otp/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'sm_live_your_api_key_here',
  },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    otpCode: '483921',
  }),
});`}</code>
      </pre>
      <p>
        At <Link href="/pricing">Rs 0.25 per OTP</Link>, you get these security configurations
        without building the expiry, attempt tracking, and invalidation logic yourself. For the
        broader security picture, see our{' '}
        <Link href="/blog/otp-security-best-practices">OTP security best practices guide</Link> and{' '}
        <Link href="/blog/otp-rate-limiting-guide">rate limiting guide</Link>.
      </p>
    </>
  ),
  relatedSlugs: ['otp-security-best-practices', 'otp-verification-flow'],
  faq: [
    {
      question: 'What is the best OTP expiry time for mobile apps in India?',
      answer:
        'Five minutes is the recommended OTP expiry for SMS-based verification in India. It accounts for typical SMS delivery times (3-10 seconds normally, up to 30 seconds during peak hours on Indian networks) plus ample time for the user to read and enter the code. Going shorter than 3 minutes risks expiring before delivery during network congestion; going longer than 10 minutes unnecessarily widens the attack window.',
    },
    {
      question: 'How many OTP verification attempts should I allow?',
      answer:
        'Three attempts is the industry standard and offers the best balance. With a 6-digit OTP, 3 attempts give an attacker only a 0.0003% chance of guessing correctly. Most legitimate users succeed on the first attempt, and the second attempt covers common typos. If a user fails 3 times, they likely have the wrong code entirely and need a fresh one.',
    },
    {
      question: 'Should I auto-resend OTP when it expires?',
      answer:
        'Auto-resend can improve conversion rates in high-value flows (checkout, registration) where drop-off is costly. However, it increases SMS spend and should be limited to one automatic resend per session. Always show a notification when an auto-resend occurs so the user knows to expect a new code. For lower-value flows, let the user manually trigger a resend.',
    },
    {
      question: 'What happens when a user requests a new OTP before the old one expires?',
      answer:
        'Best practice is to immediately invalidate the previous OTP and generate a new one. Only one active OTP should exist per phone number and purpose at any time. This prevents confusion where the user might enter the old code instead of the new one, and eliminates the security risk of multiple valid codes being active simultaneously.',
    },
  ],
};
