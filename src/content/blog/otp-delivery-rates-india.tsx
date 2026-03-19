import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-delivery-rates-india',
  title: 'OTP Delivery Rates in India: What to Expect',
  description:
    'Realistic OTP SMS delivery rates by Indian carrier (Jio, Airtel, Vi, BSNL), DLT impact, time-of-day patterns, DND filtering, and tips to improve delivery.',
  category: 'comparisons',
  keywords: [
    'otp delivery rate india',
    'sms delivery rate india',
    'otp not delivered india',
    'jio otp delivery',
    'airtel otp delivery',
    'bsnl sms delivery issues',
    'dlt sms delivery rate',
    'improve otp delivery india',
    'sms dnd filtering india',
  ],
  publishedAt: '2026-02-10',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-delivery-rates-matter', title: 'Why OTP Delivery Rates Matter' },
    { id: 'delivery-rates-by-carrier', title: 'Delivery Rates by Carrier' },
    { id: 'dlt-impact', title: 'How DLT Affects Delivery Rates' },
    { id: 'time-of-day-patterns', title: 'Time-of-Day Delivery Patterns' },
    { id: 'dnd-filtering', title: 'DND (Do Not Disturb) and OTP Messages' },
    { id: 'common-failure-reasons', title: 'Common Delivery Failure Reasons' },
    { id: 'tips-to-improve-delivery', title: '8 Tips to Improve OTP Delivery Rates' },
    { id: 'how-startmessaging-achieves-high-delivery', title: 'How StartMessaging Achieves 97-99% Delivery' },
    { id: 'benchmarking-your-delivery-rate', title: 'Benchmarking Your Delivery Rate' },
  ],
  content: (
    <>
      <p>
        If you are sending OTPs in India, delivery rate is the single most important metric to track.
        A failed OTP means a failed signup, a failed login, or a failed transaction. Understanding
        realistic delivery rates across Indian carriers, what affects them, and how to improve them is
        essential for any developer building phone verification for the Indian market.
      </p>

      <h2 id="why-delivery-rates-matter">Why OTP Delivery Rates Matter</h2>
      <p>
        Consider this scenario: your app has 10,000 new user signups per month, and each signup requires
        OTP verification. With a 95% delivery rate, 500 users every month fail to receive their OTP.
        That is 500 users who either abandon your app or flood your support channels. At 99% delivery,
        only 100 users face issues &mdash; a 5x reduction in failed signups.
      </p>
      <p>
        The difference between 95% and 99% delivery may sound small, but at scale it translates directly
        to lost users and lost revenue. Here is what you should realistically expect in India.
      </p>

      <h2 id="delivery-rates-by-carrier">Delivery Rates by Carrier</h2>
      <p>
        India has four major telecom operators, and delivery rates vary between them. These figures
        represent industry averages for transactional OTP messages sent through compliant (DLT-registered
        or pre-approved) routes:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Subscribers (approx.)</th>
              <th>Typical OTP Delivery Rate</th>
              <th>Average Delivery Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Jio</strong></td>
              <td>480M+</td>
              <td>98-99%</td>
              <td>2-5 seconds</td>
              <td>Best delivery rates, VoLTE-only network, strong DLT compliance</td>
            </tr>
            <tr>
              <td><strong>Airtel</strong></td>
              <td>390M+</td>
              <td>97-99%</td>
              <td>3-6 seconds</td>
              <td>Reliable, fast delivery, good DLT infrastructure</td>
            </tr>
            <tr>
              <td><strong>Vi (Vodafone Idea)</strong></td>
              <td>220M+</td>
              <td>94-97%</td>
              <td>5-15 seconds</td>
              <td>Variable quality, network congestion in some circles</td>
            </tr>
            <tr>
              <td><strong>BSNL</strong></td>
              <td>85M+</td>
              <td>90-95%</td>
              <td>8-30 seconds</td>
              <td>Lower rates in rural areas, older infrastructure, slower delivery</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Weighted average across all carriers:</strong> A well-optimised OTP provider delivers
        96-98% on average, with the best providers reaching 97-99% through multi-provider fallback and
        carrier-specific routing.
      </p>

      <h3>Why the Variation?</h3>
      <p>
        Delivery rates vary by carrier due to several factors:
      </p>
      <ul>
        <li>
          <strong>Network infrastructure quality:</strong> Jio, built as a 4G-first network, has
          modern SMS infrastructure. BSNL, with older legacy systems, experiences more delivery issues.
        </li>
        <li>
          <strong>DLT platform maturity:</strong> Each carrier operates its own DLT platform with
          different levels of reliability and template approval speed.
        </li>
        <li>
          <strong>Network congestion:</strong> During peak hours or in densely populated areas, some
          carriers experience SMS queue backlogs.
        </li>
        <li>
          <strong>Rural coverage:</strong> SMS delivery in rural and semi-urban areas can be less
          reliable, particularly on Vi and BSNL networks.
        </li>
      </ul>

      <h2 id="dlt-impact">How DLT Affects Delivery Rates</h2>
      <p>
        TRAI&apos;s DLT (Distributed Ledger Technology) mandate requires all commercial SMS senders to
        register their entity, sender IDs, and message templates on a DLT platform. While DLT was
        designed to reduce spam, it has introduced additional points of failure in the SMS delivery chain:
      </p>
      <ul>
        <li>
          <strong>Template mismatches:</strong> If your actual message does not exactly match the
          registered DLT template (including spacing and special characters), the message is blocked.
          This is the single biggest cause of delivery failures.
        </li>
        <li>
          <strong>Scrubbing delays:</strong> Every SMS goes through a DLT scrubbing process that adds
          1-3 seconds of latency. During peak load, scrubbing queues can cause additional delays.
        </li>
        <li>
          <strong>Entity registration issues:</strong> If your DLT entity registration is incomplete
          or has expired, all messages are blocked until it is resolved.
        </li>
        <li>
          <strong>Cross-carrier template sync:</strong> Templates registered on one DLT platform (e.g.,
          Jio) may not be immediately available on another (e.g., Airtel), causing intermittent failures.
        </li>
      </ul>
      <p>
        <Link href="/dlt-free-otp">StartMessaging handles DLT compliance</Link> on your behalf using
        pre-registered and pre-approved templates. This eliminates template mismatch issues and removes
        the DLT registration burden from developers.
      </p>

      <h2 id="time-of-day-patterns">Time-of-Day Delivery Patterns</h2>
      <p>
        OTP delivery rates are not constant throughout the day. Understanding peak and off-peak patterns
        helps set expectations:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Time Period</th>
              <th>Delivery Rate</th>
              <th>Delivery Speed</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6 AM - 9 AM</td>
              <td>97-99%</td>
              <td>Fast (2-5s)</td>
              <td>Low traffic, fresh network capacity</td>
            </tr>
            <tr>
              <td>9 AM - 12 PM</td>
              <td>96-98%</td>
              <td>Normal (3-8s)</td>
              <td>Business hours beginning, moderate load</td>
            </tr>
            <tr>
              <td>12 PM - 3 PM</td>
              <td>95-97%</td>
              <td>Slower (5-12s)</td>
              <td>Peak business hours, high SMS volume</td>
            </tr>
            <tr>
              <td>3 PM - 7 PM</td>
              <td>94-97%</td>
              <td>Variable (5-15s)</td>
              <td>Afternoon peak, marketing SMS bursts</td>
            </tr>
            <tr>
              <td>7 PM - 10 PM</td>
              <td>95-98%</td>
              <td>Normal (3-10s)</td>
              <td>Consumer activity peak, moderate congestion</td>
            </tr>
            <tr>
              <td>10 PM - 6 AM</td>
              <td>97-99%</td>
              <td>Fast (2-5s)</td>
              <td>Low traffic, but TRAI restricts promotional SMS 9PM-9AM</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Important:</strong> TRAI regulations prohibit promotional SMS between 9 PM and 9 AM.
        However, transactional OTP messages are exempt from this restriction. Your OTPs can be sent
        24/7, but you may still see carrier-level congestion during evening hours.
      </p>

      <h2 id="dnd-filtering">DND (Do Not Disturb) and OTP Messages</h2>
      <p>
        India&apos;s DND (Do Not Disturb) registry allows users to opt out of commercial messages. Over
        230 million Indian phone numbers are registered on DND. Here is the good news: <strong>OTP
        messages are classified as transactional and are exempt from DND filtering.</strong>
      </p>
      <p>However, there are edge cases to be aware of:</p>
      <ul>
        <li>
          <strong>Incorrect message classification:</strong> If your SMS route or DLT template is
          classified as promotional instead of transactional, DND numbers will be blocked. This is a
          common misconfiguration issue.
        </li>
        <li>
          <strong>Carrier-level filtering:</strong> Some carriers apply additional spam filters that
          may occasionally flag legitimate OTP messages, especially if sent from routes with a history
          of spam complaints.
        </li>
        <li>
          <strong>Device-level spam filters:</strong> Android phones (especially Samsung and Xiaomi)
          have built-in spam filters that may divert OTP messages to a spam folder. The OTP is
          delivered but the user may not see it immediately.
        </li>
      </ul>
      <p>
        StartMessaging sends all OTPs through verified transactional routes, ensuring DND exemption.
        Our messages are correctly classified at both the DLT and carrier level.
      </p>

      <h2 id="common-failure-reasons">Common Delivery Failure Reasons</h2>
      <p>
        When an OTP fails to deliver, it is usually due to one of these reasons:
      </p>
      <ol>
        <li>
          <strong>Phone switched off or out of coverage</strong> (accounts for ~40% of failures) &mdash;
          nothing any provider can do about this
        </li>
        <li>
          <strong>DLT template mismatch</strong> (~20% of failures) &mdash; message blocked by the DLT
          scrubbing layer because the content does not match the registered template
        </li>
        <li>
          <strong>Carrier network issues</strong> (~15% of failures) &mdash; temporary outages or
          congestion on the carrier side
        </li>
        <li>
          <strong>Invalid or ported number</strong> (~10% of failures) &mdash; the number does not
          exist, has been deactivated, or was recently ported and routing is stale
        </li>
        <li>
          <strong>Rate limiting by carrier</strong> (~8% of failures) &mdash; too many SMS sent to the
          same number in a short period
        </li>
        <li>
          <strong>Device SMS storage full</strong> (~5% of failures) &mdash; the user&apos;s phone
          cannot accept new messages
        </li>
        <li>
          <strong>International routing issues</strong> (~2% of failures) &mdash; when using providers
          that route through international gateways
        </li>
      </ol>

      <h2 id="tips-to-improve-delivery">8 Tips to Improve OTP Delivery Rates</h2>

      <h3>1. Use a Provider with Automatic Fallback</h3>
      <p>
        The single most effective way to improve delivery rates is to use a provider that automatically
        retries failed OTPs through an alternate SMS route. If Provider A fails to deliver,
        Provider B picks up the message. <Link href="/features">StartMessaging</Link> does this
        automatically.
      </p>

      <h3>2. Ensure Correct DLT Template Registration</h3>
      <p>
        If you manage your own DLT registration, double-check that your templates exactly match the
        messages you send, including spacing, punctuation, and variable placeholders. A single extra
        space can cause a template mismatch and block delivery. Or use a provider like StartMessaging
        that <Link href="/dlt-free-otp">handles DLT for you</Link>.
      </p>

      <h3>3. Implement Resend Logic with Backoff</h3>
      <p>
        Do not let users resend an OTP immediately. Implement a cooldown (30-60 seconds) before
        allowing a resend. This prevents carrier rate limiting and gives the first message time to
        arrive. Example:
      </p>
      <pre><code>{`// Frontend: Resend with cooldown
const [cooldown, setCooldown] = useState(0);

const handleResend = async () => {
  if (cooldown > 0) return;

  await fetch('/api/otp/resend', { method: 'POST', body: JSON.stringify({ requestId }) });
  setCooldown(30); // 30-second cooldown

  const timer = setInterval(() => {
    setCooldown(prev => {
      if (prev <= 1) { clearInterval(timer); return 0; }
      return prev - 1;
    });
  }, 1000);
};`}</code></pre>

      <h3>4. Validate Phone Numbers Before Sending</h3>
      <p>
        Verify that the phone number is a valid 10-digit Indian mobile number before making the API
        call. This prevents wasting credits on invalid numbers and avoids carrier-level errors.
      </p>
      <pre><code>{`// Validate Indian mobile number
const isValidIndianMobile = (phone: string) => {
  const cleaned = phone.replace(/\\D/g, '');
  return /^[6-9]\\d{9}$/.test(cleaned);
};`}</code></pre>

      <h3>5. Use Idempotency Keys</h3>
      <p>
        Prevent duplicate OTP sends (caused by double-clicks or network retries) by using idempotency
        keys. StartMessaging supports this natively &mdash; include an <code>idempotencyKey</code> in
        your send request, and the system will return the existing OTP request instead of creating a
        duplicate.
      </p>

      <h3>6. Monitor Delivery by Carrier</h3>
      <p>
        Track your OTP delivery rates segmented by carrier. If you notice a drop on a specific carrier
        (e.g., BSNL delivery drops below 90%), it may indicate a routing issue, DLT template problem,
        or carrier outage that needs attention.
      </p>

      <h3>7. Provide Alternative Verification Methods</h3>
      <p>
        For users who consistently fail to receive SMS OTPs (common on BSNL and in rural areas),
        consider offering alternative verification methods like WhatsApp OTP, voice call OTP, or email
        verification as a fallback.
      </p>

      <h3>8. Avoid Sending During Peak Congestion</h3>
      <p>
        If your OTP sends are not user-triggered (e.g., batch re-verification campaigns), schedule them
        during off-peak hours (early morning or late night) for better delivery rates. For user-triggered
        OTPs, you obviously cannot control timing, but understanding that 12-7 PM may have slightly
        lower rates helps set appropriate retry expectations.
      </p>

      <h2 id="how-startmessaging-achieves-high-delivery">How StartMessaging Achieves 97-99% Delivery</h2>
      <p>
        <Link href="/features">StartMessaging</Link> achieves industry-leading delivery rates through
        a combination of techniques:
      </p>
      <ul>
        <li>
          <strong>Multi-provider routing:</strong> OTPs are sent through the best available provider for
          each carrier. If the primary provider fails, the system automatically retries through a
          secondary provider within seconds.
        </li>
        <li>
          <strong>Pre-registered DLT templates:</strong> All templates are pre-registered and
          pre-approved on all major DLT platforms, eliminating template mismatch failures.
        </li>
        <li>
          <strong>Domestic routing only:</strong> Messages are routed through domestic Indian gateways,
          avoiding the latency and delivery issues associated with international routing.
        </li>
        <li>
          <strong>Carrier-specific optimisation:</strong> Different routing strategies for different
          carriers based on real-time delivery data and historical performance.
        </li>
        <li>
          <strong>Real-time monitoring:</strong> Delivery rates are monitored in real time. If a route
          starts showing degraded performance, traffic is automatically shifted to healthier routes.
        </li>
      </ul>
      <p>
        You can monitor your own delivery rates and message statuses in the{' '}
        <a href="https://app.startmessaging.com" target="_blank" rel="noopener noreferrer">
          StartMessaging dashboard
        </a>{' '}
        or via the <Link href="/otp-api">API</Link>.
      </p>

      <h2 id="benchmarking-your-delivery-rate">Benchmarking Your Delivery Rate</h2>
      <p>
        How do you know if your current delivery rate is good? Here is a benchmark guide:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Delivery Rate</th>
              <th>Assessment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>98-99%+</td>
              <td>Excellent</td>
              <td>Maintain current setup, monitor for degradation</td>
            </tr>
            <tr>
              <td>95-98%</td>
              <td>Good</td>
              <td>Investigate carrier-specific drops, consider fallback provider</td>
            </tr>
            <tr>
              <td>90-95%</td>
              <td>Needs improvement</td>
              <td>Check DLT templates, audit routing, add provider fallback</td>
            </tr>
            <tr>
              <td>Below 90%</td>
              <td>Critical</td>
              <td>Likely DLT or routing issues, switch provider or escalate with current one</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If your current OTP delivery rate is below 97%, you may benefit from switching to a provider
        with automatic fallback and pre-registered DLT routes. Explore our{' '}
        <Link href="/blog/best-otp-api-india">best OTP API for India</Link> comparison to evaluate
        your options, or get started with StartMessaging at our <Link href="/pricing">pricing page</Link>.
      </p>
    </>
  ),
  relatedSlugs: ['best-otp-api-india', 'sms-otp-vs-whatsapp-otp'],
  faq: [
    {
      question: 'What is a good OTP delivery rate for India?',
      answer:
        'A good OTP delivery rate for India is 97% or above. The best providers achieve 97-99% across all major carriers. Rates below 95% indicate potential issues with DLT compliance, routing, or provider quality that should be investigated.',
    },
    {
      question: 'Do DND numbers receive OTP messages in India?',
      answer:
        'Yes. OTP messages are classified as transactional SMS and are exempt from DND (Do Not Disturb) filtering in India. However, if your messages are incorrectly classified as promotional due to DLT misconfiguration, they may be blocked on DND numbers.',
    },
    {
      question: 'Why are BSNL OTP delivery rates lower than other carriers?',
      answer:
        'BSNL uses older network infrastructure compared to Jio and Airtel, which can lead to slower SMS processing and occasional delivery failures, particularly in rural areas. BSNL also has a smaller and sometimes less reliable DLT platform. Using a provider with carrier-specific routing can help improve BSNL delivery rates.',
    },
    {
      question: 'How can I check my OTP delivery rate?',
      answer:
        'Most OTP providers offer delivery reports via dashboard or API. With StartMessaging, you can view message-level delivery statuses in the dashboard and track delivery rates over time. Calculate your delivery rate as: (delivered messages / total sent messages) x 100.',
    },
  ],
};
