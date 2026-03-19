import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-rate-limiting-guide',
  title: 'How to Rate Limit OTP Requests Properly',
  description:
    'Learn proven rate limiting strategies for OTP APIs: per-phone, per-IP, and sliding window approaches to prevent SMS pumping and brute force attacks.',
  category: 'security',
  keywords: [
    'OTP rate limiting',
    'rate limit SMS',
    'SMS pumping prevention',
    'OTP abuse prevention',
    'sliding window rate limit',
    'OTP API rate limit',
    'India SMS rate limit',
    'throttle OTP requests',
  ],
  publishedAt: '2026-01-24',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-rate-limiting-matters', title: 'Why Rate Limiting Matters' },
    { id: 'what-happens-without-rate-limiting', title: 'What Happens Without Rate Limiting' },
    { id: 'rate-limiting-strategies', title: 'Rate Limiting Strategies' },
    { id: 'per-phone-number-limiting', title: 'Per Phone Number Limiting' },
    { id: 'per-ip-address-limiting', title: 'Per IP Address Limiting' },
    { id: 'sliding-window-implementation', title: 'Sliding Window Implementation' },
    { id: 'global-rate-limits', title: 'Global Rate Limits' },
    { id: 'resend-cooldowns', title: 'Resend Cooldowns' },
    { id: 'responding-to-rate-limits', title: 'Responding to Rate-Limited Requests' },
    { id: 'startmessaging-built-in-protection', title: 'StartMessaging Built-in Protection' },
    { id: 'implementation-checklist', title: 'Implementation Checklist' },
  ],
  content: (
    <>
      <p>
        Rate limiting is the first line of defence against OTP abuse. Without it, your OTP system is
        an open target for SMS pumping attacks, brute-force verification attempts, and runaway costs.
        This guide covers every rate limiting strategy you need, with implementation patterns you can
        deploy today.
      </p>

      <h2 id="why-rate-limiting-matters">Why Rate Limiting Matters</h2>
      <p>
        OTP endpoints are unique among API surfaces because every request has a tangible cost: an SMS
        message that you pay for. Unlike a database query that costs fractions of a paisa, each OTP
        send can cost Rs 0.15 to Rs 0.50 depending on your provider. An attacker who can trigger
        unlimited sends can drain your SMS budget in minutes.
      </p>
      <p>
        Beyond cost, unlimited OTP requests create security risks. An attacker can flood a phone
        number with messages (a form of harassment), attempt to brute-force verification codes, or
        use your system as a relay for{' '}
        <Link href="/blog/prevent-otp-fraud">SMS pumping fraud</Link>.
      </p>
      <p>
        Rate limiting addresses all three concerns: it caps your cost exposure, prevents user
        harassment, and blocks brute-force attacks before they can succeed.
      </p>

      <h2 id="what-happens-without-rate-limiting">What Happens Without Rate Limiting</h2>
      <p>
        Consider a real scenario. A fintech startup launches an OTP-based login system without rate
        limiting. Within the first week, they notice:
      </p>
      <ul>
        <li>
          <strong>12,000 OTP messages sent in one hour</strong> to phone numbers across multiple
          countries, none of which belong to real users.
        </li>
        <li>
          <strong>SMS bill of Rs 3,600</strong> for a single hour of abuse (at Rs 0.30 per message).
        </li>
        <li>
          <strong>Provider throttling:</strong> Their SMS provider detects the spike and temporarily
          suspends their account, blocking legitimate users from receiving OTPs.
        </li>
        <li>
          <strong>Customer complaints:</strong> Real users who happen to receive multiple OTP
          messages during the attack report the app as spam.
        </li>
      </ul>
      <p>
        This is not hypothetical. SMS pumping is one of the most common attacks against OTP systems,
        particularly in markets like India where SMS delivery is reliable and inexpensive. Without
        rate limiting, you are paying attackers to abuse your infrastructure.
      </p>

      <h2 id="rate-limiting-strategies">Rate Limiting Strategies</h2>
      <p>
        Effective OTP rate limiting requires multiple layers. No single dimension of limiting is
        sufficient, because attackers adapt: if you limit by phone number, they rotate numbers; if
        you limit by IP, they use proxies. Layer your defences.
      </p>

      <h2 id="per-phone-number-limiting">Per Phone Number Limiting</h2>
      <p>
        The most essential rate limit is per phone number. No legitimate user needs to receive more
        than a handful of OTP messages within a short window.
      </p>
      <p>Recommended thresholds:</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Window</th>
              <th>Max OTP Sends</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 minute</td>
              <td>1</td>
              <td>Prevents rapid-fire sends; enforces resend cooldown</td>
            </tr>
            <tr>
              <td>10 minutes</td>
              <td>3</td>
              <td>Allows for 1 initial send + 2 resends within a session</td>
            </tr>
            <tr>
              <td>1 hour</td>
              <td>5</td>
              <td>Covers multiple sessions or retries with generous headroom</td>
            </tr>
            <tr>
              <td>24 hours</td>
              <td>10</td>
              <td>Daily cap prevents sustained abuse against a single number</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These thresholds cover the vast majority of legitimate use cases. A user who fails to receive
        their OTP after 10 attempts in a day has a delivery problem that rate limiting will not
        solve.
      </p>

      <h2 id="per-ip-address-limiting">Per IP Address Limiting</h2>
      <p>
        Per-IP limiting catches attackers who rotate through phone numbers from a single machine or
        botnet node. The thresholds should be higher than per-phone limits because multiple
        legitimate users may share an IP (e.g., behind a corporate NAT or mobile carrier gateway).
      </p>
      <p>Recommended thresholds:</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Window</th>
              <th>Max OTP Sends</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 minute</td>
              <td>5</td>
              <td>Allows a small office to send OTPs simultaneously</td>
            </tr>
            <tr>
              <td>10 minutes</td>
              <td>20</td>
              <td>Generous for shared IPs but blocks bulk abuse</td>
            </tr>
            <tr>
              <td>1 hour</td>
              <td>50</td>
              <td>Hard cap on hourly volume from a single source</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Be cautious with IP-based limiting on mobile networks. Indian telecom carriers frequently
        assign the same public IP to thousands of users via CGNAT. If you see legitimate users being
        blocked, increase the per-IP thresholds or add carrier IP range exceptions.
      </p>

      <h2 id="sliding-window-implementation">Sliding Window Implementation</h2>
      <p>
        The sliding window algorithm is the preferred approach for OTP rate limiting. Unlike fixed
        windows (which reset on clock boundaries), sliding windows provide consistent behaviour
        regardless of when the request arrives.
      </p>
      <p>
        A Redis sorted set is the ideal data structure. Each OTP request is stored as a member with
        its timestamp as the score. To check the rate limit, remove expired entries, count remaining
        ones, and either allow or deny the new request.
      </p>
      <pre>
        <code>{`import Redis from 'ioredis';

const redis = new Redis();

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number | null;
}

async function checkRateLimit(
  key: string,
  windowMs: number,
  maxRequests: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Atomic pipeline: clean expired, count, add if allowed
  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, windowStart);
  pipeline.zcard(key);
  const results = await pipeline.exec();

  const currentCount = results?.[1]?.[1] as number;

  if (currentCount >= maxRequests) {
    // Find the oldest entry to calculate retry-after
    const oldest = await redis.zrange(key, 0, 0, 'WITHSCORES');
    const oldestTimestamp = oldest.length >= 2 ? parseInt(oldest[1]) : now;
    const retryAfterMs = oldestTimestamp + windowMs - now;

    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(retryAfterMs, 0),
    };
  }

  // Add the current request
  await redis.zadd(key, now, \`\${now}:\${Math.random()}\`);
  await redis.expire(key, Math.ceil(windowMs / 1000));

  return {
    allowed: true,
    remaining: maxRequests - currentCount - 1,
    retryAfterMs: null,
  };
}

// Usage for OTP send endpoint
async function handleOtpSend(phoneNumber: string, clientIp: string) {
  // Check per-phone limit (3 per 10 minutes)
  const phoneLimit = await checkRateLimit(
    \`ratelimit:otp:phone:\${phoneNumber}\`,
    10 * 60 * 1000,
    3
  );
  if (!phoneLimit.allowed) {
    throw new Error('Too many OTP requests for this number. Try again later.');
  }

  // Check per-IP limit (20 per 10 minutes)
  const ipLimit = await checkRateLimit(
    \`ratelimit:otp:ip:\${clientIp}\`,
    10 * 60 * 1000,
    20
  );
  if (!ipLimit.allowed) {
    throw new Error('Too many requests from this IP. Try again later.');
  }

  // Proceed with OTP generation and send
}`}</code>
      </pre>

      <h2 id="global-rate-limits">Global Rate Limits</h2>
      <p>
        Global rate limits protect your overall system and budget. Set a ceiling on the total number
        of OTP sends per minute across your entire application. This acts as a circuit breaker: if a
        coordinated attack hits from multiple IPs targeting multiple phone numbers, the global limit
        will trigger even if per-phone and per-IP limits are not individually exceeded.
      </p>
      <p>Recommended approach:</p>
      <ul>
        <li>
          Calculate your baseline: if your application sends 100 OTPs per minute at peak, set a
          global limit of 300-500 per minute (3-5x headroom for growth).
        </li>
        <li>
          When the global limit is hit, send an alert to your engineering or security team
          immediately.
        </li>
        <li>
          Consider returning a 503 Service Unavailable rather than a 429 Too Many Requests at the
          global level, so clients know the issue is temporary.
        </li>
      </ul>

      <h2 id="resend-cooldowns">Resend Cooldowns</h2>
      <p>
        Resend cooldowns are a specialised form of rate limiting applied to the &quot;resend
        OTP&quot; action. When a user clicks the resend button, enforce a minimum waiting period
        before allowing a new OTP to be generated.
      </p>
      <p>A progressive cooldown schedule works well:</p>
      <ol>
        <li>First resend: 30-second cooldown</li>
        <li>Second resend: 60-second cooldown</li>
        <li>Third resend: 120-second cooldown</li>
        <li>Fourth resend and beyond: 300-second cooldown (5 minutes)</li>
      </ol>
      <p>
        Display the countdown timer in your UI so users know when they can retry. This reduces
        support tickets from users who repeatedly tap the resend button and also limits your SMS
        spend.
      </p>
      <pre>
        <code>{`// Progressive cooldown calculation
function getResendCooldownMs(resendCount: number): number {
  const cooldowns = [0, 30000, 60000, 120000, 300000];
  const index = Math.min(resendCount, cooldowns.length - 1);
  return cooldowns[index];
}

// Check cooldown before allowing resend
async function canResend(otpRequestId: string): Promise<{
  allowed: boolean;
  waitMs: number;
}> {
  const request = await db.otpRequests.findOne(otpRequestId);
  const cooldownMs = getResendCooldownMs(request.resendCount);
  const elapsed = Date.now() - request.lastSentAt.getTime();

  if (elapsed < cooldownMs) {
    return { allowed: false, waitMs: cooldownMs - elapsed };
  }

  return { allowed: true, waitMs: 0 };
}`}</code>
      </pre>

      <h2 id="responding-to-rate-limits">Responding to Rate-Limited Requests</h2>
      <p>
        How you respond to rate-limited requests matters for both security and user experience.
      </p>
      <p>For API responses, follow these conventions:</p>
      <ul>
        <li>
          Return HTTP <code>429 Too Many Requests</code> with a <code>Retry-After</code> header
          indicating how many seconds the client should wait.
        </li>
        <li>
          Include <code>X-RateLimit-Remaining</code> and <code>X-RateLimit-Reset</code> headers so
          well-behaved clients can self-throttle.
        </li>
        <li>
          Do not reveal which specific limit was hit (per-phone vs per-IP). A generic &quot;Rate
          limit exceeded&quot; message prevents attackers from probing your thresholds.
        </li>
      </ul>
      <pre>
        <code>{`// Express/NestJS rate limit response
if (!rateLimitResult.allowed) {
  res.set('Retry-After', Math.ceil(rateLimitResult.retryAfterMs / 1000));
  res.set('X-RateLimit-Remaining', '0');
  return res.status(429).json({
    success: false,
    error: 'Too many requests. Please try again later.',
  });
}`}</code>
      </pre>
      <p>
        For the user-facing experience, show a clear message with a countdown timer.
        Avoid vague error messages like &quot;Something went wrong&quot; which lead users to retry
        even more aggressively.
      </p>

      <h2 id="startmessaging-built-in-protection">StartMessaging Built-in Protection</h2>
      <p>
        <Link href="/features">StartMessaging</Link> includes rate limiting as a core platform
        feature. When you call the <code>/otp/send</code> endpoint, the following protections are
        applied automatically:
      </p>
      <ul>
        <li>
          <strong>Per-phone rate limits</strong> that match the thresholds described above, tuned for
          the Indian market.
        </li>
        <li>
          <strong>Per-IP rate limits</strong> with CGNAT-aware thresholds to avoid false positives
          on mobile networks.
        </li>
        <li>
          <strong>Global rate limits</strong> per API key, with configurable thresholds available on
          request.
        </li>
        <li>
          <strong>Automatic SMS pumping detection</strong> that identifies suspicious patterns
          (random number sequences, high-rate international numbers) and blocks them before delivery.
        </li>
      </ul>
      <p>
        This means you can focus on building your application logic and let StartMessaging handle the
        rate limiting infrastructure. Combined with{' '}
        <Link href="/blog/otp-security-best-practices">OTP security best practices</Link> like
        bcrypt hashing and attempt limiting, you get comprehensive protection at{' '}
        <Link href="/pricing">Rs 0.25 per OTP</Link>.
      </p>

      <h2 id="implementation-checklist">Implementation Checklist</h2>
      <p>
        Review your OTP system against this checklist:
      </p>
      <ol>
        <li>Per-phone number rate limit is enforced (max 3 sends per 10 minutes)</li>
        <li>Per-IP address rate limit is enforced (max 20 sends per 10 minutes)</li>
        <li>Global rate limit is set with 3-5x headroom above peak traffic</li>
        <li>Sliding window algorithm is used (not fixed windows)</li>
        <li>Resend cooldowns are progressive (30s, 60s, 120s, 300s)</li>
        <li>429 responses include Retry-After headers</li>
        <li>Rate limit hit alerts are configured for the engineering team</li>
        <li>IP-based limits account for mobile carrier CGNAT</li>
        <li>Client UI shows countdown timers when rate-limited</li>
        <li>Rate limit counters use Redis or equivalent in-memory store (not database queries)</li>
      </ol>
      <p>
        For the complete picture on OTP security, read our guides on{' '}
        <Link href="/blog/prevent-otp-fraud">preventing OTP fraud and SMS pumping</Link> and{' '}
        <Link href="/blog/otp-security-best-practices">OTP security best practices</Link>.
      </p>
    </>
  ),
  relatedSlugs: ['prevent-otp-fraud', 'otp-security-best-practices'],
  faq: [
    {
      question: 'What rate limit thresholds should I use for OTP sends?',
      answer:
        'Start with 1 OTP per minute, 3 per 10 minutes, 5 per hour, and 10 per 24 hours on a per-phone-number basis. For per-IP limits, use 5 per minute and 20 per 10 minutes. Adjust based on your user behaviour data, but err on the side of stricter limits since legitimate users rarely need more than 2-3 OTPs in a session.',
    },
    {
      question: 'Should I use a fixed window or sliding window for rate limiting?',
      answer:
        'Use a sliding window. Fixed windows have a well-known weakness: an attacker can send a burst of requests at the end of one window and the beginning of the next, effectively doubling the allowed rate. Sliding windows (implemented with Redis sorted sets) provide consistent behaviour regardless of timing.',
    },
    {
      question: 'How do I handle rate limiting with mobile carrier CGNAT?',
      answer:
        'Indian mobile carriers frequently use CGNAT, meaning thousands of users share the same public IP address. Set per-IP thresholds higher than per-phone thresholds (e.g., 20-50 per 10 minutes) and consider exempting known carrier IP ranges from strict per-IP limits while keeping per-phone limits tight.',
    },
    {
      question: 'Does StartMessaging include built-in rate limiting?',
      answer:
        'Yes. StartMessaging applies per-phone, per-IP, and per-API-key rate limits automatically on all OTP endpoints. The limits are tuned for the Indian market, including CGNAT-aware IP thresholds. You do not need to implement your own rate limiting layer when using the StartMessaging API.',
    },
  ],
};
