import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-verification-flow',
  title: 'Build a Complete OTP Verification Flow',
  description:
    'Architecture guide for building a production-ready OTP verification flow covering generation, delivery, verification, retry logic, expiry, and security best practices.',
  category: 'tutorials',
  keywords: [
    'otp verification flow',
    'otp architecture',
    'otp security best practices',
    'otp retry logic',
    'otp expiry handling',
    'sms otp flow design',
    'phone verification architecture',
    'otp system design',
  ],
  publishedAt: '2026-01-25',
  readingTime: 13,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Flow Overview' },
    { id: 'step-1-initiation', title: 'Step 1: Initiation' },
    { id: 'step-2-generation-delivery', title: 'Step 2: Generation and Delivery' },
    { id: 'step-3-user-input', title: 'Step 3: User Input' },
    { id: 'step-4-verification', title: 'Step 4: Verification' },
    { id: 'retry-and-resend', title: 'Retry and Resend Logic' },
    { id: 'expiry-handling', title: 'Expiry Handling' },
    { id: 'rate-limiting', title: 'Rate Limiting' },
    { id: 'security-considerations', title: 'Security Considerations' },
    { id: 'state-machine', title: 'OTP Request State Machine' },
    { id: 'frontend-ux', title: 'Frontend UX Patterns' },
    { id: 'with-startmessaging', title: 'Implementing with StartMessaging' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-security-best-practices', 'otp-expiry-attempt-limits'],
  faq: [
    {
      question: 'Should I generate OTP codes on my server or let the API handle it?',
      answer:
        'Let the API handle it. StartMessaging generates cryptographically random codes, hashes them with bcrypt before storage, and manages expiry and attempt limits. Generating codes yourself means you have to handle all of that securely, which is error-prone. The API-managed approach is both simpler and more secure.',
    },
    {
      question: 'How long should an OTP be valid?',
      answer:
        'Five to ten minutes is the standard range. Shorter windows are more secure but may frustrate users on slow networks. StartMessaging defaults to 10 minutes, which balances security with usability across Indian mobile networks where SMS delivery can sometimes be delayed.',
    },
    {
      question: 'Should I use 4-digit or 6-digit OTPs?',
      answer:
        'Use 6 digits. A 4-digit code has only 10,000 possible combinations, which can be brute-forced in a few attempts if rate limiting is weak. A 6-digit code has 1,000,000 combinations, providing a much better security margin. StartMessaging uses 6-digit codes by default.',
    },
    {
      question: 'What happens if the SMS is not delivered?',
      answer:
        'Provide a resend button that the user can tap after a cooldown period (30-60 seconds). StartMessaging uses priority-based provider fallback internally, so if one carrier fails, the message is automatically retried via a backup provider. If delivery consistently fails to a specific number, it may be a landline or an unreachable number.',
    },
  ],
  content: (
    <>
      <p>
        OTP (one-time password) verification is the backbone of phone-based
        authentication in India. While sending a single OTP is straightforward,
        building a production-ready verification flow involves many more
        decisions: retry logic, expiry handling, rate limiting, security
        hardening, and smooth user experience.
      </p>
      <p>
        This guide walks through the complete architecture of an OTP
        verification flow. It is language-agnostic &mdash; the patterns apply
        whether you are building with{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-python">Python</Link>,{' '}
        <Link href="/blog/send-otp-php-laravel">PHP</Link>, or any other
        backend. We will use the{' '}
        <Link href="/features">StartMessaging API</Link> as the OTP provider,
        which handles code generation, hashing, delivery, and verification so
        you can focus on your application logic.
      </p>

      <h2 id="overview">Flow Overview</h2>
      <p>
        A complete OTP verification flow consists of four stages:
      </p>
      <ol>
        <li>
          <strong>Initiation</strong> &mdash; The user requests verification
          (e.g. enters their phone number on a registration form).
        </li>
        <li>
          <strong>Generation and Delivery</strong> &mdash; Your backend calls
          the OTP API, which generates a code, sends it via SMS, and returns a
          request ID.
        </li>
        <li>
          <strong>User Input</strong> &mdash; The user receives the SMS and
          enters the code in your application.
        </li>
        <li>
          <strong>Verification</strong> &mdash; Your backend sends the code and
          request ID to the OTP API for verification.
        </li>
      </ol>
      <p>Here is how the data flows between all parties:</p>
      <pre>
        <code>{`User          Your Frontend       Your Backend       StartMessaging      SMS Provider
  |                |                    |                    |                    |
  |-- Enter phone ->|                    |                    |                    |
  |                |-- POST /send-otp -->|                    |                    |
  |                |                    |-- POST /otp/send -->|                    |
  |                |                    |                    |-- Deliver SMS ----->|
  |                |                    |<-- { requestId } --|                    |
  |                |<-- { requestId } --|                    |                    |
  |<-- Show OTP input --|                |                    |       |-- SMS -->User
  |                |                    |                    |                    |
  |-- Enter code ->|                    |                    |                    |
  |                |-- POST /verify --->|                    |                    |
  |                |                    |-- POST /otp/verify->|                    |
  |                |                    |<-- { verified } ---|                    |
  |                |<-- { verified } ---|                    |                    |
  |<-- Success/Fail --|                  |                    |                    |`}</code>
      </pre>

      <h2 id="step-1-initiation">Step 1: Initiation</h2>
      <p>
        When the user submits their phone number, your frontend sends it to
        your backend. Before forwarding to the OTP API, your backend should:
      </p>
      <ul>
        <li>
          <strong>Validate the phone number format.</strong> Ensure it is a
          valid E.164 number (e.g. <code>+919876543210</code>). Reject invalid
          formats immediately without calling the API.
        </li>
        <li>
          <strong>Check rate limits.</strong> Prevent a single phone number or
          IP address from requesting too many OTPs in a short period.
        </li>
        <li>
          <strong>Check for existing pending requests.</strong> If the user
          already has a pending OTP, decide whether to reuse it (by returning
          the existing request ID) or to invalidate it and create a new one.
        </li>
      </ul>

      <h2 id="step-2-generation-delivery">Step 2: Generation and Delivery</h2>
      <p>
        Your backend calls the <code>POST /otp/send</code> endpoint on the
        StartMessaging API. The API handles all of the following:
      </p>
      <ul>
        <li>
          <strong>Code generation</strong> &mdash; A cryptographically random
          6-digit code is generated.
        </li>
        <li>
          <strong>Code hashing</strong> &mdash; The code is hashed with bcrypt
          before storage. The plaintext code is never stored.
        </li>
        <li>
          <strong>SMS delivery</strong> &mdash; The code is sent via SMS with
          automatic provider fallback if the primary carrier fails.
        </li>
        <li>
          <strong>Expiry and attempt tracking</strong> &mdash; The API sets an
          expiry time (default 10 minutes) and a maximum number of verification
          attempts (default 3).
        </li>
      </ul>
      <p>
        Your backend receives a response with <code>requestId</code>,{' '}
        <code>expiresAt</code>, and <code>attemptsLeft</code>. Store the{' '}
        <code>requestId</code> in your session or database, associated with
        the user or phone number. Forward it to your frontend.
      </p>
      <p>
        Always include an{' '}
        <Link href="/blog/idempotency-keys-otp">idempotency key</Link> in
        your send request. This prevents duplicate SMS delivery if a network
        retry causes the request to be processed twice.
      </p>

      <h2 id="step-3-user-input">Step 3: User Input</h2>
      <p>
        Your frontend shows an OTP input screen. The user checks their SMS and
        types in the 6-digit code. Key UX considerations at this stage:
      </p>
      <ul>
        <li>
          Show a countdown timer indicating how much time remains before the
          code expires.
        </li>
        <li>
          Provide a &quot;Resend&quot; button that is initially disabled and
          becomes active after a cooldown period (typically 30 to 60 seconds).
        </li>
        <li>
          Use an input field with <code>inputMode=&quot;numeric&quot;</code>{' '}
          and <code>autocomplete=&quot;one-time-code&quot;</code> to help
          mobile browsers auto-fill the OTP from SMS.
        </li>
        <li>
          Show clear feedback when the user has entered all 6 digits. Some
          applications auto-submit at this point.
        </li>
      </ul>

      <h2 id="step-4-verification">Step 4: Verification</h2>
      <p>
        When the user submits the code, your frontend sends both the code and
        the <code>requestId</code> to your backend. Your backend then calls{' '}
        <code>POST /otp/verify</code> on the StartMessaging API.
      </p>
      <p>Possible outcomes:</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Outcome</th>
              <th>API Response</th>
              <th>Your Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Correct code</td>
              <td>
                <code>verified: true</code>
              </td>
              <td>
                Mark the phone as verified. Proceed with login, registration, or
                the protected action.
              </td>
            </tr>
            <tr>
              <td>Wrong code, attempts remaining</td>
              <td>Error with attempts left count</td>
              <td>
                Show error to user with remaining attempts. Let them try again.
              </td>
            </tr>
            <tr>
              <td>Wrong code, no attempts left</td>
              <td>Error indicating max attempts exceeded</td>
              <td>
                The OTP is invalidated. The user must request a new one.
              </td>
            </tr>
            <tr>
              <td>Expired OTP</td>
              <td>Error indicating expiry</td>
              <td>
                Prompt the user to request a new OTP.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="retry-and-resend">Retry and Resend Logic</h2>
      <p>
        There are two distinct retry concepts in an OTP flow, and it is
        important not to confuse them:
      </p>
      <h3>Verification retries (wrong code)</h3>
      <p>
        When the user enters the wrong code, they should be allowed to try
        again up to the attempt limit (typically 3). After the limit is
        exhausted, the OTP is invalidated and the user must request a new one.
        Your frontend should display the remaining attempts to set
        expectations.
      </p>
      <h3>Resend (new OTP)</h3>
      <p>
        If the user does not receive the SMS, they may request a new OTP.
        Implement the following safeguards:
      </p>
      <ul>
        <li>
          <strong>Cooldown period:</strong> Enforce a minimum wait time
          (30-60 seconds) between resend requests. This prevents abuse and
          gives the SMS time to arrive.
        </li>
        <li>
          <strong>Maximum resends:</strong> Cap the number of OTPs that can be
          sent to a single phone number in a given time window (e.g. 5 OTPs
          per phone number per hour).
        </li>
        <li>
          <strong>Invalidate previous OTP:</strong> When a new OTP is sent,
          the previous one should be considered invalid. Only the most recent
          request ID should be accepted for verification.
        </li>
        <li>
          <strong>New idempotency key:</strong> Each resend must use a new
          idempotency key since it is intentionally a new OTP request.
        </li>
      </ul>

      <h2 id="expiry-handling">Expiry Handling</h2>
      <p>
        OTP codes must expire after a fixed duration. StartMessaging defaults
        to 10 minutes, which balances security with usability for Indian
        mobile networks where SMS delivery can sometimes be delayed.
      </p>
      <p>Handle expiry on both sides:</p>
      <ul>
        <li>
          <strong>Frontend:</strong> Show a countdown timer. When it reaches
          zero, disable the input and show a &quot;Request new OTP&quot;
          button. Calculate the remaining time from the{' '}
          <code>expiresAt</code> timestamp returned by the API.
        </li>
        <li>
          <strong>Backend:</strong> Even if your frontend timer expires, always
          rely on the API-side expiry as the source of truth. The API will
          reject expired codes regardless of what your frontend shows.
        </li>
      </ul>

      <h2 id="rate-limiting">Rate Limiting</h2>
      <p>
        Rate limiting is critical for preventing both financial abuse (someone
        draining your wallet) and user harassment (someone spamming a phone
        number). Implement rate limits at multiple levels:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Limit</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Per phone number</td>
              <td>5 OTPs per hour</td>
              <td>Prevent harassment and wallet drain for one number</td>
            </tr>
            <tr>
              <td>Per IP address</td>
              <td>10 OTPs per hour</td>
              <td>Prevent automated abuse from a single source</td>
            </tr>
            <tr>
              <td>Per user account</td>
              <td>20 OTPs per day</td>
              <td>Prevent compromised accounts from draining credit</td>
            </tr>
            <tr>
              <td>Global</td>
              <td>Based on your expected volume</td>
              <td>Catch anomalies and prevent runaway spending</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Implement these limits in your backend before calling the
        StartMessaging API. Use Redis or your database for tracking.
      </p>

      <h2 id="security-considerations">Security Considerations</h2>
      <ol>
        <li>
          <strong>Never expose OTP codes in your API responses.</strong> Your
          backend should only forward the <code>requestId</code> to the
          frontend, never the code itself. StartMessaging never returns the
          code in API responses &mdash; it is only sent via SMS.
        </li>
        <li>
          <strong>Never log OTP codes.</strong> Since StartMessaging hashes
          codes with bcrypt, there is no reason for your application to see or
          store the plaintext code at any point.
        </li>
        <li>
          <strong>Use HTTPS everywhere.</strong> All communication between
          your frontend, backend, and the StartMessaging API must be over TLS.
        </li>
        <li>
          <strong>Limit verification attempts.</strong> The default of 3
          attempts means an attacker has only a 0.0003% chance of guessing a
          6-digit code. Do not increase this limit.
        </li>
        <li>
          <strong>Prevent enumeration attacks.</strong> Do not return different
          error messages for &quot;phone number not found&quot; versus
          &quot;OTP expired.&quot; Use generic error messages on your frontend.
        </li>
        <li>
          <strong>Bind OTP to purpose.</strong> An OTP generated for login
          should not be valid for password reset. If your application has
          multiple OTP use cases, use separate request flows for each.
        </li>
        <li>
          <strong>Implement session binding.</strong> Store the{' '}
          <code>requestId</code> in a server-side session or signed token, not
          in a client-side cookie that can be tampered with.
        </li>
      </ol>

      <h2 id="state-machine">OTP Request State Machine</h2>
      <p>
        An OTP request transitions through a clear set of states. Thinking of
        it as a state machine helps you handle every edge case:
      </p>
      <pre>
        <code>{`CREATED ──── SMS sent successfully ────> PENDING
   |                                        |
   |── SMS delivery failed ──> FAILED       |── User enters correct code ──> VERIFIED
                                            |
                                            |── User enters wrong code (attempts > 0) ──> PENDING (decremented)
                                            |
                                            |── User enters wrong code (attempts = 0) ──> EXHAUSTED
                                            |
                                            |── Time expires ──> EXPIRED`}</code>
      </pre>
      <p>
        Terminal states are <strong>VERIFIED</strong>,{' '}
        <strong>EXHAUSTED</strong>, <strong>EXPIRED</strong>, and{' '}
        <strong>FAILED</strong>. Once in a terminal state, the request cannot
        transition further. The user must start a new request.
      </p>

      <h2 id="frontend-ux">Frontend UX Patterns</h2>
      <p>
        Good UX is essential for OTP flows. A frustrating verification
        experience drives users away. Here are the key patterns:
      </p>
      <h3>Phone number input</h3>
      <ul>
        <li>
          Pre-fill the country code for Indian numbers (<code>+91</code>).
        </li>
        <li>
          Validate the number format in real time. Show an error before the
          user submits if the format is invalid.
        </li>
        <li>
          Disable the submit button while a request is in flight to prevent
          double sends.
        </li>
      </ul>
      <h3>OTP code input</h3>
      <ul>
        <li>
          Use a 6-box input where each box accepts one digit. Auto-advance
          focus to the next box as the user types.
        </li>
        <li>
          Set <code>inputMode=&quot;numeric&quot;</code> and{' '}
          <code>autocomplete=&quot;one-time-code&quot;</code> for native OTP
          auto-fill on Android and iOS.
        </li>
        <li>Support paste so users can paste the full code at once.</li>
        <li>
          Show a countdown timer for expiry. Format it as
          &quot;4:32 remaining&quot; not &quot;272 seconds.&quot;
        </li>
      </ul>
      <h3>Error states</h3>
      <ul>
        <li>
          Wrong code: &quot;Incorrect code. 2 attempts remaining.&quot;
        </li>
        <li>
          Expired: &quot;This code has expired. Please request a new
          one.&quot; with a resend button.
        </li>
        <li>
          Max attempts: &quot;Too many incorrect attempts. Please request a
          new code.&quot; with a resend button.
        </li>
        <li>
          Rate limited: &quot;Too many requests. Please wait a few minutes
          before trying again.&quot;
        </li>
      </ul>

      <h2 id="with-startmessaging">Implementing with StartMessaging</h2>
      <p>
        The <Link href="/otp-api">StartMessaging OTP API</Link> is designed
        to handle the complexity described in this guide. Here is what the API
        manages for you:
      </p>
      <ul>
        <li>
          <strong>Code generation and hashing</strong> &mdash; cryptographically
          random 6-digit codes, bcrypt hashed.
        </li>
        <li>
          <strong>SMS delivery with fallback</strong> &mdash; automatic retry
          via backup SMS providers on delivery failure.
        </li>
        <li>
          <strong>Expiry enforcement</strong> &mdash; server-side expiry that
          cannot be bypassed.
        </li>
        <li>
          <strong>Attempt tracking</strong> &mdash; automatic lockout after
          maximum verification attempts.
        </li>
        <li>
          <strong>
            <Link href="/blog/idempotency-keys-otp">Idempotency</Link>
          </strong>{' '}
          &mdash; duplicate send requests return the original response.
        </li>
        <li>
          <strong>
            <Link href="/dlt-free-otp">DLT compliance</Link>
          </strong>{' '}
          &mdash; all Indian telecom regulatory requirements handled.
        </li>
      </ul>
      <p>
        What you need to implement on your side:
      </p>
      <ul>
        <li>Phone number validation before calling the API.</li>
        <li>
          Rate limiting at the application level (per phone, per IP, per user).
        </li>
        <li>
          Session management to bind <code>requestId</code> to the user
          securely.
        </li>
        <li>Frontend UX (input, countdown, error handling).</li>
        <li>
          Post-verification action (mark phone as verified, issue session token,
          etc.).
        </li>
      </ul>
      <p>
        For language-specific implementation details, see our tutorials for{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-python">Python</Link>, and{' '}
        <Link href="/blog/send-otp-php-laravel">PHP/Laravel</Link>.
      </p>

      <h2 id="faq">FAQ</h2>

      <p>
        StartMessaging provides a complete OTP API at{' '}
        <Link href="/pricing">Rs 0.25 per OTP</Link> with no monthly
        commitments. <Link href="/use-cases">See use cases</Link> or get started
        with the <Link href="/otp-api">API documentation</Link>.
      </p>
    </>
  ),
};
